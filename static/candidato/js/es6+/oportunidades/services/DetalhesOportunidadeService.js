import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";
import { Oportunidade } from "../models/Oportunidade.js";

export class DetalhesOportunidadeService {

    constructor() {
        this._userService = new UsuarioService();
    }

    buscarDetalhesOportunidade() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const vagaID = /vaga\/(\d+)/g.exec(window.location.hash)[1];
                resolve(new Oportunidade("são paulo", "desenvolvedor front-end", "Tecnologia", "2019-05-02", "Excel Avançado", "HTML5", "Desenvolver sistemas de grande porte", 1900, "vale refeição", vagaID))
            }, 300)
        });
    }

    candidatarOportunidade() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const vagaID = /vaga\/(\d+)/g.exec(window.location.hash)[1];
                resolve(fetch("/service/candidato/candidatar", {
                        method: "POST",
                        body: JSON.stringify({
                            candidatoID: this._userService.dadosRequisicao.candidatoID,
                            vagaID
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    .then(vagas => vagas.json()))
            }, 300)
        })

    }

}