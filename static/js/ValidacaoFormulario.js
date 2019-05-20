class ValidacaoFormulario {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._salario = $("#salario");
        this._valida_ao_mudar()
        this._valida_data()

    }

    _valida_ao_mudar() {
        this._salario.addEventListener("focusout", elemento => {
            this._valida_negativo(elemento.target.value);
            this.valida_letras(elemento.target.value);
        })
    }

    _valida_negativo(elemento) {
        if (parseInt(elemento) == elemento && parseInt(elemento) <= 0) {
            this._salario.value = "0,00";
        }
    }

    valida_letras(elemento) {
        elemento = elemento.replace(',', '.');
        if (parseFloat(elemento) == elemento) {
            this._preenche_casas_decimais();
        } else {
            this._salario.value = "0,00";
        }
    }

    _preenche_casas_decimais() {
        let zeros = "";
        let pos_virgula = this._get_pos_virgula();
        let distancia_virgula_numeros_depois = this._salario.value.length - 1 - pos_virgula;

        for (let x = distancia_virgula_numeros_depois; x < 2; x++) {
            zeros += "0";
        }
        if (this._salario.value.indexOf(',') === -1) this._salario.value += ",";

        this._salario.value += zeros;
    }

    _get_pos_virgula() {
        if (this._salario.value.indexOf(',') === -1)
            return this._salario.value.length - 1;
        return this._salario.value.indexOf(',');
    }

    _valida_data() {
        let input_entrada = $('#dataEntrada1');
        let input_saida = $('#dataSaida1');
        let input_cursoinicio = $('#dataCursoInicio1');

        input_entrada.on("change", function () {
            if (new Date(input_entrada.val()).getTime() > new Date(input_saida.val()).getTime()) {
                input_entrada.val(input_saida.val())
            }
            if (new Date(input_entrada.val()).getTime() > new Date().getTime()) {
                input_entrada.val(new Date().toISOString().substr(0, 10))
            }
        });

        input_saida.on("change", function () {
            if (new Date(input_entrada.val()).getTime() > new Date(input_saida.val()).getTime()) {
                input_entrada.val(input_saida.val())
            }
            if (new Date(input_saida.val()).getTime() > new Date().getTime()) {
                input_saida.val(new Date().toISOString().substr(0, 10))
            }
        });

        input_cursoinicio.on("change",function(){
              if (new Date(input_cursoinicio.val()).getTime() > new Date().getTime()) {
                input_cursoinicio.val(new Date().toISOString().substr(0, 10))
            }
        })
    }

}