"use strict";

var _index = require("./controllers/index.js");

var vaga = new _index.VagaController().get_vaga();
var controller = new _index.CurriculoController(vaga, "#cidade", "#uf", "#campoDispostoSeMudar");
var btnEnviar = document.querySelector("#btnEnviar");

window.onload = function () {
  return controller.esconderHeader();
};

btnEnviar.addEventListener('click', controller.enviarCurriculo.bind(controller));

controller.geraIdiomasDinamicamente("campoIdiomas", "botaoIdiomas");
controller.geraExperienciasDinamicamente("campoExperiencias", "botaoExperiencias");
controller.geraCursosDinamicamente("campoCursos", "botaoCursos");
controller.geraFormacaoDinamicamente("campoFormacoes", "botaoFormacoes");

_index.ValidacaoFormularioController.mascara_salarios("salarioExpectativa");
_index.ValidacaoFormularioController.contador_caracteres("resumoCandidato");
_index.ValidacaoFormularioController.adicionaValidacao("formularioCurriculo");