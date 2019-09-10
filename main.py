from flask import Flask
 
app = Flask(__name__)

# ConnectionFactory.execute('SELECT * FROM proficiencia')
# resultado = ConnectionFactory.fetchall()

# print(resultado)


from routes import *

if __name__ == '__main__':
    from livereload import Server, shell
    app.debug = True
    server = Server(app.wsgi_app)
    server.serve()
