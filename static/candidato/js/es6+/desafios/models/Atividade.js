export class Atividade {

    constructor(titulo, descricao, alternativas) {
        this._titulo = titulo;
        this._descricao = descricao;
        this._alternativas = alternativas;
    }

    get titulo() {
        return this._titulo;
    }

    get descricao() {
        return this._descricao;
    }

    get alternativas() {
        return this._alternativas;
    }

}