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

    def quantidade_potenciais(self):
        quantidade = self.dao.buscar_quantidade_potenciais()
        candidatos_potenciais_dict = {
            "candidatosPotencias": quantidade
        }
        
        return json.dumps(candidatos_potenciais_dict, indent=4, sort_keys=True, default=str)

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


    def buscar_todos_candidatos(self,vaga_id):
        candidatos = self.dao.buscar_todos_candidatos(vaga_id)
        candidato_dict = []
        for candidato in candidatos:
            candidato_dict.append({
                "candidato": candidato[0],
                "vaga": candidato[1],
                "pontuacao_minima": candidato[2],
                "pontuacao_alcancada": candidato[3],
                "status_candidatura": candidato[4],
                "curriculo": candidato[5],
                "detalhes_pontuacao": candidato[5],
                "fator_destaque": candidato[6]
            })
        
        return json.dumps(candidato_dict, indent=4, sort_keys=True, default=str)

    def buscar_candidatos_destaque(self):
        candidatos = self.dao.buscar_candidatos_destaque()
        candidatos_dict = []
        for candidato in candidatos:
            candidatos_dict.append({
                "candidato": candidato[0],
                "pontuacao_alcancada": candidato[1] if candidato[1] else 0,
                "vaga": candidato[2],
                "status_candidatura": candidato[3]
            })
        return json.dumps(candidatos_dict, indent=4, sort_keys=True, default=str)

    def buscar_candidatos_potenciais(self):
        candidatos = self.dao.buscar_candidatos_potenciais()
        candidato_dict = []
        for candidato in candidatos:
            candidato_dict.append({
                "candidato": candidato[0],
                "vaga": candidato[1],
                "pontuacao_minima": candidato[2],
                "pontuacao_alcancada": candidato[3],
                "status_candidatura": candidato[4],
                "curriculo": candidato[5],
                "detalhes_pontuacao": candidato[5],
                "fator_destaque": candidato[6]
            })
        
        return json.dumps(candidato_dict, indent=4, sort_keys=True, default=str)

    def buscar_candidatos_ultimo_ano(self):
        meses_candidatos = self.dao.buscar_candidatos_ultimo_ano()
        meses_candidatos_dict = []
        for mes_candidato in meses_candidatos:
            meses_candidatos_dict.append({
                "quantidade": mes_candidato[0],
                "data": mes_candidato[1]
            })

        return json.dumps(meses_candidatos_dict, indent=4, sort_keys=True, default=str)