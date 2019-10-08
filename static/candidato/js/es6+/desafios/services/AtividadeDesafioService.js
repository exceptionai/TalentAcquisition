import { Atividade } from "../models/Atividade.js";
import { Alternativa } from "../models/Alternativa.js";
import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";

export class AtividadeDesafioService {
    constructor() {
        this._usuarioService = new UsuarioService();
    }

    salvarQuestoes(atividades) {
        const result = [];
        atividades.forEach(atividade => {
            let respostaSelecionada = null;
            atividade.alternativas.forEach(alternativa => {
                if (alternativa._selecionada) respostaSelecionada = alternativa._descricao[1];
            })
            result.push({
                atividadeID: atividade.atividadeID,
                respostaSelecionada
            })

        })
        const atividade_desafio = /atividade\/(\d+)/g.exec(window.location.hash)[1];
        console.log(atividade_desafio)
        return fetch("/service/candidato/atividade_desafio", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                candidatoID: this._usuarioService.dadosRequisicao.candidatoID,

                atividade_desafio_id: atividade_desafio,
                atividades: result

            })
        }).then(res => res.json())

    }

    buscarQuestoes() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const atividadeDesafio = /atividade\/(\d+)/g.exec(window.location.hash)[1];
                resolve(fetch(`/service/candidato/atividades?candidatoID=1&atividadeCategoriaID=${atividadeDesafio}`)
                    .then(res => res.json())
                    .then(resultado => {
                        return {
                            atividadeDesafioID: atividadeDesafio,
                            questoes: resultado.atividades.map(
                                atividade => new Atividade(
                                    atividade.id,
                                    atividade.titulo,
                                    atividade.descricao,
                                    atividade.alternativas.map(
                                        alternativa => new Alternativa(alternativa)
                                    ),
                                )
                            ),
                            titulo: resultado.titulo,
                            tempoRestante: resultado.tempoRestante
                        }
                    }));
            }, 300);

        });
    }
}