export class DesafioCategoria {
    constructor(id, titulo, descricao, pontosConquistados, pontosADesbloquear, desafiosRealizados, desafiosARealizar, tempo) {
        this._id = id;
        this._titulo = titulo;
        this._descricao = descricao;
        this._pontosConquistados = pontosConquistados;
        this._pontosADesbloquear = pontosADesbloquear;
        this._desafiosRealizados = desafiosRealizados;
        this._desafiosARealizar = desafiosARealizar;
        this._tempo = tempo;
    }

    get id() {
        return this._id;
    }

    get titulo() {
        return this._titulo;
    }

    get tempo() {
        return this._tempo;
    }

    get descricao() {
        return this._descricao;
    }

    get pontosConquistados() {
        return this._pontosConquistados;
    }

    get pontosADesbloquear() {
        return this._pontosADesbloquear;
    }

    get desafiosRealizados() {
        return this._desafiosRealizados;
    }

    get desafiosARealizar() {
        return this._desafiosARealizar;
    }

}