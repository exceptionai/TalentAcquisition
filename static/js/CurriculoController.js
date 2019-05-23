class CurriculoController{
    constructor(estadoID,cidadeID) {
        this._control_endereco(estadoID,cidadeID);
        this._estados = [];
        this._cidades = [];
    }

    _control_endereco(estadoID,cidadeID){
        const self = this;
        document.addEventListener('DOMContentLoaded',  async () =>{
            let curriculoService = new CurriculoService();

                $(estadoID).removeAttr('disabled');
                this._estados = await curriculoService.loadEstados('#uf');
                this.atualizaEstados(estadoID);

                $(document).on('change', '#uf', async function(e) {
                    var target = $(this).data('target');
                    if (target) {
                        self.atualizaCidades(cidadeID,$(estadoID).val());
                    }
                });

        });
    }

    atualizaEstados(element) {

      var label = $(element).data('label');
      label = label ? label : 'Estado';

      var options = '<option value="">' + label + '</option>';
      for (var i in this._estados) {
        var estado = this._estados[i];
        options += '<option value="' + estado.sigla + '">' + estado.nome + '</option>';
      }

      $(element).html(options);
    }

    atualizaCidades(element, estado_sigla) {
      var label = $(element).data('label');
      label = label ? label : 'Cidade';

      var options = '<option value="">' + label + '</option>';
      for (var estado of this._estados) {
        if (estado.sigla !== estado_sigla)
          continue;
        for (var cidade of estado.cidades) {
          options += '<option value="' + cidade + '">' + cidade + '</option>';
        }
      }
      $(element).html(options);
    }

}