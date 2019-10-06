const nome = localStorage.getItem('nome')
const pontos = localStorage.getItem('pontos')
const experienciaAtual = localStorage.getItem('experienciaAtual')
const proximoLevel = localStorage.getItem('proximoLevel')
const porcentualXP = experienciaAtual / proximoLevel * 100;

export class UsuarioService {

    constructor() {
        this._usuario = {};
        this._tema = {};
        this._temaAnterior = {};
        this.obterUsuario();
        this._obterDesbloqueaveis();
    }

    _obterDesbloqueaveis() {
        this._temaAnterior = this._tema;
        return fetch(`/service/candidato/desbloqueaveis_candidato?candidatoID=${this.candidatoID}`)
            .then(res => res.json())
            .then(tema => this._tema = tema);
    }

    obterUsuario() {
        return fetch(`service/candidato?candidatoID=${this.candidatoID}&token=${this.token}`)
            .then(candidato => candidato.json())
            .then(candidato => {
                this._usuario = candidato;
                return candidato;
            })
    }

    _aplicarTema(tema) {
        const pagina = $("body");
        pagina.removeClass();
        pagina.addClass(tema);
        if (tema)
            $("#logo-bayer").attr("src", "https://shared.bayer.com/img/logo-wht.svg");
        else
            $("#logo-bayer").attr("src", "/static/shared/img/bayer-logo.svg");

    }

    _aplicarInteratividadeTema(tema) {
        $("#" + tema).removeClass("op-0");

    }

    setTema(tema) {
        switch (tema.tipo) {

            case "tema interativo":
                this._aplicarInteratividadeTema(tema.valor);

            case "tema":
                this._aplicarTema(tema.valor);
                break;
        }
    }

    updateTema(tema_id) {


        const body = JSON.stringify({
            desbloqueavelId: tema_id,
            token: this.dadosRequisicao.token,
            usuarioId: this.dadosRequisicao.candidatoID
        });

        return fetch(`/service/candidato/desbloqueaveis_candidato?candidatoID=${this.candidatoID}&desbloqueavelID=${tema_id}`, {
            method: "PUT",
            body
        }).then(res => {
            if (this._tema.valor) $("#" + this._tema.valor).addClass("op-0");

            return res
        })

    }



    async getTema() {
        await this._obterDesbloqueaveis();
        return Promise.resolve(this._tema);
    }

    diminuirPontos(pontos) {
        fetch(`/service/candidato/diminuir_pontuacao?candidatoID=${this.candidatoID}&pontos=${pontos}`)
            .then(res => res.json())
            .then(res => {
                $(".qntPontos").html($(".qntPontos").html() - pontos);
                return res;
            })
    }

    get dadosRequisicao() {
        return {
            candidatoID: this.candidatoID,
            token: this.token
        }
    }

    get token() {
        return localStorage.getItem("token");
    }

    get candidatoID() {
        const candidatoID = localStorage.getItem("candidatoID");
        return candidatoID;
    }

}