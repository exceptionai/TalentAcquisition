from abc import ABC, abstractmethod


class Pontuador(ABC):

    # As palavras chaves são as palavras que o avaliador irá adicionar para classificar o texto
    def __init__(self, pontos, palavras_chaves):
        self.pontos = pontos
        self.palavras_chaves = palavras_chaves

    @abstractmethod
    def pontuar(self):
        pass
