import { DashboardController }
from './controllers/DashboardController.js';
export { DashboardController };
import { UsuarioController } from '../shared/usuario/controllers/UsuarioController.js';
import { NotificacaoService } from '../curriculo/services/NotificacaoService.js';


if (localStorage.getItem('login')) {
    NotificacaoService.sucesso("Login realizado com sucesso");
    localStorage.removeItem('login');
}

const controller = new DashboardController();
const usuarioController = new UsuarioController();