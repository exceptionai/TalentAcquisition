import { Atividade } from "../models/Atividade.js";
import { Alternativa } from "../models/Alternativa.js";

export class AtividadeDesafioService {
    buscarQuestoes() {

        console.log(window.location.hash)
        const atividadeDesafio = /atividade\/(\d+)/g.exec(window.location.hash)[1];
        return fetch(`/service/candidato/atividades?candidatoID=1&atividadeCategoriaID=${atividadeDesafio}`)
            .then(res => res.json())
            .then(resultado => {
                console.log(resultado)
                return {
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
            })

        // return new Promise(resolve => {
        //     resolve({
        //         questoes: [
        //             new Atividade("Juros compostos", "Aplicando hoje na caderneta de poupança a quantia de R$ 20.000,00, qual será o montante gerado ao final de 4 anos, sabendo que a rentabilidade mensal é de 0,5%?", [new Alternativa(1000), new Alternativa(2000), new Alternativa(300), new Alternativa(4000)]),
        //             new Atividade("Números Complexos", "Se z = (2 + i) ∙ (1 + i) ∙ i, então z, o conjugado de z, será dado por:", [new Alternativa("−3 − i", "1 − 3i", "3 − i", "−3 + i")])
        //         ],
        //         tempoRestante: 30
        //     })
        // })
    }
}