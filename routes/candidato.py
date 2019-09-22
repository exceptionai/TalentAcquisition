from flask import render_template, request
from main import app

from services.pontuacaoService.DAO.curriculoDAO import CurriculoDAO
from services.pontuacaoService.DAO.cursoExtraCurricularDAO import CursoExtraCurricularDAO
from services.pontuacaoService.DAO.experienciaAnteriorDAO import ExperienciaAnteriorDAO
from services.pontuacaoService.DAO.candidatoDAO import CandidatoDAO
from services.pontuacaoService.DAO.enderecoDAO import EnderecoDAO
from services.pontuacaoService.DAO.formacaoAcademicaDAO import FormacaoAcademicaDAO
from services.pontuacaoService.DAO.idiomaDAO import IdiomaDAO
from services.pontuacaoService.DAO.proficienciaDAO import ProficienciaDAO
from services.pontuacaoService.controllers.curriculoController import CurriculoController
from services.pontuacaoService.models.cursoExtraCurricular import CursoExtraCurricular
from services.pontuacaoService.models.experienciaAnterior import ExperienciaAnterior
from services.pontuacaoService.models.idioma import Idioma
from services.pontuacaoService.models.formacaoAcademica import FormacaoAcademica
from services.pontuacaoService.models.proeficiencia import Proeficiencia
from services.pontuacaoService.models.candidato import Candidato
from services.pontuacaoService.models.endereco import Endereco
from services.pontuacaoService.models.curriculo import Curriculo
from services.dashboardService.dashboardService import DashboardService
from services.candidatoService.candidatoService import CandidatoService
from services.desafioService.desafioService import DesafioService


import json

@app.route('/candidato')
def candidato():
    return render_template('candidato/dashboard.html')

@app.route('/service/candidato')
def candidato_service():
    service = CandidatoService(request.args.get("candidatoID"))
    candidato = service.buscar_candidato()
    return candidato

@app.route('/service/candidato/atividade_categoria')
def atividade_categoria():
    service = DesafioService(request.args.get("candidatoID"))
    atividades_categoria = service.buscar_atividades_categoria(request.args.get("categoriaID"))
    return atividades_categoria

@app.route('/service/candidato/categoria_desafio')
def desafios_service():
    service = DesafioService(request.args.get("candidatoID"))
    desafios = service.buscar_categorias()
    return desafios


@app.route('/candidato/vaga/<id_vaga>')
def candidato_vaga(id_vaga):
    return render_template('candidato/vaga.html')

@app.route('/service/candidato/fase')
def fase():
    service = DashboardService(request)
    fases = service.buscar_fases()
    return fases

@app.route('/service/candidato/candidatura')
def candidatura():
    service = DashboardService(request)
    candidatura = service.buscar_candidatura()
    return candidatura

@app.route('/service/candidato/desempenho')
def desempenho():
    service = DashboardService(request)
    desempenho = service.buscar_desempenho(request.args.get("dataInicial"),request.args.get("dataFinal"))
    return desempenho

@app.route('/service/candidato/evolucao_progressiva')
def evolucao_progressiva():
    service = DashboardService(request)
    evolucao_progressiva = service.buscar_evolucao_progressiva(request.args.get("dataFinal"),request.args.get("dataInicial"))
    return evolucao_progressiva

@app.route('/candidato/curriculo')
def formulario_curriculo():
    return render_template('candidato/curriculo.html')

@app.route('/candidato/desbloqueaveis')
def desbloqueaveis():
    return render_template('candidato/desbloqueaveis.html')

@app.route('/candidato/duvidas')
def duvidas():
    return render_template('candidato/duvidas.html')

@app.route('/candidato/conhecaMais')
def conhecaMais():
    return render_template('candidato/conhecaMais.html')

@app.route('/candidato/desafios')
def desafios():
    return render_template('candidato/desafios.html')

@app.route('/candidato/oportunidades')
def oportunidades():
    return render_template('candidato/oportunidades.html')


@app.route('/candidato/desafios/categoria/<id_categoria>')
def categoria(id_categoria):
    return render_template('candidato/desafiosCategoria.html')

@app.route('/candidato/desafios/categoria/<id_categoria>/atividade/<id_atividade>')
def atividade(id_categoria, id_atividade):
    return render_template('candidato/desafiosCategoriaAtividade.html')

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
