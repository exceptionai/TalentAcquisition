from connections.connectionFactory import ConnectionFactory

class idiomaDAO:
    def __init__(self,idioma):
        self.idioma = idioma
    
    def insere(self):
        ConnectionFactory.execute('INSERT INTO idioma (idioma) VALUES ('
        f' {self.idioma.idioma})')

    def insere_proeficiencia(self, proeficiencia_id):
        ConnectionFactory.execute('INSERT INTO proficiencia_idioma (idioma_id, proeficiencia_id) VALUES ('
        f' {self.idioma.idioma_id}, "{proeficiencia_id}")')