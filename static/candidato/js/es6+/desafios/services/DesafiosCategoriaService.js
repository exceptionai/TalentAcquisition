import { DesafioCategoria } from "../models/DesafioCategoria.js";
import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";

export class DesafiosCategoriaService {



    buscarDesafiosCategoria() {
        const usuarioService = new UsuarioService();
        const candidatoID = usuarioService.dadosRequisicao.candidatoID;
        console.log('a')
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const categoriaID = /categoria\/(\d+)/g.exec(window.location.hash)[1];
                resolve(fetch(`/service/candidato/atividade_categoria?categoriaID=${categoriaID}&candidatoID=${candidatoID}`)
                    .then(res => res.json())
                    .then(desafios_categoria =>
                        desafios_categoria.map(desafio_categoria =>
                            new DesafioCategoria(desafio_categoria.id, desafio_categoria.titulo, desafio_categoria.descricao, desafio_categoria.pontosConquistados, desafio_categoria.pontosADesbloquear, desafio_categoria.desafiosRealizados, desafio_categoria.desafiosARealizar, desafio_categoria.tempo)
                        )
                    ));
            }, 600)
        })
    }
}