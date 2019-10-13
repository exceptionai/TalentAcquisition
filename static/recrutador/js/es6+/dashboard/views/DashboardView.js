export class DashboardView {

    renderCandidatosTotais(candidatos) {
        $("#candidatosTotais").html(candidatos);
    }

    renderVagasAberto(vagas, mensagemAtualizacao) {
        $("#vagasAberto").html(vagas);
        $("#atualizacaoVagasAberto").html(mensagemAtualizacao);
    }

    renderCandidatosPotenciais(candidatosPotenciais, mensagemAtualizacao) {
        $("#candidatosPotenciais").html(candidatosPotenciais);
        $("#atualizacaoCandidatosPotenciais").html(mensagemAtualizacao);
    }

    _templateDetalhesCandidato({ candidato, pontuacao_alcancada, vaga, status_candidatura }) {

        return `
            <tr>
                <td>${candidato.charAt(0).toUpperCase() + candidato.substr(1)}</td>
                <td>${pontuacao_alcancada}</td>
                <td>${vaga}</td>
                <td>${status_candidatura}</td>
            </tr>
        `
    }

    _renderDetalhesCandidatos(candidato) {
        const template = this._templateDetalhesCandidato(candidato)
        $("#corpoCandidatosDestaque").append(template)
    }

    renderAllDetalhesCandidatos(candidatos) {
        for (let candidato of candidatos) {
            this._renderDetalhesCandidatos(candidato)
        }
    }


}