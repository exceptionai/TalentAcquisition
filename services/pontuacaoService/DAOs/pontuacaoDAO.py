from connections.connectionFactory import ConnectionFactory

class PontuacaoDAO:

    def __init__(self, candidato_id = None):
        self.candidatoID = candidato_id

    def inserir_pontuacao_candidato(self, pontuacao_alcancada,pontuacao_level_id):
        query = f'INSERT INTO pontuacao_candidato (pontuacao_alcancada,pontuacao_level_id) VALUES ("{pontuacao_alcancada}","{pontuacao_level_id}")'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid
    
    def aumentar_pontuacao_canditado(self, pontuacao_alcancada,pontuacao_level_id):
        query = f'UPDATE pontuacao_candidato pc SET pontuacao_alcancada = pontuacao_alcancada + {pontuacao_alcancada},pontuacao_level_id = {pontuacao_level_id} INNER JOIN candidato c ON c.pontuacao_candidato_id = pc.pontuacao_candidato_id WHERE c.candidato_id = {self.candidatoID}'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid

    def buscar_level(self,pontuacao):
        query = f'SELECT pontuacao_level_id FROM pontuacao_level WHERE pontuacao_maxima > {pontuacao} ORDER BY pontuacao_maxima ASC LIMIT 1'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchone()

    def buscar_level_soma(self,pontos):
        query = f'SELECT pontuacao_level_id FROM pontuacao_level WHERE pontuacao_maxima > (select pontuacao_alcancada from pontuacao_candidato pc INNER JOIN candidato c ON pc.pontuacao_candidato_id = c.pontuacao_candidato_id WHERE c.candidato_id = {self.candidato_id} ) + {pontos} ORDER BY pontuacao_maxima ASC LIMIT 1'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchone()

    def inserir_historico(self,pontos, data, candidato_id):
        query = f'INSERT INTO historico_pontuacao (pontos, data, candidato_id) VALUES ({pontos}, {data}, {candidato_id})'
        print(query)
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid