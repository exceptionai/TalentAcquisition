from analises.analiseCurriculo import AnaliseCurriculo
from analises.analiseTituloCursoExtraCurricular import AnaliseTituloCursoExtraCurricular
from services.pontuacaoService.models.curriculo import Curriculo
from services.pontuacaoService.models.cursoExtraCurricular import CursoExtraCurricular

class Vaga:

    def __init__(self, tags, salario):
        self.tags = tags
        self.salario = salario

tags = [{"texto": 'desenvolvedor', "relevancia": 7, "sinonimos": ["programador", "codificador"]},
        {"texto": 'software', "relevancia": 5, "sinonimos": []},
        {"texto": 'java', "relevancia": 10, "sinonimos": []},
        {"texto": 'regex', "relevancia": 3, "sinonimos": []}]

vaga = Vaga(tags, 1500)

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
    cursos_extracurriculares=renan_extra_curricular,
    expectativa_salario=1500,
    formacao=[],
    resumo="",
    experiencias_anteriores=[],
    idiomas=[],
    candidato=1
)
renan = AnaliseCurriculo(curriculo_renan, vaga=vaga)

curriculo_alisson = Curriculo(
    objetivo_profissional='eu quero ser um desenvolvedor',
    cursos_extracurriculares=alisson_extra_curricular,
    expectativa_salario=1200,
    formacao=[],
    resumo="",
    experiencias_anteriores=[],
    idiomas=[],
    candidato=2
)
alisson = AnaliseCurriculo(curriculo_alisson, vaga=vaga)

curriculo_vanessa = Curriculo(
    objetivo_profissional='eu quero ser uma programadora Ruby',
    cursos_extracurriculares=vanessa_extra_curricular,
    expectativa_salario=1200,
    formacao=[],
    resumo="",
    experiencias_anteriores=[],
    idiomas=[],
    candidato=3
)
vanessa = AnaliseCurriculo(curriculo_vanessa, vaga=vaga)
curriculo_lopes = Curriculo(
    objetivo_profissional='eu quero ver um programa de tv',
    cursos_extracurriculares=lopes_extra_curricular,
    expectativa_salario=2000,
    formacao=[],
    resumo="",
    experiencias_anteriores=[],
    idiomas=[],
    candidato=4
)

# print("curso pontuacao", analiseCursosExtraCurriculares.pontuacao)
lopes = AnaliseCurriculo(curriculo_lopes, vaga=vaga)  # ponto de "falha"

print(renan.pontuacao,'renan')
print(alisson.pontuacao,'alisson')
print(vanessa.pontuacao,'vanessa')
print(lopes.pontuacao,'lopes')
# testes
# print(nltk.pos_tag(vanessa.analiseObjetivo.palavras))
# print('\n')
# print(renan.analiseObjetivo.remover_stopwords(renan.analiseObjetivo.palavras))
# print('\n')
# print(renan.analiseObjetivo.get_radicais(renan.palavras))
# print(vanessa.analiseObjetivo.get_radicais(vanessa.palavras))
