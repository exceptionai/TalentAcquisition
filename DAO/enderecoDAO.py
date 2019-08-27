from connections.connectionFactory import ConnectionFactory

class EnderecoDAO:
    def __init__(self,endereco):
        self.endereco = endereco
    
    def insere(self):
        ConnectionFactory.execute('INSERT INTO endereco (cep, rua, numero, cidade, uf, realocar) VALUES ('
        f' {self.endereco.cep}, {self.endereco.rua}, {self.endereco.numero}, {self.endereco.cidade}, {self.endereco.uf}, {self.endereco.realocar})')
