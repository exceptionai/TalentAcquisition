from connections.connectionFactory import ConnectionFactory

class VagaDAO:

    def buscar_resumo_vagas(self):
        query = "SELECT v.cargo, v.area_atuacao, e.cidade, v.created_at,v.vaga_id FROM vaga v INNER JOIN endereco e on e.endereco_id = v.endereco_id"
        ConnectionFactory.execute(query)
        vagas = ConnectionFactory.fetchall()
        return vagas
    
    def buscar_vagas_recrutador(self):
        query = "SELECT v.cargo, COUNT(cv.candidato_id),(SELECT COUNT(cv2.candidato_id) from candidato_vaga cv2 WHERE cv2.vaga_id = v.vaga_id AND cv2.pontuacao_alcancada > v.pontuacao_minima ), f.descricao, v.created_at, v.vaga_id FROM vaga v LEFT JOIN candidato_vaga cv ON cv.vaga_id = v.vaga_id LEFT JOIN fase f ON f.fase_id = v.fase_id group by v.vaga_id"
        ConnectionFactory.execute(query)
        vagas = ConnectionFactory.fetchall()
        return vagas
    
    def quantidade(self):
        query = "SELECT COUNT(vaga_id),count(2) FROM vaga"
        ConnectionFactory.execute(query)
        quantidade = ConnectionFactory.fetchone()
        return quantidade
