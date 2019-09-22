import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";

export class CategoriaService {

    constructor() {
        const usuarioService = new UsuarioService();
        this._dadosRequisicao = usuarioService.dadosRequisicao;
    }

    obterCategorias() {
        return fetch(`/service/candidato/categoria_desafio?candidatoID=${this._dadosRequisicao.candidatoID}&token=${this._dadosRequisicao.token}`)
            .then(res => res.json())
        new Promise((resolve) => {
            resolve([{
                    pontos_obtidos: 0,
                    pontos_maximos: 45,
                    titulo: 'CONHECIMENTOS GERAIS',
                    descricao: 'Testes e desafios para colocar em prova os seus conhecimentos gerais.',
                    desafios_resolvidos: 0,
                    desafios_totais: 15
                },
                {
                    pontos_obtidos: 0,
                    pontos_maximos: 100,
                    titulo: 'CONHECIMENTOS ESPECÍFICOS',
                    descricao: 'Conjunto de habilidades necessárias para atuação na sua vaga seram testadas nesta etapa.',
                    desafios_resolvidos: 0,
                    desafios_totais: 10
                }
            ])
        })
    }
}