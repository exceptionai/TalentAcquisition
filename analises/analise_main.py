from analises.analiseCurriculo import AnaliseCurriculo
from models.curriculo import Curriculo
from models.cursoExtraCurricular import CursoExtraCurricular

tags = [{"texto": 'desenvolvedor', "relevancia": 7, "sinonimos": ["programador", "codificador"]},
        {"texto": 'software', "relevancia": 5, "sinonimos": []},
        {"texto": 'java', "relevancia": 10, "sinonimos": []}]

renan_extra_curricular = [CursoExtraCurricular("excel avançado", "curso em vídeo", 120, False, "2016-05-02",
                                               "curso de excel onde aprendi a fazer macros, scripts "
                                               "e automação para contabilidade; aprendi a calcular e "
                                               "analisar regressões lineares para realizar previsões")]

alisson_extra_curricular = [CursoExtraCurricular("desenvolvimento de software", "alura", 240, False, "2017-05-12",
                                                 "curso de desenvolvimento com javascript, node.js e bootstrap")]

vanessa_extra_curricular = [CursoExtraCurricular("desenvolvimento em java", "caelum", 540, False, "2018-05-12",
                                                 "curso de desenvolvimento com java web; desenvolvimento de aplicações"
                                                 "com servlets, hibernate e jsp")]

lopes_extra_curricular = [CursoExtraCurricular("pescaria", "pesca alternativa", 3240, True, "2015-05-12",
                                               "curso intensivo de pescaria, para pegar os melhores peixes")]

curriculo_renan = Curriculo(
    objetivo_profissional='atuar com desenvolvimento em Node.js',
    cursos_complementares=renan_extra_curricular,
    email='renan.sanches_123@hotmail.com',
    nome_completo='renan do nascimento sanches',
    endereco='rua123',
    experiencias_anteriores=[],
    idade=22,
    idiomas=[]
)
renan = AnaliseCurriculo(curriculo_renan, tags=tags)

curriculo_alisson = Curriculo(
    objetivo_profissional='eu quero ser um desenvolvedor',
    cursos_complementares=alisson_extra_curricular,
    email='chabaris@gmail.com',
    nome_completo='Alisson Chabaribery',
    endereco='rua312',
    experiencias_anteriores=[],
    idade=19,
    idiomas=[]
)
alisson = AnaliseCurriculo(curriculo_alisson, tags)

curriculo_vanessa = Curriculo(
    objetivo_profissional='eu quero ser uma programadora Ruby',
    cursos_complementares=vanessa_extra_curricular,
    email='vanessa.queiroz@hotmail.com',
    nome_completo='Vanessa Cunha Queiroz',
    endereco='rua231',
    experiencias_anteriores=[],
    idade=19,
    idiomas=[]
)
vanessa = AnaliseCurriculo(curriculo_vanessa, tags)
curriculo_lopes = Curriculo(
    objetivo_profissional='eu quero ver um programa de tv',
    cursos_complementares=lopes_extra_curricular,
    email='gabriel_lopes@gmail.com',
    nome_completo='Gabriel Lopes Pontes',
    endereco='rua3123',
    experiencias_anteriores=[],
    idade=21,
    idiomas=[]
)
lopes = AnaliseCurriculo(curriculo_lopes, tags)  # ponto de "falha"

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
