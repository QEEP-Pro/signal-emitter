import asyncio
import websockets
from random import random

'''
    db: {
        host     : 'localhost',
        user     : 'admin',
        password : 'admin',
        database : 'digital-hack'
    },
    port: 3002,
'''

connection = dict()
_id=0

async def handler(websocket, path):
    global _id
    _id+=1
    global connection
    connection[websocket]=_id
    print(path)
    try:
        if path=="/api/refreshData":
            pass
        elif path=="/api/parametersList":
            await websocket.send("[\"name\":,\"laws\":]")
            lawsIdList=await websocket.recv()
            print(lawsIdList)
        else:
            while len(connection)>0:
                x,y=random(),random()
                await asyncio.wait([ws.send("[\"id\":{},\"x\":{},\"y\":{}]".format(connection[ws],x,y)) for ws in connection])
                await asyncio.sleep(random())
    finally:
        connection.pop(websocket,None)


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    server=asyncio.ensure_future(websockets.serve(handler, 'localhost', 8004))
    try:
        #loop.run_until_complete(server)
        loop.run_forever()
        loop.close()
    except:
        print("exception consumed")
