from connections.connectionFactory import ConnectionFactory

class VagaDAO:

    def buscar_resumo_vagas(self):
        query = "SELECT v.cargo, v.area_atuacao, e.cidade, v.created_at FROM vaga v INNER JOIN endereco e on e.endereco_id = v.endereco_id"
        ConnectionFactory.execute(query)
        vagas = ConnectionFactory.fetchall()
        return vagas