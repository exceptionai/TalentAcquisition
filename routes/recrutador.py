from flask import render_template, request
from main import app


@app.route('/recrutador')
def sistema_base():
    return render_template('recrutador/dashboard.html')

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

@app.route('/recrutador/candidatosTotais/<id_candidato>')
def detalhes_candidato(id_candidato):
    return render_template('recrutador/detalhesCandidato.html')

@app.route('/recrutador/candidatosTotais/<id_candidato>/pontuacao')
def detalhes_candidato_pontuacao(id_candidato):
    return render_template('recrutador/detalhesPontuacaoCandidato.html')

@app.route('/recrutador/candidato/pontuacao')
def pontuacao_candidato():
    return render_template('recrutador/candidatoVisualizar.html')