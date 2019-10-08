export class CategoriasView {

    constructor(categoriasContainer) {
        this._container = $(categoriasContainer);
    }

    _template(categoria) {
        return `
        <div class="desafio-container">
            <div class="row">
                <div class="col-3 d-flex align-items-center justify-content-center border-right-primary" ex-router>
                    <a class="btn btn-alternate" href="#/candidato/desafios/categoria/${categoria.id}" ex-route-name="categoria${categoria.id}">Começar</a>
                </div>
                <div class="col-1 mr-4 ml-3">
                    <div class="score-box col-1 ">
                        ${categoria.pontosAdquiridos} / ${categoria.pontosNecessarios} Pontos
                    </div>
                </div>
                <div class="col-7 ml-2">
                    <div class="texto-desafio">
                        <h3 class="desafio-title text-primary">${categoria.titulo}</h3>
                        <p class="text-secondary desafio-description">${categoria.descricao}</p>
                    </div>
                    <div class="small">
                        <i class="fas fa-list"></i> <span class="text-secondary ml-1">${categoria.desafiosConcluidos}/${categoria.desafiosTotais} Desafios concluídos</span>
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
        if (!categorias.length) this._container.html("<h2 class='font-white text-center'>Não há desafios disponíveis no momento</h2>");

    }
}