import { DesafiosCategoriaView } from '../views/DesafiosCategoriaView.js';
import { DesafiosCategoriaService } from '../services/DesafiosCategoriaService.js';

export class DesafiosCategoriaController {
    constructor() {
        this._view = new DesafiosCategoriaView('desafiosAtividades');
        this._service = new DesafiosCategoriaService();
        this._init();
    }

    _init() {
        this.buscarDesafiosCategoria();
        $(".categoriasContainer [ex-router] a").click(this.buscarDesafiosCategoria.bind(this));

    }

    async buscarDesafiosCategoria() {
        const desafiosCategorias = await this._service.buscarDesafiosCategoria();
        this._view.renderAll(desafiosCategorias);

        this._esconderModal();
    }

    _esconderModal() {
        window.interceptarCliques = true;
        $("a").click(function(e) {
            if (this.hasAttribute('modal-link')) {
                $("[modal-element]").modal("hide");
            }
            window.interceptarCliques = false;
        });
    }
}