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
        query = f"SELECT dc.selecionado, dc.desbloqueavel_id FROM desbloqueavel_candidato dc where dc.desbloqueavel_id = {desbloqueavel_id} and dc.candidato_id = {self.candidato_id} "
        ConnectionFactory.execute(query)
        desbloqueaveis = ConnectionFactory.fetchone()
        return desbloqueaveis
    

    def buscar_desbloqueaveis_candidato(self):
        query = f"SELECT dc.desbloqueavel_id, td.descricao, d.valor FROM desbloqueavel_candidato dc LEFT JOIN desbloqueavel d ON d.desbloqueavel_id = dc.desbloqueavel_id LEFT JOIN tipo_desbloqueavel td ON d.tipo_desbloqueavel_id = td.tipo_desbloqueavel_id WHERE dc.candidato_id = {self.candidato_id} AND dc.selecionado = 1"
        ConnectionFactory.execute(query)
        desbloqueaveis = ConnectionFactory.fetchone()
        return desbloqueaveis
    
    def remover_selecao_desbloqueavel_candidato(self):
        query = f"UPDATE desbloqueavel_candidato dc SET dc.selecionado = 0"
        ConnectionFactory.execute(query)
    
    def selecionar_desbloqueavel_candidato(self, desbloqueavel_id):
        query = f"INSERT INTO desbloqueavel_candidato (candidato_id, desbloqueavel_id, selecionado) VALUES ({self.candidato_id},{desbloqueavel_id},1) ON DUPLICATE KEY UPDATE selecionado = 1"
        print(query)
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid