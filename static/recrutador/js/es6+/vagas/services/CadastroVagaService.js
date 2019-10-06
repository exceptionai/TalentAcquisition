export class CadastroVagaService {

    cadastrar(formObj) {
        return fetch("/service/recrutador/vaga", {
            method: "POST",
            body: JSON.stringify(formObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }

    loadEstados(element) {
        return new Promise(resolve => {
            $.ajax({
                url: '/json/estados.json',
                method: 'get',
                dataType: 'json',
                beforeSend: function() {
                    $(element).html('<option>Carregando...</option>');
                }
            }).done(function(response) {
                resolve(response.estados);
            });
        });
    }

    carregarCep(CEP) {
        return this._http.getJSON(`https://viacep.com.br/ws/${CEP}/json`)

    }

}