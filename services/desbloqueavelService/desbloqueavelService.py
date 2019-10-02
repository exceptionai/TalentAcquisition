from services.desbloqueavelService.DAOs.desbloqueavelDAO import DesbloqueavelDAO
import json

class DesbloqueavelService:

    def __init__(self, candidato_id):
        self.candidato_id = candidato_id
        self.dao = DesbloqueavelDAO(self.candidato_id)

    def buscar_desbloqueaveis(self):
        desbloqueaveis = self.dao.buscar_desbloqueavel()
        desbloqueaveis_dict = []
        for desbloqueavel in desbloqueaveis:
            desbloqueavel_candidato = self.dao.buscar_desbloqueavel_candidato(desbloqueavel[4])
            
            desbloqueaveis_dict.append({
                "descricao": desbloqueavel[0],
                "pontos_minimos": desbloqueavel[1],
                "tipo": desbloqueavel[2],
                "obtido": True if desbloqueavel_candidato and desbloqueavel_candidato[0] else False,
                "selecionado": True if desbloqueavel_candidato and desbloqueavel_candidato[1] else False,
                "valor": desbloqueavel[3],
                "imagem": f"/static/img/desbloqueaveis/{desbloqueavel[4]}.jpg",
                "id": desbloqueavel[4]
            })
        return json.dumps(desbloqueaveis_dict)
    
    def buscar_desbloqueaveis_candidato(self):
        desbloqueaveis = self.dao.buscar_desbloqueaveis_candidato()
        if not desbloqueaveis:
            desbloqueaveis_dict = {}
        else:
            desbloqueaveis_dict = {
                "id": desbloqueaveis[0],
                "tipo": desbloqueaveis[1],
                "valor": desbloqueaveis[2]
            }
        return json.dumps(desbloqueaveis_dict)

    def obter_desbloqueavel(self, desbloqueavel_id):
        self.dao.obter_desbloqueavel(desbloqueavel_id)
        return json.dumps({"mensagem": "Desbloqueavel Obtido com sucesso"})

    def selecionar_desbloqueavel(self, desbloqueavelID):
        desbloqueavel_id = self.dao.selecionar_desbloqueavel_candidato(desbloqueavelID)
        desbloqueavel_dict = {"id_candidato":desbloqueavel_id}
        return json.dumps(desbloqueavel_dict)