from flask import Flask
from livereload import Server, shell

app = Flask(__name__)

from routes.routes import *

if __name__ == '__main__':
    app.debug = True
    server = Server(app.wsgi_app)
    server.serve()
