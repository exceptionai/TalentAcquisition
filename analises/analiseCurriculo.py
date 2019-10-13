from analises.AnaliseCandidato import AnaliseCandidato
from analises.analiseCursosExtraCurriculares import AnaliseCursosExtraCurriculares
from analises.analiseObjetivo import AnaliseObjetivo


class AnaliseCurriculo:

    def __init__(self, curriculo, vaga):
        self.analiseObjetivo = AnaliseObjetivo(curriculo.objetivo_profissional, vaga.tags)
        self.analiseCursosExtraCurriculares = AnaliseCursosExtraCurriculares(curriculo.cursos_extracurriculares, vaga.tags)
        self.analiseCandidato = AnaliseCandidato(curriculo, vaga)


    @property
    def pontuacao(self):
        print('objetivo', self.analiseObjetivo.pontuacao)
        print('analiseCursosExtraCurriculares', self.analiseCursosExtraCurriculares.pontuacao)
        print('analiseCandidato', self.analiseCandidato.pontuacao)

        return self.analiseObjetivo.pontuacao + \
               self.analiseCursosExtraCurriculares.pontuacao + \
               self.analiseCandidato.pontuacao
