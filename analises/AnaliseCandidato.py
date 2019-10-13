class AnaliseCandidato:

    def __init__(self,candidato, vaga):
        print('vaga',vaga)
        print('candidato',candidato)
        self.candidato = candidato
        self.vaga = vaga

    def pontuar_salario(self):
        pontos = (self.vaga.salario - self.candidato.expectativa_salario + (0.4*self.vaga.salario)) / 10
        return pontos if pontos >= 0 else 0

    @property
    def pontuacao(self):
        return self.pontuar_salario()