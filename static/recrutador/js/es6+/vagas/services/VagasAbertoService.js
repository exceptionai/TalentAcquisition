export class VagasAbertoService {

    buscarOportunidades() {
        return fetch("/service/recrutador/resumo_vagas")
            .then(resumo_vagas => resumo_vagas.json())
    }

}