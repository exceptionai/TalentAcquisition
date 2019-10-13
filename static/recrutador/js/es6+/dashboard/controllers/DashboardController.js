import { ChartFactory } from '../../../../../shared/js/services/ChartFactory.js';
import { DashboardView } from '../views/DashboardView.js';
import { DashboardService } from '../services/DashboardService.js';

export class DashboardController {

    constructor() {
        this._chartFactory = new ChartFactory();
        this._view = new DashboardView();
        this._service = new DashboardService();
        this._init();
    }

    _init() {
        this.buscarCandidatosPotenciais();
        this.buscarVagasAberto();
        this.buscarCandidatosTotais();
        this.buscarCandidatosAltaPerformance();
        this.buscarCandidatosUltimoAno();
        this.buscarDetalhesCandidatosPotenciais();
    }

    async getDetalhesCandidatosPotenciais() {

    }

    async buscarCandidatosPotenciais() {
        const { candidatosPotencias } = await this._service.getCandidatosPotenciais();
        this._view.renderCandidatosPotenciais(candidatosPotencias, "Últimas 24 horas");

    }

    async buscarVagasAberto() {

        const { quantidade } = await this._service.getVagasAberto();
        this._view.renderVagasAberto(quantidade, "Agora");
    }

    async buscarCandidatosTotais() {
        const { candidatos } = await this._service.getCandidatosTotais();
        this._view.renderCandidatosTotais(candidatos);
    }

    async buscarCandidatosAltaPerformance() {
        const { series, labels } = await this._service.getDadosAltaPerformance();
        this._chartFactory.create('#graficoCandidatosAltaPerformance', series, labels);
    }


    async buscarCandidatosUltimoAno() {
        const { series, labels } = await this._service.getDadosUltimoAno();
        this._chartFactory.create('#graficoCandidatosUltimoAno', series, labels);
    }

    async buscarDetalhesCandidatosPotenciais() {
        const candidatos = await this._service.getDetalhesCandidatosPotenciais();
        this._view.renderAllDetalhesCandidatos(candidatos);
    }




}