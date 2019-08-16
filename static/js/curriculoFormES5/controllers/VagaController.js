'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VagaController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VagaService = require('../services/VagaService.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VagaController = exports.VagaController = function () {
    function VagaController() {
        _classCallCheck(this, VagaController);
    }

    _createClass(VagaController, [{
        key: 'get_vaga',
        value: function get_vaga() {
            var url = window.location.pathname;
            var vaga_service = new _VagaService.VagaService();
            var vaga = vaga_service.load_vaga(url);
            return vaga;
        }
    }]);

    return VagaController;
}();