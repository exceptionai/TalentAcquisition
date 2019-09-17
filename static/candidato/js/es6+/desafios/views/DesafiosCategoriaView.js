export class DesafiosCategoriaView {

    constructor(desafiosContainer) {
        this.containerDesafios = $("#" + desafiosContainer);
    }

    _template(titulo, descricao, pontosConquistados, pontosADesbloquear, desafiosRealizados, desafiosARealizar, tempo) {
        return `
            <div class="desafio-container">
                <div class="row">
                    <div class="col-3 d-flex align-items-center justify-content-center border-right-primary"  ex-router>
                        <button class="btn btn-alternate" data-toggle="modal" data-target="#exampleModal" >Começar</button>
                    </div>
                    <div class="col-1 mr-3 ml-3">
                        <div class="score-box col-1 ">
                            ${pontosConquistados?pontosConquistados:'-'} / ${pontosADesbloquear} Pontos
                        </div>
                    </div>
                    <div class="col-7 ">
                        <div class="texto-desafio">
                            <h3 class="desafio-title text-primary">${titulo}</h3>
                            <p class="text-secondary desafio-description">${descricao}</p>
                        </div>
                        <div class="small ">
                            <i class="fas fa-list"></i> <span class="text-secondary ml-1">${desafiosRealizados}/${desafiosARealizar} Desafios concluídos</span>
                            <i class="far fa-clock ml-4"></i> <span class="text-secondary">${tempo} min</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    render(titulo, descricao, pontosConquistados, pontosADesbloquear, desafiosRealizados, desafiosARealizar, tempo) {
        this.containerDesafios.append(this._template(titulo, descricao, pontosConquistados, pontosADesbloquear, desafiosRealizados, desafiosARealizar, tempo))
    }
}