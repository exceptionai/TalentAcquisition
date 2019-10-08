import { DesbloqueavelController } from './controllers/DesbloqueavelController.js';
import { UsuarioService } from '../shared/usuario/services/UsuarioService.js';

const usuarioService = new UsuarioService()
const controller = new DesbloqueavelController(usuarioService);