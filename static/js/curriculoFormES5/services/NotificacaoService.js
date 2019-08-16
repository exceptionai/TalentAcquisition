"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NotificacaoService = exports.NotificacaoService = function () {
    function NotificacaoService() {
        _classCallCheck(this, NotificacaoService);
    }

    _createClass(NotificacaoService, null, [{
        key: "_configToaster",
        value: function _configToaster() {
            toastr.options = {
                "closeButton": true,
                "progressBar": true
            };
        }
    }, {
        key: "invalido",
        value: function invalido(mensagem, titulo) {
            NotificacaoService._configToaster();
            toastr.error(mensagem, titulo);
        }
    }, {
        key: "sucesso",
        value: function sucesso(mensagem, titulo) {
            NotificacaoService._configToaster();
            toastr.success(mensagem, titulo);
        }
    }]);

    return NotificacaoService;
}();