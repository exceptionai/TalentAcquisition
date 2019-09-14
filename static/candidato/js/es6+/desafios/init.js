import { DesafiosCategoriaController } from './controllers/DesafiosCategoriaController.js';
import { AtividadeDesafioController } from './controllers/AtividadeDesafioController.js';
import { CategoriasController } from './controllers/CategoriasController.js';
import { UsuarioController } from '../shared/usuario/controllers/UsuarioController.js';


const desafiosCategoriaController = new DesafiosCategoriaController();
const atividadeDesafioController = new AtividadeDesafioController("#proximaQuestao", "#questaoAnterior", "#questionContainer");
const categoriasController = new CategoriasController(".categoriasContainer");

const usuarioController = new UsuarioController();