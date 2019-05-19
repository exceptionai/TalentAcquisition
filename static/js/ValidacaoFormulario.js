class ValidacaoFormulario {
    constructor() {
        let $ = document.querySelector.bind(document);
        this.salario = $("#salario");
        this.valida_ao_mudar()
    }

    valida_ao_mudar(){
        this.salario.addEventListener("focusout", elemento => {
            this.valida_negativo(elemento.target.value);
            this.valida_letras(elemento.target.value);
        })
    }

    valida_negativo(elemento){
        if(parseInt(elemento) == elemento && parseInt(elemento) <= 0){
            this.salario.value = "0,00";
        }
    }

    valida_letras(elemento){
        elemento = elemento.replace(',','.');
        if(parseFloat(elemento) == elemento){
            this.preenche_casas_decimais();
        }else{
            this.salario.value = "0,00";
        }
    }

    preenche_casas_decimais(){
        let zeros = "";
        let pos_virgula = this.get_pos_virgula();
        let distancia_virgula_numeros_depois = this.salario.value.length - 1 - pos_virgula;

        for(let x = distancia_virgula_numeros_depois;x<2;x++){
            zeros += "0";
        }
        if(this.salario.value.indexOf(',') === -1) this.salario.value += ",";

        this.salario.value+= zeros;
    }

    get_pos_virgula(){
        if(this.salario.value.indexOf(',') === -1)
            return this.salario.value.length - 1;
        return this.salario.value.indexOf(',');

    }
}