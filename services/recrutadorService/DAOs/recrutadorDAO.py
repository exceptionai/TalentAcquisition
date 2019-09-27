from connections.connectionFactory import ConnectionFactory

class RecrutadorDAO:

    def __init__(self, recrutador_id):
        self.recrutador_id = recrutador_id

    def quantidade_candidatos(self):
        query = f'SELECT COUNT(*) FROM candidato'
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchone()