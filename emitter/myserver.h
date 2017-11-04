#ifndef MYSERVER_H
#define MYSERVER_H
#include <QTcpServer>
#include <QTcpSocket>
#include <QMap>

class MyServer:public QObject
{
    Q_OBJECT
public:
    MyServer(QObject *parent = Q_NULLPTR);
public slots:
    void newConnection();
    void slotReadClient();
protected:
    QTcpServer * server;
    bool status;
    QMap<int,QTcpSocket*> SClients;
};

#endif // MYSERVER_H
