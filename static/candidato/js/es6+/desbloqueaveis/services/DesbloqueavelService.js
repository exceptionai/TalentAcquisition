import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";

export class DesbloqueavelService {

    constructor() {
        this._userService = new UsuarioService();
    }

    buscarDesbloqueaveis() {
        return fetch(`/service/candidato/desbloqueavel?candidatoID=${this._userService.dadosRequisicao.candidatoID}&token=${this._userService.dadosRequisicao.token}`)
            .then(res => res.json())

    }

    obterDesbloqueavel(desbloqueavelID) {
        return fetch(`/service/candidato/desbloqueaveis_candidato`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                candidatoID: this._userService.dadosRequisicao.candidatoID,
                token: this._userService.dadosRequisicao.token,
                desbloqueavelID
            })
        }).then(res => res.json())
    }

}