from connections.connectionFactory import ConnectionFactory

class idiomaDAO:
    def __init__(self,idioma):
        self.idioma = idioma
    
    def insere(self):
        ConnectionFactory.execute('INSERT INTO idioma (idioma, proeficiencia_id) VALUES ('
        f' {self.idioma.idioma}, {self.proeficiencia.id})')
