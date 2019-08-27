from connections.connectionFactory import ConnectionFactory

class ProficienciaDAO:
    def __init__(self,proficiencia):
        self.proficiencia = proficiencia

    def insere(self):
        query = f'INSERT INTO proficiencia (nivel_fala, nivel_leitura, nivel_escrita) VALUES ("{self.proficiencia.nivel_fala}", "{self.proficiencia.nivel_leitura}", "{self.proficiencia.nivel_escrita}")'
        ConnectionFactory.execute(query)