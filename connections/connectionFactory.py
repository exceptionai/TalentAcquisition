import mysql.connector as msql

class ConnectionFactory:
    _connection = None
    _cursor = None

    @classmethod
    def get_connection(cls,database='bayerchallenge',user='root',password='Voip_Nexus1'):
        if cls._connection is None:
            cls._connection = msql.connect(user=user,password=password,database=database)
        return cls._connection
    
    @classmethod
    def close_connection(cls):
        cls._connection.close()
        cls._connection = None
        cls._cursor = None

    @classmethod
    def get_cursor(cls):
        if cls._cursor is None:
            cls._cursor = cls.get_connection().cursor(buffered=True)
        return cls._cursor
    
    @classmethod
    def execute(cls,query):
        result = cls.get_cursor().execute(query)
        cls.get_connection().commit()
        return result
           

    @classmethod
    def fetchall(cls):
        return cls.get_cursor().fetchall()

    @classmethod
    def fetchone(cls):
        return cls.get_cursor().fetchone()
