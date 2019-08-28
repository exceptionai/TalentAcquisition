import json
from flask import render_template, request

from DAO.curriculoDAO import CurriculoDAO
from DAO.cursoExtraCurricularDAO import CursoExtraCurricularDAO
from DAO.experienciaAnteriorDAO import ExperienciaAnteriorDAO
from DAO.candidatoDAO import CandidatoDAO
from DAO.enderecoDAO import EnderecoDAO
from DAO.formacaoAcademicaDAO import FormacaoAcademicaDAO
from DAO.idiomaDAO import IdiomaDAO
from DAO.proficienciaDAO import ProficienciaDAO
from analises.analiseCurriculo import AnaliseCurriculo
from controllers.curriculoController import CurriculoController
from models.cursoExtraCurricular import CursoExtraCurricular
from main import app
from models.experienciaAnterior import ExperienciaAnterior
from models.idioma import Idioma
from models.formacaoAcademica import FormacaoAcademica
from models.proeficiencia import Proeficiencia
from models.candidato import Candidato
from models.endereco import Endereco
from models.curriculo import Curriculo


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

        cursos_complementares_requisicao = []
        experiencias_anteriores_requisicao = []
        idiomas_requisicao = []
        formacoes_academicas_requisicao = []

        if 'cursosComplementares' in curriculo_request:
            cursos_complementares_requisicao = curriculo_request['cursosComplementares']

        if 'experienciasAnteriores' in curriculo_request:
            experiencias_anteriores_requisicao = curriculo_request['experienciasAnteriores']

        if 'idiomas' in curriculo_request:
            idiomas_requisicao = curriculo_request['idiomas']
        
        if 'formacaoAcademica' in curriculo_request:
            formacoes_academicas_requisicao = curriculo_request['formacaoAcademica']

        candidato_requisicao = curriculo_request['candidato'][0]

        cursos_complementares = []
        idiomas = []
        experiencias_anteriores =[]
        formacoes_academicas =[]


        #CURSO COMPLEMENTARES

        print('teste4')
        # CursoExtraCurricular.parse_request(cursos_complementares_requisicao)
        for curso  in cursos_complementares_requisicao:
            curso_obj = CursoExtraCurricular(
                curso['nome'],
                curso['instituicao'],
                curso['duracao'],
                curso['dataInicial'],
                curso['descricao'],
                curso['situacao'])
            cursoDAO = CursoExtraCurricularDAO(curso_obj)
            curso_id = cursoDAO.insere()
            curso_obj.id = curso_id

            cursos_complementares.append(curso_obj)
            

        print('teste3')
        #EXPERIENCIAS
        for experiencia_anterior in experiencias_anteriores_requisicao:
            experiencia_obj = ExperienciaAnterior(
                experiencia_anterior['nomeEmpresa'], 
                experiencia_anterior['cargo'], 
                experiencia_anterior['salario'], 
                experiencia_anterior['dataEntrada'],
                experiencia_anterior['dataSaida'],
                experiencia_anterior['trabalhoAtual'],
                experiencia_anterior['principais_atividades'])

            experienciaDAO = ExperienciaAnteriorDAO(experiencia_obj)
            experiencia_id = experienciaDAO.insere()
            
            experiencia_obj.id = experiencia_id
            experiencias_anteriores.append(experiencia_obj)


        
        print('teste2')
        # IDIOMAS
        for idioma in idiomas_requisicao:
            proeficiencia = Proeficiencia(
                idioma['nivelFala'], 
                idioma['nivelLeitura'], 
                idioma['nivelEscrita'])
            proficienciaDAO = ProficienciaDAO(proeficiencia)
            proficiencia_id = proficienciaDAO.insere()

            idioma_obj = Idioma(idioma['idioma'],proeficiencia)
            idiomaDAO = IdiomaDAO(idioma_obj)
            idioma_id = idiomaDAO.insere()
            idiomaDAO.insere_proficiencia(idioma_id, proficiencia_id)
            idioma_obj.id = idioma_id
            idiomas.append(idioma_obj)

        
        print('teste1')
        #FORMAÇÃO ACADEMICA
        for formacao_academica in formacoes_academicas_requisicao:
            formacao_obj = FormacaoAcademica(
                formacao_academica['nomeInstituicao'],
                formacao_academica['curso'],
                formacao_academica['situacaoFormacao'],
                formacao_academica['nivelCurso'])
            formacaoDAO = FormacaoAcademicaDAO(formacao_obj)
            formacao_id = formacaoDAO.insere()

            formacao_obj.id = formacao_id
            formacoes_academicas.append(formacao_obj)
            

        endereco_requisicao = curriculo_request['endereco'][0]
        endereco = (Endereco(endereco_requisicao['cep'],endereco_requisicao['rua'],endereco_requisicao['numero'],endereco_requisicao['cidade'],endereco_requisicao['uf'],endereco_requisicao['realocar']))
        enderecoDAO = EnderecoDAO(endereco)
        endereco_id = enderecoDAO.insere()


        candidato = Candidato(candidato_requisicao['nome'],candidato_requisicao['idade'],candidato_requisicao['email'],candidato_requisicao['telefone_residencial'],candidato_requisicao['telefone_celular'],endereco)
        candidatoDAO = CandidatoDAO(candidato)
        candidato_id = candidatoDAO.insere(endereco_id)

        curriculo = Curriculo(curriculo_request['objetivo_profissional'],experiencias_anteriores,cursos_complementares,idiomas,formacoes_academicas,curriculo_request['salarioExpectativa'],curriculo_request['resumo'],candidato)
        curriculoDAO = CurriculoDAO(curriculo)
        curriculo_id = curriculoDAO.insere(candidato_id)
        curriculo.id = curriculo_id
        print('teste0')

        for curso in cursos_complementares:
            curriculoDAO.insere_curso(curso.id)

        for experiencia_anterior in experiencias_anteriores:
            curriculoDAO.insere_experiencia(experiencia_anterior.id)

        for idioma in idiomas:
            curriculoDAO.insere_idioma(idioma.id)

        for formacao in formacoes_academicas:
            curriculoDAO.insere_formacao(formacao.id)

        resposta = {
            "curiculo_id" : curriculo_id,
            "curriculo_nome": candidato.nome
        }
        
        return json.dumps(resposta), 201
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

