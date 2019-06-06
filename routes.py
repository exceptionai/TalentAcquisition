import json
from flask import render_template, request

from DAO.curriculoDAO import CurriculoDAO
from analises.analiseCurriculo import AnaliseCurriculo
from controllers.curriculoController import CurriculoController
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


@app.route('/inserir/curriculo', methods=['POST', ])
def inserir():
    try:
        curriculo = CurriculoController.load_por_form(request.form)
        curriculoDAO = CurriculoDAO(curriculo)
        curriculoDAO.insere()
        return render_template('curriculo/sucesso.html')
    except Exception as error:
        print(f'erro: {error}')
        return render_template('curriculo/erro.html')


@app.route('/sistema')
def sistema_base():
    return render_template('sistema-base/index.html')
