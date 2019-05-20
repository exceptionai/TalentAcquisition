class PontuacaoView {
    monta_tabela(candidato) {
        let linha_candidato = $(`
            <tr>
                <td>${candidato.nome}</td>
                <td>${candidato.pontuacao_total}</td>
                <td>${candidato.pontuacao_cursos_extra_curriculares}</td>
                <td>${candidato.pontuacao_objetivo}</td>
            </tr>
        `);
        let tabela = $("tbody");
        tabela.append(linha_candidato);
    }
}