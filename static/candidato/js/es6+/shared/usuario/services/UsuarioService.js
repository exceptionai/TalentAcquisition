const nome = localStorage.getItem('nome')
const pontos = localStorage.getItem('pontos')
const experienciaAtual = localStorage.getItem('experienciaAtual')
const proximoLevel = localStorage.getItem('proximoLevel')
const porcentualXP = experienciaAtual / proximoLevel * 100;
const usuario = {
    nome,
    pontos,
    experienciaAtual,
    proximoLevel,
    porcentualXP,

}

export class UsuarioService {
    obterUsuario() {
        return usuario
    }

    setTema(tema) {
        usuario.tema = tema;
        localStorage.setItem('tema', tema)
    }

    getTema() {
        const tema = localStorage.getItem('tema')
        return tema
    }

    diminuirPontos(pontos) {
        usuario.pontos -= pontos;
        localStorage.setItem('pontos', usuario.pontos)
    }

}