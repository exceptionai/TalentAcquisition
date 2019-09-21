import { DesafioCategoria } from "../models/DesafioCategoria.js";

export class DesafiosCategoriaService {

    buscarDesafiosCategoria() {
        return new Promise((resolve, reject) => {

            resolve([
                new DesafioCategoria('Matemática', 'Conhecimentos de operações matemáticas.', null, 20, 0, 5, 30),
                new DesafioCategoria('Português', 'Conhecimentos de sintaxe e semântica', null, 15, 0, 5, 30),
                new DesafioCategoria('Informática', 'Conhecimentos de pacote office e operações básicas no sistema operacional Windows', null, 10, 0, 5, 20)
            ])
        })
    }

}