from flask import render_template, request, redirect
from main import app

from services.pontuacaoService.DAOs.curriculoDAO import CurriculoDAO
from services.pontuacaoService.DAOs.cursoExtraCurricularDAO import CursoExtraCurricularDAO
from services.pontuacaoService.DAOs.experienciaAnteriorDAO import ExperienciaAnteriorDAO
from services.pontuacaoService.DAOs.candidatoDAO import CandidatoDAO
from services.pontuacaoService.DAOs.enderecoDAO import EnderecoDAO
from services.pontuacaoService.DAOs.formacaoAcademicaDAO import FormacaoAcademicaDAO
from services.pontuacaoService.DAOs.idiomaDAO import IdiomaDAO
from services.pontuacaoService.DAOs.proficienciaDAO import ProficienciaDAO
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
from services.desbloqueavelService.desbloqueavelService import DesbloqueavelService
from services.usuarioService.usuarioService import UsuarioService
from services.pontuacaoService.pontuacaoService import PontuacaoService
from services.curriculoService.curriculoService import CurriculoService
import datetime
import json
import os
import jwt
app.secret_key = 'abc'
# app.secret_key = os.urandom(24)


def decode_auth_token(auth_token):
    """
    Decodes the auth token
    :param auth_token:
    :return: integer|string
    """
    try:
        print(auth_token)
        print('\n\n\n')
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'), algorithms=['HS256'])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        print('token expirado')
        return False
    except jwt.InvalidTokenError as e:
        print(e)
        return False


@app.route('/candidato')
def candidato():
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/dashboard.html')
    return json.dumps({"message": "Token Invalido", "location":"/login"}), 401
    

@app.route('/service/candidato/atividade_desafio',methods=["POST"])
def salvar_desafio():
    service = DesafioService(request.json["candidatoID"])
    dados = service.salvar(request.json)
    pontos = json.loads(dados)["pontosObtidos"]

    pontuacao_service = PontuacaoService()
    pontuacao_service.inserir_pontuacao_candidato(pontos)
    pontuacao_service.inserir_historico(pontos,request.json["candidatoID"])

    candidato_service = CandidatoService(request.json["candidatoID"])
    candidato_service.ganhar_pontos(json.loads(dados)["pontosObtidos"])
    return dados

def candidato_service_post():
    usuario_service = UsuarioService()
    dados_usuario = usuario_service.inserir(request.json['login'])
    pontuacao_service = PontuacaoService()
    dados_pontuacao = pontuacao_service.inserir_pontuacao_candidato(70)

    candidato_service = CandidatoService()
    dados_candidato = candidato_service.inserir(json.loads(dados_usuario)['nomeCompleto'],json.loads(dados_usuario)['usuarioID'],json.loads(dados_pontuacao)['pontuacaoCandidatoID'],1)
    
    candidato_id = json.loads(dados_candidato)['candidatoID']
    candidato_service.inserir_fase(candidato_id,1,1,70)
    candidato_service.inserir_fase(candidato_id,2,2,0)
    pontuacao_service.inserir_historico(70,candidato_id)

    desbloqueavel_service = DesbloqueavelService(candidato_id)
    tema_padrao_id = 1
    desbloqueavel_service.obter_desbloqueavel(tema_padrao_id)
    desbloqueavel_service.selecionar_desbloqueavel(tema_padrao_id)

    return dados_candidato, 201

def candidato_service_get():
    service = CandidatoService(request.args.get("candidatoID"))
    token = request.args.get("token")
    if(decode_auth_token(token)):
        candidato = service.buscar()
        return candidato
    else:
        return json.dumps({"mensagem": "token invalido"}), 401

@app.route('/service/candidato',methods=['GET','POST'])
def candidato_service():
    if request.method == 'GET':
        return candidato_service_get()

    if request.method == 'POST':
        return candidato_service_post()


@app.route('/service/candidato/autenticar',methods=['POST'])
def autenticar():
    service = UsuarioService()
    try:
        print(request.json)
        dados_usuario = service.autenticar(request.json["email"],request.json["senha"])
        return dados_usuario, 200
    except Exception as e:
        print(e)
        return json.dumps({"mensagem":"login ou senha inválidos"}), 401


@app.route('/service/candidato/atividades')
def atividades_candidato_service():
    service = DesafioService(request.args.get("candidatoID"))
    atividades_candidato = service.buscar_atividades_candidato(request.args.get("atividadeCategoriaID"))
    return atividades_candidato

