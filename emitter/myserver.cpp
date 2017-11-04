#include "myserver.h"

MyServer::MyServer(QObject*):status(false)
{
    server = new QTcpServer();
    connect(server, SIGNAL(newConnection()), this, SLOT(newConnection()));
    if (!server->listen(QHostAddress::Any, 8080) && !status) {
        qDebug() <<  QObject::tr("Unable to start the server: %1.").arg(server->errorString());
    } else {
        status=true;
        qDebug() << server->isListening() << "Server started on" << server->serverAddress().toString() << server->serverPort();
    }
}

void MyServer::newConnection()
{
    while (server->hasPendingConnections()) {
        QHttpConnection *connection =
                new QHttpConnection(m_tcpServer->nextPendingConnection(), this);
        connect(connection, SIGNAL(newRequest(QHttpRequest *, QHttpResponse *)), this,
                SIGNAL(newRequest(QHttpRequest *, QHttpResponse *)));
    }
    if(status){
        qDebug()<<"new connection";
        QTcpSocket* clientSocket=server->nextPendingConnection();
        int idusersocs=clientSocket->socketDescriptor();
        SClients[idusersocs]=clientSocket;
        connect(SClients[idusersocs],SIGNAL(readyRead()),this, SLOT(slotReadClient()));
    }
}

void MyServer::slotReadClient()
{
    QTcpSocket* clientSocket = (QTcpSocket*)sender();
    int idusersocs=clientSocket->socketDescriptor();
    QTextStream os(clientSocket);
    os.setAutoDetectUnicode(true);
    os << "HTTP/1.0 200 Ok\r\n"
          <<"Content-Type: text/html; charset=\"utf-8\"\r\n"
          <<"\r\n"
          <<"<h1>Nothing to see here</h1>\n";
    clientSocket->close();
    SClients.remove(idusersocs);
}
