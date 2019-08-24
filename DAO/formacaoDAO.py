from connections.connectionFactory import ConnectionFactory

class FormacaoDAO:
    def __init__(self, formacao_academica):
        self.formacao_academica = formacao_academica
    
    def insere(self):
        ConnectionFactory.execute('INSERT INTO formacao_academica (instituicao, nome_curso, data_inicio, nivel, situacao) VALUES ('
        f' {self.experiencia_anterior.cargo}, {self.formacao_academica.instituicao}, {self.formacao_academica.nome_curso}, {self.formacao_academica.data_inicio}, {self.formacao_academica.nivel}, {self.formacao_academica.situacao})')
