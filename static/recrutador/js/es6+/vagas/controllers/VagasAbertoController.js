import { VagasAbertoView } from "../views/VagasAbertoView.js";
import { VagasAbertoService } from "../services/VagasAbertoService.js";

export class VagasAbertoController {

    constructor() {
        this._view = new VagasAbertoView("#vagasCards");
        this._service = new VagasAbertoService();
        this._init();
    }

    async _init() {
        const oportunidades = await this._service.buscarOportunidades();
        this._view.renderAll(oportunidades);
    }
}