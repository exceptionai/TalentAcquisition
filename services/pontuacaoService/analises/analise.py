from abc import ABC

from nltk import RSLPStemmer, corpus


class Analise(ABC):

    def __init__(self, tags, pontuador, palavras_list):
        self.tags = tags
        self.pontuador = pontuador
        self.palavras_list = palavras_list

    def get_radicais(self, frase):
        radicalizador = RSLPStemmer()
        radicais = []
        for palavra in frase:
            palavra_minusculo = palavra.lower()
            radical = radicalizador.stem(palavra_minusculo)
            radicais.append(radical)
        return radicais

    def remover_stopwords(self):
        stopwords = corpus.stopwords.words('portuguese')
        frase = []
        for palavra in self.palavras_list:
            if palavra not in stopwords:
                frase.append(palavra)
        return frase

    @property
    def pontuacao(self):
        radicais = self.get_radicais(self.remover_stopwords())
        return self.pontuador.pontuar(radicais)
