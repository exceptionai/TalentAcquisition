export class OportunidadesService {

    buscarOportunidades() {
        return fetch("/service/resumo_vaga")
            .then(resumo_vagas => resumo_vagas.json())
    }

}