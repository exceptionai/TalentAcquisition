import { AtividadeDesafioView } from '../views/AtividadeDesafioView.js';



const questoes = [{
        titulo: "Juros compostos",
        descricao: "Aplicando hoje na caderneta de poupança a quantia de R$ 20.000,00, qual será o montante gerado ao final de 4 anos, sabendo que a rentabilidade mensal é de 0,5%?",
        respostas: [1000, 2000, 3000, 4000]
    },
    {
        titulo: "Números Complexos",
        descricao: "Se z = (2 + i) ∙ (1 + i) ∙ i, então z, o conjugado de z, será dado por:",
        respostas: ["−3 − i", "1 − 3i", "3 − i", "−3 + i"]
    },
    {
        titulo: "Probabilidade",
        descricao: "Em uma urna existem bolas enumeradas de 1 a 15. Qualquer uma delas possui a mesma chance de ser retirada. Determine a probabilidade de se retirar uma bola com número nas seguintes condições:",
        respostas: ["par", "primo", "par ou primo", "par e primo"]
    },
    {
        titulo: "Estatística",
        descricao: "Um grupo de alunos é submetido a uma avaliação, e foram obtidas as seguintes notas: 3, 4, 5, 6 e 7. Com base nessas informações, assinale a alternativa que apresenta o desvio-padrão desse grupo.",
        respostas: ["1,15", "1,21", "1,79", "1,61"]
    },
    {
        titulo: "Média Ponderada",
        descricao: "Qual é a média ponderada dos números 1, 2, 3, 4, 5, 6, 7, 8 e 9, sabendo que seus respectivos pesos são 5, 5, 5, 5, 4, 4, 4, 4, 2?",
        respostas: ["4,5", "2,8", "4,2", "2,9"]
    }
]

export class AtividadeDesafioController {
    constructor(proximaPerguntaSeletor, perguntaAnteriorSeletor, containerPerguntas) {
        this._proximaPerguntaButton = $(proximaPerguntaSeletor);
        this._perguntaAnteriorButton = $(perguntaAnteriorSeletor);

        this._indicePergunta = 0;
        this._perguntaAtual = questoes[this._indicePergunta];
        this._perguntaAnterior = null;
        this._proximaPergunta = questoes[this._indicePergunta + 1];

        this._view = new AtividadeDesafioView(containerPerguntas);

        this._init();
    }

    _init() {
        this._view.render(
            this._perguntaAtual.titulo,
            this._perguntaAtual.descricao,
            this._perguntaAtual.respostas,
            this._indicePergunta
        )

        if (this._proximaPergunta)
            this._proximaPerguntaButton.css("display", "block")
        if (this._perguntaAnterior)
            this._perguntaAnteriorButton.css("display", "block")
        $(".flow-question")[this._indicePergunta].classList.add('text-alternate');
        $(".flow-question")[this._indicePergunta].classList.remove('text-danger');
    }

    proximaQuestao() {

        const respostaSelecionada = $(".btn-resposta.resposta-ativada");
        questoes[this._indicePergunta].respostaSelecionada = respostaSelecionada.attr("data-id");



        this._perguntaAnterior = questoes[this._indicePergunta];
        this._perguntaAtual = questoes[++this._indicePergunta];
        this._proximaPergunta = questoes[this._indicePergunta + 1];

        $(".flow-question")[this._indicePergunta].classList.remove('text-danger');

        $(".flow-question")[this._indicePergunta].classList.add('text-alternate');
        $(".flow-question")[this._indicePergunta - 1].classList.remove('text-alternate');


        if (!questoes[this._indicePergunta - 1].respostaSelecionada) {
            $(".flow-question")[this._indicePergunta - 1].classList.add('text-danger');
        }



        this._view.render(
            this._perguntaAtual.titulo,
            this._perguntaAtual.descricao,
            this._perguntaAtual.respostas,
            this._indicePergunta,
            questoes[this._indicePergunta].respostaSelecionada
        )

        if (this._proximaPergunta) this._proximaPerguntaButton.css("display", "block")
        else this._proximaPerguntaButton.css("display", "none")

        if (this._perguntaAnterior) this._perguntaAnteriorButton.css("display", "block")
        else this._perguntaAnteriorButton.css("display", "none")

        $("#questaoAtual").html(this._indicePergunta + 1);
    }

    questaoAnterior() {
        if (!questoes[this._indicePergunta].respostaSelecionada) {
            const respostaSelecionada = $(".btn-resposta.resposta-ativada");
            questoes[this._indicePergunta].respostaSelecionada = respostaSelecionada.attr("data-id");
        }

        this._perguntaAtual = questoes[--this._indicePergunta];
        this._perguntaAnterior = questoes[this._indicePergunta - 1];
        this._proximaPergunta = questoes[this._indicePergunta + 1];


        this._view.render(
            this._perguntaAtual.titulo,
            this._perguntaAtual.descricao,
            this._perguntaAtual.respostas,
            this._indicePergunta,
            questoes[this._indicePergunta].respostaSelecionada
        )
        $(".flow-question")[this._indicePergunta].classList.add('text-alternate');

        $(".flow-question")[this._indicePergunta].classList.remove('text-danger');
        $(".flow-question")[this._indicePergunta + 1].classList.remove('text-alternate');

        if (!questoes[this._indicePergunta + 1].respostaSelecionada) {
            $(".flow-question")[this._indicePergunta + 1].classList.add('text-danger');
        }

        if (this._proximaPergunta) this._proximaPerguntaButton.css("display", "block")
        else this._proximaPerguntaButton.css("display", "none")

        if (this._perguntaAnterior) this._perguntaAnteriorButton.css("display", "block")
        else this._perguntaAnteriorButton.css("display", "none")

        $("#questaoAtual").html(this._indicePergunta + 1);
    }
}