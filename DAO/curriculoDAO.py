from models.curriculo import Curriculo
from models.cursoExtraCurricular import CursoExtraCurricular


class CurriculoDAO:
    def __init__(self, curriculo):
        self.curriculo = curriculo

    def insere(self):
        return True

    def listar(self):
        return [Curriculo(
            objetivo_profissional='atuar com desenvolvimento em Java',
            cursos_complementares=[],
            email='renan.sanches_123@hotmail.com',
            nome_completo='renan do nascimento sanches',
            endereco='rua123',
            experiencias_anteriores=[],
            idade=22,
            idiomas=[]
        ), Curriculo(
            objetivo_profissional='eu quero ser um desenvolvedor',
            cursos_complementares=[],
            email='chabaris@gmail.com',
            nome_completo='Alisson Chabaribery',
            endereco='rua312',
            experiencias_anteriores=[],
            idade=19,
            idiomas=[]
        ), Curriculo(
            objetivo_profissional='eu quero ser uma programadora Ruby',
            cursos_complementares=[
                CursoExtraCurricular('Curso de desenvolvimento em Java', 'caelum', 100, False, '2018-05-29',
                                     'curso muito bom')
            ],
            email='vanessa.queiroz@hotmail.com',
            nome_completo='Vanessa Cunha Queiroz',
            endereco='rua231',
            experiencias_anteriores=[],
            idade=19,
            idiomas=[]
        ), Curriculo(
            objetivo_profissional='eu quero ver um programa de tv',
            cursos_complementares=[],
            email='gabriel_lopes@gmail.com',
            nome_completo='Gabriel Lopes Pontes',
            endereco='rua3123',
            experiencias_anteriores=[],
            idade=21,
            idiomas=[]
        )]
