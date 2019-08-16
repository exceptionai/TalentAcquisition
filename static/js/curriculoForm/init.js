import { VagaController, CurriculoController, ValidacaoFormularioController } from './controllers/index.js'


const vaga = new VagaController().get_vaga();
const controller = new CurriculoController(vaga, "#cidade", "#uf", "#campoDispostoSeMudar", "#formularioCurriculo");
const btnEnviar = document.querySelector("#btnEnviar");

window.onload = () => controller.esconderHeader();

btnEnviar.addEventListener('click', controller.enviarCurriculo.bind(controller));


controller.geraIdiomasDinamicamente("campoIdiomas", "botaoIdiomas");
controller.geraExperienciasDinamicamente("campoExperiencias", "botaoExperiencias");
controller.geraCursosDinamicamente("campoCursos", "botaoCursos");
controller.geraFormacaoDinamicamente("campoFormacoes", "botaoFormacoes");

ValidacaoFormularioController.mascara_salarios("salarioExpectativa");
ValidacaoFormularioController.contador_caracteres("resumoCandidato")
ValidacaoFormularioController.adicionaValidacao("formularioCurriculo")