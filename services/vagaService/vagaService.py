from services.vagaService.DAOs.vagaDAO import VagaDAO
from services.pontuacaoService.DAOs.enderecoDAO import EnderecoDAO
from services.pontuacaoService.models.endereco import Endereco
import json


class VagaService:

    def __init__(self,candidato_id = None):
        self.dao = VagaDAO(candidato_id)
        self.candidato_id = candidato_id

    def quantidade_vagas(self):
        quantidade = self.dao.quantidade()
        quantidade_dict = {
            "quantidade": quantidade[0]
        }
        return json.dumps(quantidade_dict)

    def cadastrar(self, obj_vaga, obj_endereco):
        endereco = Endereco(obj_endereco['cep'],obj_endereco['rua'],obj_endereco['numero'],obj_endereco['cidade'],obj_endereco['uf'])
        endereco_dao = EnderecoDAO(endereco)
        endereco_id = endereco_dao.insere()
        self.dao.cadastrar(obj_vaga,endereco_id)
        mensagem_dict = {
            "mensagem": "Vaga cadastrada com sucesso"
        }
        return json.dumps(mensagem_dict)

    def buscar_resumo_vagas_recrutador(self):
        vagas = self.dao.buscar_vagas_recrutador()
        vagas_dict = []
        for vaga in vagas:
            vagas_dict.append({
                "cargo": vaga[0] if vaga[0] else "",
                "candidatos": vaga[1],
                "candidatosPotenciais": vaga[2],
                "fase": vaga[3] if vaga[3] else "",
                "abertura": str(vaga[4]) if vaga[4] else "",
                "id": vaga[5]
            })
        return json.dumps(vagas_dict)

    def buscar_detalhes_vagas(self,vaga_id): 
        detalhes_vaga = self.dao.buscar_detalhes_vaga(vaga_id)
        selecionada = self.dao.buscar_vaga_selecionada(vaga_id)
        detalhes_vaga_dict = {
            "cargo": detalhes_vaga[0] if detalhes_vaga[0] else "",
            "areaAtuacao": str(detalhes_vaga[1]),
            "requisitosDesejaveis": str(detalhes_vaga[2]),
            "requisitosObrigatorios": str(detalhes_vaga[3]),
            "principaisAtividades": str(detalhes_vaga[4]),
            "salario": float(detalhes_vaga[5]),
            "beneficios": str(detalhes_vaga[6]),
            "dataAbertura": str(detalhes_vaga[7]),
            "vagaID": detalhes_vaga[8], 
            "selecionada": True if selecionada else False
            
        }
        return json.dumps(detalhes_vaga_dict)

    def buscar_resumo_vagas(self):
        vagas = self.dao.buscar_resumo_vagas()
        vagas_dict = []
        for vaga in vagas:
            vagas_dict.append({
                "cargo": str(vaga[0]),
                "areaAtuacao": str(vaga[1]),
                "cidade": str(vaga[2]),
                "dataAbertura": str(vaga[3]),                 
                "vagaID": vaga[4],
                "selecionado": True if vaga[5] else False,
            })
        return json.dumps(vagas_dict)
