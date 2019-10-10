import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";
import { Oportunidade } from "../models/Oportunidade.js";

export class DetalhesOportunidadeService {

    constructor() {
        this._userService = new UsuarioService();
    }

    buscarDetalhesOportunidade() {
        console.log('teste')
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const vagaID = /vaga\/(\d+)/g.exec(window.location.hash)[1];
                const candidatoID = this._userService.dadosRequisicao.candidatoID;
                resolve(fetch(`/service/vaga/detalhes?candidatoID=${candidatoID}&vagaID=${vagaID}`)
                    .then(res => res.json())
                    .then(res => new Oportunidade("são paulo", res.cargo, res.areaAtuacao, res.dataAbertura, res.requisitosDesejaveis, res.requisitosObrigatorios, res.principaisAtividades, res.salario, res.beneficios, res.vagaID))
                );
            }, 400)
        })

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