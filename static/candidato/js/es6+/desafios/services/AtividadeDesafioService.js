import { Atividade } from "../models/Atividade.js";
import { Alternativa } from "../models/Alternativa.js";

export class AtividadeDesafioService {
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
                                    atividade.titulo,
                                    atividade.descricao,
                                    atividade.alternativas.map(
                                        alternativa => new Alternativa(alternativa)
                                    )
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