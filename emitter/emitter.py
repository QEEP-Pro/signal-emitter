import asyncio
import websockets
from random import random

async def echo(websocket, path):
    async for message in websocket:
        await websocket.send("[{0},{1}]".format(random(),random()))

'''
    def parse(self, data):
        if "refreshData" in str(data):
            pass
        elif "parametersList" in str(data):
            pass
'''
        
if __name__ == "__main__":
    server=websockets.serve(echo, 'localhost', 8004)
    asyncio.get_event_loop().run_until_complete(server)
    asyncio.get_event_loop().run_forever()

