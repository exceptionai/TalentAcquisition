from flask import Flask
<<<<<<< HEAD
 
app = Flask(__name__)

# ConnectionFactory.execute('SELECT * FROM proficiencia')
# resultado = ConnectionFactory.fetchall()

# print(resultado)
=======
from livereload import Server, shell
>>>>>>> 8b8b4193b55a44048df2d041b8347591c085dc43

app = Flask(__name__)

from routes.routes import *

if __name__ == '__main__':
    app.debug = True
    server = Server(app.wsgi_app)
    server.serve()
