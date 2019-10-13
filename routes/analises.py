from services.pontuacaoService.DAOs.curriculoDAO import CurriculoDAO
# from services.pontuacaoService.analises.analiseCurriculo import AnaliseCurriculo
from flask import render_template, request
from main import app

@app.route('/analises')
def analises():
    return render_template('curriculo/analises.html')



# @app.route('/analises/curriculo')
# def analise_curriculo():
#     curriculoDAO = CurriculoDAO(None)
#     lista_curriculos = curriculoDAO.listar()
#     tags = [{"texto": 'biologia', "relevancia": 7, "sinonimos": ["programador", "codificador"]},
#             {"texto": 'marinha', "relevancia": 5, "sinonimos": []},
#             {"texto": 'vida', "relevancia": 10, "sinonimos": []}]

#     lista_analises = []
#     for curriculo in lista_curriculos:
#         lista_analises.append(
#             {'nome': curriculo.nome_completo, 'pontuacao_total': AnaliseCurriculo(curriculo, tags).pontuacao,
#              'pontuacao_objetivo': AnaliseCurriculo(curriculo, tags).analiseObjetivo.pontuacao,
#              'pontuacao_cursos_extra_curriculares':
#                  AnaliseCurriculo(curriculo, tags).analiseCursosExtraCurriculares.pontuacao})
#     return json.dumps(lista_analises)
