const nome = localStorage.getItem('nome')
const pontos = localStorage.getItem('pontos')
const experienciaAtual = localStorage.getItem('experienciaAtual')
const proximoLevel = localStorage.getItem('proximoLevel')
const porcentualXP = experienciaAtual / proximoLevel * 100;

export class UsuarioService {

    constructor() {
        this._usuario = {}
    }

    obterUsuario() {
        return fetch(`service/candidato?candidatoID=${this.candidatoID}`)
            .then(candidato => candidato.json())
            .then(candidato => {
                this._usuario = candidato;
                return candidato;
            })
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
        this._usuario.candidato.pontos_consumiveis -= pontos;
        localStorage.setItem('pontos', usuario.pontos)
    }

    get dadosRequisicao() {
        return {
            candidatoID: this.candidatoID,
            token: this.token
        }
    }

    get token() {
        return 123;
    }

    get candidatoID() {
        const candidatoID = localStorage.getItem("candidatoID");
        return candidatoID;
    }

}