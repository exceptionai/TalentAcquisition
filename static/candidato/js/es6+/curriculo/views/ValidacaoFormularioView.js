export class ValidacaoFormularioView {

    static marcarInvalidos(elementos) {
        let primeiroInvalido = null;
        for (let elemento of elementos) {
            if (!elemento.checkValidity()) {
                primeiroInvalido = !primeiroInvalido ? elemento : primeiroInvalido;
                ValidacaoFormularioView._addClassInvalid(elemento);
            }
        }
        return primeiroInvalido;
    }


    static _addClassInvalid(element) {
        element = $(element);
        let lblElement = element.parent().children('label');
        let msgElement = lblElement.children('.mensagemValidacao');
        let lblText = lblElement.text();
        let mensagem = element.get(0).validationMessage;
        let existeMensagem = msgElement.length;

        if (element.is(':invalid')) {

            element.addClass('inputError');
            if (!existeMensagem) lblElement.html(`${lblText} <span class="mensagemValidacao">(${mensagem})</span>`)

            msgElement.text(`(${mensagem})`);
        } else {
            if (existeMensagem) msgElement.html('');
            element.removeClass('inputError');
        }
    }

    static mascara_salarios(...salariosID) {
        for (let salarioID of salariosID) {
            $(`#${salarioID}`).maskMoney({ prefix: 'R$ ', thousands: '.', decimal: ',' });
        }
    }

    static scrollInvalido(elementoInvalido) {
        Element.prototype.documentOffsetTop = function() {
            return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
        };

        const top = elementoInvalido.documentOffsetTop() - (window.innerHeight / 2);
        window.scroll({
            top,
            behavior: 'smooth'
        });
    }


    static addClassOnInvalid(e) {
        ValidacaoFormularioView._addClassInvalid(e.target)
    }
}