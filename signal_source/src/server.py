import logging
import json
import threading
import random

from websocket_server import WebsocketServer
from models import Parameter


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
    Parameter(1, 'Nest One', 'hu'),
    Parameter(2, 'Parameter', 'p'),
]


def get_point(parameter):
    return {
        'id': parameter.id,
        'x': random.randint(-5,4),
        'y': random.randint(-20, 1),
    }

clients = {}


def new_client(client, server):
    if client['id'] not in clients.keys():
        clients[client['id']] = client
    server.send_message_to_all("New client – id: {}".format(str(client['id'])))


def message_received(client, server, message):
    if message == 'refresh':
        pass
    elif message == 'get_parameters':
        pass
    else:
        clients[client['id']]['ids'] = json.loads(message)


server = WebsocketServer(13254, host='localhost', loglevel=logging.DEBUG)


def send_parameters():
    for parameter in parameters:
        for client in clients.values():
            if parameter.id in client['ids']:
                server.send_message(client, json.dumps(get_point(parameter)))


do_periodically(10, send_parameters, 100000)

server.set_fn_new_client(new_client)
server.set_fn_message_received(message_received)
server.run_forever()