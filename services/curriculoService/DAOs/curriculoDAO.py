from connections.connectionFactory import ConnectionFactory

class CurriculoDAO:

    def __init__(self, candidato_id = None, curriculo_id = None):
        self.candidato_id = candidato_id
        self.curriculo_id = curriculo_id

    def remover_idiomas(self):
        query = f'DELETE FROM curriculo_idioma WHERE curriculo_id = {self.curriculo_id}'
        ConnectionFactory.execute(query)
        

    def remover_experiencias_anteriores(self):
        query = f'DELETE FROM curriculo_experiencia WHERE curriculo_id = {self.curriculo_id}'
        ConnectionFactory.execute(query)

    def remover_curso_extra_curricular(self):
        query = f'DELETE FROM curriculo_curso_extracurricular WHERE curriculo_id = {self.curriculo_id}'
        ConnectionFactory.execute(query)

    def remover_endereco(self):
        query = f'DELETE FROM curriculo_idioma WHERE curriculo_id = {self.curriculo_id}'
        ConnectionFactory.execute(query)

    def remover(self):
        query = f'DELETE FROM curriculo WHERE curriculo_id = {self.curriculo_id}'
        ConnectionFactory.execute(query)

    def buscar(self):
        query = f'SELECT nome, idade, email, realocar, telefone_residencial, telefone_celular FROM candidato c WHERE c.candidato_id = {self.candidato_id}'
        connection = ConnectionFactory.get_connection()
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(query)
        dados = cursor.fetchone()
        return dados

    def buscar_endereco(self):
        query = f'SELECT uf, cidade, rua, numero, cep FROM endereco e INNER JOIN candidato c ON c.endereco_id = e.endereco_id WHERE c.candidato_id = {self.candidato_id}'
        connection = ConnectionFactory.get_connection()
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(query)
        dados = cursor.fetchone()
        return dados

    def buscar_curso_extra_curricular(self):
        query = f'SELECT * FROM curso_extra_curricular ce INNER JOIN curriculo_curso_extracurricular cce ON cce.curso_extracurricular_id = ce.curso_extra_id INNER JOIN curriculo c ON c.curriculo_id = cce.curriculo_id WHERE c.candidato_id = {self.candidato_id}'
        connection = ConnectionFactory.get_connection()
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(query)
        dados = cursor.fetchone()
        return dados
    
    def buscar_experiencias_anteriores(self):
        query = f'SELECT * FROM experiencia_anterior ea INNER JOIN curriculo_experiencia ce ON ce.experiencia_id = ea.experiencia_id INNER JOIN curriculo c ON ce.curriculo_id = c.curriculo_id WHERE c.candidato_id = {self.candidato_id}'
        connection = ConnectionFactory.get_connection()
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(query)
        dados = cursor.fetchone()
        return dados

    def buscar_formacao_academica(self):
        query = f'SELECT * FROM formacao_academica fa INNER JOIN curriculo_formacao cfa ON cfa.formacao_id = fa.formacao_id INNER JOIN curriculo c ON c.curriculo_id = cfa.curriculo_id WHERE c.candidato_id = {self.candidato_id}'
        connection = ConnectionFactory.get_connection()
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(query)
        dados = cursor.fetchone()
        return dados

    def buscar_idiomas(self):
        query = f'SELECT * FROM idioma i INNER JOIN curriculo_idioma ci ON ci.idioma_id = ci.idioma_id INNER JOIN curriculo c ON c.curriculo_id = ci.curriculo_id WHERE c.candidato_id = {self.candidato_id}'
        connection = ConnectionFactory.get_connection()
        cursor = connection.cursor(dictionary=True,buffered=True)
        cursor.execute(query)
        dados = cursor.fetchone()
        return dados