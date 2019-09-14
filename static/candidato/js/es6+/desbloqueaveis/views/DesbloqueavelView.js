let contadorDesbloqueavel = 0;

export class DesbloqueavelView {

    constructor(seletorContainer) {
        this.container = $(seletorContainer);
    }


    _template(desbloqueavel) {
        return `
            ${this._templateCard(desbloqueavel)}
        `
    }

    _templateCard(desbloqueavel) {
            let action = '';
            let cursor = 'pointer';
            const pontos_atuais = localStorage.getItem('pontos');

            if (this._possivelDesbloquear(desbloqueavel)) {
                action = `data-toggle="modal" data-target="#desbloqueavel${++contadorDesbloqueavel}"`
            } else if (!desbloqueavel.obtido) {
                cursor = 'default';
            } else {
                action = 'data-toggle="tooltip" data-placement="top" title="Este item já está selecionado"'
            }

            return `
            <div class="card mr-3 border-alternate desbloqueavel">
                <img alt="${desbloqueavel.descricao}" title="${desbloqueavel.descricao}" src="${desbloqueavel.imagem}" height="180"></img>
                <div class="card-body d-flex flex-column text-center">
                    <p class="card-text">${desbloqueavel.descricao}<i class="pl-2 fas  ${desbloqueavel.obtido?'fa-unlock-alt':'fa-lock'}"></i></p>
                    <button ${action} href="#" style="cursor:${cursor}" class="${pontos_atuais < desbloqueavel.pontos_minimos?'disabled':''} btn ${desbloqueavel.obtido?' btn-outline-primary':'btn-primary'}">${desbloqueavel.pontos_minimos?desbloqueavel.pontos_minimos+`<i class="fas fa-coins pl-2 text-warning"></i>`:'Selecionado'}</button>
                </div>
            </div>
        `
    }

    _templateConfirmacao(desbloqueavel){
        const pontos_atuais = localStorage.getItem('pontos');
        return `
        <div class="modal fade" id="desbloqueavel${contadorDesbloqueavel}" tabindex="-1" role="dialog" aria-labelledby="desbloqueavel${contadorDesbloqueavel}" aria-hidden="true" >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <i class="fas fa-check mr-2"></i>
                        <h5 class="modal-title">Confirmação - Desbloquear ${desbloqueavel.tipo[0].toUpperCase()+desbloqueavel.tipo.substr(1,desbloqueavel.tipo.length)}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            Deseja desbloquear ${desbloqueavel.descricao}?
                        </p>
                        <p>
                            <span class="d-block">Seus pontos atuais são: <span class="text-bold">${pontos_atuais}</span><i class="fas fa-coins pl-2 text-warning"></i>.</span>
                            <span class="d-block">Seus pontos restantes serão: <span class="text-bold">${pontos_atuais - desbloqueavel.pontos_minimos}</span><i class="fas fa-coins pl-2 text-warning"></i></span>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="desbloqueavel-${contadorDesbloqueavel}-confirmar" data-dismiss="modal">Confirmar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    _possivelDesbloquear(desbloqueavel){
        const pontos_atuais = localStorage.getItem('pontos');
        return !desbloqueavel.obtido && pontos_atuais > desbloqueavel.pontos_minimos;
    }

    render(desbloqueavel, callback) {
        const templateDesbloqueavel = this._template(desbloqueavel);
        this.container.append(templateDesbloqueavel)

        if (this._possivelDesbloquear(desbloqueavel)) {

            const templateConfirmacao = this._templateConfirmacao(desbloqueavel);
            $('body').append(templateConfirmacao);
            $(`#desbloqueavel-${contadorDesbloqueavel}-confirmar`).click(()=>callback(desbloqueavel))
        }
    }

    renderAll(desbloqueaveis, callbackItem) {
        this.container.html('')
        desbloqueaveis.forEach(desbloqueavel=>{
            this.render(desbloqueavel, callbackItem)
        })
    }
}