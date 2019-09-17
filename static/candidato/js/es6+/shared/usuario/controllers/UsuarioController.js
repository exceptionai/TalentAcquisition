import { UsuarioService } from "../services/UsuarioService.js";

export class UsuarioController {
    constructor() {
        this._service = new UsuarioService();
        this._init();
    }

    _init() {
        const usuario = this._service.obterUsuario();
        $(".qntPontos").html(usuario.pontos)
        $(".pontosProximoLevel").html(usuario.proximoLevel)

        $('.experienciaAtual').html(usuario.experienciaAtual);
        $(".pontosProximoLevelBar").css('width', `${usuario.porcentualXP}%`)

        $("#nomeUsuario").html(usuario.nome)
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