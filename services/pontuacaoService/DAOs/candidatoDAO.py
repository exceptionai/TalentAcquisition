from connections.connectionFactory import ConnectionFactory

class CandidatoDAO:
    def __init__(self, candidato):
        self.candidato = candidato
    
    def insere(self,endereco_id,realocar,candidato_id):
        telefone_residencial = self.candidato.telefone_residencial if self.candidato.telefone_residencial else "null"
        telefone_celular = self.candidato.telefone_celular if self.candidato.telefone_celular else "null"
        query = f'UPDATE candidato SET idade= {self.candidato.idade}, email = "{self.candidato.email}", nome = "{self.candidato.nome}", endereco_id = {endereco_id}, telefone_residencial = {telefone_residencial}, telefone_celular = {telefone_celular}, realocar = {realocar} WHERE candidato_id = {candidato_id}'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid