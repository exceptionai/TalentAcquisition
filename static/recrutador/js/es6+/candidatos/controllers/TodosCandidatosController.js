import {TableView} from '../views/TableView.js';
import {CandidatosService} from '../services/CandidatosService.js';

export class TodosCandidatosController{

    constructor(){
        this.tableView = new TableView("#todosCandidatoTabela");
        this.service = new CandidatosService();
        this._init();
    }

    async _init(){

        this._animateCard();

        const colunasTabela = this._definirColunas();

        const todosCandidatos = await this.service.buscarDadosTodosCandidatos();

        this.tableView.render(todosCandidatos, colunasTabela)
    }

    _animateCard(){
        $("#vagasCards button").click((e) => {
            // window.history.pushState("", "Exception Carriers", "candidatosTotais/vagas/1/");
            $(".vagas").hide(400)
            $("#candidatosLista").hide();
            $("#candidatosLista").removeClass('d-none');
            const tituloPagina = $("#todosCandidatos");
            tituloPagina.html(`${tituloPagina.html()} <span class="mr-2 ml-2">/</span> <a href="#">Desenvolvedor Front-end</a>`);
            setTimeout(() => {
                $("#candidatosLista").fadeIn(800);

            }, 200);
        })
    }

  
    _definirColunas(){
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
            caption: "",
            cellTemplate: this.tableView.botaoCurriculo.bind(this.tableView)
        }, {
            dataField: "detalhes_pontuacao",
            dataType: "string",
            width: 100,
            caption: "",
            cellTemplate: this.tableView.botaoPontuacao.bind(this.tableView)
        }]
    }
        
}