from connections.connectionFactory import ConnectionFactory

class CandidatoDAO:
    def __init__(self, candidato):
        self.candidato = candidato
    
    def insere(self,endereco_id,realocar):
        telefone_residencial = self.candidato.telefone_residencial if self.candidato.telefone_residencial else "null"
        telefone_celular = self.candidato.telefone_celular if self.candidato.telefone_celular else "null"
        query = f'REPLACE INTO candidato (usuario_id, candidato_id, nome, endereco_id, telefone_residencial, telefone_celular, realocar) VALUES (1, 1, "{self.candidato.nome}", {endereco_id}, {telefone_residencial}, {telefone_celular}, {realocar})'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid