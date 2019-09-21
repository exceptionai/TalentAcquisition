from services.vagaService.vagaService import VagaService
from flask import render_template, request

from main import app


@app.route('/service/resumo_vaga')
def resumo_vagas_service():
    service = VagaService() 
    vagas = service.buscar_resumo_vagas()
    return vagas

@app.route('/login')
@app.route('/logout')
def login():
  return render_template('login/login.html') 

@app.route('/')
def index():
  return render_template('candidato/index.html')

@app.route('/spec')
def spec():
  return render_template('spec/SpecRunner.html')

def page_not_found(e):
  return render_template('notFound.html'), 404

import routes.candidato 
import routes.recrutador 
import routes.analises 

app.register_error_handler(404, page_not_found)
