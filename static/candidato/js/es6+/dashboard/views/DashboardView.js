export class DashboardView {

    constructor(seletorTextoCandidatura, seletorDataCandidatura) {
        this._campoDescricaoCandidatura = $(seletorTextoCandidatura);
        this._campoDataCandidatura = $(seletorDataCandidatura);
    }

    preencherCardCandidatura(candidatura) {
        this._campoDescricaoCandidatura.hide();
        this._campoDataCandidatura.hide();
        this._campoDescricaoCandidatura.html(candidatura.status)
        this._campoDataCandidatura.html(candidatura.dataAtualizacao)
        this._campoDescricaoCandidatura.fadeIn(500);
        this._campoDataCandidatura.fadeIn(500);
    }

    preencherDataDesempenhoSemanal(seletorDataDesempenhoSemanal, dataAtualizacao) {
        const campoData = $(seletorDataDesempenhoSemanal);
        campoData.hide();
        campoData.html(dataAtualizacao);
        campoData.fadeIn(500);
    }

    preencherDataDesempenhoProgressivo(seletorDataDesempenhoProgressivo, dataAtualizacao) {
        const campoData = $(seletorDataDesempenhoProgressivo);
        campoData.hide();
        campoData.html(dataAtualizacao);
        campoData.fadeIn(500);
    }
}