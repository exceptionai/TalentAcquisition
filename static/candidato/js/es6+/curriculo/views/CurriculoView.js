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

    habilitarEdicao(botaoEdicao) {
        $("#btnEnviar").removeClass("d-none");
        $(botaoEdicao).addClass("d-none");
    }

    habilitarEnvio(botaoEnvio) {
        $("#btnEditar").removeClass("d-none");
        $(botaoEnvio).addClass("d-none");
    }

    desbloquearCampos(e) {
        $("form .btn-danger, form .btn-high-danger").removeClass("d-none");
        $("#formularioCurriculo input,#formularioCurriculo textarea,#formularioCurriculo select").attr('disabled', false);
        $("#formularioCurriculo p.text-muted").show();
    }

    bloquearCampos() {
        $("#formularioCurriculo input,#formularioCurriculo textarea,#formularioCurriculo select").attr('disabled', true);
        $("#formularioCurriculo p.text-muted").hide();
        $("form .btn-danger, form .btn-high-danger").addClass("d-none");
    }

    preencherFormulario(camposCurriculo) {
        const campos = Object.keys(camposCurriculo);
        $("#botaoExperiencias").click();
        $("#botaoFormacoes").click();
        $("#botaoCursos").click();
        $("#botaoIdiomas").click();
        this.bloquearCampos()
        campos.forEach(campo => {
            const $campo = $(`[name=${campo}]`);
            $campo.val(camposCurriculo[campo]);
            $campo.trigger("change");

            const $campoPai = $(`[data-parent=${campo}]`);
            if ($campoPai.length) {
                for (let campoService in camposCurriculo[campo]) {
                    const $campoPai = $(`[data-parent=${campo}][name=${campoService}]`);
                    $campoPai.val(camposCurriculo[campo][campoService])
                    $campoPai.trigger("change");
                }
            }
            if (!$campo.attr('data-parent')) {}
        })

    }
}