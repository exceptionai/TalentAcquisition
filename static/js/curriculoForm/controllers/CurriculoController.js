class CurriculoController {
    constructor(vaga, cidadeID, estadoID, dispostoMudarEstadoID) {
        this._vaga = vaga;
        this._cidadeID = cidadeID;
        this._estadoID = estadoID;
        this._dispostoMudarEstadoID = dispostoMudarEstadoID;
        this._estados = [];
        this._contadorIdiomas = 0;
        this._contadorExperiencias = 0;
        this._view = new CurriculoView();
        this._http = new HttpService();
        
        
        this._control_endereco();
    }

    _control_endereco() {
        const self = this;
        document.addEventListener('DOMContentLoaded', async() => {
            const curriculoService = new CurriculoService();
            $(this._estadoID).removeAttr('disabled');
            this._estados = await curriculoService.loadEstados('#uf');
            this.atualizaEstados(this._estadoID);

            $(document).on('change', '#uf', async function(e) {
                self._valida_estado(this.value);
                    self.atualizaCidades(self._cidadeID, $(self._estadoID).val());
                
            });

        });
    }

    atualizaEstados(element) {

        let label = $(element).data('label');
        label = label ? label : 'Estado';

        let options = '<option value="">' + label + '</option>';
        for (let i in this._estados) {
            let estado = this._estados[i];
            options += '<option value="' + estado.sigla + '">' + estado.nome + '</option>';
        }

        $(element).html(options);
    }

    atualizaCidades(element, estado_sigla) {
        let label = $(element).data('label');
        console.log('element')
        label = label ? label : 'Cidade';

        let options = '<option value="">' + label + '</option>';
        for (let estado of this._estados) {
            if (estado.sigla !== estado_sigla)
                continue;
            for (let cidade of estado.cidades) {
                options += '<option value="' + cidade + '">' + cidade + '</option>';
            }
        }
        $(element).html(options);
    }

    geraIdiomasDinamicamente(idioma_ID, botao_idiomas_ID) {
        this._gerarCampoDinamicamente(
            idioma_ID, botao_idiomas_ID,
            this._view.idioma.bind(this._view),
            "campoIdiomaAdicional"
        )
    }

    geraExperienciasDinamicamente(experiencia_ID, botao_experiencia_ID) {
        this._gerarCampoDinamicamente(
            experiencia_ID, botao_experiencia_ID,
            this._view.experienciaAnterior.bind(this._view),
            "experienciaAnterior"
        )
    }

    geraCursosDinamicamente(cursosID, botaoCursosID) {
        this._gerarCampoDinamicamente(
            cursosID, botaoCursosID,
            this._view.cursosComplementares.bind(this._view),
            "cursosComplementares"
        )
    }

    geraFormacaoDinamicamente(experienciasID, botaoExperienciasID) {
        this._gerarCampoDinamicamente(
            experienciasID, botaoExperienciasID,
            this._view.formacao.bind(this._view),
            "formacao"
        )
    }

    _gerarCampoDinamicamente(camposID, botaoID, view, campoAdicionalID) {
        const curriculoView = new CurriculoView()
        const botao = curriculoView.botao(botaoID);
        const campo = curriculoView.campo(camposID);

        botao.click(() => {
            const campoID = curriculoView.adicionarCampo(campo, view());
            const linkRemover = curriculoView.botaoRemover(campoAdicionalID, campoID);

            linkRemover.click(event => {
                event.preventDefault();
                curriculoView.removerCampo(campoAdicionalID, campoID)
            });
            ValidacaoFormularioController.adicionaValidacao(campoAdicionalID+campoID);
        })
    }

    _valida_estado(estado) {
        if (estado !== this._vaga.estado) {
            $(this._dispostoMudarEstadoID).show();
        } else {
            $(this._dispostoMudarEstadoID).hide();
        }

    }

    esconderHeader() {
        $(window).bind('scroll', function() {
            const distance = 80;
            if ($(window).scrollTop() > distance) {
                $('.header-logo').fadeIn(300);

            } else {
                $('.header-logo').fadeOut(300);
            }
        });
    }

    enviarCurriculo(){

        let form = document.querySelector("#formularioCurriculo");
        if(ValidacaoFormularioController.valida(form)){
            let curriculoObj = FormHelper.paraObjeto(form);
            let curriculoJSON = JSON.stringify( curriculoObj );
            this._http.post("http://localhost:3000/curriculo",curriculoJSON)
                .then(resposta=>{
                    NotificacaoService.sucesso('Currículo cadastrado com sucesso','Sucesso')
                })
                .catch(erro =>{ 
                    console.log(erro)
                    NotificacaoService.invalido('Erro ao cadastrar o currículo','Erro ao Enviar')
                })
        }
        
    }
}