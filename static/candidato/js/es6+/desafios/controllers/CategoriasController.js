import { CategoriasView } from '../views/CategoriasView.js';
import { CategoriaService } from '../services/CategoriaService.js';

export class CategoriasController {

    constructor(categoriasContainer) {
        this._view = new CategoriasView(categoriasContainer);
        this._service = new CategoriaService();
        this._init();
    }

    _init() {
        this.gerarCategorias();
    }

    async gerarCategorias() {
        const categorias = await this.obterCategorias();
        this._view.renderAll(categorias);
    }

    async obterCategorias() {
        const categorias = await this._service.obterCategorias();
        return categorias;
    }
}