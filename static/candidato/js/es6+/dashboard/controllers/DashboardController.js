import { ChartFactory } from '../../../../../shared/js/services/ChartFactory.js';

export class DashboardController {

    constructor() {
        this._chartFactory = new ChartFactory();
        this._init();
    }

    _init() {
        const { series: seriesDesempenhoSemanal, labels: labelsDesempenhoSemanal } = this.getDadosDesempenhoSemanal();
        const { series: seriesEvolucaoProgressiva, labels: labelsEvolucaoProgressiva } = this.getDadosEvolucaoProgressiva();

        this._chartFactory.create('#desempenhoSemanal', seriesDesempenhoSemanal, labelsDesempenhoSemanal)
        this._chartFactory.create('#evolucaoProgressiva', seriesEvolucaoProgressiva, labelsEvolucaoProgressiva)
    }

    getDadosDesempenhoSemanal() {


        const labels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        const series = [{
            name: "Pontos",
            data: [15, 15, 20, 21, 33, 34]
        }]

        return {
            labels,
            series
        }
    }

    getDadosEvolucaoProgressiva() {

        const labels = ['04/08', '05/08', '06/08'];
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