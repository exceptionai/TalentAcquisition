import json
from flask import render_template, request

from DAO.curriculoDAO import CurriculoDAO
from analises.analiseCurriculo import AnaliseCurriculo
from controllers.curriculoController import CurriculoController
from models.cursoExtraCurricular import CursoExtraCurricular
from main import app
from models.cursoComplementar import CursoComplementar
from models.experienciaAnterior import ExperienciaAnterior
from models.idioma import Idioma


@app.route('/')
def index():
    return 'Bayer Challenge<br>' \
           '<a href="cadastrar/curriculo">cadastrar curriculo</a><br>' \
           '<a href="sistema">sistema</a><br>' \
           '<a href="analises">analises</a>'


@app.route('/analises')
def analises():
    return render_template('curriculo/analises.html')


@app.route('/cadastrar/curriculo')
def formulario_curriculo():
    return render_template('curriculo/formulario.html')


@app.route('/vagas/vaga')
def vaga_especifica():
    return json.dumps({'descricao': 'desenvolvedor java', 'uf': 'RJ', 'cidade': 'Rio de Janeiro'})


@app.route('/analises/curriculo')
def analise_curriculo():
    curriculoDAO = CurriculoDAO(None)
    lista_curriculos = curriculoDAO.listar()
    tags = [{"texto": 'biologia', "relevancia": 7, "sinonimos": ["programador", "codificador"]},
            {"texto": 'marinha', "relevancia": 5, "sinonimos": []},
            {"texto": 'vida', "relevancia": 10, "sinonimos": []}]

    lista_analises = []
    for curriculo in lista_curriculos:
        lista_analises.append(
            {'nome': curriculo.nome_completo, 'pontuacao_total': AnaliseCurriculo(curriculo, tags).pontuacao,
             'pontuacao_objetivo': AnaliseCurriculo(curriculo, tags).analiseObjetivo.pontuacao,
             'pontuacao_cursos_extra_curriculares':
                 AnaliseCurriculo(curriculo, tags).analiseCursosExtraCurriculares.pontuacao})
    return json.dumps(lista_analises)


@app.route('/candidato/curriculo', methods=['POST', ])
def inserir():
    try:
        curriculo_request = request.json
        print(curriculo_request)
        cc = curriculo_request.cursosComplementares
        xp = curriculo_request.experienciasAnteriores
        idi = curriculo_request.idiomas
        fa = curriculo_request.formacaoAcademica
        i = 0;
        cursos= []
        idiomas = []
        experiencias =[]
        formacao =[]

        #CURSO COMPLEMENTARES
        while i < len(cc):
            cursos[i] = CursoComplementar(cc[i].nome,cc[i].instituicao,cc[i].duracao,cc[i].dataInicial,cc[i].descricao)
        i = 0

        #EXPERIENCIAS
        if (xp):
            while i < len(xp):
                experiencias[i] = ExperienciaAnterior(xp[i].nomeEmpresa, xp[i].cargo, xp[i].salario, xp[i].dataEntrada,
                                              xp[i].dataSaida,xp[i].trabalhoAtual,xp[i].principaisAtividades)
        i = 0

        # IDIOMAS
        while i < len(idi):
            idiomas[i] = Idioma(idi[i].idiomo, idi[i].fala, idi[i].leitura, idi[i].escrita)
        i = 0;

        #FORMAÇÃO ACADEMICA
        while i < len(fd):
            formacao[i] = Formacao(fa[i].curso,fa[i].nivelCurso,fa[i].nomeInstituicao,fa[i].situacaoFormacaos)


        return '',201
    except Exception as error:
        print(f'erro: {error}')
        return '',500


@app.route('/sistema')
def sistema_base():
    return render_template('sistema-base/index.html')

@app.route('/candidatosPotencial')
def candidatosPotencial():
    return render_template('sistema-base/candidatosPotencial.html')

@app.route('/candidatosTotais')
def candidatosTotais():
    return render_template('sistema-base/candidatosTotais.html')

@app.route('/vagasAberto')
def vagasAberto():
    return render_template('sistema-base/vagasAberto.html')

@app.route('/spec')
def spec():
    return render_template('spec/SpecRunner.html')

