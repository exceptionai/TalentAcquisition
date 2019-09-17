import { ValidacaoFormularioView } from '../views/ValidacaoFormularioView.js';
import { ValidacaoDataHelper } from '../helpers/ValidacaoDataHelper.js';
import { NotificacaoService } from '../services/NotificacaoService.js';

export class ValidacaoFormularioController {

    static valida(form) {
        let elementos = form.querySelectorAll('input, select, textarea');

        if (!form.checkValidity()) {
            const primeiroElementoInvalido = ValidacaoFormularioView
                .marcarInvalidos(elementos)
            ValidacaoFormularioView.scrollInvalido(primeiroElementoInvalido);
            console.log('invalido')
            NotificacaoService.invalido('Por favor, verifique os campos em vermelho', 'Currículo Inválido')

            return false;
        }
        return true;
    }

    static mascara_salarios(...salariosID) {
        console.log($)
        for (let salarioID of salariosID) {
            $("#" + salarioID).maskMoney({ prefix: 'R$ ', thousands: '.', decimal: ',' });
        }
    }

    static contador_caracteres(idCampo) {
        const campoTexto = $('#' + idCampo);
        const labelCaracteres = campoTexto.parent().children('.text-muted')
            .children('small')

        campoTexto.on('keyup', e => {
            let caracteresRestantes = 1000;
            let caracteresDigitados = parseInt(e.target.value.length);
            caracteresRestantes -= caracteresDigitados;
            labelCaracteres.text(caracteresRestantes);
        });
    }

    static _bloquear(idAbloquear, elemento, condicao) {
        const elementoABloquear = document.querySelector('#' + idAbloquear);
        const required = elementoABloquear.required;

        $(elemento).change(() => {
            if (condicao) {
                elementoABloquear.classList.remove('inputError');
                elementoABloquear.required = false;
                elementoABloquear.value = '';
            } else elementoABloquear.requireinputErrord = required;

            elementoABloquear.classList.toggle('text-dark');
            elementoABloquear.disabled = !elementoABloquear.disabled;

        })
    }

    static bloquearPorClick(idABloquear, element) {
        const elementoABloquear = document.querySelector('#' + idABloquear);
        ValidacaoFormularioController._bloquear(idABloquear, element, !elementoABloquear.disabled)
    }

    static bloquearPorValor(idABloquear, valorCondicional, elementoAcao, ) {
        ValidacaoFormularioController._bloquear(idABloquear, elementoAcao, elementoAcao.value.toLowerCase() == valorCondicional.toLowerCase())
    }

    static adicionaEventosValidacoes(fields) {
        fields.on('keydown', ValidacaoFormularioController._bloqueiaNumeros);
        fields.on('focus', ValidacaoFormularioView.addClassOnInvalid);
        fields.on('change', ValidacaoFormularioView.addClassOnInvalid);
        fields.on('change', ValidacaoDataHelper.eventDataMaximaHoje);
        fields.on('keyup', ValidacaoFormularioController._bloqueiaPrimeiroValorNumeros)
        fields.on('keyup', ValidacaoFormularioView.addClassOnInvalid);
    }


    static _bloqueiaNumeros(e) {
        const digitadoEhNumero = !isNaN(String.fromCharCode(e.keyCode));
        const naoVazio = !e.target.value.length;
        const naoEhDataOuNumero = e.target.type != 'number' && e.target.type != 'date';
        const validacaoCampo = e.target.getAttribute('data-valida')
        const ehNumeroResidencial = e.target.id == 'numeroResidencial'
        let ehTelefone = false;
        let ehCep = false;


        if (validacaoCampo) {
            ehTelefone = validacaoCampo.toLowerCase().startsWith('telefone');
            ehCep = validacaoCampo.toLowerCase().startsWith('cep')
        }

        if (digitadoEhNumero && naoVazio && naoEhDataOuNumero && !ehTelefone && !ehCep && !ehNumeroResidencial)
            return false;
        return true;
    }

    static adicionaValidacao(idCampo) {

        let elementos = $('#' + idCampo)
            .find('input, textarea, select');
        ValidacaoFormularioController.adicionaEventosValidacoes(elementos);

        let validaDatas = [];
        elementos.each((index, element) => {
            let validacoes = element.getAttribute('data-valida');

            if (!!validacoes) {
                let arrValidacaos = validacoes.split(',');
                for (let validacao of arrValidacaos) {
                    ValidacaoFormularioController.adicionaPorTipo(validacao, element, validaDatas, idCampo)
                }
            }
        });
        let [idDataEntrada, idDataSaida] = validaDatas;
        ValidacaoDataHelper._valida_datas(idDataEntrada, idDataSaida);
    }


    static bloquear(element) {
        if (element.getAttribute('data-eventBloquear') == 'click')
            ValidacaoFormularioController.bloquearPorClick(element.getAttribute('data-idBloquear'), element)
        else
            ValidacaoFormularioController.bloquearPorValor(element.getAttribute('data-idBloquear'), element.getAttribute('data-eventBloquear'), element)
    }

    static _input_unico(element, idCampos) {
        const campos = document.querySelector('#' + idCampos).parentElement;

        element.addEventListener('change', function() {
            for (let campo of campos.querySelectorAll(`input[name="${element.name}"]`)) {
                if (campo.id != element.id && campo.checked)
                    $(campo).attr('checked', false).trigger('change')
            }
        })

    }

    static adicionaPorTipo(tipoValidacao, element, arrDatas, idCampo) {
        switch (tipoValidacao) {
            case 'data':
                arrDatas.push(element.id);
                break;
            case 'salario':
                ValidacaoFormularioController.mascara_salarios(element.id);
                break;
            case 'caracteres':
                ValidacaoFormularioController.contador_caracteres(element.id);
                break;
            case 'bloquear':
                ValidacaoFormularioController.bloquear(element)
                break;
            case 'unico':
                ValidacaoFormularioController._input_unico(element, idCampo);
                break;
            case 'telefone-celular':
                ValidacaoFormularioController.formatarCamposTelefoneCelular(element.id);
                break;
            case 'telefone-residencial':
                ValidacaoFormularioController.formatarCamposTelefoneResidencial(element.id);
                break;
            case 'cep':
                ValidacaoFormularioController.mascara_cep(element.id);
                break;
        }
    }

    static mascara_cep(idCEP) {
        $(`#${idCEP}`).mask('00000-000');
    }

    static formatarCamposTelefoneResidencial(idTelefoneResidencial) {
        let telefoneResidencial = $(`#${idTelefoneResidencial}`);
        telefoneResidencial.mask('(00) 0000-0000');
    }
    static formatarCamposTelefoneCelular(idTelefoneCelular) {
        let telefoneCelular = $(`#${idTelefoneCelular}`);
        telefoneCelular.mask('(00) 00000-0000');
    }
}