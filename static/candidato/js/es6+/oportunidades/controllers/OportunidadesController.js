import { OportunidadesView } from "../views/OportunidadesView.js";
import { OportunidadesService } from "../services/OportunidadesService.js";

export class OportunidadesController {

    constructor(seletorController) {
        this._view = new OportunidadesView(seletorController);
        this._service = new OportunidadesService();
        this._init();
    }

    async _init() {
        const oportunidades = await this._service.buscarOportunidades();
        this._view.renderAll(oportunidades);
    }
}