class CurriculoController{
    constructor(vaga, cidadeID, estadoID, dispostoMudarEstadoID) {
        this._estadoID = estadoID;
        this._cidadeID = cidadeID;
        this._control_endereco();
        this._estados = [];
        this._dispostoMudarEstadoID = dispostoMudarEstadoID;
        this._contadorIdiomas = 0;
        this._contadorExperiencias = 0;
        this._vaga = vaga;
    }

    _control_endereco(){
        const self = this;
        document.addEventListener('DOMContentLoaded',  async () =>{
            const curriculoService = new CurriculoService();
                $(this._estadoID).removeAttr('disabled');
                this._estados = await curriculoService.loadEstados('#uf');
                this.atualizaEstados(this._estadoID);

                $(document).on('change', '#uf', async function(e) {
                    self._valida_estado(this.value);
                    const target = $(this).data('target');
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

    geraExperienciasDinamicamente(experiencia_ID, botao_experiencia_ID){
        const botao_experiencias = $(`#${botao_experiencia_ID}`);
        const campo_experiencias = $(`#${experiencia_ID}`);
        botao_experiencias.click(()=>{
            this._contadorExperiencias++;
            const experiencia = $(`
                <div>
                    <label>Cargo *</label>
                    <br>
                    <input type="text" id="resposta6" name="cargo${this._contadorExperiencias}" placeholder="Ex: Engenheiro Elétrico" required>
                </div>
                <br><br>
                <div>
                    <label>Nome da empresa *</label>
                    <br>
                    <input type="text" id="resposta7" name="nomeEmpresa${this._contadorExperiencias}" placeholder="Ex: Bayer" required>
                </div>
                <br><br>
                <div>
                    <label>É meu trabalho atual?</label>
                    <input type="checkbox" name="trabalhoAtual${this._contadorExperiencias}" value="resposta8">
                </div>
                <br><br>
                <div>
                    <label>Data de entrada *</label>
                    <input type="date" name="dataEntrada1" id="dataEntrada${this._contadorExperiencias}"  required>
                    <label>Data de saída *</label>
                    <input type="date" name="dataSaida1" id="dataSaida${this._contadorExperiencias}" required>
                </div>
                <br><br>
                <div>
                    <label>Principais atividades</label>
                    <br>
                    <textarea id="story" name="principaisAtividades${this._contadorExperiencias}" rows="15" cols="70"></textarea>
                    <label>3000</label>
                </div>
                <br><br>
                <div>
                    <label>Salário</label>
                    <br>
                    <input type="text" step="any" min="0" name="salario${this._contadorExperiencias}" data-thousands="." data-decimal="," data-prefix="R$ "  id="salario${this._contadorExperiencias}" class="experiencias" placeholder="Ex: R$ 1500,00">
                </div>
                <br>
                <button type="button" id="experienciaRemover${this._contadorExperiencias}">Remover Experiencia Anterior</button>
                <hr>
                <br>
            `);

            campo_experiencias.append(experiencia);
            const linkRemover = $(`#experienciaRemover${this._contadorExperiencias}`);

            linkRemover.click((event)=>{
                event.preventDefault();
                experiencia.fadeOut(500);
                setTimeout(()=> experiencia.remove(),500);
            });

        })
    }



    _valida_estado(estado) {
        console.log(estado);
        console.log(this._vaga.estado);
        if (estado !== this._vaga.estado){
            $(this._dispostoMudarEstadoID).show();
        }else{
            $(this._dispostoMudarEstadoID).hide();
        }

    }

		status_cadastro() {
			if(true) {
				alert("Cadastro concluído com sucesso!");
			}else {
				alert("Não foi possível registrar suas informações. Tente novamente.");
			}
		}
}
