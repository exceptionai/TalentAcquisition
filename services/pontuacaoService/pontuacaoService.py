import json
from services.pontuacaoService.DAOs.pontuacaoDAO import PontuacaoDAO

class PontuacaoService:
    def __init__(self, candidato_id = None):
        self.dao = PontuacaoDAO(candidato_id)

    def inserir_pontuacao_candidato(self,pontuacao):
        level = self.dao.buscar_level(pontuacao)
        pontuacao_candidato_id = self.dao.inserir_pontuacao_candidato(pontuacao, level[0])
        pontuacao_candidato_dict = {
            "pontuacaoCandidatoID": pontuacao_candidato_id,
            "pontuacaoAlcancada": pontuacao
        }
        return json.dumps(pontuacao_candidato_dict)
    
    def aumentar_pontuacao_canditado(self,pontos):

        level = self.dao.buscar_level(pontos)
        pontuacao_candidato_id = self.dao.aumentar_pontuacao_canditado(pontos)
        pontuacao_candidato_dict = {
            "pontuacao_candidato_id": pontuacao_candidato_id
        }
        return json.dumps(pontuacao_candidato_dict)

    def inserir_historico(self, pontos, candidato_id, data= 'NOW()'):
        historico_pontuacao_id = self.dao.inserir_historico(pontos, data, candidato_id)
        historico_pontuacao_dict = {
            "historicoPontuacaoID": historico_pontuacao_id
        }
        return json.dumps(historico_pontuacao_dict)