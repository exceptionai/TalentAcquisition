class CurriculoController{
    constructor(vaga, estadoID, cidadeID, dispostoMudarEstadoID) {
        this._estadoID = estadoID;
        this._cidadeID = cidadeID;
        this._control_endereco();
        this._estados = [];
        this._dispostoMudarEstadoID = dispostoMudarEstadoID;
        this._contadorIdiomas = 0;
    }

    _control_endereco(){
        const self = this;
        document.addEventListener('DOMContentLoaded',  async () =>{
            let curriculoService = new CurriculoService();

                $(this._estadoID).removeAttr('disabled');
                this._estados = await curriculoService.loadEstados('#uf');
                this.atualizaEstados(this._estadoID);

                $(document).on('change', '#uf', async function(e) {
                    self._valida_estado(vaga.estado);
                    var target = $(this).data('target');
                    if (target) {
                        self.atualizaCidades(self._cidadeID,$(self._estadoID).val());
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

    geraIdiomasDinamicamente(idioma_ID, botao_idiomas_ID){
        const botao_idiomas = $(`#${botao_idiomas_ID}`);
        const campo_idiomas = $(`#${idioma_ID}`);
        botao_idiomas.click(()=>{
            this._contadorIdiomas++;
            const idioma = $(`
                <div class="campoIdiomaAdicional" id="campoIdiomaAdicional${this._contadorIdiomas}">
                    <select id="idioma${this._contadorIdiomas}" name="idioma${this._contadorIdiomas}">
                        <option value="">Idioma</option>
                        <option value="ingles">Inglês</option>
                        <option value="espanhol">Espanhol</option>
                        <option value="frances">Francês</option>
                        <option value="mandarim">Mandarim</option>
                        <option value="japones">Japonês</option>
                        <option value="alemao">Alemão</option>
                        <option value="russo">Russo</option>
                    </select>
                    <label for="nivelIdioma">Nível de proficiência</label>
                    <select id="nivelIdioma${this._contadorIdiomas}" name="nivelIdioma${this._contadorIdiomas}">
                        <option value="">Nível</option>
                        <option value="basico">Básico</option>
                        <option value="intermediario">Intermediário</option>
                        <option value="avançado">Avançado</option>
                        <option value="tecnico">Técnico</option>
                        <option value="fluente">Fluente</option>
                    </select>
                    <button type="button" id="idiomaRemover${this._contadorIdiomas}">remover</a>
                </div>
            `);

            campo_idiomas.append(idioma);
            const linkRemover = $(`#idiomaRemover${this._contadorIdiomas}`);

            linkRemover.click((event)=>{
                event.preventDefault();
                idioma.fadeOut(500);
                setTimeout(()=> idioma.remove(),500);
            });

        })
    }

    _valida_estado(estado) {
        if (estado !== $(this._estadoID).val()){
            $(this._dispostoMudarEstadoID).show();
        }else{
            $(this._dispostoMudarEstadoID).hide();
        }

    }
}