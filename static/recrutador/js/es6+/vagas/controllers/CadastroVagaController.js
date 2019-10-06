import { FormHelper } from "../../../../../candidato/js/es6+/curriculo/services/FormHelper.js";
import { CadastroVagaService } from "../services/CadastroVagaService.js";
import { Formater } from "../../../../../candidato/js/es6+/curriculo/helpers/Formater.js";
import { CurriculoService } from "../../../../../candidato/js/es6+/curriculo/services/CurriculoService.js";

export class CadastroVagaController {
    constructor() {
        this._service = new CadastroVagaService();
        this._estados = [];
        this._cidades = [];

        this._init();
    }

    _init() {

        $("#cadastrar_vaga").click(this.cadastrarVaga.bind(this))
        this._control_endereco();
    }

    async cadastrarVaga() {
        FormHelper.jQuerySerialize();
        const objVaga = $("#cadastroVagaForm").serializeObject();
        objVaga.vaga.salario = Formater.moneyToNumber(objVaga.vaga.salario)
        await this._service.cadastrar(objVaga);
        localStorage.setItem("mensagem", "Cadastro efetuado com sucesso");
        localStorage.setItem("tituloMensagem", "Sucesso");
        setTimeout(() => {
            window.location.href = "/recrutador/vagasAberto"
        }, 300)
    }

    carregarCEP(CEP) {
        this._service.carregarCep(CEP)
            .then(async dadosCEP => {
                if (!dadosCEP.erro) {
                    if (!this._estados) {
                        this._estados = this._estados || await this._service.loadEstados('#uf');

                        this.atualizaEstados("#uf");
                    }
                    this.atualizaCidades("#cidade", dadosCEP.uf);
                    const elementoEstado = $("#uf");
                    const elementoCidade = $("#cidade");
                    const elementoEndereco = $("#rua");

                    elementoCidade.val(dadosCEP.localidade);
                    elementoEstado.val(dadosCEP.uf);
                    elementoEndereco.val(dadosCEP.logradouro);

                }
            });
    }

    async _control_endereco() {
        $("#uf").removeAttr('disabled');
        this._estados = await this._service.loadEstados('#uf');
        this.atualizaEstados("#uf");

        $(document).on('change', '#uf', async(e) => {
            this.atualizaCidades("#cidade", $("#uf").val());

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



}