from connections.connectionFactory import ConnectionFactory

class CandidatoDAO:
    def __init__(self, candidato):
        self.candidato = candidato
    
    def insere(self):
        ConnectionFactory.execute('INSERT INTO candidato (nome, idade, endereco_id, telefone_residencial, telefone_celular) VALUES ('
            f' {self.candidato.nome}, {self.candidato.idade}, {self.candidato.endereco.id}, {self.candidato.telefone_residencial}, {self.candidato.telefone_celular})')
