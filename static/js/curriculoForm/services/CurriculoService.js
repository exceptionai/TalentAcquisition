export class CurriculoService {

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
}