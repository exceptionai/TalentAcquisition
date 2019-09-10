export class CandidatosService{

    buscarDadosTodosCandidatos(){
        return [{
            candidato: "Renan do Nascimento Sanches",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 155,
            pontuacao_minima: 200,
            fator_destaque: "Objetivo",
            status_candidatura: "Desafios Pontuados",
            curriculo: 1,
            detalhes_pontuacao: 1
        }, {
            candidato: "Alisson Chabaribery",
            vaga: "Gerente de Biotecnologia",
            pontuacao_alcancada: 257,
            pontuacao_minima: 220,
            fator_destaque: "Experiências Anteriores",
            status_candidatura: "Currículo",
            curriculo: 2,
            detalhes_pontuacao: 2
        }, {
            candidato: "Gabriel Lopes Pontes",
            vaga: "Analista de Recursos",
            pontuacao_alcancada: 350,
            pontuacao_minima: 120,
            fator_destaque: "Evolução nos testes",
            status_candidatura: "Desafios Pontuados",
            curriculo: 3,
            detalhes_pontuacao: 3
        }, {
            candidato: "Vanessa Cunha Queiroz",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 275,
            pontuacao_minima: 200,
            fator_destaque: "Cursos Extracurrículares",
            status_candidatura: "Desafios Pontuados",
            curriculo: 4,
            detalhes_pontuacao: 4
        }, {
            candidato: "Matheus Machado",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 320,
            pontuacao_minima: 200,
            fator_destaque: "Experiências Anteriores",
            status_candidatura: "Desafios Pontuados",
            curriculo: 5,
            detalhes_pontuacao: 5
        }, {
            candidato: "Gabriele Ferreira",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 155,
            pontuacao_minima: 200,
            fator_destaque: "Evolução nos testes",
            status_candidatura: "Desafios Pontuados",
            curriculo: 6,
            detalhes_pontuacao: 6
        }, {
            candidato: "Daniela Silva",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 155,
            pontuacao_minima: 200,
            fator_destaque: "Experiências Anteriores",
            status_candidatura: "Desafios Pontuados",
            curriculo: 7,
            detalhes_pontuacao: 7
        }, {
            candidato: "Leonardo Ferraz Sales",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 155,
            pontuacao_minima: 200,
            fator_destaque: "Cursos Extracurrículares",
            status_candidatura: "Desafios Pontuados",
            curriculo: 8,
            detalhes_pontuacao: 8
        }, {
            candidato: "Jessica Pontes Machado",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 155,
            pontuacao_minima: 200,
            fator_destaque: "Objetivo",
            status_candidatura: "Desafios Pontuados",
            curriculo: 9,
            detalhes_pontuacao: 9
        }, {
            candidato: "Maria Carla",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 155,
            pontuacao_minima: 200,
            fator_destaque: "Cursos Extracurrículares",
            status_candidatura: "Desafios Pontuados",
            curriculo: 10,
            detalhes_pontuacao: 10
        }, {
            candidato: "Josefina Santos",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 155,
            pontuacao_minima: 200,
            fator_destaque: "Experiências Anteriores",
            status_candidatura: "Desafios Pontuados",
            curriculo: 10,
            detalhes_pontuacao: 10
        }, {
            candidato: "Lucas Machado",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 30,
            pontuacao_minima: 200,
            fator_destaque: "Evolução nos testes",
            status_candidatura: "Desafios Pontuados",
            curriculo: 11,
            detalhes_pontuacao: 11
        }, {
            candidato: "Daniel Queiroz da Silva",
            vaga: "Desenvolvedor de Sistemas",
            pontuacao_alcancada: 155,
            pontuacao_minima: 200,
            fator_destaque: "Cursos Extracurrículares",
            status_candidatura: "Desafios Pontuados",
            curriculo: 12,
            detalhes_pontuacao: 12
        }]
    }

    buscarDadosCandidatosPotenciais(){
        return new Promise(resolve=>{
            const dadosTabela = [{
                candidato: "Renan do Nascimento Sanches",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 155,
                pontuacao_minima: 200,
                fator_destaque: "Objetivo",
                status_candidatura: "Desafios Pontuados",
                curriculo: 1,
                detalhes_pontuacao: 1
            }, {
                candidato: "Alisson Chabaribery",
                vaga: "Gerente de Biotecnologia",
                pontuacao_alcancada: 257,
                pontuacao_minima: 220,
                fator_destaque: "Experiências Anteriores",
                status_candidatura: "Currículo",
                curriculo: 2,
                detalhes_pontuacao: 2
            }, {
                candidato: "Gabriel Lopes Pontes",
                vaga: "Analista de Recursos",
                pontuacao_alcancada: 350,
                pontuacao_minima: 120,
                fator_destaque: "Evolução nos testes",
                status_candidatura: "Desafios Pontuados",
                curriculo: 3,
                detalhes_pontuacao: 3
            }, {
                candidato: "Vanessa Cunha Queiroz",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 275,
                pontuacao_minima: 200,
                fator_destaque: "Cursos Extracurrículares",
                status_candidatura: "Desafios Pontuados",
                curriculo: 4,
                detalhes_pontuacao: 4
            }, {
                candidato: "Matheus Machado",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 320,
                pontuacao_minima: 200,
                fator_destaque: "Experiências Anteriores",
                status_candidatura: "Desafios Pontuados",
                curriculo: 5,
                detalhes_pontuacao: 5
            }, {
                candidato: "Gabriele Ferreira",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 155,
                pontuacao_minima: 200,
                fator_destaque: "Evolução nos testes",
                status_candidatura: "Desafios Pontuados",
                curriculo: 6,
                detalhes_pontuacao: 6
            }, {
                candidato: "Daniela Silva",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 155,
                pontuacao_minima: 200,
                fator_destaque: "Experiências Anteriores",
                status_candidatura: "Desafios Pontuados",
                curriculo: 7,
                detalhes_pontuacao: 7
            }, {
                candidato: "Leonardo Ferraz Sales",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 155,
                pontuacao_minima: 200,
                fator_destaque: "Cursos Extracurrículares",
                status_candidatura: "Desafios Pontuados",
                curriculo: 8,
                detalhes_pontuacao: 8
            }, {
                candidato: "Jessica Pontes Machado",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 155,
                pontuacao_minima: 200,
                fator_destaque: "Objetivo",
                status_candidatura: "Desafios Pontuados",
                curriculo: 9,
                detalhes_pontuacao: 9
            }, {
                candidato: "Maria Carla",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 155,
                pontuacao_minima: 200,
                fator_destaque: "Cursos Extracurrículares",
                status_candidatura: "Desafios Pontuados",
                curriculo: 10,
                detalhes_pontuacao: 10
            }, {
                candidato: "Josefina Santos",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 155,
                pontuacao_minima: 200,
                fator_destaque: "Experiências Anteriores",
                status_candidatura: "Desafios Pontuados",
                curriculo: 10,
                detalhes_pontuacao: 10
            }, {
                candidato: "Lucas Machado",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 30,
                pontuacao_minima: 200,
                fator_destaque: "Evolução nos testes",
                status_candidatura: "Desafios Pontuados",
                curriculo: 11,
                detalhes_pontuacao: 11
            }, {
                candidato: "Daniel Queiroz da Silva",
                vaga: "Desenvolvedor de Sistemas",
                pontuacao_alcancada: 155,
                pontuacao_minima: 200,
                fator_destaque: "Cursos Extracurrículares",
                status_candidatura: "Desafios Pontuados",
                curriculo: 12,
                detalhes_pontuacao: 12
            }]
            resolve(dadosTabela);
        })
    }
}