class Pontuacao:
    def __init__(self, pontuacao_minima, candidato_id, pontuacao_objetivo, pontuacao_experiencias_anteriores,
                 pontuacao_cursos_extracurriculares, pontuacao_endereco, pontuacao_idioma, pontuacao_id=None):
        self.pontuacao_id = pontuacao_id
        self.candidato_id = candidato_id
        self.pontuacao_minima = pontuacao_minima
        self.pontuacao_objetivo = pontuacao_objetivo
        self.pontuacao_experiencias_anteriores = pontuacao_experiencias_anteriores
        self.pontuacao_cursos_extracurriculares = pontuacao_cursos_extracurriculares
        self.pontuacao_endereco = pontuacao_endereco
        self.pontuacao_idioma = pontuacao_idioma

    @property
    def pontuacao_alcancada(self):
        return self.pontuacao_objetivo + self.pontuacao_experiencias_anteriores + \
               self.pontuacao_cursos_extracurriculares + self.pontuacao_endereco + \
               self.pontuacao_endereco
