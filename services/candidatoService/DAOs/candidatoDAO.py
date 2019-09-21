from connections.connectionFactory import ConnectionFactory

class CandidatoDAO:

    def __init__(self, candidato_id):
        self.candidato_id = candidato_id

    def buscar_dados_candidato(self):
        query = f'SELECT nome, pontos_consumiveis FROM candidato c WHERE c.candidato_id = {self.candidato_id}'
        ConnectionFactory.execute(query)
        dados = ConnectionFactory.fetchone()
        return dados
    
    def buscar_pontuacao(self):
        query = f'SELECT pl.pontuacao_maxima, pc.pontuacao_alcancada, pl.level FROM pontuacao_candidato pc INNER JOIN pontuacao_level pl ON pl.pontuacao_level_id = pc.pontuacao_level_id INNER JOIN candidato c ON c.pontuacao_candidato_id = pc.pontuacao_candidato_id WHERE c.candidato_id = {self.candidato_id}'
        ConnectionFactory.execute(query)
        pontuacao = ConnectionFactory.fetchone()
        return pontuacao
