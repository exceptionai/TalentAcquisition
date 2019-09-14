import { DesbloqueavelView } from '../views/DesbloqueavelView.js';
import { DesbloqueavelService } from '../services/DesbloqueavelService.js';
import { Desbloqueavel } from '../models/Desbloqueavel.js';

export class DesbloqueavelController {

    constructor(userService) {
        this.view = new DesbloqueavelView("#desloqueavelContainer");
        this.service = new DesbloqueavelService();
        this.userService = userService;
        this._init();
    }

    _init() {
        this.gerarDesbloqueaveis();
    }

    async obterDesbloqueaveis() {
        const desbloqueaveisService = await this.service.buscarDesbloqueaveis();
        const desbloqueaveis = Desbloqueavel.generate(desbloqueaveisService);
        return desbloqueaveis;
    }

    async gerarDesbloqueaveis() {
        const desbloqueaveis = await this.obterDesbloqueaveis();
        this.view.renderAll(desbloqueaveis, this.desbloquear.bind(this));
    }

    desbloquear(desbloqueavel) {
        desbloqueavel.obtido = true;
        this.userService.diminuirPontos(desbloqueavel.pontos_minimos);
        this.userService.setTema(desbloqueavel.tema);
        this.gerarDesbloqueaveis();
    }


}