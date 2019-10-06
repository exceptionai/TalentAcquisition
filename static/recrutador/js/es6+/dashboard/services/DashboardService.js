export class DashboardService {

    getCandidatosPotenciais() {
        return new Promise(resolve => resolve({ candidatosPotencias: 1 }))
    }

    getVagasAberto() {

        return fetch("/service/recrutador/vagas/quantidade")
            .then(vagas => vagas.json());

    }

    async getDetalhesCandidatosPotenciais() {

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

        const labels = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
        const series = [{
            name: "Pontos",
            data: [72, 102, 80, 225, 300, 203, 90, 233, 245, 180, 200, 320]
        }];

        return Promise.resolve({
            labels,
            series
        });
    }
}