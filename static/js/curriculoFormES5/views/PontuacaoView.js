"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PontuacaoView = function () {
    function PontuacaoView() {
        _classCallCheck(this, PontuacaoView);
    }

    _createClass(PontuacaoView, [{
        key: "monta_tabela",
        value: function monta_tabela(candidato) {
            var linha_candidato = $("\n            <tr>\n                <td>" + candidato.nome + "</td>\n                <td>" + candidato.pontuacao_objetivo + "</td>\n                <td>" + candidato.pontuacao_cursos_extra_curriculares + "</td>\n                <td>" + candidato.pontuacao_total + "</td>\n            </tr>\n        ");
            var tabela = $("tbody");
            tabela.append(linha_candidato);
        }
    }]);

    return PontuacaoView;
}();