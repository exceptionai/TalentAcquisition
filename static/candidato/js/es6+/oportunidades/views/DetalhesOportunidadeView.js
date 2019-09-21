import { Formater } from "../../curriculo/helpers/Formater.js";

export class DetalhesOportunidadeView {

    constructor(cargo, area_atuacao, requisitos_desejaveis, requisitos_obrigatorios, atividades, salario, beneficios) {
        this._cargo = $(cargo);
        this._area_atuacao = $(area_atuacao);
        this._requisitos_desejaveis = $(requisitos_desejaveis);
        this._requisitos_obrigatorios = $(requisitos_obrigatorios);
        this._atividades = $(atividades);
        this._salario = $(salario);
        this._beneficios = $(beneficios);
    }

    preencherDados(oportunidade) {
        this._cargo.val(oportunidade.cargo);
        this._area_atuacao.val(oportunidade.area);
        this._requisitos_desejaveis.val(oportunidade.requisitos_desejaveis)
        this._requisitos_obrigatorios.val(oportunidade.requisitos_obrigatorios);
        this._atividades.val(oportunidade.atividades);
        this._salario.val(Formater.numberToMoney(oportunidade.salario));
        this._beneficios.val(oportunidade.beneficios);
    }
}