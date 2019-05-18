from analises.analiseTituloCursoExtraCurricular import AnaliseTituloCursoExtraCurricular


class AnaliseCursosExtraCurriculares:
    def __init__(self, lista_cursos, tags):
        self._lista_cursos = lista_cursos
        self._tags = tags

    def pontuar_titulos(self):
        pontuacao = 0
        for curso in self._lista_cursos:
            analise_titulo = AnaliseTituloCursoExtraCurricular(curso["titulo"], self._tags)
            pontuacao += analise_titulo.pontuacao
        return pontuacao

    @property
    def pontuacao(self):
        return self.pontuar_titulos()


