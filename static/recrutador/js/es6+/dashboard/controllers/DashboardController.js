import { ChartFactory } from '../../../../../shared/js/services/ChartFactory.js';

export class DashboardController {

    constructor() {
        this._chartFactory = new ChartFactory();
        this._init();
    }

    _init() {
        const { series: seriesAltaPerformance, labels: labelsAltaPerformance } = this.getDadosAltaPerformance();
        const { series: seriesUltimoAno, labels: labelsUltimoAno } = this.getDadosUltimoAno();

        this._chartFactory.create('#graficoCandidatosAltaPerformance', seriesAltaPerformance, labelsAltaPerformance)
        this._chartFactory.create('#graficoCandidatosUltimoAno', seriesUltimoAno, labelsUltimoAno)
    }

    getDadosAltaPerformance() {


        const labels = ['Domingo', 'Segunda-Feira', 'T', 'Q', 'Q', 'S', 'S'];
        const series = [{
            name: "Pontos",
            data: [15, 15, 20, 21, 33, 34]
        }]

        return {
            labels,
            series
        }
    }

    getDadosUltimoAno() {

        const labels = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        const series = [{
            name: "Pontos",
            data: [72, 102, 80, 225, 300, 203, 90, 233, 245, 180, 200, 320]
        }]

        return {
            labels,
            series
        }
    }



}