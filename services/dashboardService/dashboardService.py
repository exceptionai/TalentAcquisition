from services.dashboardService.DAOs.dashboardDAO import DashboardDAO
import json

class DashboardService:

    def __init__(self,candidato_id_requisicao):
        self.tipoResposta = "JSON"
        self.dao = DashboardDAO()
        self.candidato_id = candidato_id_requisicao.args.get("candidatoID")
        print(self.candidato_id)
        print('dadosRequisicao\n\n\n\n')

    def buscar_fases(self):
        fases = self.dao.busca_fases(self.candidato_id)
        fases_dict = []
        for fase in fases:
            fases_dict.append({
                "descricao": fase[0], 
                "status": fase[1], 
                "pontuacao": fase[2],
                "dataInicial": str(fase[3]),
                "dataFinal": str(fase[4])
            })
        return json.dumps(fases_dict)
    
    def buscar_candidatura(self):
        candidatura = self.dao.busca_candidatura(self.candidato_id)
        candidatura_dict = {"status": candidatura[0]}
        return json.dumps(candidatura_dict)

    def buscar_desempenho(self, data_inicial, data_final):
        desempenho_dias = self.dao.busca_desempenho(self.candidato_id, data_inicial, data_final)
        desempenho_dias_dict = []
        for desempenho_dia in desempenho_dias:
            desempenho_dias_dict.append({
                "pontuacao": desempenho_dia[0], 
                "data": str(desempenho_dia[1]),
            })
        return json.dumps(desempenho_dias_dict)

    def buscar_evolucao_progressiva(self, data_final, data_inicial = False):
        evolucao_progressiva_dados = self.dao.busca_evolucao(self.candidato_id,data_final, data_inicial)
        evolucao_progressiva_dict = []
        for desempenho_dia in evolucao_progressiva_dados:
            evolucao_progressiva_dict.append({
                "data": str(desempenho_dia[0]),
                "pontuacao": str(desempenho_dia[1]), 
            })
        return json.dumps(evolucao_progressiva_dict)