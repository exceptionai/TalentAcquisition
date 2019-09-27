export class Desbloqueavel {

    constructor(descricao, imagem, pontos_minimos, obtido, tipo, tema, id, selecionado) {
        this.descricao = descricao;
        this.imagem = imagem;
        this.pontos_minimos = pontos_minimos;
        this.obtido = obtido;
        this.tipo = tipo;
        this.tema = tema;
        this.id = id;
        this.selecionado = selecionado;
    }

    static generate(desbloqueaveisObj) {
        return desbloqueaveisObj.map(({ descricao, imagem, pontos_minimos, obtido, tipo, valor, id, selecionado }) =>
            new Desbloqueavel(descricao, imagem, pontos_minimos, obtido, tipo, valor, id, selecionado)
        )
    }
}