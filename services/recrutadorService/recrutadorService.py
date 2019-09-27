from services.recrutadorService.DAOs.recrutadorDAO import RecrutadorDAO
import json

class RecrutadorService:
    def __init__(self, recrutador_id):
        self.recrutador_id = recrutador_id
        self.dao = RecrutadorDAO(self.recrutador_id)

    def quantidade_candidatos(self):
        quantidade_candidatos = self.dao.quantidade_candidatos()
        candidatos_dict = {
            "candidatos": quantidade_candidatos[0]
        }
        return json.dumps(candidatos_dict)