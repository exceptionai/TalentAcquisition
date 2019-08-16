/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class CurriculoService {

    loadEstados(element) {
        return new Promise(resolve => {
            $.ajax({
                url: 'https://api.myjson.com/bins/enzld',
                method: 'get',
                dataType: 'json',
                beforeSend: function() {
                    $(element).html('<option>Carregando...</option>');
                }
            }).done(function(response) {
                resolve(response.estados);
            });
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CurriculoService;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controllers_index__ = __webpack_require__(2);



const vaga = new __WEBPACK_IMPORTED_MODULE_0__controllers_index__["b" /* VagaController */]().get_vaga();
const controller = new __WEBPACK_IMPORTED_MODULE_0__controllers_index__["a" /* CurriculoController */](vaga, "#cidade", "#uf", "#campoDispostoSeMudar");

const btnEnviar = document.querySelector("#btnEnviar");
btnEnviar.addEventListener('click', controller.enviarCurriculo.bind(controller));

controller.geraIdiomasDinamicamente("campoIdiomas", "botaoIdiomas");
controller.geraExperienciasDinamicamente("campoExperiencias", "botaoExperiencias");
controller.geraCursosDinamicamente("campoCursos", "botaoCursos");
controller.geraFormacaoDinamicamente("campoFormacoes", "botaoFormacoes");

ValidacaoFormularioController.mascara_salarios("salarioExpectativa");
ValidacaoFormularioController.contador_caracteres("resumoCandidato")
ValidacaoFormularioController.adicionaValidacao("formularioCurriculo")

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CurriculoController__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__CurriculoController__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VagaController__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__VagaController__["a"]; });



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_CurriculoService__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_CurriculoView__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_CurriculoView___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__views_CurriculoView__);




class CurriculoController {
    constructor(vaga, cidadeID, estadoID, dispostoMudarEstadoID) {
        this._vaga = vaga;
        this._cidadeID = cidadeID;
        this._estadoID = estadoID;
        this._dispostoMudarEstadoID = dispostoMudarEstadoID;
        this._estados = [];
        this._contadorIdiomas = 0;
        this._contadorExperiencias = 0;
        this._view = new __WEBPACK_IMPORTED_MODULE_1__views_CurriculoView__["CurriculoView"]();
        this._http = new __WEBPACK_IMPORTED_MODULE_0__services_CurriculoService__["HttpService"]();


        this._control_endereco();
    }

    _control_endereco() {
        const self = this;
        document.addEventListener('DOMContentLoaded', async() => {
            const curriculoService = new __WEBPACK_IMPORTED_MODULE_0__services_CurriculoService__["a" /* CurriculoService */]();
            $(this._estadoID).removeAttr('disabled');
            this._estados = await curriculoService.loadEstados('#uf');
            this.atualizaEstados(this._estadoID);

            $(document).on('change', '#uf', async function(e) {
                self._valida_estado(this.value);
                self.atualizaCidades(self._cidadeID, $(self._estadoID).val());

            });

        });
    }

    atualizaEstados(element) {

        let label = $(element).data('label');
        label = label ? label : 'Estado';

        let options = '<option value="">' + label + '</option>';
        for (let i in this._estados) {
            let estado = this._estados[i];
            options += '<option value="' + estado.sigla + '">' + estado.nome + '</option>';
        }

        $(element).html(options);
    }

    atualizaCidades(element, estado_sigla) {
        let label = $(element).data('label');
        label = label ? label : 'Cidade';

        let options = '<option value="">' + label + '</option>';
        for (let estado of this._estados) {
            if (estado.sigla !== estado_sigla)
                continue;
            for (let cidade of estado.cidades) {
                options += '<option value="' + cidade + '">' + cidade + '</option>';
            }
        }
        $(element).html(options);
    }

    geraIdiomasDinamicamente(idioma_ID, botao_idiomas_ID) {
        this._gerarCampoDinamicamente(
            idioma_ID, botao_idiomas_ID,
            this._view.idioma.bind(this._view),
            "campoIdiomaAdicional"
        )
    }

    geraExperienciasDinamicamente(experiencia_ID, botao_experiencia_ID) {
        this._gerarCampoDinamicamente(
            experiencia_ID, botao_experiencia_ID,
            this._view.experienciaAnterior.bind(this._view),
            "experienciaAnterior"
        )
    }

    geraCursosDinamicamente(cursosID, botaoCursosID) {
        this._gerarCampoDinamicamente(
            cursosID, botaoCursosID,
            this._view.cursosComplementares.bind(this._view),
            "cursosComplementares"
        )
    }

    geraFormacaoDinamicamente(experienciasID, botaoExperienciasID) {
        this._gerarCampoDinamicamente(
            experienciasID, botaoExperienciasID,
            this._view.formacao.bind(this._view),
            "formacao"
        )
    }

    _gerarCampoDinamicamente(camposID, botaoID, view, campoAdicionalID) {
        const curriculoView = new __WEBPACK_IMPORTED_MODULE_1__views_CurriculoView__["CurriculoView"]()
        const botao = curriculoView.botao(botaoID);
        const campo = curriculoView.campo(camposID);

        botao.click(() => {
            const campoID = curriculoView.adicionarCampo(campo, view());
            const linkRemover = curriculoView.botaoRemover(campoAdicionalID, campoID);

            linkRemover.click(event => {
                event.preventDefault();
                curriculoView.removerCampo(campoAdicionalID, campoID)
            });
            ValidacaoFormularioController.adicionaValidacao(campoAdicionalID + campoID);
        })
    }

    _valida_estado(estado) {
        if (estado !== this._vaga.estado) {
            $(this._dispostoMudarEstadoID).show();
        } else {
            $(this._dispostoMudarEstadoID).hide();
        }

    }

    esconderHeader() {
        $(window).bind('scroll', function() {
            const distance = 80;
            if ($(window).scrollTop() > distance) {
                $('.header-logo').fadeIn(300);

            } else {
                $('.header-logo').fadeOut(300);
            }
        });
    }

    enviarCurriculo() {

        let form = document.querySelector("#formularioCurriculo");
        if (ValidacaoFormularioController.valida(form)) {
            let curriculoObj = FormHelper.paraObjeto(form);
            let curriculoJSON = JSON.stringify(curriculoObj);
            this._http.post("http://localhost:3000/curriculo", curriculoJSON)
                .then(resposta => {
                    NotificacaoService.sucesso('Currículo cadastrado com sucesso', 'Sucesso')
                })
                .catch(erro => {
                    console.log(erro)
                    NotificacaoService.invalido('Erro ao cadastrar o currículo', 'Erro ao Enviar')
                })
        }

    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CurriculoController;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class CurriculoView {

    constructor() {
        this._contadorIdiomas = 0;
        this._contadorCampo = 0;
        this._contadorCursos = 0;
        this._contadorFormacao = 0;
        this._contadorExperiencias = 0;
    }

    adicionarCampo(campo, template) {
        this._contadorCampo++
            campo.append(template);
        return this._contadorCampo;
    }

    botao(botaoID) {
        return $(`#${botaoID}`);
    }

    campo(campoID) {
        return $(`#${campoID}`);
    }

    removerCampo(campo, id) {
        const campoARemover = $("#" + campo + id);
        campoARemover.fadeOut(500);
        setTimeout(() => campoARemover.remove(), 500);
    }


    botaoRemover(campoID, contador) {
        return $(`#${campoID}Remover${contador}`)
    }

    cursosComplementares() {
        this._contadorCursos++;
        return $(`
            <div id="cursosComplementares${this._contadorCursos}">
               
                <hr>
                Cursos Complementares
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome do Curso* </label>
                            <input type="text" class="form-control" name="nome" data-parent="cursosComplementares" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome da Instituição*</label>
                            <input type="text" class="form-control" name="instituicao" required data-parent="cursosComplementares">
                        </div>
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="bmd-label-floating">Data Inicial</label>
                            <input type="date"  min="1900-01-01" name="dataInicial" class="form-control" data-parent="cursosComplementares" id="dataInicialCurso${this._contadorCursos}">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="bmd-label-floating">Duração</label>
                            <select class="form-control" data-parent="cursosComplementares" data-style="btn btn-link" name="duracao" id="duracaoCurso${this._contadorCursos}">
                                <option value="" disabled>Duração</option>
                                <option value="curta">Curta (até 40 horas)</option>
                                <option value="media">Média (de 41 a 360 horas)</option>
                                <option value="longa">Longa (acima de 360 horas</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="bmd-label-floating">Situação</label>
                            <select class="form-control" name="situacao" data-parent="cursosComplementares" data-style="btn btn-link" >
                                <option selected disabled >Situação</option> 
                                <option value="cursando" >Cursando</option>
                                <option value="concluido">Concluído</option>
                                <option value="interrompido">Interrompido</option>
                            </select>
                        </div>
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="form-group">
                                <label class="bmd-label-floating">Descrição do curso</label>
                                <textarea id="descricaoCurso${this._contadorCursos  }" name="descricao" data-parent="cursosComplementares" class="form-control" rows="5" maxlength="1000" data-valida="caracteres"></textarea>
                                <p class="text-muted"><small><span class="caracteres" name="txtArea">1000</span></small> caracteres restantes</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <button type="button" class="btn btn-danger" id="cursosComplementaresRemover${this._contadorCursos}">Remover Curso Extra Curricular</button>
                <hr>
                <br>
            </div>
        `);
    }

    idioma() {
        this._contadorIdiomas++;
        return $(`
            <div class="campoIdiomaAdicional" id="campoIdiomaAdicional${this._contadorIdiomas}">
                <hr>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Idioma*</label>
                            <select required class="form-control" data-style="btn btn-link" name="idioma" data-parent="idiomas">
                                <option value="" selected disabled>Idioma</option>
                                <option value="ingles">Inglês</option>
                                <option value="espanhol">Espanhol</option>
                                <option value="frances">Francês</option>
                                <option value="mandarim">Mandarim</option>
                                <option value="japones">Japonês</option>
                                <option value="alemao">Alemão</option>
                                <option value="russo">Russo</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nível*</label>
                            <select required class="form-control" data-style="btn btn-link" name="nivelIdioma" data-parent="idiomas" >
                                <option value="" selected disabled>Nível</option>
                                <option value="basico">Básico</option>
                                <option value="intermediario">Intermediário</option>
                                <option value="avançado">Avançado</option>
                                <option value="tecnico">Técnico</option>
                                <option value="fluente">Fluente</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type="button" class="btn btn-danger" id="campoIdiomaAdicionalRemover${this._contadorIdiomas}">remover idioma</button>
                <hr>
            </div>
        `);
    }

    experienciaAnterior() {
        this._contadorExperiencias++;
        const campoExperienciaAnterior = $(`
        <div id="experienciaAnterior${this._contadorExperiencias}" data-group="true">
            <hr>
            Experiências Anteriores
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Nome da empresa*</label>
                        <input type="text" data-parent="experienciasAnteriores" class="form-control" name="nomeEmpresa" placeholder="Ex: Bayer" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Cargo*</label>
                        <input type="text" data-parent="experienciasAnteriores" class="form-control"  name="cargo"  placeholder="Ex: Engenheiro Elétrico" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Salário</label>
                        <input type="text" data-parent="experienciasAnteriores" class="form-control" name="salario" id="salario${this._contadorExperiencias}" data-valida="salario" inputmode="numeric">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Data de entrada*</label>
                        <input type="date" min="1900-01-01" data-parent="experienciasAnteriores" class="form-control" name="dataEntrada" id="dataEntrada${this._contadorExperiencias}" data-valida="data" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="bmd-label-floating">Data de saída*</label>
                        <input type="date" min="1900-01-01" data-parent="experienciasAnteriores" class="form-control" name="dataSaida" id="dataSaida${this._contadorExperiencias}" data-valida="data" required>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input class="form-check-input" id="empregoAtual${this._contadorExperiencias}" data-parent="experienciasAnteriores" type="checkbox" name="trabalhoAtual" data-valida="bloquear,unico" data-eventBloquear="click" data-idBloquear="dataSaida${this._contadorExperiencias}">
                                É meu emprego atual
                                <span class="form-check-sign">
                                    <span class="check"></span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="form-group">
                            <label class="bmd-label-floating">Principais atividades</label>
                            <textarea id="descricaoExperiencia${this._contadorExperiencias}" data-parent="experienciasAnteriores" class="form-control" name="principaisAtividades" rows="5"  data-valida="caracteres"></textarea>
                            <p class="text-muted"><small><span name="txtArea">1000</span></small> caracteres restantes</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <button type="button" class="btn btn-danger mb-4" id="experienciaAnteriorRemover${this._contadorExperiencias}">Remover Experiência Anterior</button>
            
        </div>
        `);
        ValidacaoFormularioController.mascara_salarios(`salario${this._contadorExperiencias}`);
        return campoExperienciaAnterior;
    }

    formacao() {
        this._contadorFormacao++;
        return $(`
            <div id="formacao${this._contadorFormacao}">
                <hr>
                Formação Acadêmica
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome do Curso*</label>
                            <input type="text" required data-parent="formacaoAcademica" class="form-control" id="nomeFormacao${this._contadorFormacao}" name="curso">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nível*</label>
                            <select required class="form-control" data-parent="formacaoAcademica" data-style="btn btn-link" name="nivelCurso" >
                                <option value="" selected disabled>Nível</option>
                                <option value="ensinoMedio">Ensino Médio</option>
                                <option value="tecnico">Técnico</option>
                                <option value="graduacao">Graduação</option>
                                <option value="posGraduacao">Pós Graduação</option>
                                <option value="mba">MBA</option>
                                <option value="mestrado">Mestrado</option>
                                <option value="doutorado">Doutorado</option>
                                <option value="posDoutorado">Pós Doutorado</option>
                                <option value="livreDocencia">Livre Docência</option>
                            </select>
                        </div>
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Nome da Instituição*</label>
                            <input type="text" required data-parent="formacaoAcademica" class="form-control" id="nomeInstituicao" name="nomeInstituicao">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="bmd-label-floating">Situação*</label>
                            <select class="form-control" required data-parent="formacaoAcademica" data-style="btn btn-link" id="situacaoFormacao${this._contadorFormacao}" name="situacaoFormacao">
                                <option value="">Situação</option>
                                <option value="cursando">Cursando</option>
                                <option value="concluido">Concluído</option>
                                <option value="interrompido">Interrompido</option>
                            </select>
                        </div>
                    </div>
                </div>  
                
                <button type="button" class="btn btn-danger" id="formacaoRemover${this._contadorFormacao}">Remover Formação Acadêmica</button>
                <hr>
            </div>
        `)
    }


}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_VagaService__ = __webpack_require__(6);


class VagaController {
    get_vaga() {
        const url = window.location.pathname;
        const vaga_service = new __WEBPACK_IMPORTED_MODULE_0__services_VagaService__["a" /* VagaService */]();
        const vaga = vaga_service.load_vaga(url);
        return vaga;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VagaController;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class VagaService {
    load_vaga(url) {
        return { estado: 'SP' }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = VagaService;


/***/ })
/******/ ]);