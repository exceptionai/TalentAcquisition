from services.vagaService.DAOs.vagaDAO import VagaDAO
import json


class VagaService:

    def __init__(self):
        self.dao = VagaDAO()

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
                "selecionado": selecionado
            })
            indice += 1
        return json.dumps(vagas_dict)
