import { DetalhesOportunidadeView } from "../views/DetalhesOportunidadeView.js";
import { Oportunidade } from "./Oportunidade.js";

export class DetalhesOportunidadeController {
    constructor() {
        this._view = new DetalhesOportunidadeView("#cargo_vaga", "#area_atuacao", "#requisitos_desejaveis", "#requisitos_obrigatorios", "#atividade", "#salario_vaga", "#beneficios_vaga");
        this._init();
    }

    _init() {
        const oportunidade = new Oportunidade("são paulo", "desenvolvedor front-end", "Tecnologia", "2019-05-02", "Excel Avançado", "HTML5", "Desenvolver sistemas de grande porte", 1900, "vale refeição")
        this._view.preencherDados(oportunidade);
    }


}