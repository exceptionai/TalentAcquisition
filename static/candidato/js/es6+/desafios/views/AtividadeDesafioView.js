export class AtividadeDesafioView {

    constructor(atividadeDesafioContainer) {
        this.atividadeDesafioContainer = $(atividadeDesafioContainer);
    }

    mensagemFinalizar(titulo) {
        $("[data-nomeDesafio]").html(titulo)
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
                            <button data-id="${index}" data-alternativaID="${alternativa.descricao[1]}" class="btn-resposta btn btn-primary flex-grow-1 ${atividade.alternativas[index + 1] ? "col-6 mr-5" : "col-12"}">${alternativa.descricao[0]}</button>
                            ${atividade.alternativas[index + 1] ? `<button data-id="${index + 1}" data-alternativaID="${atividade.alternativas[index + 1].descricao[1]}" class=" btn-resposta btn btn-primary flex-grow-1">${atividade.alternativas[index + 1].descricao[0]}</button>` : ""}
                        </div>
                    `)
                .filter((alternativa, index) => index % 2 === 0).join('')}
                </div>
            </div>
        `
    }

    _templateContador(){
        return `<i class="far fa-circle text-danger flow-question mr-1"></i>`
    }

    renderTitulo(titulo){
        this.atividadeDesafioContainer.find("#tituloDesafioCategoria").html(titulo);
    }

    renderTempo(tempo){
        this.atividadeDesafioContainer.parent().find("#tempoRestante").html(tempo+" min");
    }

    renderQuantidade(quantidadeQuestoes){
        this.atividadeDesafioContainer.parent().find("#totalQuestoes").html(quantidadeQuestoes)
    }

    renderCircles(quantidadeQuestoes){
        const contador = this.atividadeDesafioContainer.parent().find("#questoesContador");
        contador.html('')
        for(let i = 0; i < quantidadeQuestoes; i++){
            const template = this._templateContador();
            contador.append(template)
        }
    }

    render(atividade, indexAtividade, idSelecionado, questoes) {
        this.atividadeDesafioContainer.html("");
        const template = this._template(atividade);
        this.atividadeDesafioContainer.html(template);
        const elementoSelecionado = this.atividadeDesafioContainer.parent().find(`.btn-resposta[data-id=${idSelecionado}]`);
        if (elementoSelecionado.get(0)) {
            elementoSelecionado.addClass("resposta-ativada");
        }
        this.atividadeDesafioContainer.parent().find(".btn-resposta").click( event =>{
            this.atividadeDesafioContainer.parent().find(".btn-resposta").removeClass('resposta-ativada');
            event.target.classList.toggle('resposta-ativada');
            const indexSelecionado = this.atividadeDesafioContainer.parent().find(".resposta-ativada").attr('data-alternativaid');
            
            if(questoes){
                questoes._alternativas.forEach((alternativa, index)=>{
                    if (alternativa.descricao[1] == indexSelecionado) alternativa._selecionada = true;
                    else alternativa._selecionada = false;
                })
            }
            console.log(questoes)
            this.atividadeDesafioContainer.parent().find("#questoesContador .flow-question")[indexAtividade].classList.add("fa-dot-circle");
        })
    }
}