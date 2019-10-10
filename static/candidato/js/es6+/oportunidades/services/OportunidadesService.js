import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";

export class OportunidadesService {

    constructor() {
        this._usuarioService = new UsuarioService();
    }

    buscarOportunidades() {
        const candidatoID = this._usuarioService.dadosRequisicao.candidatoID;
        return fetch(`/service/resumo_vaga?candidatoID=${candidatoID}`)
            .then(resumo_vagas => resumo_vagas.json())
    }

}