export class DesafiosCategoriaView {

    constructor(desafiosContainer) {
        this._containerDesafios = $("#" + desafiosContainer);
    }

    _template(desafioCategoria) {
        return `
            <div class="desafio-container">
                <div class="row">
                    <div class="col-3 d-flex align-items-center justify-content-center border-right-primary"  ex-router>
                        <button class="btn btn-alternate" data-toggle="modal" data-target="#desafioCategoriaModal${desafioCategoria.id}" >Começar</button>
                    </div>
                    <div class="col-1 mr-4 ml-3">
                        <div class="score-box col-1 ">
                            ${desafioCategoria.pontosConquistados?desafioCategoria.pontosConquistados:'-'} / ${desafioCategoria.pontosADesbloquear} Pontos
                        </div>
                    </div>
                    <div class="col-7 ">
                        <div class="texto-desafio">
                            <h3 class="desafio-title text-primary">${desafioCategoria.titulo}</h3>
                            <p class="text-secondary desafio-description">${desafioCategoria.descricao}</p>
                        </div>
                        <div class="small ">
                            <i class="fas fa-list"></i> <span class="text-secondary ml-1">${desafioCategoria.desafiosRealizados}/${desafioCategoria.desafiosARealizar} Desafios concluídos</span>
                            <i class="far fa-clock ml-4"></i> <span class="text-secondary">${desafioCategoria.tempo} min</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    _templateModal(desafioCategoria) {
        return `
        <div class="modal desafio-categoria-modal" modal-element id="desafioCategoriaModal${desafioCategoria.id}" tabindex="-1" role="dialog" aria-labelledby="desafioCategoriaModal${desafioCategoria.id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <i class="fas fa-check mr-2"></i>
                        <h5 class="modal-title" id="exampleModalLabel">Confirmação - ${desafioCategoria.titulo}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            Este teste possuí um tempo limite de <span class="text-bold">${desafioCategoria.tempo} minutos</span> para ser realizado e este teste poderá ser realizado apenas uma única vez.
                        </p>
                        <p>
                            Certifique-se de estar preparado antes de iniciar.
                        </p>
                    </div>
                    <div class="modal-footer" ex-router>
                        <a type="button" class="btn btn-primary" modal-link ex-route-name="atividadeAtividadedesafio${desafioCategoria.id}" href='${window.location.hash}/atividade/${desafioCategoria.id}'>Confirmar</a>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>`
    }



    render(desafioCategoria) {
        const template = this._template(desafioCategoria);
        const templateModal = this._templateModal(desafioCategoria);

        $("body").append(templateModal);
        this._containerDesafios.append(template)
    }

    renderAll(desafiosCategoria) {
        this._containerDesafios.html("");
        desafiosCategoria.forEach(desafioCategoria => {
            this.render(desafioCategoria);
        })
    }
}