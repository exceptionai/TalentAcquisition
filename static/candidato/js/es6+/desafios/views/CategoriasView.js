export class CategoriasView {

    constructor(categoriasContainer) {
        this._container = $(categoriasContainer);
    }

    _template(categoria) {
        return `
        <div class="desafio-container">
            <div class="row">
                <div class="col-3 d-flex align-items-center justify-content-center border-right-primary">
                    <a class="btn btn-alternate" href="/candidato/desafios/categoria/${categoria.id}">Começar</a>
                </div>
                <div class="col-1 mr-3 ml-3">
                    <div class="score-box col-1 ">
                        ${categoria.pontos_obtidos} / ${categoria.pontos_maximos} Pontos
                    </div>
                </div>
                <div class="col-7 ">
                    <div class="texto-desafio">
                        <h3 class="desafio-title text-primary">${categoria.titulo}</h3>
                        <p class="text-secondary desafio-description">${categoria.descricao}</p>
                    </div>
                    <div class="small">
                        <i class="fas fa-list"></i> <span class="text-secondary ml-1">${categoria.desafios_resolvidos}/${categoria.desafios_totais} Desafios concluídos</span>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    render(desafio) {
        const template = this._template(desafio);
        this._container.append(template);
    }

    renderAll(categorias) {
        this._container.html('');
        categorias.forEach(categoria => {
            this.render(categoria);
        })
    }
}