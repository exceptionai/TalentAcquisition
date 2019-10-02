import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";
import { Formater } from "../../shared/utils/Formater.js";

export class DashboardService {

    constructor() {
        const usuarioService = new UsuarioService();
        this.dadosRequisicao = usuarioService.dadosRequisicao;
    }

    buscarFases() {
        return fetch(`/service/candidato/fase?candidatoID=${this.dadosRequisicao.candidatoID}&token=${this.dadosRequisicao.token}`)
            .then(res => res.json())
    }

    buscarCandidatura() {
        return fetch(`/service/candidato/candidatura?candidatoID=${this.dadosRequisicao.candidatoID}&token=${this.dadosRequisicao.token}`)
            .then(res => res.json())
    }

    getDadosDesempenhoSemanal() {
        const dataInicio = new Date();
        dataInicio.setHours(0);
        dataInicio.setMinutes(0);
        dataInicio.setSeconds(0);
        dataInicio.setDate(dataInicio.getDate() - dataInicio.getDay());
        const dataFinal = new Date();
        dataFinal.setHours(23);
        dataFinal.setMinutes(59);
        dataFinal.setSeconds(59);
        return fetch(`/service/candidato/desempenho?candidatoID=${this.dadosRequisicao.candidatoID}&dataInicial=${dataInicio.toISOString().substr(0,11)}&dataFinal=${dataFinal.toISOString().substr(0,11)}&token=${this.dadosRequisicao.token}`)
            .then(res => res.json())
            .then(dados => {
                const labels = this._parseLabelsChartSemanal(new Date().getDay() + 1);
                let series;
                if (!dados.length) {
                    series = [{
                        name: "Pontos",
                        data: labels.map(() => "0")
                    }]
                } else {
                    series = this._parsePontuacoesChart(dados, dataInicio, dataFinal);
                    if (dataInicio.getDate() - dataInicio.getDay() < 3) {
                        for (let i = 0; i < 6 - dados.length; i++) {
                            series[0].data.push(0);
                        }
                    }
                }
                return { labels, series }
            })
    }

    _parseLabelsChartSemanal(qntDias) {
        const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        diasSemana[new Date().getDay()] = "Hoje";
        return diasSemana;
    }

    _adicionarDatas(destino, dataInicio, dataFinal, dado) {
        for (var i = new Date(dataInicio); i.getDay() <= new Date(dataFinal).getDay(); i.setDate(i.getDate() + 1)) {
            if (i.getDate() == new Date(dataFinal).getDate()) {
                destino.push(dado.pontuacao);
            } else {
                destino.push(0);
            }
        }
    }

    _parsePontuacoesChart(dados, dataInicio, dataFinal) {

        const datas = [];
        let proxData = new Date(dataInicio);
        dados.forEach(dado => {
            const data = new Date(parseInt(dado.data.match(/\d{4}/g)) - 1, parseInt(dado.data.match(/(\d{2})/g)[1]) + 1, parseInt(dado.data.match(/\d{2}$/g)))
            if (data.getDate() !== proxData.getDate()) {
                this._adicionarDatas(datas, proxData, data, dado);
            } else {
                datas.push(dado.pontuacao);
            }
            proxData = new Date(data);
            proxData.setDate(proxData.getDate() + 1);
        })

        const uData = dados[dados.length - 1];
        const data = new Date(parseInt(uData.data.match(/\d{4}/g)) - 1, parseInt(uData.data.match(/(\d{2})/g)[1]) + 1, parseInt(uData.data.match(/\d{2}$/g)))

        this._adicionarDatas(datas, data, dataFinal, uData)
        datas.pop()

        return [{
            name: "Pontos",
            data: datas
        }]

    }

    getDadosEvolucaoProgressiva() {
        const dataFinal = new Date();
        return fetch(`/service/candidato/evolucao_progressiva?candidatoID=${this.dadosRequisicao.candidatoID}&dataFinal=${dataFinal.toISOString()}&token=${this.dadosRequisicao.token}`)
            .then(res => res.json())
            .then(dados => {
                const series = [{
                    name: "Pontos",
                    data: dados.map(dado => dado.pontuacao)
                }];
                const labels = dados.map(dado => Formater.diaMes(dado.data));
                return { labels, series }
            })

        const labels = ['04/08', '05/08', '06/08'];
        const series = [{
            name: "Pontos",
            data: [72, 80, 102]
        }]

        return new Promise((resolve, reject) => {
            resolve({
                labels,
                series
            })
        });
    }

}