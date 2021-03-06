import { Formater } from "../../shared/utils/Formater.js";
import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";

export class OportunidadesView {
    constructor(seletorContainer) {
        this._container = $(seletorContainer);
    }

    _template(vaga) {
        const dataAbertura = Formater.stringData(vaga.dataAbertura);
        const userService = new UsuarioService();
        return `
        <div class="card mr-4 border ${vaga.selecionado?'border-success':''} cardVaga">
            <div class="card-body">
                <h4 class="card-title  pb-2 border-bottom border-alternate">${vaga.cargo}</h4>
                <div class="card-text d-flex flex-column mt-3 ">

                    <div id="candidatos">
                        <i class="fas fa-user-check col-1"></i>
                        <span class="text-secondary">Área de Atuação: <span class="text-bold">${vaga.areaAtuacao}</span> </span>
                    </div>
                    <div id="dataAbertura">
                        <i class="fas fa-city col-1 pr-3"></i>
                        <span class="text-secondary">Cidade: ${vaga.cidade}</span>
                    </div>
                    <div id="dataAbertura">
                        <i class="far fa-calendar-alt col-1"></i>
                        <span class="text-secondary">Abertura da vaga: ${dataAbertura}</span>
                    </div>

                </div>
                <div ex-router class="d-flex justify-content-center mt-3 border-top">
                    <a class="btn ${vaga.selecionado?'btn-outline-success':'btn-primary'} mt-3" ex-route-name="oportunidade${vaga.vagaID}" href="#/candidato/vaga/${vaga.vagaID}"> ${vaga.selecionado?'Inscrito':'Detalhes'}</a>

                </div>
            </div>
        </div>
        `;
    }

    render(vaga) {
        const template = this._template(vaga)
        this._container.append(template);
    }

    renderAll(vagas) {
        const vagasContainer = $("<div id='containerCardsVagas' class='d-flex flex-wrap flex-row '></div>");
        for (let vaga of vagas) {
            const template = this._template(vaga);
            vagasContainer.append(template);
        }
        console.log(this._container)
        if (!vagas.length) vagasContainer.html("<h2 class='font-white'>Não há novas vagas cadastradas</h2>");
        this._container.append(vagasContainer);
    }
}