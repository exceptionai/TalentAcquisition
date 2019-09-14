export class AtividadeDesafioView {

    constructor(atividadeDesafioContainer) {
        this.atividadeDesafioContainer = $(atividadeDesafioContainer);
    }

    _template(tituloAtividade, descricao, alternativas) {
            return `
            <div class="question">
                <div class="titulo-question">
                    <h3>${tituloAtividade}</h3>
                </div>
                <div class="description-question">
                    <p>${descricao}</p>
                </div>
                <div class="d-flex flex-column respostas">
                    ${alternativas.map((alternativa, index) => `
                        <div class="flex-grow-1  d-flex ">
                            <button data-id="${index}" class="btn-resposta btn btn-primary flex-grow-1 ${alternativas[index + 1] ? "col-6 mr-5" : "col-12"}">${alternativa}</button>
                            ${alternativas[index + 1] ? `<button data-id="${index + 1}" class=" btn-resposta btn btn-primary flex-grow-1">${alternativas[index + 1]}</button>` : ""}
                        </div>
                    `)
                .filter((alternativa, index) => index % 2 === 0)
                .join('')}
                </div>
            </div>
        `
    }

    render(tituloAtividade, descricao, alternativas, indexAtividade, idSelecionado) {
        this.atividadeDesafioContainer.html(this._template(tituloAtividade, descricao, alternativas));
        const elementoSelecionado = $(`.btn-resposta[data-id=${idSelecionado}]`);
        if (elementoSelecionado.get(0)) {
            elementoSelecionado.addClass("resposta-ativada");
        }
        $(".btn-resposta").click(function (event) {
            $(".btn-resposta").removeClass('resposta-ativada');
            this.classList.toggle('resposta-ativada');
            $("#questoesQuadrados .flow-question")[indexAtividade].classList.toggle("fa-check-square");
            // $("#questoesQuadrados .flow-question")[indexAtividade].classList.remove("text-alternate");

            $("#questoesQuadrados .flow-question")[indexAtividade].classList.toggle("fa-dot-circle");
        })
    }
}