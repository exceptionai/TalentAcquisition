import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";

export class CategoriaService {

    constructor() {
        const usuarioService = new UsuarioService();
        this._dadosRequisicao = usuarioService.dadosRequisicao;
    }

    obterCategorias() {
        return fetch(`/service/candidato/categoria_desafio?candidatoID=${this._dadosRequisicao.candidatoID}&token=${this._dadosRequisicao.token}`)
            .then(res => res.json())
    }
}