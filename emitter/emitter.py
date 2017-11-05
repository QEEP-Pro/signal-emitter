import asyncio
import websockets
from random import random
import pymysql.cursors


connection = dict()
parameters = None
conn_db = None

_id=0

async def consumer_handler(websocket, path):
    while True:
        message = await websocket.recv()
        print(message)

async def producer_handler(websocket, path):
        message = "\"id\":1,\"name\":2,\"period\":3,\"min\":4,\"max\":5,\"mean\":6,\"unit\":7,\"noise\":8,\"dispersion\":9,\"law_id\":0"
        await websocket.send(message)


async def handler(websocket, path):
    global _id
    global parameters
    global connection
    global conn_db
    _id+=1
    connection[websocket]=_id
    print(path)
    try:
        if path=="/api/refreshData":
            with conn_db.cursor() as cursor:
                cursor.execute("SELECT * FROM `parameters`")
                parameters = cursor.fetchall()
                print(parameters)
        elif path=="/api/parametersList":
            consumer_task = asyncio.ensure_future(consumer_handler(websocket,path))
            producer_task = asyncio.ensure_future(producer_handler(websocket,path))
            done, pending = await asyncio.wait([consumer_task, producer_task],return_when=asyncio.FIRST_COMPLETED)

            for task in pending:
                task.cancel()
            print("ololo")
            #idParametersList = await websocket.recv()
            #await websocket.send("[\"name\":,\"laws\":]")
            #print(idParametersList)
        else:
            while len(connection)>0:
                x,y=random(),random()
                await asyncio.wait([ws.send("[\"id\":{},\"x\":{},\"y\":{}]".format(connection[ws],x,y)) for ws in connection])
                await asyncio.sleep(random())
    finally:
        connection.pop(websocket,None)


if __name__ == "__main__":
    conn_db = pymysql.connect(host='localhost',user='root',password='pasS0511',db='digital-hack',charset='utf8',cursorclass=pymysql.cursors.DictCursor)
    try:
        with conn_db.cursor() as cursor:
            cursor.execute("SELECT * FROM `parameters`")
            parameters = cursor.fetchall()
            print(parameters)

        loop = asyncio.get_event_loop()
        server=asyncio.ensure_future(websockets.serve(handler, 'localhost', 8004))
        try:
            #loop.run_until_complete(server)
            loop.run_forever()
            loop.close()
        except:
            print("exception consumed")
    finally:
        conn_db.close()


