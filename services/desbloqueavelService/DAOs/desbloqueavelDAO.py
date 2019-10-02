from connections.connectionFactory import ConnectionFactory

class DesbloqueavelDAO:
    
    def __init__(self, candidato_id):
        self.candidato_id = candidato_id

    def buscar_desbloqueavel(self):
        query = f"SELECT d.descricao, d.pontos_minimos, td.descricao, d.valor, d.desbloqueavel_id FROM desbloqueavel d LEFT JOIN tipo_desbloqueavel td ON d.tipo_desbloqueavel_id = td.tipo_desbloqueavel_id"
        ConnectionFactory.execute(query)
        desbloqueaveis = ConnectionFactory.fetchall()
        return desbloqueaveis
    
    def buscar_desbloqueavel_candidato(self,desbloqueavel_id):
        query = f"SELECT 1, (select 1 FROM candidato c WHERE c.candidato_id = {self.candidato_id} AND c.desbloqueavel_selecionado = {desbloqueavel_id})  FROM desbloqueavel_candidato dc where dc.candidato_id = {self.candidato_id} AND dc.desbloqueavel_id = {desbloqueavel_id}"
        print(query)
        ConnectionFactory.execute(query)
        desbloqueaveis = ConnectionFactory.fetchone()
        return desbloqueaveis
    

    def buscar_desbloqueaveis_candidato(self):
        query = f"SELECT d.desbloqueavel_id, td.descricao, d.valor FROM candidato c LEFT JOIN desbloqueavel d ON d.desbloqueavel_id = c.desbloqueavel_selecionado LEFT JOIN tipo_desbloqueavel td ON d.tipo_desbloqueavel_id = td.tipo_desbloqueavel_id WHERE c.candidato_id = {self.candidato_id}"
        ConnectionFactory.execute(query)
        desbloqueaveis = ConnectionFactory.fetchone()
        return desbloqueaveis

    def obter_desbloqueavel(self, desbloqueavel_id):
        query = f"INSERT INTO desbloqueavel_candidato (desbloqueavel_id,candidato_id) VALUES ({desbloqueavel_id}, {self.candidato_id}) "
        ConnectionFactory.execute(query)

    def selecionar_desbloqueavel_candidato(self, desbloqueavel_id):
        query = f"UPDATE candidato SET desbloqueavel_selecionado = {desbloqueavel_id} WHERE candidato_id = {self.candidato_id} "
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid