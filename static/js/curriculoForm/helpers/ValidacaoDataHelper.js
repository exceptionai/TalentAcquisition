class ValidacaoDataHelper{
    
    static _valida_data_entrada(input_entrada, input_saida) {
        if (new Date(input_entrada.val()).getTime() > new Date(input_saida.val()).getTime()) {
            input_entrada.val(input_saida.val());
        }
    }

    static _valida_data_saida(input_entrada, input_saida) {
        ValidacaoDataHelper._valida_data_entrada(input_entrada, input_saida);
    }

    static _dataMaximaHoje(inputData) {
        if (new Date(inputData.val()).getTime() > new Date().getTime()) {
            inputData.val(new Date().toISOString().substr(0, 10));
        }
    }

    static _eventDataMaximaHoje(e){
        const element = e.target;
        if(element.type == 'date')
            ValidacaoDataHelper._dataMaximaHoje($(element));
    }

    static _valida_datas(idDataEntrada, idDataSaida) {
        let input_entrada = $(`#${idDataEntrada}`);
        let input_saida = $(`#${idDataSaida}`);
        let input_curso_inicio = $('#dataCursoInicio1');

        input_entrada.on("change", () =>
            ValidacaoDataHelper._valida_data_entrada(input_entrada, input_saida));

        /**
         * Neste ponto é utilizado o padrão debounce, esperando que o usuario
         * pare de alterar o valor para poder aplicar as mudanças. 
         * Isto é necessário pois caso contrario a alteração no input de saída seria
         * tão rápida que antes mesmo de o usuário fazer a alteração que deseja ocorreria
         * efeitos colaterais no input de entrada.
         */

        let timerSaida = 0;
        input_saida.on("change", function () {
            clearTimeout(timerSaida);
            timerSaida = setTimeout(() =>
                ValidacaoDataHelper._valida_data_saida(input_entrada, input_saida), 300)
        });

        input_curso_inicio.on("change", () =>
            ValidacaoDataHelper._dataMaximaHoje(input_curso_inicio))
    }
}