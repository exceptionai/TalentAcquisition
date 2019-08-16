'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurriculoService = exports.CurriculoService = function () {
    function CurriculoService() {
        _classCallCheck(this, CurriculoService);
    }

    _createClass(CurriculoService, [{
        key: 'loadEstados',
        value: function loadEstados(element) {
            return new Promise(function (resolve) {
                $.ajax({
                    url: 'https://api.myjson.com/bins/enzld',
                    method: 'get',
                    dataType: 'json',
                    beforeSend: function beforeSend() {
                        $(element).html('<option>Carregando...</option>');
                    }
                }).done(function (response) {
                    resolve(response.estados);
                });
            });
        }
    }]);

    return CurriculoService;
}();