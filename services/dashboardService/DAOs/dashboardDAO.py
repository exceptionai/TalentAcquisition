from connections.connectionFactory import ConnectionFactory

class DashboardDAO:
    def busca_fases(self,candidato_id):
        query = f'SELECT f.descricao, scf.descricao, cf.pontuacao,data_inicial,data_final FROM fase f INNER JOIN candidato_fase cf ON cf.fase_id = f.fase_id LEFT JOIN status_candidato_fase scf ON scf.status_candidato_fase_id = cf.status_candidato_fase_id WHERE cf.candidato_id = {candidato_id}'
        ConnectionFactory.execute(query)
        fase = ConnectionFactory.fetchall()

        return fase
    
    def busca_candidatura(self,candidato_id):
        query = f'SELECT descricao FROM status_candidatura sc INNER JOIN candidato c ON sc.status_candidatura_id = c.status_candidatura_id WHERE c.candidato_id = {candidato_id}'
        ConnectionFactory.execute(query)
        candidatura = ConnectionFactory.fetchone()
        return candidatura
    
    def busca_desempenho(self, candidato_id, data_inicial, data_final):
        query = f'select sum(pontos), data from historico_pontuacao where candidato_id = {candidato_id} AND data BETWEEN "{data_inicial}" AND "{data_final}" GROUP BY data ORDER BY data asc'
        print(query)
        ConnectionFactory.execute(query)
        desempenho_dias = ConnectionFactory.fetchall()
        return desempenho_dias
    
    def busca_evolucao(self, candidato_id, data_final, data_inicial):
        if data_inicial:
            query = f'SELECT p.data, (select sum(pontos) from historico_pontuacao p1 INNER JOIN candidato c ON p1.candidato_id = c.candidato_id  WHERE c.candidato_id = {candidato_id} and p.data >= "{data_inicial}" and p.data <= "{data_final}") FROM historico_pontuacao p INNER JOIN candidato c ON p.candidato_id = c.candidato_id  WHERE c.candidato_id = {candidato_id} and p.data BETWEEN "{data_inicial}" and "{data_final}" GROUP BY p.data order by p.data asc '
        else:
            query = f'SELECT p.data, (select sum(pontos) from historico_pontuacao p1 INNER JOIN candidato c ON p1.candidato_id = c.candidato_id  WHERE c.candidato_id = {candidato_id} and p1.data <=  p.data) FROM historico_pontuacao p INNER JOIN candidato c ON p.candidato_id = c.candidato_id  WHERE c.candidato_id = {candidato_id} and p.data BETWEEN "{data_inicial}" and "{data_final}" GROUP BY p.data order by p.data asc '
        ConnectionFactory.execute(query)
        dados_evolucao = ConnectionFactory.fetchall()
        return dados_evolucao