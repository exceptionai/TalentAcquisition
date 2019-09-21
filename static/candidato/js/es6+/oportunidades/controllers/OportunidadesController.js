import { OportunidadesView } from "../views/OportunidadesView.js";

export class OportunidadesController {

    constructor(seletorController) {
        this._view = new OportunidadesView(seletorController);
        this._init();
    }

    _init() {
        const vagas = [{
            cargo: "Desenvolvedor Front-end",
            area: "Tecnologia",
            cidade: "São Paulo",
            dataAbertura: "02/05/2019",
        }, {
            cargo: "Líder Operacional",
            area: "Produção",
            cidade: "São Paulo",
            dataAbertura: "04/08/2019",
            selecionado: true
        }, {
            cargo: "Biomédico",
            area: "Biologia",
            cidade: "São Paulo",
            dataAbertura: "02/05/2019"
        }, {
            cargo: "LATAM Product Lead",
            area: "",
            cidade: "São Paulo",
            dataAbertura: "02/05/2019"
        }]
        this._view.renderAll(vagas);
    }
}