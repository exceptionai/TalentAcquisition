class ValidacaoFormulario {


    static mascara_salarios(...salariosID) {
        for (let salarioID of salariosID) {
            $('#' + salarioID).maskMoney({ prefix: 'R$ ', thousands: '.', decimal: ',' });
        }
    }

    static _valida_data(idDataEntrada, idDataSaida) {
        let input_entrada = $(`#${idDataEntrada}`);
        let input_saida = $(`#${idDataSaida}`);
        let input_curso_inicio = $('#dataCursoInicio1');

        input_entrada.on('change', function () {
            if (new Date(input_entrada.val()).getTime() > new Date(input_saida.val()).getTime()) {
                input_entrada.val(input_saida.val());
            }
            if (new Date(input_entrada.val()).getTime() > new Date().getTime()) {
                input_entrada.val(new Date().toISOString().substr(0, 10));
            }
        });

        input_saida.on('change', function () {
            if (new Date(input_entrada.val()).getTime() > new Date(input_saida.val()).getTime()) {
                input_entrada.val(input_saida.val());
            }
            if (new Date(input_saida.val()).getTime() > new Date().getTime()) {
                input_saida.val(new Date().toISOString().substr(0, 10));
            }
        });

        input_curso_inicio.on('change', function () {
            if (new Date(input_curso_inicio.val()).getTime() > new Date().getTime()) {
                input_curso_inicio.val(new Date().toISOString().substr(0, 10));
            }
        })
    }

    static contador_caracteres(idCampo){
        $('#'+idCampo).on('keyup', (e) =>{
            let caracteresRestantes = 1000;
            let caracteresDigitados = parseInt(e.target.value.length);
            caracteresRestantes -= caracteresDigitados;
            $('#'+idCampo).parent().children('.text-muted').children('small').text(caracteresRestantes);
            
        });
    }

    static bloquearPorClick(idElemento,element){
        const elementoABloquear = document.querySelector('#'+idElemento);
        $(element).change(()=>{
            if(!elementoABloquear.disabled) {
                elementoABloquear.classList.add('text-dark');
                elementoABloquear.classList.remove('inputError');
                elementoABloquear.value = '';
            }
            else elementoABloquear.classList.remove('text-dark');           
            
            elementoABloquear.required = !elementoABloquear.required;
            elementoABloquear.disabled = !elementoABloquear.disabled;

        })
    }

    static bloquearPorValor(idABloquear,valorCondicional, elementoAcao,){
        const elementoABloquear = document.querySelector('#'+idABloquear);
        const required = elementoABloquear.required;
        elementoAcao.addEventListener('change',(event)=>{
            if(event.target.value.toLowerCase() == valorCondicional.toLowerCase()){
                elementoABloquear.disabled = true;
                elementoABloquear.classList.add('text-dark');
                elementoABloquear.classList.remove('inputError');
                elementoABloquear.required = false;
            }
            else{
                elementoABloquear.disabled = false;
                elementoABloquear.classList.remove('text-dark');
                elementoABloquear.required = required;
            }
        })
    }

    static adicionaEventosValidacoes(){
        $('input').on('keydown', function(e){
            const digitadoEhNumero = !isNaN(String.fromCharCode(e.keyCode));
            const naoVazio = !e.target.value.length;
            const naoEhDataOuNumero = e.target.type != 'number' && e.target.type != 'date';
            
            if(digitadoEhNumero && naoVazio && naoEhDataOuNumero) return false;
            return true;
            
        });

        $('input').on('focus', function(e){
            if( $(e.target).is(':invalid') ){
                $(e.target).addClass('inputError');
            } else {
                $(e.target).removeClass('inputError');
            }
        });
        $('input').on('change', function(e){
            if( $(e.target).is(':invalid') ){
                $(e.target).addClass('inputError');
            } else {
                $(e.target).removeClass('inputError');
            }
        });
        $('input').on('keydown', function(e){

            if( $(e.target).is(':invalid') ){
                $(e.target).addClass('inputError');
            } else {
                $(e.target).removeClass('inputError');
            }
        });
    }

    static adicionaValidacao(idCampo) {
        ValidacaoFormulario.adicionaEventosValidacoes();
        let elementos = document.querySelector('#'+idCampo).querySelectorAll('input, textarea, select');
        let validaDatas = [];
        elementos.forEach(element => {
            let validacoes = element.getAttribute('data-valida');
            if (validacoes != null) {
                let arrValidacaos = validacoes.split(',');
                for (let validacao of arrValidacaos){
                    ValidacaoFormulario.adicionaPorTipo(validacao,element,validaDatas,idCampo)
                }
            }
        });
        let [idDataEntrada, idDataSaida] = validaDatas;
        this._valida_data(idDataEntrada, idDataSaida);
        
    }


    static bloquear(element){
        if(element.getAttribute('data-eventBloquear') == 'click')
            ValidacaoFormulario.bloquearPorClick(element.getAttribute('data-idBloquear'),element)
        else
            ValidacaoFormulario.bloquearPorValor(element.getAttribute('data-idBloquear'),element.getAttribute('data-eventBloquear'), element)
    }

    static unico(element,idCampos){
        const campos = document.querySelector('#'+idCampos).parentElement;
        element.addEventListener('change',function(){
            console.log('unico')
            
            for(let campo of campos.querySelectorAll(`input[name='${element.name}']`)){
               
                if(campo.id != element.id){
                    if(campo.checked){ 
                        $(campo).attr('checked',false).trigger('change');
                    }
                }
            }
        })

    }

    static adicionaPorTipo(tipoValidacao,element,arrDatas,idCampo){
        switch (tipoValidacao) {
            case 'data':
                arrDatas.push(element.id);
                break;
            case 'salario':
                ValidacaoFormulario.mascara_salarios(element.id);
                break;
            case 'caracteres':
                ValidacaoFormulario.contador_caracteres(element.id);
                break;
            case 'bloquear':
                ValidacaoFormulario.bloquear(element)
                break;
            case 'unico':
                ValidacaoFormulario.unico(element,idCampo);
                break;
            case 'telefone-celular':
                ValidacaoFormulario.formatarCamposTelefoneCelular(element.id);
                break;
            case 'telefone-residencial':
                ValidacaoFormulario.formatarCamposTelefoneResidencial(element.id);
                break;
        }
    }

	static valida(form){
        let elementos = form.querySelectorAll( 'input, select, textarea' );
        
		elementos.filter = Array.prototype.filter;
        let obrigatoriosNaoPreenchidos = elementos.filter(elemento => elemento.required && !elemento.value)
        
		if(obrigatoriosNaoPreenchidos.length){
			Notificacao.invalido('Por favor, preencha os campos Obrigatórios','Campos Obrigatórios')
			ValidacaoFormulario.marcarNaoPreenchidos(obrigatoriosNaoPreenchidos)
			return false;
        }
        if(!form.checkValidity()){
            Notificacao.invalido('Por favor, verifique os campos inválidos','Formulário Inválido')
            form.reportValidity();
            return false;
        }
		return true;
    }	
    
    static marcarNaoPreenchidos(obrigatoriosNaoPreenchidos){
        for (let naoPreenchido of obrigatoriosNaoPreenchidos){
            naoPreenchido.classList.add('inputError')
            ValidacaoFormulario.removerInvalidoAoCorrigirObrigatorio(naoPreenchido);
        }
    }

    static removerInvalidoAoCorrigirObrigatorio(naoPreenchido){
        $(naoPreenchido).bind('change', function(e){
            if( $(naoPreenchido).is(':invalid') ){
                $(naoPreenchido).addClass('inputError');
            } else {
                $(e.target).removeClass('inputError');
            }
        });
    }

    static formatarCamposTelefoneResidencial(idTelefoneResidencial){     
        let telefoneResidencial = $(`#${idTelefoneResidencial}`);
        telefoneResidencial.mask('(00) 0000-0000');
    }
    
    static formatarCamposTelefoneCelular(idTelefoneCelular){
        let telefoneCelular = $(`#${idTelefoneCelular}`);
        telefoneCelular.mask('(00) 00000-0000');
    }
}