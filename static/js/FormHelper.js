class FormHelper{
	static toJSONString( form ) {
		let obj = {};
		let elements = form.querySelectorAll( "input, select, textarea" );
		
		elements.forEach( element =>{
			let {name, value, id} = element;
			const parent = element.getAttribute("data-parent");
			FormHelper.validaEadicionaObj(obj, element, parent, name, value);
		})

		return JSON.stringify( obj );
	}

	static validaEadicionaObj(obj,element, parent, name, value){
		if(value.includes('R$')) value = FormHelper.moneyToNumber(value);

		if(parent){
			FormHelper.addObjCampoDinamico(obj, parent, name, value)
		}else if(element.type == "checkbox" && name){
			if(element.checked) obj[ name ] = true;
			else obj[ name ] = false;
		}else if(element.type == "radio" && element.checked){
			obj[ name ] = value;
		}else if( name ) {
			obj[ name ] = value;
		}
	}

	static addObjCampoDinamico(objDestino, parent, name, value){
		let contem = false;

		if(!objDestino[parent]) objDestino[parent] = [{}]

		let newObjeto = {};
		for(let objeto of objDestino[parent]){
			if(Object.keys(objeto).includes(name)){
				newObjeto[name] = value;
			}else{
				objeto[name] = value;
			}
			if(objeto[name] == value) contem = true;
		}
		
		if(Object.keys(newObjeto).length && !contem) 
			objDestino[parent].push(newObjeto)

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