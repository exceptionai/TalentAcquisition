import json
from main import app
from services.candidatoService.DAOs.candidatoDAO import CandidatoDAO
import datetime
import jwt

class CandidatoService:

    def __init__(self, candidato_id = None):
        self.candidato_id = candidato_id
        self.dao = CandidatoDAO(self.candidato_id)
        self.token = '123'

    def ganhar_pontos(self, pontos):
        self.dao.aumentar_pontos(pontos)
        mensagem_dict = {
            "mensagem":  "Pontuação alterada com sucesso"
        }
        return json.dumps(mensagem_dict)

    def diminuir_pontos(self,pontos):
        self.dao.diminuir_pontos(pontos)
        mensagem_dict = {
            "mensagem":  "Pontuação alterada com sucesso"
        }
        return json.dumps(mensagem_dict)

    def inserir_fase(self,candidato_id,fase_id,status_candidato_fase_id,pontuacao):
        self.dao.inserir_fase_candidato(candidato_id,fase_id,status_candidato_fase_id,pontuacao)
            
    def inserir(self, nome,usuario_id,pontuacao_alcancada_id, tipo_usuario_id):
        candidatoID = self.dao.inserir_candidato(nome,usuario_id,pontuacao_alcancada_id)
        candidato_dict = {
            "candidatoID": candidatoID,
            "tipoUsuarioID": tipo_usuario_id
        }
        return json.dumps(candidato_dict)

    def candidatar(self,vaga_id):
        self.dao.candidatar_vaga(vaga_id)
        mensagem_dict = {
            "mensagem": f"candidato com sucesso à vaga {vaga_id}"
        }

    def quantidade_candidatos(self):
        quantidade_candidatos = self.dao.quantidade_candidatos()
        candidatos_dict = {
            "candidatos": quantidade_candidatos[0]
        }
        return json.dumps(candidatos_dict)

    def buscar(self):
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