from services.desafioService.DAOs.desafioDAO import DesafioDAO
import json

class DesafioService:

    def __init__(self,candidato_id):
        self.candidato_id = candidato_id
        self.dao = DesafioDAO(self.candidato_id)

    def buscar_categorias(self):
        categorias = self.dao.buscar_categorias()
        categorias_dict = []

        for categoria in categorias:
            categorias_dict.append({
                "titulo": str(categoria[0]),
                "descricao": str(categoria[1]),
                "desafiosConcluidos": int(categoria[2]) if categoria[2] else 0,
                "desafiosTotais": int(categoria[3]) if categoria[3] else 0,
                "pontosAdquiridos": int(categoria[4]) if categoria[4] else 0,
                "pontosNecessarios": int(categoria[5]) if categoria[5] else 0,
                "id": categoria[6]
            })
        return json.dumps(categorias_dict)
    
    def buscar_atividades_categoria(self,categoria_id):
        atividades_categoria = self.dao.buscar_atividades_categoria(categoria_id)
        
        atividades_categoria_dict = []
        for atividade_categoria in  atividades_categoria:
            if atividade_categoria[7]:
                atividades_categoria_dict.append({
                    "titulo": atividade_categoria[0],
                    "descricao": atividade_categoria[1],
                    "pontosConquistados": atividade_categoria[2] if atividade_categoria[2] else 0,
                    "pontosADesbloquear": atividade_categoria[3] if atividade_categoria[3] else 0,
                    "desafiosRealizados": atividade_categoria[4] if atividade_categoria[4] else 0,
                    "desafiosARealizar": atividade_categoria[5] if atividade_categoria[5] else 0,
                    "tempo": atividade_categoria[6] if atividade_categoria[6] else 0,
                    "id": atividade_categoria[7]
                })
        return json.dumps(atividades_categoria_dict)
