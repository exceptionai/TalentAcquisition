import { DetalhesOportunidadeView } from "../views/DetalhesOportunidadeView.js";
import { DetalhesOportunidadeService } from "../services/DetalhesOportunidadeService.js";
import { NotificacaoService } from "../../curriculo/services/NotificacaoService.js";

export class DetalhesOportunidadeController {
    constructor() {
        this._init();
    }

    _init() {
        this.buscarDetalhes()
        $(`#containerCardsVagas a`).click(this.buscarDetalhes.bind(this))

    }

    async buscarDetalhes() {
        this._service = new DetalhesOportunidadeService();
        const vaga = await this._service.buscarDetalhesOportunidade()
        $(`.selecionar_vaga`).off('click');
        $(`#oportunidade${vaga.oportunidadeID} #selecionar_vaga`).click(this.candidatarVaga.bind(this))
        this._view = new DetalhesOportunidadeView(`#oportunidade${vaga.oportunidadeID} #cargo_vaga`, `#oportunidade${vaga.oportunidadeID} #area_atuacao`, `#oportunidade${vaga.oportunidadeID} #requisitos_desejaveis`, `#oportunidade${vaga.oportunidadeID} #requisitos_obrigatorios`, `#oportunidade${vaga.oportunidadeID} #atividade`, `#oportunidade${vaga.oportunidadeID} #salario_vaga`, `#oportunidade${vaga.oportunidadeID} #beneficios_vaga`, `#oportunidade${vaga.oportunidadeID} #selecionar_vaga`);
        this._view.preencherDados(vaga)
    }

    async candidatarVaga() {
        await this._service.candidatarOportunidade();
        NotificacaoService.sucesso("Vaga Selecionada com sucesso", "Sucesso");
        this._view.botaoSelecionado();
    }


}