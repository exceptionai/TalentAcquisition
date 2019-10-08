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

    def aumentar_pontos(self, pontos):
        query = f'UPDATE candidato SET pontos_consumiveis = pontos_consumiveis + {pontos} WHERE candidato_id = {self.candidato_id}'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid

    def diminuir_pontos(self, pontos):
        query = f'UPDATE candidato SET pontos_consumiveis = pontos_consumiveis - {pontos} WHERE candidato_id = {self.candidato_id}'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid

    def inserir_candidato(self,nome,usuario_id,pontuacao_alcancada_id):
        query = f'INSERT INTO candidato (nome, usuario_id, status_candidatura_id, pontuacao_candidato_id, pontos_consumiveis) VALUES ("{nome}",{usuario_id},1,{pontuacao_alcancada_id},70)'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid

    def inserir_fase_candidato(self, candidato_id,fase_id,status_candidato_fase_id,pontuacao):
        query = f'INSERT INTO candidato_fase (candidato_id,fase_id,status_candidato_fase_id,pontuacao) VALUES ({candidato_id},{fase_id},{status_candidato_fase_id},{pontuacao})'
        ConnectionFactory.execute(query)
    
    def candidatar_vaga(self,vaga_id):
        query = f'INSERT INTO candidato_vaga (candidato_id,vaga_id) VALUES ({self.candidato_id},{vaga_id})'
        ConnectionFactory.execute(query)
    
    def quantidade_candidatos(self):
        query = f'SELECT COUNT(*) FROM candidato'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchone()