import { AtividadeDesafioController } from './controllers/AtividadeDesafioController.js';

let tempoAtividade = 30;
let contador = setInterval(() => {
    let tempoFormatado = tempoAtividade.toString().padStart(2, "0");
    $("#tempoRestante").text(tempoFormatado + " min")
    if (!tempoAtividade) clearInterval(contador);

    tempoAtividade--;
}, 10000)

$("a").click(function(e) {
    if ($(this).attr("href") != "#") {
        e.preventDefault();
        $('#modalDesistir').modal('show')
        $("#desistir").click(() => window.location = $(this).attr("href"));
    }
})

const controller = new AtividadeDesafioController("#proximaQuestao", "#questaoAnterior", "#questionContainer");
$("#proximaQuestao").click(controller.proximaQuestao.bind(controller));
$("#questaoAnterior").click(controller.questaoAnterior.bind(controller));