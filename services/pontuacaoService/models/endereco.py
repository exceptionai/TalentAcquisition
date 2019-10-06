class Endereco:
    def __init__(self, cep, rua, numero, cidade, uf, realocar = None):
        self.cep = cep
        self.rua = rua
        self.numero = numero
        self.cidade = cidade
        self.uf = uf
        self.realocar = realocar
    
    