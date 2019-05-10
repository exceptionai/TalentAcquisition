import nltk

from pontuador import Pontuador
from pontuadorRadicais import PontuadorRadicais


class AnaliseObjetivo:

    def __init__(self, frase, tags):
        self._frase = frase.lower()
        self.palavras = nltk.word_tokenize(self._frase)
        self.pontuador = PontuadorRadicais(0, tags)

    def get_radicais(self, frase):
        radicalizador = nltk.RSLPStemmer()
        radicais = []
        for palavra in frase:
            palavra_minusculo = palavra.lower()
            radical = radicalizador.stem(palavra_minusculo)
            radicais.append(radical)
        return radicais

    def remover_stopwords(self):
        stopwords = nltk.corpus.stopwords.words('portuguese')
        frase = []
        for palavra in self.palavras:
            if palavra not in stopwords:
                frase.append(palavra)
        return frase

    @property
    def pontuacao(self):
        return self.pontuador.pontuar(self.get_radicais(self.remover_stopwords()))

    def treinar(self):
        dados_treino = []
        dados_treino.append({"classe": "programador", "frase": "Eu quero ser um desenvolvedor"})
