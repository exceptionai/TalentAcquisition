import { TableView } from '../views/TableView.js';
import { CandidatosService } from '../services/CandidatosService.js';

export class CandidatosPotenciaisController {

    constructor() {
        this.tableView = new TableView("#candidatoTable");
        this.service = new CandidatosService();
        this._init();
    }

    async _init() {

        const colunasTabela = this._definirColunas();

        const candidatosPotenciais = await this.service.buscarDadosCandidatosPotenciais();

        this.tableView.render(candidatosPotenciais, colunasTabela)
    }


    _definirColunas() {
        return [{
            dataField: "candidato",
            caption: "Candidato"
        }, {
            dataField: "vaga",
            caption: "Vaga",
            dataType: "string",
        }, {
            dataField: "pontuacao_alcancada",
            caption: "Pontuação Alcançada",
            dataType: "string"
        }, {
            dataField: "pontuacao_minima",
            dataType: "number",
            caption: "Pontuação Miníma",
            alignment: "left"
        }, {
            dataField: "fator_destaque",
            dataType: "string",
            caption: "Fator de destaque"
        }, {
            dataField: "status_candidatura",
            dataType: "string",
            caption: "Status da Candidatura"
        }, {
            dataField: "curriculo",
            dataType: "string",
            caption: "Currículo",
            cellTemplate: this.tableView.botaoCurriculo.bind(this.tableView)
        }, {
            dataField: "detalhes_pontuacao",
            dataType: "string",
            width: 100,
            caption: "Pontuação",
            cellTemplate: this.tableView.botaoPontuacao.bind(this.tableView)
        }]
    }

}