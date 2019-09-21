import json
from services.candidatoService.DAOs.candidatoDAO import CandidatoDAO

class CandidatoService:

    def __init__(self, candidato_id):
        self.candidato_id = candidato_id
        self.dao = CandidatoDAO(self.candidato_id)

    def buscar_candidato(self):
        candidato = self.dao.buscar_dados_candidato()
        pontuacao = self.dao.buscar_pontuacao()

        if not candidato:
            candidato = ["",0]
        if not pontuacao:
            pontuacao = [0,0,0]

        candidato_dict = {
            "candidato": {
                "nome": str(candidato[0]),
                "pontos_consumiveis": candidato[1]
            },
            "pontuacao": {
                "pontuacao_maxima": pontuacao[0] or 0,
                "pontuacao_atual": pontuacao[1] or 0,
                "level": pontuacao[2] or 0
            }
        }

        return json.dumps(candidato_dict)