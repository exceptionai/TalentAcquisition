import { DesafiosCategoriaController } from './controllers/DesafiosCategoriaController.js';
import { AtividadeDesafioController } from './controllers/AtividadeDesafioController.js';

const desafiosCategoriaController = new DesafiosCategoriaController();
const atividadeDesafioController = new AtividadeDesafioController("#proximaQuestao", "#questaoAnterior", "#questionContainer");