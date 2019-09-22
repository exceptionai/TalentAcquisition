import { DesafioCategoria } from "../models/DesafioCategoria.js";

export class DesafiosCategoriaService {

    buscarDesafiosCategoria() {
        const categoriaID = /categoria\/(\d+)/g.exec(window.location.href)[1];
        console.log(categoriaID)
        return fetch(`/service/candidato/atividade_categoria?categoriaID=${categoriaID}`)
            .then(res => res.json())
            .then(desafios_categoria =>
                desafios_categoria.map(desafio_categoria =>
                    new DesafioCategoria(desafio_categoria.titulo, desafio_categoria.descricao, desafio_categoria.pontosConquistados, desafio_categoria.pontosADesbloquear, desafio_categoria.desafiosRealizados, desafio_categoria.desafiosARealizar, desafio_categoria.tempo)
                )
            )
    }
}