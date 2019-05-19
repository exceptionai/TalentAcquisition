from flask import Flask, render_template, request

from DAO.curriculoDAO import CurriculoDAO
from models.curriculo import Curriculo
from models.cursoExtraCurricular import CursoExtraCurricular

app = Flask(__name__)


@app.route('/')
def index():
    return 'Bayer Challenge<br>' \
           '<a href="cadastrar/curriculo">cadastrar curriculo</a><br>' \
           '<a href="sistema">sistema</a>'


@app.route('/cadastrar/curriculo')
def formulario_curriculo():
    return render_template('curriculo/formulario.html')


@app.route('/inserir/curriculo', methods=['POST', ])
def inserir():
    nome = request.form['nome']
    idade = request.form['idade']
    email = request.form['email']
    endereco = request.form['endereco']
    objetivo = request.form['objetivo']
    experiencias_anteriores = []
    cursos_complementares = [
        CursoExtraCurricular(request.form['nome'], request.form['cursosComplementares'], request.form['instiruicao'])
    ]
    idiomas = []
    curriculo = Curriculo(nome, idade, email, endereco, objetivo, experiencias_anteriores, cursos_complementares, idiomas)
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
