from analises.analiseCurriculo import AnaliseCurriculo

tags = [{"texto": 'desenvolvedor', "relevancia": 7, "sinonimos": ["programador", "codificador"]},
        {"texto": 'software', "relevancia": 5, "sinonimos": []},
        {"texto": 'java', "relevancia": 10, "sinonimos": []}]

renan_extra_curricular = [{"titulo": "excel avançado", "duracao": 120,
                           "data_inicio": "2016-05-02", "data_fim": "2017-05-03",
                           "descricao": "curso de excel onde aprendi a fazer macros, scripts "
                                        "e automação para contabilidade; aprendi a calcular e "
                                        "analisar regressões lineares para realizar previsões"}]

renan = AnaliseCurriculo(objetivo='atuar com desenvolvimento em java',
                         tags=tags,
                         curso_extra_curricular=renan_extra_curricular)

alisson = AnaliseCurriculo(objetivo='eu quero ser um desenvolvedor', tags=tags,
                           curso_extra_curricular=[{"titulo": "desenvolvimento em java"}])
vanessa = AnaliseCurriculo(objetivo='eu quero ser uma programadora Ruby', tags=tags,
                           curso_extra_curricular=[{"titulo": "desenvolvimento com java"}])
lopes = AnaliseCurriculo(objetivo='eu quero ver um programa de tv', tags=tags,
                         curso_extra_curricular=[{"titulo": "pescaria"}])  # ponto de "falha"

print(f"Renan: {renan.pontuacao} pontos")

print(f"Alisson: {alisson.pontuacao} pontos")
print(f"Vanessa: {vanessa.pontuacao} pontos")
print(f"lopes: {lopes.pontuacao} pontos")

# testes
# print(nltk.pos_tag(vanessa.analiseObjetivo.palavras))
# print('\n')
# print(renan.analiseObjetivo.remover_stopwords(renan.analiseObjetivo.palavras))
# print('\n')
# print(renan.analiseObjetivo.get_radicais(renan.palavras))
# print(vanessa.analiseObjetivo.get_radicais(vanessa.palavras))
