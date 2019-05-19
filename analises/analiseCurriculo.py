from analises.analiseCursosExtraCurriculares import AnaliseCursosExtraCurriculares
from analises.analiseObjetivo import AnaliseObjetivo


class AnaliseCurriculo:

    def __init__(self, curriculo, tags):
        self.analiseObjetivo = AnaliseObjetivo(curriculo.objetivo_profissional, tags)
        self.analiseCursosExtraCurriculares = AnaliseCursosExtraCurriculares(curriculo.cursos_complementares, tags)

    @property
    def pontuacao(self):
        return self.analiseObjetivo.pontuacao + \
               self.analiseCursosExtraCurriculares.pontuacao
