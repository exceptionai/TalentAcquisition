import json 
from services.curriculoService.DAOs.curriculoDAO import CurriculoDAO

class CurriculoService:
    def __init__(self,candidato_id):
        self.candidato_id = candidato_id
        self.dao = CurriculoDAO(candidato_id)

    def buscar(self):
        curriculo = self.dao.buscar();
        endereco = self.dao.buscarEndereco();
        print(curriculo)
        curriculo_dict = { 
            "candidato": curriculo, 
            "endereco": endereco,
            "cursosComplementares": { 
                "nome": "Regex avançado", 
                "instituicao": "Alura" 
            }, 
            "experienciasAnteriores": { 
                "nomeEmpresa": "Resource IT", 
                "cargo": "Analista de Suporte Jr.", 
                "dataSaida": "2019-01-31", 
                "dataEntrada": "2018-05-01" 
            }, 
            "formacaoAcademica": { 
                "curso": "Segurança da Informação", 
                "situacaoFormacao": "interrompido", 
                "nivelCurso": "graduacao", 
                "nomeInstituicao": "Universidade Nove de Julho" 
            }, 
            "idiomas": { 
                "nivelFala": "intermediario", 
                "nivelLeitura": "fluente", 
                "nivelEscrita": "fluente" 
            } 
        }

        return json.dumps(curriculo_dict)