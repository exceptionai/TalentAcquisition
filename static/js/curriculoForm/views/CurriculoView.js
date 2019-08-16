export class CurriculoView {

    constructor() {
        this._contadorCampo = 0;
        this._dinamicoCampoContador = 0;
    }

    adicionarCampo(campo, template) {
        this._contadorCampo++
            campo.append(template);
        return this._contadorCampo;
    }

    botao(botaoID) {
        return $(`#${botaoID}`);
    }

    campo(campoID) {
        return $(`#${campoID}`);
    }

    removerCampo(campo, id) {
        const campoARemover = $("#" + campo + id);
        campoARemover.fadeOut(500);
        setTimeout(() => campoARemover.remove(), 500);
    }

    botaoRemover(campoID, contador) {
        return $(`#${campoID}Remover${contador}`)
    }

    template() {
        throw new Error('O método template deve ser sobreescrito')
    }
}