'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CurriculoController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CurriculoService = require('../services/CurriculoService.js');

var _CurriculoView = require('../views/CurriculoView.js');

var _HttpService = require('../services/HttpService.js');

var _ValidacaoFormularioController = require('../controllers/ValidacaoFormularioController.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurriculoController = exports.CurriculoController = function () {
    function CurriculoController(vaga, cidadeID, estadoID, dispostoMudarEstadoID) {
        _classCallCheck(this, CurriculoController);

        this._vaga = vaga;
        this._cidadeID = cidadeID;
        this._estadoID = estadoID;
        this._dispostoMudarEstadoID = dispostoMudarEstadoID;
        this._estados = [];
        this._contadorIdiomas = 0;
        this._contadorExperiencias = 0;
        this._view = new _CurriculoView.CurriculoView();
        this._http = new _HttpService.HttpService();

        this._control_endereco();
    }

    _createClass(CurriculoController, [{
        key: '_control_endereco',
        value: function _control_endereco() {
            var _this = this;

            var self = this;
            document.addEventListener('DOMContentLoaded', async function () {
                var curriculoService = new _CurriculoService.CurriculoService();
                $(_this._estadoID).removeAttr('disabled');
                _this._estados = await curriculoService.loadEstados('#uf');
                _this.atualizaEstados(_this._estadoID);

                $(document).on('change', '#uf', async function (e) {
                    self._valida_estado(this.value);
                    self.atualizaCidades(self._cidadeID, $(self._estadoID).val());
                });
            });
        }
    }, {
        key: 'atualizaEstados',
        value: function atualizaEstados(element) {

            var label = $(element).data('label');
            label = label ? label : 'Estado';

            var options = '<option value="">' + label + '</option>';
            for (var i in this._estados) {
                var estado = this._estados[i];
                options += '<option value="' + estado.sigla + '">' + estado.nome + '</option>';
            }

            $(element).html(options);
        }
    }, {
        key: 'atualizaCidades',
        value: function atualizaCidades(element, estado_sigla) {
            var label = $(element).data('label');
            label = label ? label : 'Cidade';

            var options = '<option value="">' + label + '</option>';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._estados[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var estado = _step.value;

                    if (estado.sigla !== estado_sigla) continue;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = estado.cidades[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var cidade = _step2.value;

                            options += '<option value="' + cidade + '">' + cidade + '</option>';
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

            $(element).html(options);
        }
    }, {
        key: 'geraIdiomasDinamicamente',
        value: function geraIdiomasDinamicamente(idioma_ID, botao_idiomas_ID) {
            this._gerarCampoDinamicamente(idioma_ID, botao_idiomas_ID, this._view.idioma.bind(this._view), "campoIdiomaAdicional");
        }
    }, {
        key: 'geraExperienciasDinamicamente',
        value: function geraExperienciasDinamicamente(experiencia_ID, botao_experiencia_ID) {
            this._gerarCampoDinamicamente(experiencia_ID, botao_experiencia_ID, this._view.experienciaAnterior.bind(this._view), "experienciaAnterior");
        }
    }, {
        key: 'geraCursosDinamicamente',
        value: function geraCursosDinamicamente(cursosID, botaoCursosID) {
            this._gerarCampoDinamicamente(cursosID, botaoCursosID, this._view.cursosComplementares.bind(this._view), "cursosComplementares");
        }
    }, {
        key: 'geraFormacaoDinamicamente',
        value: function geraFormacaoDinamicamente(experienciasID, botaoExperienciasID) {
            this._gerarCampoDinamicamente(experienciasID, botaoExperienciasID, this._view.formacao.bind(this._view), "formacao");
        }
    }, {
        key: '_gerarCampoDinamicamente',
        value: function _gerarCampoDinamicamente(camposID, botaoID, view, campoAdicionalID) {
            var curriculoView = new _CurriculoView.CurriculoView();
            var botao = curriculoView.botao(botaoID);
            var campo = curriculoView.campo(camposID);

            botao.click(function () {
                var campoID = curriculoView.adicionarCampo(campo, view());
                var linkRemover = curriculoView.botaoRemover(campoAdicionalID, campoID);

                linkRemover.click(function (event) {
                    event.preventDefault();
                    curriculoView.removerCampo(campoAdicionalID, campoID);
                });
                _ValidacaoFormularioController.ValidacaoFormularioController.adicionaValidacao(campoAdicionalID + campoID);
            });
        }
    }, {
        key: '_valida_estado',
        value: function _valida_estado(estado) {
            if (estado !== this._vaga.estado) {
                $(this._dispostoMudarEstadoID).show();
            } else {
                $(this._dispostoMudarEstadoID).hide();
            }
        }
    }, {
        key: 'esconderHeader',
        value: function esconderHeader() {
            $(window).bind('scroll', function () {
                var distance = 80;
                if ($(window).scrollTop() > distance) {
                    $('.header-logo').fadeIn(300);
                } else {
                    $('.header-logo').fadeOut(300);
                }
            });
        }
    }, {
        key: 'enviarCurriculo',
        value: function enviarCurriculo() {

            var form = document.querySelector("#formularioCurriculo");
            if (_ValidacaoFormularioController.ValidacaoFormularioController.valida(form)) {
                var curriculoObj = FormHelper.paraObjeto(form);
                var curriculoJSON = JSON.stringify(curriculoObj);
                this._http.post("http://localhost:3000/curriculo", curriculoJSON).then(function (resposta) {
                    NotificacaoService.sucesso('Currículo cadastrado com sucesso', 'Sucesso');
                }).catch(function (erro) {
                    console.log(erro);
                    NotificacaoService.invalido('Erro ao cadastrar o currículo', 'Erro ao Enviar');
                });
            }
        }
    }]);

    return CurriculoController;
}();