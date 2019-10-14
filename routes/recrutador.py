from services.candidatoService.candidatoService import CandidatoService
from services.vagaService.vagaService import VagaService
from flask import render_template, request
from main import app


@app.route('/recrutador')
def sistema_base():
    return render_template('recrutador/dashboard.html')


@app.route('/service/recrutador/candidatos_potenciais')
def buscar_candidatos_potenciais():
    service = CandidatoService()
    candidatos = service.buscar_candidatos_potenciais()
    return candidatos

@app.route('/service/recrutador/candidatos_ultimo_ano')
def buscar_candidatos_ultimo_ano():
    service = CandidatoService()
    candidatos = service.buscar_candidatos_ultimo_ano()
    return candidatos

@app.route('/service/recrutador/candidatos_destaque')
def buscar_candidatos_destaque():
    service = CandidatoService()
    candidatos = service.buscar_candidatos_destaque()
    return candidatos


@app.route('/service/recrutador/candidato_potencial/quantidade')
def quantidade_potenciais():
    service = CandidatoService()
    quantidade = service.quantidade_potenciais()
    return quantidade

@app.route('/service/recrutador/todos_candidatos')
def buscar_todos_candidatos():
    service = CandidatoService()
    candidatos = service.buscar_todos_candidatos(request.args.get('vagaID'))
    return candidatos

@app.route('/service/recrutador/resumo_vagas')
def resumo_vagas():
    service = VagaService()
    resumo_vagas = service.buscar_resumo_vagas_recrutador()
    return resumo_vagas

@app.route('/service/recrutador/vaga',methods=['POST'])
def cadastrar_vaga():
    service = VagaService()
    mensagem = service.cadastrar(request.json['vaga'],request.json['endereco'])
    return mensagem


@app.route('/service/recrutador/candidato/quantidade')
def quantidade_candidatos():
    service = CandidatoService(request.args.get('recrutadorID'))
    quantidade_candidatos = service.quantidade_candidatos()
    return quantidade_candidatos

@app.route('/service/recrutador/vagas/quantidade')
def quantidade_vagas():
    service = VagaService()
    json_quantidade = service.quantidade_vagas()
    return json_quantidade

@app.route('/recrutador/candidatosPotenciais')
def candidatos_potenciais():
    return render_template('recrutador/candidatosPotencial.html')

@app.route('/recrutador/candidatosTotais')
def candidatos_totais():
    return render_template('recrutador/candidatosTotais.html')

@app.route('/recrutador/vagasAberto')
def vagas_aberto():
    return render_template('recrutador/vagasAberto.html')

@app.route('/recrutador/cadastrarSelecao')
def cadastrar_selecao():
    return render_template('recrutador/cadastrarSelecao.html')

@app.route('/recrutador/vagasAberto/<id_vaga>')
def vagas_aberto_detalhes(id_vaga):
    return render_template('recrutador/detalhesVagaRecrutador.html')

@app.route('/recrutador/candidatosTotais/<id_candidato>')
def detalhes_candidato(id_candidato):
    return render_template('recrutador/detalhesCandidato.html')

@app.route('/recrutador/candidatosTotais/<id_candidato>/pontuacao')
def detalhes_candidato_pontuacao(id_candidato):
    return render_template('recrutador/detalhesPontuacaoCandidato.html')

@app.route('/recrutador/candidato/pontuacao')
def pontuacao_candidato():
    return render_template('recrutador/candidatoVisualizar.html')