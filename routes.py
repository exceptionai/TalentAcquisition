import json
from flask import render_template, request

from DAO.curriculoDAO import CurriculoDAO
from analises.analiseCurriculo import AnaliseCurriculo
from controllers.curriculoController import CurriculoController
from models.cursoExtraCurricular import CursoExtraCurricular
from main import app


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
        cursos_complementares_request = curriculo_request.cursosComplementares
        curso = CursoExtraCurricular(cursos_complementares_request[0].nome,cursos_complementares_request[0].instituicao,cursos_complementares_request[0].duracao,cursos_complementares_request[0].dataInicial,cursos_complementares_request[0].descricao)
        print(curso.nome)
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

