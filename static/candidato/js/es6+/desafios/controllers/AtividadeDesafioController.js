import { AtividadeDesafioView } from '../views/AtividadeDesafioView.js';
import { AtividadeDesafioService } from '../services/AtividadeDesafioService.js';

let contador;
export class AtividadeDesafioController {
    constructor() {

        this._service = new AtividadeDesafioService();

        this._init();
    }

    _init() {
        this.buscarQuestoes();
        $(".desafio-categoria-modal .modal-footer[ex-router] a").click(this.buscarQuestoes.bind(this))

    }

    buscarQuestoes() {
        this._service.buscarQuestoes()
            .then(({ questoes, tempoRestante, titulo, atividadeDesafioID }) => {
                this._atividadeDesafioID = atividadeDesafioID;
                this._view = new AtividadeDesafioView(`#atividadeAtividadedesafio${this._atividadeDesafioID} #questionContainer`);
                this._proximaPerguntaButton = $(`#atividadeAtividadedesafio${this._atividadeDesafioID} #proximaQuestao`);
                this._perguntaAnteriorButton = $(`#atividadeAtividadedesafio${this._atividadeDesafioID} #questaoAnterior`);
                this._proximaPerguntaButton.addClass("d-none");
                this._perguntaAnteriorButton.addClass("d-none");

                this._questoes = questoes;
                this._indicePergunta = 0;
                this._perguntaAtual = questoes[this._indicePergunta];
                if (this._proximaPerguntaButton.length && this._perguntaAnteriorButton.length) {
                    this._perguntaAnterior = null;
                    this._proximaPergunta = questoes[this._indicePergunta + 1];
                }
                this._view.renderTitulo(titulo)

                this._view.renderTempo(tempoRestante);

                this._view.renderQuantidade(questoes.length);

                this._view.renderCircles(questoes.length);
                this._view.render(
                    this._perguntaAtual,
                    this._indicePergunta
                )

                if (this._proximaPergunta)
                    this._proximaPerguntaButton.removeClass("d-none")
                if (this._perguntaAnterior)
                    this._perguntaAnteriorButton.removeClass("d-none")
                $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta].classList.add('text-alternate');
                $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta].classList.remove('text-danger');

                this._navegaEntreQuestoes();

                this._contagemTempoDesafio(tempoRestante);

                this._confirmarAoSair();

            })
    }

    _navegaEntreQuestoes() {
        const proxQuestao = $(`#atividadeAtividadedesafio${this._atividadeDesafioID} #proximaQuestao`);
        const anteQuestao = $(`#atividadeAtividadedesafio${this._atividadeDesafioID} #questaoAnterior`);
        proxQuestao.off('click');
        anteQuestao.off('click');

        proxQuestao.click(this.proximaQuestao.bind(this));
        anteQuestao.click(this.questaoAnterior.bind(this));
    }

    _contagemTempoDesafio(tempoRestante) {
        clearInterval(contador);
        let tempoAtividade = tempoRestante;
        const tempoTotalMilis = 10 * 1000;

        contador = setInterval(() => {
            let tempoFormatado = tempoAtividade.toString().padStart(2, "0");
            $(`#atividadeAtividadedesafio${this._atividadeDesafioID} #tempoRestante`).text(tempoFormatado + " min")
            if (!tempoAtividade) clearInterval(contador);

            tempoAtividade--;
        }, tempoTotalMilis);
    }

    _confirmarAoSair() {
        $(".sidebar a").click(e => {
            window.interceptarCliques = true;
            const self = e.target;
            if ($(e.target).attr("href") != "#" && window.interceptarCliques) {
                e.preventDefault();
                $(`#atividadeAtividadedesafio${this._atividadeDesafioID} #modalDesistir`).modal('show')

                $(`#atividadeAtividadedesafio${this._atividadeDesafioID} #desistir`).click(e => {
                    window.interceptarCliques = false;
                    $(".sidebar a").off('click');
                    $(self).click()
                });

            }
        })
    }

    proximaQuestao() {
        console.log(this._questoes)
        const respostaSelecionada = $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .btn-resposta.resposta-ativada`);
        let alternativaSelecionada = this._questoes[this._indicePergunta].alternativas.find(alternativa => alternativa.selecionada);
        if (alternativaSelecionada !== -1) {
            alternativaSelecionada = respostaSelecionada.attr("data-id");
        }
        this._questoes[this._indicePergunta].respostaSelecionada = alternativaSelecionada;

        this._perguntaAnterior = this._questoes[this._indicePergunta];
        this._perguntaAtual = this._questoes[++this._indicePergunta];
        this._proximaPergunta = this._questoes[this._indicePergunta + 1];

        $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta].classList.remove('text-danger');

        $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta].classList.add('text-alternate');
        $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta - 1].classList.remove('text-alternate');


        if (!this._questoes[this._indicePergunta - 1].respostaSelecionada) {
            $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta - 1].classList.add('text-danger');
        }


        this._view.render(
            this._perguntaAtual,
            this._indicePergunta,
            this._questoes[this._indicePergunta].respostaSelecionada
        )

        if (this._proximaPergunta) this._proximaPerguntaButton.removeClass("d-none")
        else this._proximaPerguntaButton.addClass("d-none")

        if (this._perguntaAnterior) this._perguntaAnteriorButton.removeClass("d-none")
        else this._perguntaAnteriorButton.addClass('d-none')

        $(`#atividadeAtividadedesafio${this._atividadeDesafioID} #questaoAtualD`).html(this._indicePergunta + 1);
    }

    questaoAnterior() {
        let alternativaSelecionada = this._questoes[this._indicePergunta].alternativas.find(alternativa => alternativa.selecionada);
        if (alternativaSelecionada !== -1) {
            alternativaSelecionada = $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .btn-resposta.resposta-ativada`).attr("data-id");
        }
        this._questoes[this._indicePergunta].respostaSelecionada = alternativaSelecionada

        this._perguntaAtual = this._questoes[--this._indicePergunta];
        this._perguntaAnterior = this._questoes[this._indicePergunta - 1];
        this._proximaPergunta = this._questoes[this._indicePergunta + 1];


        this._view.render(
            this._perguntaAtual,
            this._indicePergunta,
            this._questoes[this._indicePergunta].respostaSelecionada
        )
        $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta].classList.add('text-alternate');

        $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta].classList.remove('text-danger');
        $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta + 1].classList.remove('text-alternate');

        if (!this._questoes[this._indicePergunta + 1].respostaSelecionada) {
            $(`#atividadeAtividadedesafio${this._atividadeDesafioID} .flow-question`)[this._indicePergunta + 1].classList.add('text-danger');
        }

        if (this._proximaPergunta) this._proximaPerguntaButton.removeClass("d-none")
        else this._proximaPerguntaButton.addClass("d-none")

        if (this._perguntaAnterior) this._perguntaAnteriorButton.removeClass("d-none")
        else this._perguntaAnteriorButton.addClass('d-none')

        $(`#atividadeAtividadedesafio${this._atividadeDesafioID} #questaoAtual`).html(this._indicePergunta + 1);
    }

}