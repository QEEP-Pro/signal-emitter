import sqlite3
import socketserver
from random import random


class MyTCPHandler(socketserver.StreamRequestHandler):
    def handle(self):
        data = self.rfile.readline().strip()
        #print("{} wrote:".format(self.client_address[0]))
        self.parse(data)
        response = "[{0},{1}]".format(random(),random())
        self.wfile.write(bytearray(response,'utf8'))

    def parse(self, data):
        if "refreshData" in str(data):
            pass
        elif "parametersList" in str(data):
            pass
            
        
        
if __name__ == "__main__":
    HOST, PORT = "localhost", 80
    server = socketserver.TCPServer((HOST, PORT), MyTCPHandler)
    server.serve_forever()
