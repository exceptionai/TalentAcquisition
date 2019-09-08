from connections.connectionFactory import ConnectionFactory

class CursoExtraCurricularDAO:
    
    def __init__(self, curso_extra_curricular):
        self.curso_extra_curricular = curso_extra_curricular
    
    def insere(self):
        data = f"DATE(\"{self.curso_extra_curricular.data_inicial}\")" if self.curso_extra_curricular.data_inicial else "null"
        query = f'INSERT INTO curso_extra_curricular (nome, instituicao, data_inicial, duracao, situacao, descricao) VALUES ( "{self.curso_extra_curricular.nome}", "{self.curso_extra_curricular.instituicao}", {data}, "{self.curso_extra_curricular.duracao}", "{self.curso_extra_curricular.situacao}", "{self.curso_extra_curricular.descricao}")'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid
