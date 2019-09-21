import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";
import { Formater } from "../../shared/utils/Formater.js";

export class DashboardService {

    constructor() {
        const usuarioService = new UsuarioService();
        this.dadosRequisicao = usuarioService.dadosRequisicao;
    }

    buscarFases() {
        return fetch(`http://localhost:5500/candidato/fase?candidatoID=${this.dadosRequisicao.candidatoID}&token=${this.dadosRequisicao.token}`)
            .then(res => res.json())
    }

    buscarCandidatura() {
        return fetch(`http://localhost:5500/candidato/candidatura?candidatoID=${this.dadosRequisicao.candidatoID}&token=${this.dadosRequisicao.token}`)
            .then(res => res.json())
    }

    getDadosDesempenhoSemanal() {
        const dataInicio = new Date();
        dataInicio.setDate(dataInicio.getDate() - dataInicio.getDay());
        const dataFinal = new Date();
        return fetch(`http://localhost:5500/candidato/desempenho?candidatoID=${this.dadosRequisicao.candidatoID}&dataInicial=${dataInicio.toISOString()}&dataFinal=${dataFinal.toISOString()}&token=${this.dadosRequisicao.token}`)
            .then(res => res.json())
            .then(dados => {
                const series = this._parsePontuacoesChart(dados, dataInicio, dataFinal);
                const labels = this._parseLabelsChartSemanal(new Date().getDay() + 1);
                return { labels, series }
            })
    }

    _parseLabelsChartSemanal(qntDias) {
        const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        diasSemana[qntDias - 1] = "Hoje";
        return diasSemana.slice(0, qntDias);
    }

    _adicionarDatas(destino, dataInicio, dataFinal, dado) {
        for (var i = new Date(dataInicio); i.getDate() <= new Date(dataFinal).getDate(); i.setDate(i.getDate() + 1)) {
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
                console.log(data.getDate(), proxData.getDate())
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
        return fetch(`http://localhost:5500/candidato/evolucao_progressiva?candidatoID=${this.dadosRequisicao.candidatoID}&dataFinal=${dataFinal.toISOString()}&token=${this.dadosRequisicao.token}`)
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