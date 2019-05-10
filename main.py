import nltk

from analiseCurriculo import AnaliseCurriculo

tags = [{"texto": 'desenvolvedor', "relevancia": 7, "sinonimos": ["programador", "codificador"]},
        {"texto": 'software', "relevancia": 5, "sinonimos": []},
        {"texto": 'java', "relevancia": 10, "sinonimos": []}]

renan = AnaliseCurriculo('desenvolvedor ruby', tags)
alisson = AnaliseCurriculo('eu quero ser um desenvolvedor', tags)
vanessa = AnaliseCurriculo('eu quero ser uma programadora Ruby', tags)
lopes = AnaliseCurriculo('eu quero ver um programa de tv', tags)  # ponto de "falha"

print(f"Renan: {renan.analiseObjetivo.pontuacao} pontos")
print(f"Alisson: {alisson.analiseObjetivo.pontuacao} pontos")
print(f"Vanessa: {vanessa.analiseObjetivo.pontuacao} pontos")
print(f"lopes: {lopes.analiseObjetivo.pontuacao} pontos")

# testes
#print(nltk.pos_tag(vanessa.analiseObjetivo.palavras))
#print('\n')
#print(renan.analiseObjetivo.remover_stopwords(renan.analiseObjetivo.palavras))
#print('\n')
#print(renan.analiseObjetivo.get_radicais(renan.palavras))
#print(vanessa.analiseObjetivo.get_radicais(vanessa.palavras))
