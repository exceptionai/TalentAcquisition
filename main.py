import json

from flask import Flask, render_template, request, redirect

from DAO.curriculoDAO import CurriculoDAO
from analises.analiseCurriculo import AnaliseCurriculo
from models.curriculo import Curriculo
from models.cursoExtraCurricular import CursoExtraCurricular

app = Flask(__name__)
curriculoDAO = CurriculoDAO(None)


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


@app.route('/analises/curriculo')
def analise_curriculo():
    lista_curriculos = curriculoDAO.listar()
    tags = [{"texto": 'desenvolvedor', "relevancia": 7, "sinonimos": ["programador", "codificador"]},
            {"texto": 'software', "relevancia": 5, "sinonimos": []},
            {"texto": 'java', "relevancia": 10, "sinonimos": []}]

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
    nome = request.form['nome']
    idade = request.form['idade']
    email = request.form['email']
    endereco = request.form['endereco']
    objetivo = request.form['objetivo']
    experiencias_anteriores = []
    cursos_complementares = [
        CursoExtraCurricular(request.form['nomeCurso1'], request.form['instituicao1'], request.form['duracao1'],
                             request.form['dataCursoInicio1'], request.form['descricaoCursoExtraCurricular1'],
                             True if 'cursando' in request.form else False)
    ]

    idiomas = []
    curriculo = Curriculo(nome, idade, email, endereco, objetivo, experiencias_anteriores, cursos_complementares,
                          idiomas)

    curriculoDAO = CurriculoDAO(curriculo)
    sucesso = curriculoDAO.insere()
    if sucesso:
        return render_template('curriculo/sucesso.html')
    else:
        return render_template('curriculo/erro.html')


@app.route('/sistema')
def sistema_base():
    return render_template('sistema-base/index.html')


app.run(debug=True)
