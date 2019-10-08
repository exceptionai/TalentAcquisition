from connections.connectionFactory import ConnectionFactory

class DesafioDAO:

    def __init__(self,candidato_id):
        self.candidato_id = candidato_id

    def buscar_categorias(self):
        query = f"SELECT cd.titulo, cd.descricao, (select sum(ac2.desafios_resolvidos) FROM atividade_desafio_candidato ac2 inner join atividade_desafio ad3 on ad3.atividade_desafio_id = ac2.atividade_desafio_id WHERE ad3.categoria_desafio_id = cd.categoria_desafio_id and ac2.candidato_id = {self.candidato_id}),  (select count(a2.atividade_id) from atividade a2 INNER JOIN atividade_desafio ad2 ON ad2.atividade_desafio_id = a2.atividade_desafio_id where ad2.categoria_desafio_id = cd.categoria_desafio_id), (select sum(ac2.pontos_atividade) from atividade_desafio_candidato ac2 where ac2.candidato_id = {self.candidato_id} and ac2.atividade_desafio_id = ad.atividade_desafio_id), (SELECT sum(ad2.pontos) FROM atividade_desafio ad2 WHERE ad2.categoria_desafio_id = ad.categoria_desafio_id) , cd.categoria_desafio_id FROM categoria_desafio cd INNER JOIN candidato_vaga cv ON cv.vaga_id = cd.vaga_id  LEFT JOIN atividade_desafio ad on ad.categoria_desafio_id = cd.categoria_desafio_id LEFT JOIN atividade a ON a.atividade_desafio_id = ad.atividade_desafio_id LEFT JOIN atividade_desafio_candidato ac ON ad.atividade_desafio_id = ac.atividade_desafio_id WHERE cv.candidato_id = {self.candidato_id}  group by cd.categoria_desafio_id "
        ConnectionFactory.execute(query)
        categorias = ConnectionFactory.fetchall()
        return categorias
    
    def buscar_pontos_desafio(self, atividade_desafio_id):
        query = f"SELECT pontos FROM atividade_desafio WHERE atividade_desafio_id = {atividade_desafio_id}"
        ConnectionFactory.execute(query)
        pontos = ConnectionFactory.fetchone()[0]
        return pontos

    def quantidade_atividade(self, atividade_desafio_id):
        query = f"SELECT COUNT(atividade_id) FROM atividade WHERE atividade_desafio_id = {atividade_desafio_id}"
        ConnectionFactory.execute(query)
        quantidade = ConnectionFactory.fetchone()[0]
        return quantidade

    def buscar_resposta_correta(self, atividade_id):
        query = f"SELECT correta FROM resposta_atividade WHERE atividade_id = {atividade_id} and correta = 1"
        ConnectionFactory.execute(query)
        resposta_correta = ConnectionFactory.fetchone()
        if resposta_correta:
            return resposta_correta[0]

    def inserir_resposta(self, atividade_id, resposta_selecionada):
        query = f"INSERT INTO atividade_resolvida_candidato (atividade_id,candidato_id,resposta_atividade_id) VALUES ({atividade_id},{self.candidato_id},{resposta_selecionada})"
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid

    def inserir_atividade_candidato(self,atividade_id,desafios_resolvidos,pontos):
        print(atividade_id)
        query = f"INSERT INTO atividade_desafio_candidato (atividade_desafio_id,candidato_id, desafios_resolvidos,pontos_atividade) VALUES ({atividade_id},{self.candidato_id},{desafios_resolvidos},{pontos})"
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid
        
    def buscar_atividades_categoria(self,categoria_id):
        query = f"SELECT DISTINCT ad.titulo, ad.descricao, (SELECT pontos_atividade from atividade_desafio_candidato adc INNER JOIN atividade_desafio ad2 ON adc.atividade_desafio_id = ad2.atividade_desafio_id WHERE ad2.categoria_desafio_id = ad.categoria_desafio_id and ad2.atividade_desafio_id = ad.atividade_desafio_id and adc.candidato_id = {self.candidato_id} group by ad2.categoria_desafio_id), ad.pontos, ( SELECT adc2.desafios_resolvidos FROM atividade_desafio_candidato adc2 WHERE adc2.candidato_id = {self.candidato_id} AND adc2.atividade_desafio_id = ad.atividade_desafio_id),  (select count(a1.atividade_id) from atividade a1 where a1.atividade_desafio_id = a.atividade_desafio_id), ad.minutos_necessarios, ad.atividade_desafio_id FROM atividade_desafio ad LEFT JOIN atividade a ON a.atividade_desafio_id = ad.atividade_desafio_id LEFT JOIN atividade_desafio_candidato ac ON ac.atividade_desafio_id = ad.atividade_desafio_id WHERE ad.categoria_desafio_id = {categoria_id} group by ad.atividade_desafio_id"
        ConnectionFactory.execute(query)
        atividades_categoria = ConnectionFactory.fetchall()
        return atividades_categoria
    
    def buscar_atividades(self, atividade_desafio_id):
        query = f"SELECT a.titulo, a.descricao, a.atividade_id FROM atividade a WHERE a.atividade_desafio_id = {atividade_desafio_id} "
        ConnectionFactory.execute(query)
        atividades = ConnectionFactory.fetchall()
        return atividades
    
    def buscar_tempo_titulo_atividade_categoria(self,atividade_desafio_id):
        query = f"SELECT minutos_necessarios, titulo FROM atividade_desafio ad WHERE ad.atividade_desafio_id = {atividade_desafio_id} "
        ConnectionFactory.execute(query)
        tempo = ConnectionFactory.fetchone()
        return tempo
    
    def buscar_alternativas(self, atividade_id):
        query = f"SELECT resposta,resposta_atividade_id FROM resposta_atividade WHERE atividade_id = {atividade_id} "
        ConnectionFactory.execute(query)
        alternativas = ConnectionFactory.fetchall() 
        return alternativas
