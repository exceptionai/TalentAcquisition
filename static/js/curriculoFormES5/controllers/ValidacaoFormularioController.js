'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValidacaoFormularioController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ValidacaoFormularioView = require('../views/ValidacaoFormularioView.js');

var _ValidacaoDataHelper = require('../helpers/ValidacaoDataHelper.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidacaoFormularioController = exports.ValidacaoFormularioController = function () {
    function ValidacaoFormularioController() {
        _classCallCheck(this, ValidacaoFormularioController);
    }

    _createClass(ValidacaoFormularioController, null, [{
        key: 'valida',
        value: function valida(form) {
            var elementos = form.querySelectorAll("input, select, textarea");

            if (!form.checkValidity()) {
                var primeiroElementoInvalido = _ValidacaoFormularioView.ValidacaoFormularioView.marcarInvalidos(elementos);
                _ValidacaoFormularioView.ValidacaoFormularioView.scrollInvalido(primeiroElementoInvalido);
                NotificacaoService.invalido('Por favor, verifique os campos em vermelho', 'Currículo Inválido');

                return false;
            }
            return true;
        }
    }, {
        key: 'mascara_salarios',
        value: function mascara_salarios() {
            for (var _len = arguments.length, salariosID = Array(_len), _key = 0; _key < _len; _key++) {
                salariosID[_key] = arguments[_key];
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = salariosID[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var salarioID = _step.value;

                    $("#" + salarioID).maskMoney({ prefix: 'R$ ', thousands: '.', decimal: ',' });
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'contador_caracteres',
        value: function contador_caracteres(idCampo) {
            var campoTexto = $("#" + idCampo);
            var labelCaracteres = campoTexto.parent().children('.text-muted').children("small");

            campoTexto.on("keyup", function (e) {
                var caracteresRestantes = 1000;
                var caracteresDigitados = parseInt(e.target.value.length);
                caracteresRestantes -= caracteresDigitados;
                labelCaracteres.text(caracteresRestantes);
            });
        }
    }, {
        key: '_bloquear',
        value: function _bloquear(idAbloquear, elemento, condicao) {
            var elementoABloquear = document.querySelector("#" + idAbloquear);
            var required = elementoABloquear.required;

            $(elemento).change(function () {
                if (condicao) {
                    elementoABloquear.classList.remove('inputError');
                    elementoABloquear.required = false;
                    elementoABloquear.value = '';
                } else elementoABloquear.required = required;

                elementoABloquear.classList.toggle('text-dark');
                elementoABloquear.disabled = !elementoABloquear.disabled;
            });
        }
    }, {
        key: 'bloquearPorClick',
        value: function bloquearPorClick(idABloquear, element) {
            var elementoABloquear = document.querySelector("#" + idABloquear);
            ValidacaoFormularioController._bloquear(idABloquear, element, !elementoABloquear.disabled);
        }
    }, {
        key: 'bloquearPorValor',
        value: function bloquearPorValor(idABloquear, valorCondicional, elementoAcao) {
            ValidacaoFormularioController._bloquear(idABloquear, elementoAcao, elementoAcao.value.toLowerCase() == valorCondicional.toLowerCase());
        }
    }, {
        key: 'adicionaEventosValidacoes',
        value: function adicionaEventosValidacoes(fields) {
            fields.on('keydown', ValidacaoFormularioController._bloqueiaNumero);
            fields.on('focus', _ValidacaoFormularioView.ValidacaoFormularioView._addClassOnInvalid);
            fields.on('change', _ValidacaoFormularioView.ValidacaoFormularioView._addClassOnInvalid);
            fields.on('change', _ValidacaoDataHelper.ValidacaoDataHelper._eventDataMaximaHoje);
            fields.on('keyup', _ValidacaoFormularioView.ValidacaoFormularioView._addClassOnInvalid);
        }
    }, {
        key: '_bloqueiaNumeros',
        value: function _bloqueiaNumeros(e) {
            var digitadoEhNumero = !isNaN(String.fromCharCode(e.keyCode));
            var naoVazio = !e.target.value.length;
            var naoEhDataOuNumero = e.target.type != 'number' && e.target.type != 'date';

            if (digitadoEhNumero && naoVazio && naoEhDataOuNumero) return false;
            return true;
        }
    }, {
        key: 'adicionaValidacao',
        value: function adicionaValidacao(idCampo) {

            var elementos = $("#" + idCampo).find("input, textarea, select");
            ValidacaoFormularioController.adicionaEventosValidacoes(elementos);

            var validaDatas = [];
            elementos.each(function (index, element) {
                var validacoes = element.getAttribute("data-valida");

                if (!!validacoes) {
                    var arrValidacaos = validacoes.split(",");
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = arrValidacaos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var validacao = _step2.value;

                            ValidacaoFormularioController.adicionaPorTipo(validacao, element, validaDatas, idCampo);
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            });
            var idDataEntrada = validaDatas[0],
                idDataSaida = validaDatas[1];

            _ValidacaoDataHelper.ValidacaoDataHelper._valida_datas(idDataEntrada, idDataSaida);
        }
    }, {
        key: 'bloquear',
        value: function bloquear(element) {
            if (element.getAttribute('data-eventBloquear') == 'click') ValidacaoFormularioController.bloquearPorClick(element.getAttribute('data-idBloquear'), element);else ValidacaoFormularioController.bloquearPorValor(element.getAttribute('data-idBloquear'), element.getAttribute('data-eventBloquear'), element);
        }
    }, {
        key: '_input_unico',
        value: function _input_unico(element, idCampos) {
            var campos = document.querySelector("#" + idCampos).parentElement;

            element.addEventListener('change', function () {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = campos.querySelectorAll('input[name="' + element.name + '"]')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var campo = _step3.value;

                        if (campo.id != element.id && campo.checked) $(campo).attr('checked', false).trigger('change');
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            });
        }
    }, {
        key: 'adicionaPorTipo',
        value: function adicionaPorTipo(tipoValidacao, element, arrDatas, idCampo) {
            switch (tipoValidacao) {
                case "data":
                    arrDatas.push(element.id);
                    break;
                case "salario":
                    ValidacaoFormularioController.mascara_salarios(element.id);
                    break;
                case "caracteres":
                    ValidacaoFormularioController.contador_caracteres(element.id);
                    break;
                case 'bloquear':
                    ValidacaoFormularioController.bloquear(element);
                    break;
                case 'unico':
                    ValidacaoFormularioController._input_unico(element, idCampo);

            }
        }
    }]);

    return ValidacaoFormularioController;
}();