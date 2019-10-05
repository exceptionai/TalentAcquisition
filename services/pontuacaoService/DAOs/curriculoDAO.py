from connections.connectionFactory import ConnectionFactory

class CurriculoDAO:
    def __init__(self, curriculo):
        self.curriculo = curriculo

    def insere(self,candidato_id):
        salario = self.curriculo.expectativa_salario if self.curriculo.expectativa_salario else "null"
        query = f'REPLACE INTO curriculo (curriculo_id, objetivo_profissional, expectativa_salario, resumo, candidato_id) VALUES (1,"{self.curriculo.objetivo_profissional}", {salario}, "{self.curriculo.resumo}", {candidato_id})'
        
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid

    def insere_curso(self,curso_extracurricular_id):
        ConnectionFactory.execute(f'REPLACE INTO curriculo_curso_extracurricular (curso_extracurricular_id, curriculo_id) VALUES ({curso_extracurricular_id}, {self.curriculo.id})')

    def insere_experiencia(self,experiencia_id):
        ConnectionFactory.execute(f'REPLACE INTO curriculo_experiencia (experiencia_id, curriculo_id) VALUES ({experiencia_id}, {self.curriculo.id})')

    def insere_formacao(self,formacao_id):
        ConnectionFactory.execute(f'REPLACE INTO curriculo_formacao (formacao_id, curriculo_id) VALUES ({formacao_id}, {self.curriculo.id})')

    def insere_idioma(self, idioma_id):
        ConnectionFactory.execute(f'REPLACE INTO curriculo_idioma (idioma_id, curriculo_id) VALUES ({idioma_id}, {self.curriculo.id})')


    def listar(self):
        return []
