import { AtividadeDesafioView } from '../views/AtividadeDesafioView.js';
import { AtividadeDesafioService } from '../services/AtividadeDesafioService.js';

export class AtividadeDesafioController {
    constructor(proximaPerguntaSeletor, perguntaAnteriorSeletor, containerPerguntas) {
        this._proximaPerguntaButton = $(proximaPerguntaSeletor);
        this._perguntaAnteriorButton = $(perguntaAnteriorSeletor);
        this._service = new AtividadeDesafioService();
        this._view = new AtividadeDesafioView(containerPerguntas);

        this._init();
    }

    _init() {

        this._service.buscarQuestoes().then(questoes => {
            this._questoes = questoes;
            return questoes;
        }).then(questoes => {

            if (this._proximaPerguntaButton.length && this._perguntaAnteriorButton.length) {

                this._indicePergunta = 0;
                this._perguntaAtual = questoes[this._indicePergunta];
                this._perguntaAnterior = null;
                this._proximaPergunta = questoes[this._indicePergunta + 1];
            }

            this._view.render(
                this._perguntaAtual.titulo,
                this._perguntaAtual.descricao,
                this._perguntaAtual.respostas,
                this._indicePergunta
            )

            console.log(this._perguntaAnterior)

            if (this._proximaPergunta)
                this._proximaPerguntaButton.css("display", "block")
            if (this._perguntaAnterior)
                this._perguntaAnteriorButton.css("display", "block")

            $(".flow-question")[this._indicePergunta].classList.add('text-alternate');
            $(".flow-question")[this._indicePergunta].classList.remove('text-danger');

            this._navegaEntreQuestoes();

            AtividadeDesafioController._contagemTempoDesafio();

            this._confirmarAoSair();

        })
    }

    _navegaEntreQuestoes() {
        $("#proximaQuestao").click(this.proximaQuestao.bind(this));
        $("#questaoAnterior").click(this.questaoAnterior.bind(this));
    }

    static _contagemTempoDesafio() {
        let tempoAtividade = 30;
        const tempoTotalMilis = 10 * 1000;

        let contador = setInterval(() => {
            let tempoFormatado = tempoAtividade.toString().padStart(2, "0");
            $("#tempoRestante").text(tempoFormatado + " min")
            if (!tempoAtividade) clearInterval(contador);

            tempoAtividade--;
        }, tempoTotalMilis);
    }

    _confirmarAoSair() {
        window.interceptarCliques = true;
        $("a").click(function(e) {
            console.log(window.interceptarCliques)
            const self = this;
            if ($(this).attr("href") != "#" && window.interceptarCliques) {
                e.preventDefault();
                $('#modalDesistir').modal('show')
                window.interceptarCliques = false;
                $("#desistir").click(e => {
                    Reflect.apply(carregarPaginaClick, self, [e]);
                });

            }
        })
    }

    proximaQuestao() {

        const respostaSelecionada = $(".btn-resposta.resposta-ativada");
        this._questoes[this._indicePergunta].respostaSelecionada = respostaSelecionada.attr("data-id");

        this._perguntaAnterior = this._questoes[this._indicePergunta];
        this._perguntaAtual = this._questoes[++this._indicePergunta];
        this._proximaPergunta = this._questoes[this._indicePergunta + 1];

        $(".flow-question")[this._indicePergunta].classList.remove('text-danger');

        $(".flow-question")[this._indicePergunta].classList.add('text-alternate');
        $(".flow-question")[this._indicePergunta - 1].classList.remove('text-alternate');


        if (!this._questoes[this._indicePergunta - 1].respostaSelecionada) {
            $(".flow-question")[this._indicePergunta - 1].classList.add('text-danger');
        }


        this._view.render(
            this._perguntaAtual.titulo,
            this._perguntaAtual.descricao,
            this._perguntaAtual.respostas,
            this._indicePergunta,
            this._questoes[this._indicePergunta].respostaSelecionada
        )

        if (this._proximaPergunta) this._proximaPerguntaButton.css("display", "block")
        else this._proximaPerguntaButton.css("display", "none")

        if (this._perguntaAnterior) this._perguntaAnteriorButton.css("display", "block")
        else this._perguntaAnteriorButton.css("display", "none")

        $("#questaoAtual").html(this._indicePergunta + 1);
    }

    questaoAnterior() {
        if (!this._questoes[this._indicePergunta].respostaSelecionada) {
            const respostaSelecionada = $(".btn-resposta.resposta-ativada");
            this._questoes[this._indicePergunta].respostaSelecionada = respostaSelecionada.attr("data-id");
        }

        this._perguntaAtual = this._questoes[--this._indicePergunta];
        this._perguntaAnterior = this._questoes[this._indicePergunta - 1];
        this._proximaPergunta = this._questoes[this._indicePergunta + 1];


        this._view.render(
            this._perguntaAtual.titulo,
            this._perguntaAtual.descricao,
            this._perguntaAtual.respostas,
            this._indicePergunta,
            this._questoes[this._indicePergunta].respostaSelecionada
        )
        $(".flow-question")[this._indicePergunta].classList.add('text-alternate');

        $(".flow-question")[this._indicePergunta].classList.remove('text-danger');
        $(".flow-question")[this._indicePergunta + 1].classList.remove('text-alternate');

        if (!this._questoes[this._indicePergunta + 1].respostaSelecionada) {
            $(".flow-question")[this._indicePergunta + 1].classList.add('text-danger');
        }

        if (this._proximaPergunta) this._proximaPerguntaButton.css("display", "block")
        else this._proximaPerguntaButton.css("display", "none")

        if (this._perguntaAnterior) this._perguntaAnteriorButton.css("display", "block")
        else this._perguntaAnteriorButton.css("display", "none")

        $("#questaoAtual").html(this._indicePergunta + 1);
    }

}