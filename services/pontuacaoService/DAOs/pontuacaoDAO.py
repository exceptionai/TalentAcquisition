from connections.connectionFactory import ConnectionFactory

class PontuacaoDAO:
    def inserir_pontuacao_candidato(self, pontuacao_alcancada,pontuacao_level_id):
        query = f'INSERT INTO pontuacao_candidato (pontuacao_alcancada,pontuacao_level_id) VALUES ("{pontuacao_alcancada}","{pontuacao_level_id}")'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid
    
    def buscar_level(self,pontuacao):
        query = f'SELECT pontuacao_level_id FROM pontuacao_level WHERE pontuacao_maxima > {pontuacao} ORDER BY pontuacao_maxima ASC LIMIT 1'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchone()

    def inserir_historico(self,pontos, data, candidato_id):
        query = f'INSERT INTO historico_pontuacao (pontos, data, candidato_id) VALUES ({pontos}, {data}, {candidato_id})'
        print(query)
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid