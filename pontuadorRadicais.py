from pontuador import Pontuador
import nltk


class PontuadorRadicais(Pontuador):

    def __init(self, pontos, palavra_chave):
        super().__init__(pontos, palavra_chave)

    def pontuar(self, radicais_lista):
        lista_radicais_palavras = []
        self._adiciona_pontos_radicais(radicais_lista, lista_radicais_palavras)
        self._diminui_por_nao_existentes(radicais_lista, lista_radicais_palavras)
        return self.pontos

    def _adiciona_pontos_radicais(self, radicais_lista, lista_radicais_palavras):
        for palavra in self.palavras_chaves:
            radical_palavra_chave = self._get_radical(palavra['texto'])
            lista_radicais_palavras.append(radical_palavra_chave)

            sinonimos = palavra['sinonimos']
            self._adiciona_radicais_sinonimos(lista_radicais_palavras, sinonimos)

            if (radical_palavra_chave in radicais_lista) or (self._radicais_chaves_em_sinonimos(radicais_lista, sinonimos)):
                self.pontos += 20 * palavra['relevancia']

    def _diminui_por_nao_existentes(self, radicais_lista, lista_radicais_palavras):
        for radical in radicais_lista:
            if radical not in lista_radicais_palavras:
                self.pontos -= 40

    def _adiciona_radicais_sinonimos(self, radicais_lista, sinonimos):
        for sinonimo in sinonimos:
            radical_sinonimo = self._get_radical(sinonimo)
            radicais_lista.append(radical_sinonimo)

    def _radicais_chaves_em_sinonimos(self, radicais, sinonimos):
        for sinonimo in sinonimos:
            radical_sinonimo = self._get_radical(sinonimo)
            if radical_sinonimo in radicais:
                return True
        return False

    def radicais_na_lista(self, list_palavras, radicais):
        for radical in radicais:
            for palavra in list_palavras:
                radical_palavra = self._get_radical(palavra)
                if radical == radical_palavra:
                    return True
        return False

    def _get_radical(self, palavra):
        # Objeto para pegar os radicais
        radicalizador = nltk.RSLPStemmer()
        radical = radicalizador.stem(palavra)

        return radical
