import json 
from services.curriculoService.DAOs.curriculoDAO import CurriculoDAO
from connections.connectionFactory import ConnectionFactory

class CurriculoService:
    def __init__(self,candidato_id, curriculo_id = None):
        self.candidato_id = candidato_id
        self.dao = CurriculoDAO(candidato_id,curriculo_id)

    def remover(self):
        self.dao.remover_idiomas()
        self.dao.remover_experiencias_anteriores()
        self.dao.remover_curso_extra_curricular()
        self.dao.remover_endereco()
        self.dao.remover()
        mensagem_dict = {
            "mensagem": "Deletado com sucesso"
        }
        return json.dumps(mensagem_dict)

    def buscar(self):
        curriculo = self.dao.buscar()
        endereco = self.dao.buscar_endereco()
        curso_extra_curricular = self.dao.buscar_curso_extra_curricular()
        experiencias_anteriores = self.dao.buscar_experiencias_anteriores()
        formacao_academica = self.dao.buscar_formacao_academica()
        idiomas = self.dao.buscar_idiomas()
        curriculo_dict = { 
            "candidato": curriculo, 
            "endereco": endereco,
            "cursosComplementares": curso_extra_curricular, 
            "experienciasAnteriores": experiencias_anteriores, 
            "formacaoAcademica": formacao_academica, 
            "idiomas": idiomas
        }
        ConnectionFactory.close_connection()
        return json.dumps(curriculo_dict, indent=4, sort_keys=True, default=str)
    