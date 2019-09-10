import {TableFactory} from '../../../../../shared/js/services/TableFactory.js';

export class TableView{

    constructor(seletorTabela){
        this.seletorTabela = seletorTabela;
    }

    render(dadosService, colunas){
        const factory = new TableFactory(this.seletorTabela);
        factory.create(dadosService, colunas)
    }

    botao(link, titulo, btnClass){
        return $(`<div class="text-center"><a class="btn ${btnClass}" href="${link}" style="font-size:11px;padding:6px;">${titulo}</a></div>`)
    }

    botaoCurriculo(container, options){
        return this.botao(`candidatosTotais/${options.text}`, "curriculo", 'btn-success')
    }

    botaoPontuacao(container, options){
        return this.botao(`candidatosTotais/${options.text}/pontuacao`, "Pontuacao", 'btn-primary')
    }

}