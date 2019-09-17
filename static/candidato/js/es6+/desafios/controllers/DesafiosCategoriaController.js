import { DesafiosCategoriaView } from '../views/DesafiosCategoriaView.js';

export class DesafiosCategoriaController {
    constructor() {
        this._view = new DesafiosCategoriaView('desafiosAtividades');
        this._init();
    }

    _init() {
        this._view.render('Matemática', 'Conhecimentos de operações matemáticas.', null, 20, 0, 5, 30);
        this._view.render('Português', 'Conhecimentos de sintaxe e semântica', null, 15, 0, 5, 30);
        this._view.render('Informática', 'Conhecimentos de pacote office e operações básicas no sistema operacional Windows', null, 10, 0, 5, 20);
    }
}