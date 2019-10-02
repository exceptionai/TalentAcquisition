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

        $("#levelAtual").html(pontuacao.level)


        $("#nomeUsuario").html(candidato.nome.split(" ")[0])
        $("#nomeUsuario").parent().removeClass('d-none');

        this._service.getTema().then(tema =>
            this._service.setTema(tema)
        )

    }


}