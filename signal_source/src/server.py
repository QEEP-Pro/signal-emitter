import logging
import json
import threading
import random

from websocket_server import WebsocketServer
from models import Parameter


def emit(parameters: list, send_message: callable):
    # каждые parameters.period сукнду
    # x, y как на доске решили для каждого параметра
    # вызывает send message
    pass


def do_periodically(interval, worker_func, iterations = 0):
    if iterations != 1:
        threading.Timer(
            interval,
            do_periodically,
            [interval, worker_func, 0 if iterations == 0 else iterations-1]
        ).start()
    worker_func()


# MOCK
parameters = [
#    Parameter(1, 'Nest One', 'hu'),
#    Parameter(2, 'Parameter', 'p'),
]


def get_point(parameter):
    return {
        'id': parameter.id,
        'x': random.randint(-10, 10),
        'y': random.randint(-20, 1000),
    }


clients = {}


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

read_db()
server = WebsocketServer(13254, host='localhost', loglevel=logging.DEBUG)


def send_parameters():
    for parameter in parameters:
        for client in clients.values():
            if parameter.id in client['ids']:
                server.send_message(client, json.dumps(get_point(parameter)))


def send_message(id: int, x: float, y: float):
    for client in clients.values():
        if parameter.id in client['ids']:
            server.send_message(client, json.dumps({
                "id": id,
                "x": x,
                "y": y,
            }))


do_periodically(1, send_parameters, 100000)


server.set_fn_new_client(new_client)
server.set_fn_client_left(left_client)
server.set_fn_message_received(message_received)
server.run_forever()