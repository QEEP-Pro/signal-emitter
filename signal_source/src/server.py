import logging
import json
import threading
import random
import time
import math

from websocket_server import WebsocketServer
from models import Parameter

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
    if message == 'refresh':
        pass
    else:
        clients[client['id']]['ids'] = json.loads(message)


def get_point(parameter):
    # caclulate tit
    return {
        'id': parameter.id,
        'x': random.randint(-5,4),
        'y': random.randint(-20, 1),
    }


def read_db():
    global parameters
    conn_db = pymysql.connect(host='localhost',user='admin',password='admin',db='digital-hack',charset='utf8',cursorclass=pymysql.cursors.DictCursor)
    try:
        with conn_db.cursor() as cursor:
            cursor.execute("SELECT * FROM `parameters`")
            parameters = cursor.fetchall()
	    cursor.execute("SELECT * FROM `laws`")
            laws = cursor.fetchall()
	for row in parameters:
            law_name = next(x for x in laws if x['id']==row['law_id'])
            parameters.append(Parameter(row['id'], row['name'], row['unit'], law_name, row['period'], row['noise']))
    finally:
        conn_db.close()


def send_parameters():
    for parameter in parameters:
        for client in clients.values():
            if parameter.id in client['ids']:
                server.send_message(client, json.dumps(get_point(parameter)))


time_stamp_zero = time.time()

# MOCK
parameters = [
    Parameter(1, 'Nest One', 'hu'),
    Parameter(2, 'Parameter', 'p'),
]

read_db()

clients = {}

server = WebsocketServer(13254, host='localhost', loglevel=logging.DEBUG)

do_periodically(1, send_parameters)

server.set_fn_new_client(new_client)
server.set_fn_client_left(left_client)
server.set_fn_message_received(message_received)
server.run_forever()