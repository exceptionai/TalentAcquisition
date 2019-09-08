$("#vagasCards button").click((e) => {
    // window.history.pushState("", "Exception Carriers", "candidatosTotais/vagas/1/");
    $(".vagas").hide(400)
    $("#candidatosLista").hide();
    $("#candidatosLista").removeClass('d-none');
    const tituloPagina = $("#todosCandidatos");
    tituloPagina.html(`${tituloPagina.html()} <span class="mr-2 ml-2">/</span> <a href="#">Desenvolvedor Front-end</a>`);
    setTimeout(() => {
        $("#candidatosLista").fadeIn(800);

    }, 200);
})

DevExpress.localization.locale('pt');

const botao = (link, titulo, btnClass) => {
    return $(`<div class="text-center"><a class="btn ${btnClass}" href="${link}" style="font-size:11px;padding:6px;">${titulo}</a></div>`)
}

const botaoCurriculo = (container, options) => {
    return botao(`candidatosTotais/${options.text}`, "Detalhes", 'btn-success')
}

const botaoPontuacao = (container, options) => {
    return botao(`candidatosTotais/${options.text}/pontuacao`, "Pontuacao", 'btn-primary')
}

const candidatosService = [{
    candidato: "Renan do Nascimento Sanches",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 155,
    pontuacao_minima: 200,
    fator_destaque: "Objetivo",
    status_candidatura: "Desafios Pontuados",
    curriculo: 1,
    detalhes_pontuacao: 1
}, {
    candidato: "Alisson Chabaribery",
    vaga: "Gerente de Biotecnologia",
    pontuacao_alcancada: 257,
    pontuacao_minima: 220,
    fator_destaque: "Experiências Anteriores",
    status_candidatura: "Currículo",
    curriculo: 2,
    detalhes_pontuacao: 2
}, {
    candidato: "Gabriel Lopes Pontes",
    vaga: "Analista de Recursos",
    pontuacao_alcancada: 350,
    pontuacao_minima: 120,
    fator_destaque: "Evolução nos testes",
    status_candidatura: "Desafios Pontuados",
    curriculo: 3,
    detalhes_pontuacao: 3
}, {
    candidato: "Vanessa Cunha Queiroz",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 275,
    pontuacao_minima: 200,
    fator_destaque: "Cursos Extracurrículares",
    status_candidatura: "Desafios Pontuados",
    curriculo: 4,
    detalhes_pontuacao: 4
}, {
    candidato: "Matheus Machado",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 320,
    pontuacao_minima: 200,
    fator_destaque: "Experiências Anteriores",
    status_candidatura: "Desafios Pontuados",
    curriculo: 5,
    detalhes_pontuacao: 5
}, {
    candidato: "Gabriele Ferreira",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 155,
    pontuacao_minima: 200,
    fator_destaque: "Evolução nos testes",
    status_candidatura: "Desafios Pontuados",
    curriculo: 6,
    detalhes_pontuacao: 6
}, {
    candidato: "Daniela Silva",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 155,
    pontuacao_minima: 200,
    fator_destaque: "Experiências Anteriores",
    status_candidatura: "Desafios Pontuados",
    curriculo: 7,
    detalhes_pontuacao: 7
}, {
    candidato: "Leonardo Ferraz Sales",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 155,
    pontuacao_minima: 200,
    fator_destaque: "Cursos Extracurrículares",
    status_candidatura: "Desafios Pontuados",
    curriculo: 8,
    detalhes_pontuacao: 8
}, {
    candidato: "Jessica Pontes Machado",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 155,
    pontuacao_minima: 200,
    fator_destaque: "Objetivo",
    status_candidatura: "Desafios Pontuados",
    curriculo: 9,
    detalhes_pontuacao: 9
}, {
    candidato: "Maria Carla",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 155,
    pontuacao_minima: 200,
    fator_destaque: "Cursos Extracurrículares",
    status_candidatura: "Desafios Pontuados",
    curriculo: 10,
    detalhes_pontuacao: 10
}, {
    candidato: "Josefina Santos",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 155,
    pontuacao_minima: 200,
    fator_destaque: "Experiências Anteriores",
    status_candidatura: "Desafios Pontuados",
    curriculo: 10,
    detalhes_pontuacao: 10
}, {
    candidato: "Lucas Machado",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 30,
    pontuacao_minima: 200,
    fator_destaque: "Evolução nos testes",
    status_candidatura: "Desafios Pontuados",
    curriculo: 11,
    detalhes_pontuacao: 11
}, {
    candidato: "Daniel Queiroz da Silva",
    vaga: "Desenvolvedor de Sistemas",
    pontuacao_alcancada: 155,
    pontuacao_minima: 200,
    fator_destaque: "Cursos Extracurrículares",
    status_candidatura: "Desafios Pontuados",
    curriculo: 12,
    detalhes_pontuacao: 12
}]

$("#candidatoTable").dxDataGrid({
    filterRow: {
        visible: true
    },
    dataSource: candidatosService,
    paging: {
        pageSize: 10
    },
    pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [10, 20]
    },
    remoteOperations: false,
    searchPanel: {
        visible: true,
        highlightCaseSensitive: true
    },
    groupPanel: {
        visible: true
    },
    grouping: {
        autoExpandAll: true
    },
    allowColumnReordering: true,
    rowAlternationEnabled: true,
    showBorders: true,

    columns: [{
        dataField: "candidato",
        caption: "Candidato"
    }, {
        dataField: "pontuacao_alcancada",
        caption: "Pontuação Alcançada",
        dataType: "string",
        alignment: "right",
        cssClass: "bullet"
    }, {
        dataField: "pontuacao_minima",
        dataType: "number",
        caption: "Pontuação Miníma"
    }, {
        dataField: "fator_destaque",
        dataType: "string",
        caption: "Fator de destaque"
    }, {
        dataField: "curriculo",
        dataType: "string",
        caption: "",
        cellTemplate: botaoCurriculo
    }, {
        dataField: "detalhes_pontuacao",
        dataType: "string",
        width: 100,
        caption: "",
        cellTemplate: botaoPontuacao
    }],
    onContentReady: function(e) {
        if (!collapsed) {
            collapsed = true;
            e.component.expandRow(["EnviroCare"]);
        }
    }
});