import { UsuarioService } from "../services/UsuarioService.js";

export class UsuarioController {
    constructor() {
        this._service = new UsuarioService();
        this._init();
    }

    async _init() {
        const usuario = await this._service.obterUsuario();
        const { candidato, pontuacao } = usuario;
        $(".qntPontos").html(candidato.pontos_consumiveis)

        $('.experienciaAtual').html(pontuacao.pontuacao_atual);
        $(".pontosProximoLevel").html(pontuacao.pontuacao_maxima)

        const percentual = pontuacao.pontuacao_atual / pontuacao.pontuacao_maxima * 100;

        $(".pontosProximoLevelBar").css('width', `${percentual}%`)

        $("#nomeUsuario").html(candidato.nome)
        $("#nomeUsuario").parent().removeClass('d-none');
        const pagina = $("body");
        pagina[0].classList = "";
        pagina.addClass(this._service.getTema());

        if (this._service.getTema())
            $("footer img").attr("src", "https://shared.bayer.com/img/logo-wht.svg");
        else
            $("footer img").attr("src", "https://shared.bayer.com/img/bayer-logo.svg");
    }


}