import logging
import json
import threading
import random

from websocket_server import WebsocketServer
from models import Parameter


def emit(parameter: Parameter, send_message: callable):
    # Вызывает send_message  (id, x,  y), где id - ид из параметра каждые parameter.period секугд
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
    Parameter(1, 'Nest One', 'hu'),
    Parameter(2, 'Parameter', 'p'),
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


server = WebsocketServer(13254, host='localhost', loglevel=logging.DEBUG)


def send_parameters():
    for parameter in parameters:
        for client in clients.values():
            if parameter.id in client['ids']:
                server.send_message(client, json.dumps(get_point(parameter)))


def send_message(id: int, x: float, y: float):
    for parameter in parameters:
        for client in clients.values():
            if parameter.id in client['ids']:
                server.send_message(client, json.dumps({
                    "id": id,
                    "x": x,
                    "y": y,
                }))



do_periodically(1, send_parameters, 100000)

f(parameter, send_func, clints_dist, server)

server.set_fn_new_client(new_client)
server.set_fn_client_left(left_client)
server.set_fn_message_received(message_received)
server.run_forever()