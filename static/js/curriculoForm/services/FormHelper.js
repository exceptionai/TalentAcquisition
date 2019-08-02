class FormHelper{

	static paraObjeto( form ) {
		let obj = {};
		let elementos = form.querySelectorAll( "input, select, textarea" );
		
		elementos.forEach( elemento =>{
			let {name, value} = elemento;
			const parent = elemento.getAttribute("data-parent");
			FormHelper.adicionaCamposObj(obj, elemento, parent, name, value);
		})
		return obj;
	}

	static adicionaCamposObj(obj,element, parent, name, value){
		if(!name) return;

 		if(value.includes('R$')) value = FormHelper.moneyToNumber(value);
		if(element.type == 'number') value = parseFloat(value);

		if(parent) FormHelper.addObjCampoDinamico(obj, parent, name, value,element)
		else if(element.type == "checkbox") obj[ name ] = element.checked
		else obj[ name ] = value;
		
	}

	static addObjCampoDinamico(objDestino, parent, name, value,element){

		if(!objDestino[parent]) objDestino[parent] = [{}];
		let tamanhoObjDestino = objDestino[parent].length;

		const ultimoObjeto = objDestino[parent][tamanhoObjDestino-1];
		if(!ultimoObjeto[name]){
			if(element.type == 'checkbox') value = element.checked;
			ultimoObjeto[name] = value;
		}else{
			let novoItem = {};
			novoItem[name] = value;
			objDestino[parent].push(novoItem);
		}

	}


	static moneyToNumber(money){
		return parseFloat(
			money.replace('R$','')
				.replace('.','')
				.replace(',','.')
				.replace(/\s/g,'')
			);
	}

}