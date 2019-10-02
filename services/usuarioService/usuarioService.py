import json
from services.usuarioService.DAOs.usuarioDAO import UsuarioDAO
import hashlib 
from main import app
import datetime
import jwt
  
class UsuarioService:
    def __init__(self):
        self.dao = UsuarioDAO()

    def inserir(self,dados_usuario):
        senha = dados_usuario["senha"]
        login = dados_usuario["email"]
        senha_criptografada = hashlib.md5(senha.encode()).hexdigest()

        usuario_id = self.dao.iserir(login, senha_criptografada)
        dados_usuario["usuarioID"] = usuario_id
        return json.dumps(dados_usuario)
    
    def encode_auth_token(self, usuario_id):
            """
            Generates the Auth Token
            :return: string
            """
            try:
                payload = {
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
                    'iat': datetime.datetime.utcnow(),
                    'sub': usuario_id
                }
                return jwt.encode(
                    payload,
                    app.config.get('SECRET_KEY'),
                    algorithm='HS256'
                ).decode('utf-8')
            except Exception as e:
                return e

    def autenticar(self, login, senha):
        senha_criptografada = hashlib.md5(senha.encode()).hexdigest()
        usuario_id = self.dao.autenticar(login,senha_criptografada)
        if not usuario_id[0]:
            raise('Usuario Invalido')
        usuario_dict = {
            "candidatoID": usuario_id[0],
            "token": self.encode_auth_token(usuario_id[0]),
            "tipoUsuarioID": 1
        }
        print(usuario_dict)
        return json.dumps(usuario_dict)