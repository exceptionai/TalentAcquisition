export class DesafiosCategoriaView {

    constructor(desafiosContainer) {
        this._containerDesafios = $("#" + desafiosContainer);
    }

    _template(desafioCategoria) {
        return `
            <div class="desafio-container">
                <div class="row">
                    <div class="col-3 d-flex align-items-center justify-content-center border-right-primary"  ex-router>
                        <button class="btn btn-alternate" data-toggle="modal" data-target="#exampleModal" >Começar</button>
                    </div>
                    <div class="col-1 mr-3 ml-3">
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

    render(desafioCategoria) {
        const template = this._template(desafioCategoria);
        this._containerDesafios.append(template)
    }

    renderAll(desafiosCategoria) {
        this._containerDesafios.html("");
        desafiosCategoria.forEach(desafioCategoria => {
            this.render(desafioCategoria);
        })
    }
}