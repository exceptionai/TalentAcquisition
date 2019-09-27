import { DashboardController }
from './controllers/DashboardController.js';
export { DashboardController };
import { UsuarioController } from '../shared/usuario/controllers/UsuarioController.js';


const controller = new DashboardController();
const usuarioController = new UsuarioController();