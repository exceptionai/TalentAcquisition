import { VagaController, CurriculoController, ValidacaoFormularioController } from './controllers/index.js'
import { UsuarioController } from '../shared/usuario/controllers/UsuarioController.js';
import { ValidacaoFormularioView } from './views/ValidacaoFormularioView.js';


const vaga = new VagaController().get_vaga();
const controller = new CurriculoController(vaga, "#cidade", "#uf", "#campoDispostoSeMudar", "#formularioCurriculo");
const btnEnviar = document.querySelector("#btnEnviar");

window.onload = () => controller.esconderHeader();

btnEnviar.addEventListener('click', controller.enviarCurriculo.bind(controller));

$('#cep').on('blur', function(event) {
    let CEP = event.target.value;
    CEP = CEP.replace(/\D/g, '');
    controller.carregarCEP(CEP);
})
controller.geraIdiomasDinamicamente("campoIdiomas", "botaoIdiomas");
controller.geraExperienciasDinamicamente("campoExperiencias", "botaoExperiencias");
controller.geraCursosDinamicamente("campoCursos", "botaoCursos");
controller.geraFormacaoDinamicamente("campoFormacoes", "botaoFormacoes");

ValidacaoFormularioView.mascara_salarios("salarioExpectativa");
ValidacaoFormularioController.contador_caracteres("resumoCandidato")
ValidacaoFormularioController.adicionaValidacao("formularioCurriculo")

const usuarioController = new UsuarioController();