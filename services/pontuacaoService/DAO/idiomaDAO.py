from connections.connectionFactory import ConnectionFactory

class IdiomaDAO:
    def __init__(self,idioma):
        self.idioma = idioma
    
    def insere(self):
        ConnectionFactory.execute(f'INSERT INTO idioma (idioma) VALUES ( "{self.idioma.idioma}")')
        return ConnectionFactory.get_cursor().lastrowid

    @staticmethod
    def insere_proficiencia(idioma_id, proficiencia_id):
        ConnectionFactory.execute(f'INSERT INTO proficiencia_idioma (idioma_id, proficiencia_id) VALUES ( {idioma_id}, {proficiencia_id})')
        return ConnectionFactory.get_cursor().lastrowid