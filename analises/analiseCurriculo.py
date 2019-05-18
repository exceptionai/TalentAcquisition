from analises.analiseCursosExtraCurriculares import AnaliseCursosExtraCurriculares
from analises.analiseObjetivo import AnaliseObjetivo


class AnaliseCurriculo:

    def __init__(self, objetivo, tags, curso_extra_curricular=None):
        self.analiseObjetivo = AnaliseObjetivo(objetivo, tags)
        self.analiseCursosExtraCurriculares = AnaliseCursosExtraCurriculares(curso_extra_curricular, tags)

    @property
    def pontuacao(self):
        return self.analiseObjetivo.pontuacao + \
               self.analiseCursosExtraCurriculares.pontuacao
