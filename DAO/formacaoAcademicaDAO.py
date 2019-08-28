from connections.connectionFactory import ConnectionFactory

class FormacaoAcademicaDAO:
    def __init__(self, formacao_academica):
        self.formacao_academica = formacao_academica
    
    def insere(self):
        ConnectionFactory.execute(f'INSERT INTO formacao_academica (instituicao, nome_curso, situacao, nivel) VALUES ( "{self.formacao_academica.instituicao}", "{self.formacao_academica.nome_curso}", "{self.formacao_academica.situacao}", "{self.formacao_academica.nivel}")')
        return ConnectionFactory.get_cursor().lastrowid