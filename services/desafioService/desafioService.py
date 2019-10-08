from services.desafioService.DAOs.desafioDAO import DesafioDAO
import json

class DesafioService:

    def __init__(self,candidato_id):
        self.candidato_id = candidato_id
        self.dao = DesafioDAO(self.candidato_id)

    def salvar(self, atividade_desafio):
      
        atividade_desafio_id = atividade_desafio["atividade_desafio_id"]
        pontos_atividade = self.dao.buscar_pontos_desafio(atividade_desafio_id)
        qntAtividades = self.dao.quantidade_atividade(atividade_desafio_id)
        pontos_candidato = 0
        resolvidas = 0
        desafio_candidato_dict = {
            "respostas": [

            ]
        }
        for atividade in atividade_desafio["atividades"]:
            atividade_id = atividade["atividadeID"]
            resposta_correta = self.dao.buscar_resposta_correta(atividade_id)
            if resposta_correta == atividade["respostaSelecionada"]:
                pontos_candidato += (pontos_atividade / qntAtividades)
            if atividade["respostaSelecionada"] is not None:
                resolvidas += 1
            resposta_id = self.dao.inserir_resposta(atividade_id,atividade["respostaSelecionada"])
            desafio_candidato_dict["respostas"].append(resposta_id)
        resposta_candidato_id = self.dao.inserir_atividade_candidato(atividade_desafio_id,resolvidas,pontos_candidato)
        desafio_candidato_dict["respostaCandidatoID"] = resposta_candidato_id
        desafio_candidato_dict["pontosObtidos"] = pontos_candidato
        return json.dumps(desafio_candidato_dict)


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

    def buscar_atividades_candidato(self, atividade_desafio_id):
        atividades = self.dao.buscar_atividades(atividade_desafio_id)
        dados_atividade = self.dao.buscar_tempo_titulo_atividade_categoria(atividade_desafio_id)

        atividades_result = []
        tempo_restante_result = dados_atividade[0]
        titulo_atividade = dados_atividade[1]

        for atividade in  atividades:
            alternativas = self.dao.buscar_alternativas(atividade[2])
            print(alternativas is None)
            atividades_result.append(
                {
                    "titulo": atividade[0],
                    "descricao": atividade[1],
                    "alternativas": alternativas if alternativas else [],
                    "id": atividade[2]
                }
                
            )

        atividades_dict = {
            "atividades": atividades_result,
            "tempoRestante": tempo_restante_result,
            "titulo": titulo_atividade
        }

        return json.dumps(atividades_dict)