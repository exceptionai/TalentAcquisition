export class DashboardService {

    getCandidatosPotenciais() {
        return fetch("/service/recrutador/candidato_potencial/quantidade")
            .then(vagas => vagas.json());
    }

    getVagasAberto() {

        return fetch("/service/recrutador/vagas/quantidade")
            .then(vagas => vagas.json());

    }

    getDetalhesCandidatosPotenciais() {
        return fetch("/service/recrutador/candidatos_destaque")
            .then(res => res.json())
    }

    getCandidatosTotais() {
        return fetch("/service/recrutador/candidato/quantidade")
            .then(res => res.json())
    }


    getDadosAltaPerformance() {

        const labels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
        const series = [{
            name: "Pontos",
            data: [15, 15, 20, 21, 33, 34]
        }];

        return Promise.resolve({
            labels,
            series
        });
    }

    getDadosUltimoAno() {
        const dataInicio = new Date();
        dataInicio.setMonth(0);
        // dataInicio.setDate(dataInicio.getDate() - 1);
        const dataFinal = new Date();
        dataFinal.setMonth(11);
        return fetch('/service/recrutador/candidatos_ultimo_ano')
            .then(res => res.json())
            .then(dados => {
                const labels = this._parseLabelsChartAnual(new Date().getMonth());
                let series;
                if (!dados.length) {
                    series = [{
                        name: "Pontos",
                        data: labels.map(() => "0")
                    }]
                } else {
                    series = this._parsePontuacoesChart(dados, dataInicio, dataFinal);
                    if (dataInicio.getDate() - dataInicio.getDay() < 3) {
                        for (let i = 0; i < 7 - dados.length; i++) {
                            series[0].data.push(0);
                        }
                    }
                }

                return { labels, series }
            })

    }

    _adicionarDatas(destino, dataInicio, dataFinal, dado) {
        for (var i = new Date(dataInicio); i.getMonth() <= new Date(dataFinal).getMonth(); i.setMonth(i.getMonth() + 1)) {

            if (i.getMonth() == new Date(dataFinal).getMonth()) {
                destino.push(dado.quantidade);
            } else {
                destino.push(0);
            }
            if (i.getMonth() == 11) {
                break;
            }
        }
    }


    _parsePontuacoesChart(dados, dataInicio, dataFinal) {
        const datas = [];
        let proxData = new Date(dataInicio);
        // proxData.setDate(proxData.getDate() - proxData.getDay());

        dados.forEach(dado => {
            const data = new Date(parseInt(dado.data.match(/\d{4}/g)) - 1, parseInt(dado.data.match(/(\d{2})/g)[1]) + 2, parseInt(dado.data.match(/\d{2}$/g)))

            if (data.getMonth() !== proxData.getMonth()) {
                this._adicionarDatas(datas, proxData, data, dado);
            } else {
                datas.push(dado.quantidade);
            }
            proxData = new Date(data);
            proxData.setMonth(proxData.getMonth() + 1);
        })

        const uData = dados[dados.length - 1];
        const data = new Date(parseInt(uData.data.match(/\d{4}/g)) - 1, parseInt(uData.data.match(/(\d{2})/g)[1]) + 2, parseInt(uData.data.match(/\d{2}$/g)))

        this._adicionarDatas(datas, data, dataFinal, uData)
        datas.pop();
        return [{
            name: "Pontos",
            data: datas
        }]

    }

    _parseLabelsChartAnual(mes) {
        const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        meses[mes] = "Atual";
        return meses;
    }
}