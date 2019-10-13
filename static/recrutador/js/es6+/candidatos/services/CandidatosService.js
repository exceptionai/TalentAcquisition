export class CandidatosService {

    buscarDadosTodosCandidatos(vagaID) {
        return fetch("/service/recrutador/todos_candidatos?vagaID=" + vagaID)
            .then(res => res.json())

    }

    buscarDadosCandidatosPotenciais() {
        return fetch("/service/recrutador/candidatos_potenciais")
            .then(res => res.json())
    }
}