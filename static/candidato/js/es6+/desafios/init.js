import { CategoriasController } from './controllers/CategoriasController.js';
import { UsuarioController } from '../shared/usuario/controllers/UsuarioController.js';
export { CategoriasController };
const categoriasController = new CategoriasController(".categoriasContainer");

const usuarioController = new UsuarioController();