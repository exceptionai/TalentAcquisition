export class Atividade {

    constructor(atividadeID, titulo, descricao, alternativas) {
        this._id = atividadeID;
        this._titulo = titulo;
        this._descricao = descricao;
        this._alternativas = alternativas;
    }

    get atividadeID() {
        return this._id;
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