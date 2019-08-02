class ValidacaoFormulario {

    static valida(form) {
        let elementos = form.querySelectorAll("input, select, textarea");

        if (!form.checkValidity()) {
            const primeiroElementoInvalido = ValidacaoFormulario.
                marcarInvalidos(elementos)
            ValidacaoFormulario.scrollInvalido(primeiroElementoInvalido);
            Notificacao.invalido('Por favor, verifique os campos em vermelho', 'Currículo Inválido')

            return false;
        }
        return true;
    }


    static mascara_salarios(...salariosID) {
        for (let salarioID of salariosID) {
            $("#" + salarioID).maskMoney({ prefix: 'R$ ', thousands: '.', decimal: ',' });
        }
    }

    static _valida_data_entrada(input_entrada, input_saida) {
        if (new Date(input_entrada.val()).getTime() > new Date(input_saida.val()).getTime()) {
            input_entrada.val(input_saida.val());
        }
    }

    static _valida_data_saida(input_entrada, input_saida) {
        ValidacaoFormulario._valida_data_entrada(input_entrada, input_saida);
    }

    static _dataMaximaHoje(inputData) {
        if (new Date(inputData.val()).getTime() > new Date().getTime()) {
            inputData.val(new Date().toISOString().substr(0, 10));
        }
    }

    static _eventDataMaximaHoje(e){
        const element = e.target;
        if(element.type == 'date')
                ValidacaoFormulario._dataMaximaHoje($(element));
    }

    static _valida_datas(idDataEntrada, idDataSaida) {
        let input_entrada = $(`#${idDataEntrada}`);
        let input_saida = $(`#${idDataSaida}`);
        let input_curso_inicio = $('#dataCursoInicio1');

        input_entrada.on("change", () =>
            ValidacaoFormulario._valida_data_entrada(input_entrada, input_saida));

        /**
         * Neste ponto é utilizado o padrão debounce, esperando que o usuario
         * pare de alterar o valor para poder aplicar as mudanças. 
         * Isto é necessário pois caso contrario a alteração no input de saída seria
         * tão rápida que antes mesmo de o usuário fazer a alteração que deseja ocorreria
         * efeitos colaterais no input de entrada.
         */

        let timerSaida = 0;
        input_saida.on("change", function () {
            clearTimeout(timerSaida);
            timerSaida = setTimeout(() =>
                ValidacaoFormulario._valida_data_saida(input_entrada, input_saida), 300)
        });

        input_curso_inicio.on("change", () =>
            ValidacaoFormulario._dataMaximaHoje(input_curso_inicio))
    }

    static contador_caracteres(idCampo) {
        const campoTexto = $("#" + idCampo);
        const labelCaracteres = campoTexto.parent().children('.text-muted')
            .children("small")

        campoTexto.on("keyup", e => {
            let caracteresRestantes = 1000;
            let caracteresDigitados = parseInt(e.target.value.length);
            caracteresRestantes -= caracteresDigitados;
            labelCaracteres.text(caracteresRestantes);
        });
    }

    static _bloquear(idAbloquear, elemento, condicao) {
        const elementoABloquear = document.querySelector("#" + idAbloquear);
        const required = elementoABloquear.required;

        $(elemento).change(() => {
            if (condicao) {
                elementoABloquear.classList.remove('inputError');
                elementoABloquear.required = false;
                elementoABloquear.value = '';
            }
            else elementoABloquear.required = required;

            elementoABloquear.classList.toggle('text-dark');
            elementoABloquear.disabled = !elementoABloquear.disabled;

        })
    }

    static bloquearPorClick(idABloquear, element) {
        const elementoABloquear = document.querySelector("#" + idABloquear);
        ValidacaoFormulario._bloquear(idABloquear, element, !elementoABloquear.disabled)
    }

    static bloquearPorValor(idABloquear, valorCondicional, elementoAcao, ) {
        ValidacaoFormulario._bloquear(idABloquear, elementoAcao, elementoAcao.value.toLowerCase() == valorCondicional.toLowerCase())
    }

    static adicionaEventosValidacoes(fields) {
        fields.on('keydown', ValidacaoFormulario._bloqueiaNumero);
        fields.on('focus', ValidacaoFormulario._addClassOnInvalid);
        fields.on('change', ValidacaoFormulario._addClassOnInvalid);
        fields.on('change',ValidacaoFormulario._eventDataMaximaHoje);
        fields.on('keyup', ValidacaoFormulario._addClassOnInvalid);
    }

    static _bloqueiaNumeros(e) {
        const digitadoEhNumero = !isNaN(String.fromCharCode(e.keyCode));
        const naoVazio = !e.target.value.length;
        const naoEhDataOuNumero = e.target.type != 'number' && e.target.type != 'date';

        if (digitadoEhNumero && naoVazio && naoEhDataOuNumero)
            return false;
        return true;
    }

    static _addClassInvalid(element) {
        element = $(element);
        let lblElement = element.parent().children('label');
        let msgElement = lblElement.children('.mensagemValidacao');
        let lblText = lblElement.text();
        let mensagem = element.get(0).validationMessage;

        if (element.is(':invalid')) {
            element.addClass('inputError');
            if (!msgElement.length) lblElement.html(`${lblText} <span class="mensagemValidacao">(${mensagem})</span>`)
            msgElement.text(`(${mensagem})`);
        } else {
            if (msgElement.length) msgElement.html('');
            element.removeClass('inputError');
        }
    }

    static _addClassOnInvalid(e) {
        ValidacaoFormulario._addClassInvalid(e.target)
    }

    static adicionaValidacao(idCampo) {

        let elementos = $("#" + idCampo)
            .find("input, textarea, select");
        ValidacaoFormulario.adicionaEventosValidacoes(elementos);

        let validaDatas = [];
        elementos.each((index, element) => {
            let validacoes = element.getAttribute("data-valida");

            if (!!validacoes) {
                let arrValidacaos = validacoes.split(",");
                for (let validacao of arrValidacaos) {
                    ValidacaoFormulario.adicionaPorTipo(validacao, element, validaDatas, idCampo)
                }
            }
        });
        let [idDataEntrada, idDataSaida] = validaDatas;
        ValidacaoFormulario._valida_datas(idDataEntrada, idDataSaida);
    }


    static bloquear(element) {
        if (element.getAttribute('data-eventBloquear') == 'click')
            ValidacaoFormulario.bloquearPorClick(element.getAttribute('data-idBloquear'), element)
        else
            ValidacaoFormulario.bloquearPorValor(element.getAttribute('data-idBloquear'), element.getAttribute('data-eventBloquear'), element)
    }

    static _input_unico(element, idCampos) {
        const campos = document.querySelector("#" + idCampos).parentElement;

        element.addEventListener('change', function () {
            for (let campo of campos.querySelectorAll(`input[name="${element.name}"]`)) {
                if (campo.id != element.id && campo.checked)
                    $(campo).attr('checked', false).trigger('change')
            }
        })

    }

    static adicionaPorTipo(tipoValidacao, element, arrDatas, idCampo) {
        switch (tipoValidacao) {
            case "data":
                arrDatas.push(element.id);
                break;
            case "salario":
                ValidacaoFormulario.mascara_salarios(element.id);
                break;
            case "caracteres":
                ValidacaoFormulario.contador_caracteres(element.id);
                break;
            case 'bloquear':
                ValidacaoFormulario.bloquear(element)
                break;
            case 'unico':
                ValidacaoFormulario._input_unico(element, idCampo);

        }
    }

    static scrollInvalido(elementoInvalido) {
        Element.prototype.documentOffsetTop = function () {
            return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
        };

        const top = elementoInvalido.documentOffsetTop() - (window.innerHeight / 2);
        window.scrollTo(0, top);
    }

    static marcarInvalidos(elementos) {
        let primeiroInvalido = null;
        for (let elemento of elementos) {
            if (!elemento.checkValidity()) {
                primeiroInvalido = !primeiroInvalido ? elemento : primeiroInvalido;
                ValidacaoFormulario._addClassInvalid(elemento);
            }
        }
        return primeiroInvalido;
    }

}