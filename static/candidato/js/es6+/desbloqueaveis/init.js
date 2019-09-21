import { DesbloqueavelController } from './controllers/DesbloqueavelController.js';
import { UsuarioController } from '../shared/usuario/controllers/UsuarioController.js';
import { UsuarioService } from '../shared/usuario/services/UsuarioService.js';

const usuarioService = new UsuarioService()
const controller = new DesbloqueavelController(usuarioService);
const usuarioController = new UsuarioController();