from connections.connectionFactory import ConnectionFactory

class EnderecoDAO:
    def __init__(self,endereco):
        self.endereco = endereco
    
    def insere(self):
        query = f'INSERT INTO endereco (cep, rua, numero, cidade, uf) VALUES ( "{self.endereco.cep}", "{self.endereco.rua}", {self.endereco.numero}, "{self.endereco.cidade}", "{self.endereco.uf}")'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid