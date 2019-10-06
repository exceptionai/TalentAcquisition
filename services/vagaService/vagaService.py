from services.vagaService.DAOs.vagaDAO import VagaDAO
import json


class VagaService:

    def __init__(self):
        self.dao = VagaDAO()

    def quantidade_vagas(self):
        quantidade = self.dao.quantidade()
        quantidade_dict = {
            "quantidade": quantidade[0]
        }
        return json.dumps(quantidade_dict)

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

    def buscar_resumo_vagas(self):
        vagas = self.dao.buscar_resumo_vagas()
        vagas_dict = []
        indice = 0
        for vaga in vagas:
            if not indice:
                selecionado = True
            else:
                selecionado = False
            vagas_dict.append({
                "cargo": str(vaga[0]),
                "areaAtuacao": str(vaga[1]),
                "cidade": str(vaga[2]),
                "dataAbertura": str(vaga[3]),
                "selecionado": selecionado,
                "vagaID": vaga[4]
            })
            indice += 1
        return json.dumps(vagas_dict)
