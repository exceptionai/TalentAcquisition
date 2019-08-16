'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValidacaoFormularioView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ValidacaoDataHelper = require('../helpers/ValidacaoDataHelper.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidacaoFormularioView = exports.ValidacaoFormularioView = function () {
    function ValidacaoFormularioView() {
        _classCallCheck(this, ValidacaoFormularioView);
    }

    _createClass(ValidacaoFormularioView, null, [{
        key: 'marcarInvalidos',
        value: function marcarInvalidos(elementos) {
            var primeiroInvalido = null;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = elementos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elemento = _step.value;

                    if (!elemento.checkValidity()) {
                        primeiroInvalido = !primeiroInvalido ? elemento : primeiroInvalido;
                        ValidacaoFormularioView._addClassInvalid(elemento);
                    }
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

            return primeiroInvalido;
        }
    }, {
        key: 'scrollInvalido',
        value: function scrollInvalido(elementoInvalido) {
            Element.prototype.documentOffsetTop = function () {
                return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
            };

            var top = elementoInvalido.documentOffsetTop() - window.innerHeight / 2;
            window.scrollTo(0, top);
        }
    }, {
        key: '_addClassInvalid',
        value: function _addClassInvalid(element) {
            element = $(element);
            var lblElement = element.parent().children('label');
            var msgElement = lblElement.children('.mensagemValidacao');
            var lblText = lblElement.text();
            var mensagem = element.get(0).validationMessage;
            var existeMensagem = msgElement.length;

            if (element.is(':invalid')) {

                element.addClass('inputError');
                if (!existeMensagem) lblElement.html(lblText + ' <span class="mensagemValidacao">(' + mensagem + ')</span>');

                msgElement.text('(' + mensagem + ')');
            } else {
                if (existeMensagem) msgElement.html('');
                element.removeClass('inputError');
            }
        }
    }, {
        key: '_addClassOnInvalid',
        value: function _addClassOnInvalid(e) {
            ValidacaoFormularioView._addClassInvalid(e.target);
        }
    }]);

    return ValidacaoFormularioView;
}();