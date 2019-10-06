import { ChartFactory } from '../../../../../shared/js/services/ChartFactory.js';
import { FasesView } from '../views/FasesView.js';
import { DashboardService } from '../services/DashboardService.js';
import { DashboardView } from '../views/DashboardView.js';

export class DashboardController {

    constructor() {
        this._service = new DashboardService();
        this._chartFactory = new ChartFactory();
        this._fasesView = null;
        this._view = new DashboardView("#statusCandidatura", "#dataVerificacaoCandidatura");
        this._init();
    }

    _init() {
        this._buscarDesempenhoSemanal();
        this._buscarEvolucaoProgressiva();
        this._buscarCandidatura();
        this._buscarFases();
    }

    async _buscarFases() {
        const fases = await this._service.buscarFases();
        this._fasesView = new FasesView(fases, "#corpoFases", "#faseAtual", "#dataFaseCard");

        this._fasesView.preencherCard("Última hora");
        this._fasesView.renderAllTabela();
    }

    async _buscarCandidatura() {
        const candidatura = await this._service.buscarCandidatura();
        this._view.preencherAtualizacaoCard("#dataVerificacaoCandidatura", "Última hora");
        this._view.preencherCardCandidatura(candidatura);
    }

    async _buscarEvolucaoProgressiva() {
        const evolucaoProgressiva = await this._service.getDadosEvolucaoProgressiva();
        const { series, labels } = evolucaoProgressiva;

        let options = {}
        if (series.length == 1) options = {
            chart: {
                type: 'bar',
                height: 170,
                toolbar: {

                    tools: {
                        download: false
                    }
                }
            },
            xaxis: {
                labels: {
                    style: {
                        colors: ["#FFF"]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        color: "#FFF"
                    }
                }
            },
            dataLabels: {
                style: {
                    colors: ["#333"]
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    endingShape: 'flat',
                    columnWidth: '18%'
                }
            }
        };

        this._chartFactory.create('#evolucaoProgressiva', series, labels, options);
        this._view.preencherDataDesempenhoProgressivo("#dataDesempenhoSemanal", "Última Hora")
    }

    async _buscarDesempenhoSemanal() {
        const desempenhoSemanal = await this._service.getDadosDesempenhoSemanal();
        const { series, labels } = desempenhoSemanal;

        this._chartFactory.create('#desempenhoSemanal', series, labels);
        this._view.preencherDataDesempenhoProgressivo("#dataDesempenhoProgressivo", "Última Hora")
    }
}