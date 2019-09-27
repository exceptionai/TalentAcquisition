export class Alternativa {
    constructor(descricao) {
        this._descricao = descricao;
        this._selecionada = false;
    }

    get descricao() {
        return this._descricao;
    }

    get selecionada() {
        return this._selecionada;
    }

    set selecionada(selecionada) {
        this._selecionada = selecionada;
    }
}