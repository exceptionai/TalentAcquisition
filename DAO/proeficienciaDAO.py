from connections.connectionFactory import ConnectionFactory

class ProeficienciaDAO:
    def __init__(self,proeficiencia):
        self.proeficiencia = proeficiencia

    def insere(self):
        query = f'INSERT INTO proficiencia_idioma (nivel_fala, nivel_leitura, nivel_escrita) VALUES ( "{self.proeficiencia.nivel_fala}", "{self.proeficiencia.nivel_leitura}", "{self.proeficiencia.nivel_escrita}")'
        ConnectionFactory.execute(query)
