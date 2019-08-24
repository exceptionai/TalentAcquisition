from models.experienciaAnterior import ExperienciaAnterior
from connections.connectionFactory import ConnectionFactory

class ExperienciaAnteriorDAO:
    def __init__(self,experiencia_anterior):
        self.experiencia_anterior = experiencia_anterior

    def insere(self, experiencia_anterior):
        ConnectionFactory.execute('INSERT INTO experiencia_anterior (cargo, empresa, atual, entrada, saida) VALUES ('
            f' {self.experiencia_anterior.cargo}, {self.experiencia_anterior.empresa}, {self.experiencia_anterior.atual}, {self.experiencia_anterior.entrada}, {self.experiencia_anterior.saida})')
