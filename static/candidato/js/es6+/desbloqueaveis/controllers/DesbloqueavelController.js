import { DesbloqueavelView } from '../views/DesbloqueavelView.js';
import { DesbloqueavelService } from '../services/DesbloqueavelService.js';
import { Desbloqueavel } from '../models/Desbloqueavel.js';

export class DesbloqueavelController {

    constructor(userService) {
        this.view = new DesbloqueavelView("#desloqueavelContainer");
        this.service = new DesbloqueavelService();
        this.userService = userService;
        this.desbloqueaveis = [];
        this._init();
    }

    _init() {
        this.gerarDesbloqueaveis();
    }

    async obterDesbloqueaveis() {
        const desbloqueaveisService = await this.service.buscarDesbloqueaveis();
        this.desbloqueaveis = Desbloqueavel.generate(desbloqueaveisService);
        return this.desbloqueaveis;
    }

    async gerarDesbloqueaveis() {
        const desbloqueaveis = await this.obterDesbloqueaveis();
        this.view.renderAll(desbloqueaveis, this.desbloquear.bind(this));
    }

    desbloquear(desbloqueavel) {
        const desbloqueavelAnterior = this.desbloqueaveis.find(desbloqueavelLista =>
            desbloqueavelLista.obtido
        )
        if (desbloqueavelAnterior) {
            desbloqueavelAnterior.obtido = false;
        }
        this.userService.diminuirPontos(desbloqueavel.pontos_minimos);
        this.userService.setTema(desbloqueavel.tema);
        desbloqueavel.obtido = true;
        desbloqueavel.pontos_minimos = 0;

        this.view.renderAll(this.desbloqueaveis, this.desbloquear.bind(this));
    }


}