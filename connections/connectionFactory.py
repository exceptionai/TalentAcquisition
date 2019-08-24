import mysql.connector as msql

class ConnectionFactory:
    _connection = None
    _cursor = None

    @classmethod
    def get_connection(cls,database='bayerchallenge',user='root',password='password'):
        if cls._connection is None:
            cls._connection = msql.connect(user=user,password=password,database=database)
        return cls._connection
    
    @classmethod
    def get_cursor(cls):
        if cls._cursor is None:
            cls._cursor = cls.get_connection().cursor()
        return cls._cursor
    
    @classmethod
    def execute(cls,query):
        return cls.get_cursor().execute(query)

    @classmethod
    def fetchall(cls):
        return cls.get_cursor().fetchall()
