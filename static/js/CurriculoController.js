class CurriculoController {
    constructor(vaga, cidadeID, estadoID, dispostoMudarEstadoID) {
        this._vaga = vaga;
        this._cidadeID = cidadeID;
        this._estadoID = estadoID;
        this._dispostoMudarEstadoID = dispostoMudarEstadoID;
        this._control_endereco();
        this._estados = [];
        this._contadorIdiomas = 0;
        this._contadorExperiencias = 0;
        this._view = new CurriculoView();
        this._http = new HttpService();
        
        
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
                const target = $(this).data('target');
                if (target) {
                    self.atualizaCidades(self._cidadeID, $(self._estadoID).val());
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

    status_cadastro() {
        let requisicao = true;
        if (requisicao) {
            alert("Cadastro concluído com sucesso!");
        } else {
            alert("Não foi possível registrar suas informações. Tente novamente.");
        }
    }

    enviarCurriculo(){

        let form = document.querySelector("#formularioCurriculo");
        
        let curriculo = FormHelper.toJSONString(form)
        this._http.post("http://localhost:3000/curriculo",curriculo)
            .then(resposta=>{
                console.log(resposta)
            })
    }
}