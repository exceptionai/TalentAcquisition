import nltk

from analises.analise import Analise
from services.pontuacaoService.pontuadores.pontuadorRadicais import PontuadorRadicais


class AnaliseObjetivo(Analise):

    def __init__(self, frase, tags):
        self.palavras = nltk.word_tokenize(frase.lower())
        self.pontuador = PontuadorRadicais(0, tags, 20, 40)
        super().__init__(tags, self.pontuador, self.palavras)
