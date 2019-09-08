
from flask import render_template, request

from main import app


@app.route('/')
def index():
    return 'Bayer Challenge<br>' \
           '<a href="candidato">Sistema Candidato</a><br>' \
           '<a href="recrutador">Sistema Recrutador</a><br>' 

@app.route('/spec')
def spec():
    return render_template('spec/SpecRunner.html')

def page_not_found(e):
  return render_template('notFound.html'), 404

import routes.candidato 
import routes.recrutador 
import routes.analises 

app.register_error_handler(404, page_not_found)
