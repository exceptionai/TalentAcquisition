export class AtividadeDesafioView {

    constructor(atividadeDesafioContainer) {
        this.atividadeDesafioContainer = $(atividadeDesafioContainer);
        this.atividadeDesafioContainer.html("");
    }

    _template(atividade) {
            return `
            <div class="question">
                <div class="titulo-question">
                    <h3>${atividade.titulo}</h3>
                </div>
                <div class="description-question">
                    <p>${atividade.descricao}</p>
                </div>
                <div class="d-flex flex-column respostas">
                    ${atividade.alternativas.map((alternativa, index) => `
                        <div class="flex-grow-1  d-flex ">
                            <button data-id="${index}" class="btn-resposta btn btn-primary flex-grow-1 ${atividade.alternativas[index + 1] ? "col-6 mr-5" : "col-12"}">${alternativa.descricao}</button>
                            ${atividade.alternativas[index + 1] ? `<button data-id="${index + 1}" class=" btn-resposta btn btn-primary flex-grow-1">${atividade.alternativas[index + 1].descricao}</button>` : ""}
                        </div>
                    `)
                .filter((alternativa, index) => index % 2 === 0).join('')}
                </div>
            </div>
        `
    }

    _templateContador(){
        return `<i class="far fa-circle text-danger flow-question"></i>`
    }

    renderTitulo(titulo){
        $("#tituloDesafioCategoria").html(titulo);
    }

    renderTempo(tempo){
        $("#tempoRestante").html(tempo+" min");
    }

    renderQuantidade(quantidadeQuestoes){
        $("#totalQuestoes").html(quantidadeQuestoes)
    }

    renderCircles(quantidadeQuestoes){
        $("#questoesContador").html('')
        for(let i = 0; i < quantidadeQuestoes; i++){
            const template = this._templateContador();
            $("#questoesContador").append(template)
        }
    }

    render(atividade, indexAtividade, idSelecionado) {
        this.atividadeDesafioContainer.html("");
        const template = this._template(atividade);
        this.atividadeDesafioContainer.html(template);
        const elementoSelecionado = $(`.btn-resposta[data-id=${idSelecionado}]`);
        if (elementoSelecionado.get(0)) {
            elementoSelecionado.addClass("resposta-ativada");
        }
        $(".btn-resposta").click(function (event) {
            $(".btn-resposta").removeClass('resposta-ativada');
            this.classList.toggle('resposta-ativada');
            $("#questoesContador .flow-question")[indexAtividade].classList.toggle("fa-check-square");
            
            $("#questoesContador .flow-question")[indexAtividade].classList.toggle("fa-dot-circle");
        })
        console.log(this.atividadeDesafioContainer.html())
        console.log(template);
    }
}