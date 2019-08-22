import { HttpService } from "./HttpService.js";

export class CurriculoService {

    constructor() {
        this._http = new HttpService();
    }

    loadEstados(element) {
        return new Promise(resolve => {
            $.ajax({
                url: 'https://api.myjson.com/bins/enzld',
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

    enviar(url, data) {
        return new Promise((resolve, reject) => {
            this._http.post(url, data)
                .then(() => resolve('Curriculo enviado com sucesso'))
                .catch(erro => {
                    console.log(erro);
                    reject('Erro ao enviar o currículo');
                })
        });
    }
}