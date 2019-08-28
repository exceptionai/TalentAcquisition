from connections.connectionFactory import ConnectionFactory

class ExperienciaAnteriorDAO:
    def __init__(self,experiencia_anterior):
        self.experiencia_anterior = experiencia_anterior

    def insere(self):
        data_entrada = f"DATE(\"{self.experiencia_anterior.entrada}\")" if self.experiencia_anterior.entrada else "null"
        data_saida = f"DATE(\"{self.experiencia_anterior.saida}\")" if self.experiencia_anterior.saida else "null"
        salario = self.experiencia_anterior.salario if self.experiencia_anterior.salario else "null"
        query = f'INSERT INTO experiencia_anterior (cargo, empresa, emprego_atual, entrada, saida, principais_atividades, salario) VALUES ( "{self.experiencia_anterior.cargo}", "{self.experiencia_anterior.empresa}", {self.experiencia_anterior.emprego_atual}, {data_entrada}, {data_saida}, "{self.experiencia_anterior.principais_atividades}", {salario})'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid
