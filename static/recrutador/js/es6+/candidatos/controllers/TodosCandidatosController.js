import { TableView } from '../views/TableView.js';
import { CandidatosService } from '../services/CandidatosService.js';
import { VagasAbertoService } from '../../vagas/services/VagasAbertoService.js';
import { VagasAbertoView } from '../../vagas/views/VagasAbertoView.js';

export class TodosCandidatosController {

    constructor() {
        this.tableView = new TableView("#todosCandidatoTabela");
        this.service = new CandidatosService();
        this._vagaService = new VagasAbertoService();
        this._vagaView = new VagasAbertoView("#vagasCards");
        this._init();
    }

    async _init() {


        const oportunidades = await this._vagaService.buscarOportunidades();
        this._vagaView.renderAll(oportunidades, "Todos Candidatos");
        $(".loader").hide();
        this._animateCard();
    }

    _animateCard() {
        $("#vagasCards a").click(async(e) => {
            e.preventDefault();
            const vagasAbertoID = /vagasAberto\/(\d+)/g.exec(e.target.href)[1];
            const colunasTabela = this._definirColunas();
            const todosCandidatos = await this.service.buscarDadosTodosCandidatos(vagasAbertoID);
            console.log(todosCandidatos)
            this.tableView.render(todosCandidatos, colunasTabela)

            // window.history.pushState("", "Exception", "candidatosTotais/vagas/1/");
            $(".vagas").hide(400)
            $("#candidatosLista").hide();
            $("#candidatosLista").removeClass('d-none');
            const tituloVaga = $(e.target).parent().parent().find(".card-title").text();
            const tituloPagina = $("#todosCandidatos");
            tituloPagina.html(`${tituloPagina.html()} <span class="mr-2 ml-2">/</span> <a href="#">${tituloVaga}</a>`);
            $(".tituloTotaisCandidato").html(tituloVaga);
            setTimeout(() => {
                $("#candidatosLista").fadeIn(800);

            }, 200);
        })
    }


    _definirColunas() {
        return [{
                dataField: "candidato",
                caption: "Candidato"
            }, {
                dataField: "pontuacao_alcancada",
                caption: "Pontuação Alcançada",
                dataType: "string",
                alignment: "right",
                cssClass: "bullet"
            }, {
                dataField: "pontuacao_minima",
                dataType: "number",
                caption: "Pontuação Miníma"
            }, {
                dataField: "fator_destaque",
                dataType: "string",
                caption: "Fator de destaque"
            }, {
                dataField: "curriculo",
                dataType: "string",
                caption: "Currículo",
                cellTemplate: this.tableView.botaoCurriculo.bind(this.tableView)
            },
            {
                dataField: "detalhes_pontuacao",
                dataType: "string",
                width: 100,
                caption: "Pontuação",
                cellTemplate: this.tableView.botaoPontuacao.bind(this.tableView)
            }
        ]
    }

}