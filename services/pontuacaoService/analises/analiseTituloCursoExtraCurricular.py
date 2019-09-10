from nltk import word_tokenize

from services.pontuacaoService.analises.analise import Analise
from services.pontuacaoService.pontuadores.pontuadorRadicais import PontuadorRadicais


class AnaliseTituloCursoExtraCurricular(Analise):

    def __init__(self, titulo, tags):
        titulo_curso_minusculo = titulo.lower()
        self.titulo_palavras = word_tokenize(titulo_curso_minusculo)
        self.pontuador = PontuadorRadicais(0, tags, 10, 0)
        super().__init__(tags, self.pontuador, self.titulo_palavras)
