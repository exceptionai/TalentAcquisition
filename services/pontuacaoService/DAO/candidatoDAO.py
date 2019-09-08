from connections.connectionFactory import ConnectionFactory

class CandidatoDAO:
    def __init__(self, candidato):
        self.candidato = candidato
    
    def insere(self,endereco_id):
        telefone_residencial = self.candidato.telefone_residencial if self.candidato.telefone_residencial else "null"
        telefone_celular = self.candidato.telefone_celular if self.candidato.telefone_celular else "null"
        query = f'INSERT INTO candidato (nome, ìdade, endereco_id, telefone_residencial, telefone_celular) VALUES ( "{self.candidato.nome}", {self.candidato.idade}, {endereco_id}, {telefone_residencial}, {telefone_celular})'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid