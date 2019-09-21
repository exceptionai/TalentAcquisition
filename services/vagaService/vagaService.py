from services.vagaService.DAOs.vagaDAO import VagaDAO
import json


class VagaService:

    def __init__(self):
        self.dao = VagaDAO()

    def buscar_resumo_vagas(self):
        vagas = self.dao.buscar_resumo_vagas()
        vagas_dict = []
        for vaga in vagas:
            vagas_dict.append({
                "cargo": str(vaga[0]),
                "areaAtuacao": str(vaga[1]),
                "cidade": str(vaga[2]),
                "dataAbertura": str(vaga[3])
            })
        return json.dumps(vagas_dict)
