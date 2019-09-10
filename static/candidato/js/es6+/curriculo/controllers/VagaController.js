import { VagaService } from '../services/VagaService.js';

export class VagaController {
    get_vaga() {
        const url = window.location.pathname;
        const vaga_service = new VagaService();
        const vaga = vaga_service.load_vaga(url);
        return vaga;
    }
}