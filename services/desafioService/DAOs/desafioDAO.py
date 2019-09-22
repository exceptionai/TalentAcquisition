from connections.connectionFactory import ConnectionFactory

class DesafioDAO:

    def __init__(self,candidato_id):
        self.candidato_id = candidato_id

    def buscar_categorias(self):
        query = f"SELECT cd.titulo, cd.descricao, (select sum(ac2.desafios_resolvidos) FROM atividade_candidato ac2 WHERE ac2.atividade_id = ac.atividade_id),  count(a.atividade_id), sum(ac.pontos_atividade), (SELECT sum(ad2.pontos) FROM atividade_desafio ad2 WHERE ad2.categoria_desafio_id = ad.categoria_desafio_id) , cd.categoria_desafio_id FROM categoria_desafio cd INNER JOIN candidato_vaga cv ON cv.vaga_id = cd.vaga_id  LEFT JOIN atividade_desafio ad on ad.categoria_desafio_id = cd.categoria_desafio_id LEFT JOIN atividade a ON a.atividade_desafio_id = ad.atividade_desafio_id LEFT JOIN atividade_candidato ac ON a.atividade_id = ac.atividade_id WHERE cv.candidato_id = {self.candidato_id}  group by cd.categoria_desafio_id "
        ConnectionFactory.execute(query)
        categorias = ConnectionFactory.fetchall()
        return categorias
    
    def buscar_atividades_categoria(self,categoria_id):
        query = f"SELECT DISTINCT ad.titulo, ad.descricao, ac.pontos_atividade, ad.pontos, ac.desafios_resolvidos,  (select count(a1.atividade_id) from atividade a1 where a1.atividade_desafio_id = a.atividade_desafio_id), ad.minutos_necessarios, ad.atividade_desafio_id FROM atividade_desafio ad INNER JOIN atividade a ON a.atividade_desafio_id = ad.atividade_desafio_id LEFT JOIN atividade_candidato ac ON ac.atividade_id = a.atividade_id WHERE ad.categoria_desafio_id = {categoria_id} "
        print(query)
        ConnectionFactory.execute(query)
        atividades_categoria = ConnectionFactory.fetchall()
        return atividades_categoria