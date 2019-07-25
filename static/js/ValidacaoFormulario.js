class ValidacaoFormulario {


    static mascara_salarios(...salariosID) {
        for (let salarioID of salariosID) {
            $("#" + salarioID).maskMoney({ prefix: 'R$ ', thousands: '.', decimal: ',' });
        }
    }

    static _valida_data(idDataEntrada, idDataSaida) {
        let input_entrada = $(`#${idDataEntrada}`);
        let input_saida = $(`#${idDataSaida}`);
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

        input_curso_inicio.on("change", function () {
            if (new Date(input_curso_inicio.val()).getTime() > new Date().getTime()) {
                input_curso_inicio.val(new Date().toISOString().substr(0, 10));
            }
        })
    }

    static contador_caracteres(){
        $("#resumoCandidato").on("keyup", function () {
           
            let caracteresRestantes = 1000;
            let caracteresDigitados = parseInt($(this).val().length);
            caracteresRestantes -= caracteresDigitados;
        
            $(".caracteres").text(caracteresRestantes);
        });
    }

    static adicionaValidacao(idCampo) {
        let elementos = document.querySelectorAll("input, textarea, select");
        let validaDatas = [];
        elementos.forEach(element => {
            let validacao = element.getAttribute("data-valida");
            if (validacao != null) {
                switch (validacao) {
                    case "data":
                        validaDatas.push(element.id);
                        break;
                    case "salario":
                        this.mascara_salarios(element.id);
                        break;
                    case "caracteres":
                        this.contador_caracteres(element.id);
                        break;
                }
            }
            
        });
        let [idDataEntrada, idDataSaida] = validaDatas;
        this._valida_data(idDataEntrada, idDataSaida);
        
    }


	static valida(form){
		let elementos = form.querySelectorAll( "input, select, textarea" );
		elementos.filter = Array.prototype.filter;
		let obrigatorioNaoPreenchido = elementos.filter(elemento => elemento.required && !elemento.value)
		if(obrigatorioNaoPreenchido.length){
			Notificacao.invalido('Por favor, preencha os campos Obrigatórios','Campos Obrigatórios')
			obrigatorioNaoPreenchido.forEach(naoPreenchido =>{
				naoPreenchido.classList.add("inputError")
				
				naoPreenchido.addEventListener("keydown",()=>{
					naoPreenchido.classList.remove("inputError");
				})
			});
			return false;
		}
		return true;
	}	
}