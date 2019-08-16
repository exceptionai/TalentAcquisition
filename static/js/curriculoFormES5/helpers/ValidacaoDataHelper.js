'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidacaoDataHelper = exports.ValidacaoDataHelper = function () {
    function ValidacaoDataHelper() {
        _classCallCheck(this, ValidacaoDataHelper);
    }

    _createClass(ValidacaoDataHelper, null, [{
        key: '_valida_data_entrada',
        value: function _valida_data_entrada(input_entrada, input_saida) {
            if (new Date(input_entrada.val()).getTime() > new Date(input_saida.val()).getTime()) {
                input_entrada.val(input_saida.val());
            }
        }
    }, {
        key: '_valida_data_saida',
        value: function _valida_data_saida(input_entrada, input_saida) {
            ValidacaoDataHelper._valida_data_entrada(input_entrada, input_saida);
        }
    }, {
        key: '_dataMaximaHoje',
        value: function _dataMaximaHoje(inputData) {
            if (new Date(inputData.val()).getTime() > new Date().getTime()) {
                inputData.val(new Date().toISOString().substr(0, 10));
            }
        }
    }, {
        key: '_eventDataMaximaHoje',
        value: function _eventDataMaximaHoje(e) {
            var element = e.target;
            if (element.type == 'date') ValidacaoDataHelper._dataMaximaHoje($(element));
        }
    }, {
        key: '_valida_datas',
        value: function _valida_datas(idDataEntrada, idDataSaida) {
            var input_entrada = $('#' + idDataEntrada);
            var input_saida = $('#' + idDataSaida);
            var input_curso_inicio = $('#dataCursoInicio1');

            input_entrada.on("change", function () {
                return ValidacaoDataHelper._valida_data_entrada(input_entrada, input_saida);
            });

            /**
             * Neste ponto é utilizado o padrão debounce, esperando que o usuario
             * pare de alterar o valor para poder aplicar as mudanças. 
             * Isto é necessário pois caso contrario a alteração no input de saída seria
             * tão rápida que antes mesmo de o usuário fazer a alteração que deseja ocorreria
             * efeitos colaterais no input de entrada.
             */

            var timerSaida = 0;
            input_saida.on("change", function () {
                clearTimeout(timerSaida);
                timerSaida = setTimeout(function () {
                    return ValidacaoDataHelper._valida_data_saida(input_entrada, input_saida);
                }, 300);
            });

            input_curso_inicio.on("change", function () {
                return ValidacaoDataHelper._dataMaximaHoje(input_curso_inicio);
            });
        }
    }]);

    return ValidacaoDataHelper;
}();