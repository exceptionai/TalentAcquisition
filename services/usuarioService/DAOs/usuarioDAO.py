from connections.connectionFactory import ConnectionFactory

class UsuarioDAO:

    def iserir(self,login,senha):
        query = f'INSERT INTO usuario (login,senha) VALUES ("{login}","{senha}")'
        ConnectionFactory.execute(query)
        return ConnectionFactory.get_cursor().lastrowid

    def autenticar(self,login,senha):
        query = f'SELECT c.candidato_id FROM usuario u LEFT JOIN candidato c ON c.usuario_id = u.usuario_id WHERE u.login = "{login}" AND u.senha = "{senha}"'
        print(query)
        ConnectionFactory.execute(query)
        return ConnectionFactory.fetchone()