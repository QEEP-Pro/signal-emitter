import logging
import json
import threading
import random
import time
import math
import pymysql.cursors
import yaml
from websocket_server import WebsocketServer
from models import Parameter

conf = yaml.load(open("../../conf/conf.yml").read())

def make_noise(num, parameter):
    noise_delta = (math.sqrt(parameter.dispersion) / float(parameter.mean)) / 100
    return random.uniform(num*(1-noise_delta), num*(1+noise_delta))


def do_periodically(interval, worker_func, iterations = 0):
    if iterations != 1:
        threading.Timer(
            interval,
            do_periodically,
            [interval, worker_func, 2]
        ).start()
    worker_func()


def new_client(client, _):
    if client['id'] not in clients.keys():
        clients[client['id']] = client
        clients[client['id']]['ids'] = []


def left_client(client, _):
    clients.pop(client['id'], None)


def message_received(client, _, message):
    global parameters
    if message == 'refresh':
         parameters = read_db()
    else:
        clients[client['id']]['ids'] = json.loads(message)


def get_point(parameter):
    def normalize(v, max, min):
        if v < min:
            v = min
        elif v > max:
            v = max

        return v

    x = time.time() - time_stamp_zero

    period = int(parameter.period)

    if int(x) % period == 0 or period == 1:
        law = parameter.law['name']

        max = int(parameter.max)
        min = int(parameter.min)
        center = (max - min) / 2

        if law == 'sin':
            y = math.sin(x) * center + center
        elif law == 'linear':
            y = min + (x * 0.1) if min + (x * 0.1) <= max else max
        elif law == 'saw':
            y = ((x / 6) - int(x / 6)) * center + center
        elif law == 'ln':
            y = math.log(x)
            y = normalize(y, max, min)
        elif law == 'ln-1':
            y = math.log(x) ** (-1)
            y = normalize(y, max, min)

        elif law == 'ln-1*sin':
            y = math.sin(x) * (math.log(x) ** (-1))
            y = normalize(y, max, min)
        elif law == 'ln*sin':
            y = math.sin(x) * math.log(x)
            y = normalize(y, max, min)
        elif law == 'linear-1*sin':
            y = math.sin(x) * (x ** (-1))
            y = normalize(y, max, min)
        elif law == 'linear*sin':
            y = math.sin(x) * x
            y = normalize(y, max, min)

        elif law == 'const':
            y = min + center

        else:
            y = min + x if min + x <= max else max

        if parameter.noise:
            y = make_noise(y, parameter)

        return {
            'id': parameter.id,
            'x': x,
            'y': y
        }

    else:
        return False


def read_db():
    parameters = []
    conn_db = pymysql.connect(host=conf['db']['host'],user=conf['db']['user'],password=conf['db']['password'],db=conf['db']['db_name'],charset='utf8',cursorclass=pymysql.cursors.DictCursor)
    try:
        with conn_db.cursor() as cursor:
            cursor.execute("SELECT * FROM `parameters`")
            rows = cursor.fetchall()
            cursor.execute("SELECT * FROM `laws`")
            laws = cursor.fetchall()
        for row in rows:
            law_name = next(x for x in laws if x['id']==row['law_id'])
            parameters.append(Parameter(row['id'], row['name'], row['unit'], law_name, row['period'], row['noise'],row['mean'],row['dispersion'],row['min'],row['max']))
    finally:
        conn_db.close()

    return parameters


def send_parameters():
    for parameter in parameters:
        for client in clients.values():
            if parameter.id in client['ids']:
                point = get_point(parameter)
                if point:
                    server.send_message(client, json.dumps(point))



time_stamp_zero = time.time()

parameters = read_db()

clients = {}

server = WebsocketServer(conf['ws']['port'], conf['ws']['host'], loglevel=logging.DEBUG)

do_periodically(1, send_parameters)

server.set_fn_new_client(new_client)
server.set_fn_client_left(left_client)
server.set_fn_message_received(message_received)
server.run_forever()
