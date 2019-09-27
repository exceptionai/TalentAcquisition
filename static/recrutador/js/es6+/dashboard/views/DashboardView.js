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

    renderDetalhesCandidatos(nome, pontuacaoAlcancada, vagaDesejada, StatusVaga) {

    }


}