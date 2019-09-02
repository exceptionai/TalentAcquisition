from flask import Flask
from connections.connectionFactory import ConnectionFactory
from DAO.proficienciaDAO import ProficienciaDAO
from models.proeficiencia import Proeficiencia
 
app = Flask(__name__)

proeficiencia = Proeficiencia('baixo','alto','baixo')

dao = ProficienciaDAO(proeficiencia)

dao.insere()
# ConnectionFactory.execute('SELECT * FROM proficiencia')
# resultado = ConnectionFactory.fetchall()

# print(resultado)


from routes import *


if __name__ == '__main__':
    from livereload import Server, shell
    app.debug = True
    server = Server(app.wsgi_app)
    server.serve()
