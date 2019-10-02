import { Formater } from "../../shared/utils/Formater.js";

export class FasesView {

    constructor(fases, container, seletorCampoCard, seletorData) {
        this._campoCard = $(seletorCampoCard);
        this._dataCard = $(seletorData)
        this._container = $(container);
        this._fases = fases;
    }

    _templateTabela(fase) {
        return `
            <tr>
                <td>${fase.descricao}</td>
                <td>${fase.status.charAt(0).toUpperCase() + fase.status.substr(1).toLowerCase()}</td>
                <td>${fase.pontuacao || '-'}</td>
                <td>${Formater.diaMes(fase.dataInicial)} - ${Formater.diaMes(fase.dataFinal)}</td>
            </tr>
        `;
    }

    preencherCard(data) {
        this._campoCard.hide();
        this._dataCard.hide();
        const ultimaFase = this._fases[this._fases.length - 1];
        const { descricao } = ultimaFase;
        this._dataCard.html(data);
        this._campoCard.html(descricao);
        this._dataCard.fadeIn(500);
        this._campoCard.fadeIn(500);
    }

    renderAllTabela() {
        this._container.hide();
        this._container.html("");
        this._fases.forEach(fase => {
            const template = this._templateTabela(fase);
            this._container.append(template)
        })
        this._container.fadeIn(500);
    }
}