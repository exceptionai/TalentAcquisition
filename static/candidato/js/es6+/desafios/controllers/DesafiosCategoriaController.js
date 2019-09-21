import { DesafiosCategoriaView } from '../views/DesafiosCategoriaView.js';
import { DesafiosCategoriaService } from '../services/DesafiosCategoriaService.js';

export class DesafiosCategoriaController {
    constructor() {
        this._view = new DesafiosCategoriaView('desafiosAtividades');
        this._service = new DesafiosCategoriaService();
        this._init();
    }

    _init() {
        this._service.buscarDesafiosCategoria().then(desafiosCategorias => {
            this._view.renderAll(desafiosCategorias);
        })
    }
}