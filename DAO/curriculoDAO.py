from models.curriculo import Curriculo
from models.cursoExtraCurricular import CursoExtraCurricular
from connections.connectionFactory import ConnectionFactory

class CurriculoDAO:
    def __init__(self, curriculo):
        self.curriculo = curriculo

    def insere(self):
        ConnectionFactory.execute('INSERT INTO curriculo (objetivo_profissional, expectativa_salario, resumo, candidato_id) VALUES ('
            f'{self.curriculo.objetivo_profissional}, {self.curriculo.expectativa_salario}, {self.curriculo.resumo}, {self.curriculo.candidato.id})')

    def insere_curso(self,curso_extracurricular_id):
        ConnectionFactory.execute('INSERT INTO curriculo_curso_extracurricular (curso_extracurricular_id, curriculo_id) VALUES ('
            f'{curso_extracurricular_id}, {self.curriculo.id})')

    def insere_experiencia(self,experiencia_id):
        ConnectionFactory.execute('INSERT INTO curriculo_experiencia (experiencia_id, curriculo_id) VALUES ('
            f'{experiencia_id}, {self.curriculo.id})')

    def insere_formacao(self,formacao_id):
        ConnectionFactory.execute('INSERT INTO curriculo_formacao (formacao, curriculo_id) VALUES ('
            f'{formacao}, {self.curriculo.id})')

    def insere_idioma(self, idioma):
        ConnectionFactory.execute('INSERT INTO curriculo_idioma (idioma, curriculo_id) VALUES ('
            f'{idioma}, {self.curriculo.id})')


    def listar(self):
        return []