@app.route('/service/candidato/desbloqueaveis_candidato', methods=['GET','PUT','POST'])
def desbloqueaveis_candidato():
    if request.method == 'GET':
        service = DesbloqueavelService(request.args.get("candidatoID"))
        desbloqueaveis = service.buscar_desbloqueaveis_candidato()
        return desbloqueaveis
    if request.method == 'PUT':
        service = DesbloqueavelService(request.args.get("candidatoID"))
        desbloqueaveis = service.selecionar_desbloqueavel(request.args.get("desbloqueavelID"))
        return desbloqueaveis
    if request.method == 'POST':
        desbloqueavel_id = request.json["desbloqueavelID"]
        candidato_id = request.json["candidatoID"]
        service = DesbloqueavelService(candidato_id)
        desbloqueaveis = service.obter_desbloqueavel(desbloqueavel_id)
        return desbloqueaveis

@app.route('/service/candidato/diminuir_pontuacao')
def diminuir_pontuacao():
    service = CandidatoService(request.args.get("candidatoID"))
    mensagem = service.diminuir_pontos(request.args.get("pontos"))
    return mensagem

@app.route('/service/candidato/desbloqueavel')
def desbloqueavel_service():
    service = DesbloqueavelService(request.args.get("candidatoID"))
    desbloqueaveis = service.buscar_desbloqueaveis()
    return desbloqueaveis

@app.route('/service/candidato/atividade_categoria')
def atividade_categoria():
    service = DesafioService(request.args.get("candidatoID"))
    atividades_categoria = service.buscar_atividades_categoria(request.args.get("categoriaID"))
    return atividades_categoria

@app.route('/service/candidato/candidatar', methods=['POST'])
def candidatar():
    service = CandidatoService(request.json['candidatoID'])
    mensagem = service.candidatar(request.json['vagaID'])
    return json.dumps(mensagem)

@app.route('/service/candidato/categoria_desafio')
def desafios_service():
    service = DesafioService(request.args.get("candidatoID"))
    desafios = service.buscar_categorias()
    return desafios

@app.route('/service/candidato/curriculo')
def curriculo_service():
    token = request.args.get("token")
    if(decode_auth_token(token)):
        if request.method == 'GET':
            service = CurriculoService(request.args.get("candidatoID"))
            curriculo = service.buscar()
            return curriculo
    return json.dumps({"mensagem": "Token Invalido"}), 401

@app.route('/candidato/vaga/<id_vaga>')
def candidato_vaga(id_vaga):
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/vaga.html')
    return json.dumps({"mensagem": "Token Invalido"}), 401

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
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/curriculo.html')
    return json.dumps({"mensagem": "Token Invalido"}), 401

@app.route('/candidato/desbloqueaveis')
def desbloqueaveis():
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/desbloqueaveis.html')
    return json.dumps({"mensagem": "Token Invalido"}), 401


@app.route('/candidato/duvidas')
def duvidas():
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/duvidas.html')
    return json.dumps({"mensagem": "Token Invalido"}), 401

@app.route('/candidato/conhecaMais')
def conhecaMais():
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/conhecaMais.html')
    return json.dumps({"mensagem": "Token Invalido"}), 401

@app.route('/candidato/desafios')
def desafios():
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/desafios.html')
    return json.dumps({"mensagem": "Token Invalido"}), 401

@app.route('/candidato/oportunidades')
def oportunidades():
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/oportunidades.html')
    return json.dumps({"mensagem": "Token Invalido"}), 401


@app.route('/candidato/desafios/categoria/<id_categoria>')
def categoria(id_categoria):
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/desafiosCategoria.html')
    return json.dumps({"mensagem": "Token Invalido"}), 401

@app.route('/candidato/desafios/categoria/<id_categoria>/atividade/<id_atividade>')
def atividade(id_categoria, id_atividade):
    token = request.args.get("token")
    if(decode_auth_token(token)):
        return render_template('candidato/desafiosCategoriaAtividade.html')
    return json.dumps({"mensagem": "Token Invalido"}), 401

@app.route('/service/candidato/curriculo/inserir', methods=['POST', ])
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


        print('teste0')
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

        print('teste11')

        # candidato = Candidato(candidato_requisicao['nome'],candidato_requisicao['idade'],candidato_requisicao['email'],candidato_requisicao['telefone_residencial'],candidato_requisicao['telefone_celular'],endereco)
        # candidatoDAO = CandidatoDAO(candidato)
        # candidato_id = candidatoDAO.insere(endereco_id,endereco.realocar)

        curriculo = Curriculo(curriculo_request['objetivo_profissional'],experiencias_anteriores,cursos_complementares,idiomas,formacoes_academicas,curriculo_request['salarioExpectativa'],curriculo_request['resumo'],{})
        curriculoDAO = CurriculoDAO(curriculo)
        print('teste12')
        curriculo_id = curriculoDAO.insere(1)
        print('teste13')
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
            "curiculo_id" : 1
        }
        
        return json.dumps(resposta), 201
    except Exception as error:
        print(f'erro: {error}')
        return '',500
