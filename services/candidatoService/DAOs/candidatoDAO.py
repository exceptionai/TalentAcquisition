from connections.connectionFactory import ConnectionFactory

class CandidatoDAO:

    def __init__(self, candidato_id):
        self.candidato_id = candidato_id

    def buscar_dados_candidato(self):
        query = f'SELECT nome, pontos_consumiveis FROM candidato c WHERE c.candidato_id = {self.candidato_id}'
        print(query)
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

    def buscar_quantidade_potenciais(self):
        query = f'select count(cv.candidato_id) from candidato_vaga cv INNER JOIN vaga v ON v.vaga_id = cv.vaga_id WHERE cv.pontuacao_alcancada >= pontuacao_minima'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchone()[0]

    def buscar_todos_candidatos(self,vaga_id):
        query = f'select c.nome,v.cargo,v.pontuacao_minima, cv.pontuacao_alcancada, sc.descricao,cr.curriculo_id, (select cd2.titulo from categoria_desafio cd2 inner join atividade_desafio ad2 on ad2.categoria_desafio_id = cd2.categoria_desafio_id INNER JOIN atividade_desafio_candidato adc2 ON adc2.atividade_desafio_id = ad2.atividade_desafio_id WHERE adc2.pontos_atividade IS NOT NULL and adc2.pontos_atividade != 0 and adc2.candidato_id = c.candidato_id group by cd2.categoria_desafio_id,adc2.candidato_id ORDER BY adc2.pontos_atividade DESC LIMIT 1) from candidato c INNER join status_candidatura sc on sc.status_candidatura_id = c.status_candidatura_id LEFT JOIN curriculo cr ON cr.candidato_id = c.candidato_id INNER JOIN candidato_vaga cv ON cv.candidato_id = c.candidato_id INNER JOIN vaga v WHERE cv.vaga_id = {vaga_id} GROUP BY c.candidato_id'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchall()

    def buscar_candidatos_potenciais(self):
        query = f'select c.nome,v.cargo,v.pontuacao_minima, cv.pontuacao_alcancada, sc.descricao,cr.curriculo_id, (select cd2.titulo from categoria_desafio cd2 inner join atividade_desafio ad2 on ad2.categoria_desafio_id = cd2.categoria_desafio_id INNER JOIN atividade_desafio_candidato adc2 ON adc2.atividade_desafio_id = ad2.atividade_desafio_id WHERE adc2.pontos_atividade IS NOT NULL and adc2.pontos_atividade != 0 and adc2.candidato_id = c.candidato_id group by cd2.categoria_desafio_id,adc2.candidato_id ORDER BY adc2.pontos_atividade DESC LIMIT 1) from candidato c INNER join status_candidatura sc on sc.status_candidatura_id = c.status_candidatura_id LEFT JOIN curriculo cr ON cr.candidato_id = c.candidato_id INNER JOIN candidato_vaga cv ON cv.candidato_id = c.candidato_id INNER JOIN vaga v WHERE cv.pontuacao_alcancada >= v.pontuacao_minima GROUP BY c.candidato_id'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchall()

    def buscar_candidatos_destaque(self):
        query = f'select c.nome, cv.pontuacao_alcancada, v.cargo, sc.descricao FROM candidato c INNER JOIN candidato_vaga cv ON cv.candidato_id = c.candidato_id INNER JOIN vaga v ON v.vaga_id = cv.vaga_id INNER JOIN status_candidatura sc ON sc.status_candidatura_id = c.status_candidatura_id LIMIT 4'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchall()

    def buscar_candidatos_ultimo_ano(self):
        query = f'select count(candidato_id), created_at from candidato group by MONTH(created_at)'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchall()