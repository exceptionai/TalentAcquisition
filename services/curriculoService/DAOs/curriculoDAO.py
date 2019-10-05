from connections.connectionFactory import ConnectionFactory

class CurriculoDAO:

    def __init__(self, candidato_id = None):
        self.candidato_id = candidato_id

    def buscar(self):
        query = f'SELECT nome, idade, email, realocar, telefone_residencial, telefone_celular FROM candidato c WHERE c.candidato_id = {self.candidato_id}'
        connection = ConnectionFactory.get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        dados = cursor.fetchone()
        return dados

    def buscarEndereco(self):
        query = f'SELECT uf, cidade, rua, numero, cep FROM endereco e INNER JOIN candidato c ON c.endereco_id = e.endereco_id WHERE c.candidato_id = {self.candidato_id}'
        connection = ConnectionFactory.get_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        dados = cursor.fetchone()
        return dados