class ValidacaoFormulario {
    constructor() {
        this._valida_data();
        this._mascara_salarios("salario1","salarioExpectativa")
    }

    _mascara_salarios(...salariosID){
        for(let salarioID of salariosID){
            console.log(salarioID)
            $("#"+salarioID).maskMoney();
        }
    }


    _valida_data() {
        let input_entrada = $('#dataEntrada1');
        let input_saida = $('#dataSaida1');
        let input_curso_inicio = $('#dataCursoInicio1');

        input_entrada.on("change", function () {
            if (new Date(input_entrada.val()).getTime() > new Date(input_saida.val()).getTime()) {
                input_entrada.val(input_saida.val());
            }
            if (new Date(input_entrada.val()).getTime() > new Date().getTime()) {
                input_entrada.val(new Date().toISOString().substr(0, 10));
            }
        });

        input_saida.on("change", function () {
            if (new Date(input_entrada.val()).getTime() > new Date(input_saida.val()).getTime()) {
                input_entrada.val(input_saida.val());
            }
            if (new Date(input_saida.val()).getTime() > new Date().getTime()) {
                input_saida.val(new Date().toISOString().substr(0, 10));
            }
        });

        input_curso_inicio.on("change",function(){
              if (new Date(input_curso_inicio.val()).getTime() > new Date().getTime()) {
                input_curso_inicio.val(new Date().toISOString().substr(0, 10));
            }
        })
    }

}