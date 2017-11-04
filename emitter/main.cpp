#include <QCoreApplication>
//#include <QSqlDatabase>
#include "myserver.h"

int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);
//    QSqlDatabase db = QSqlDatabase::addDatabase("QMYSQL");
//    db.setHostName("localhost");
//    db.setDatabaseName("mydb");
//    db.setUserName("username");
//    db.setPassword("password");
//    db.open();


    MyServer server;

    return a.exec();
}
