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
			FormHelper.addObjCampoDinamico(obj, parent, name, value,element)
		}else if( name && !FormHelper.validaEadicionaCheckBoxSelect(element,name,obj,value)) {
			obj[ name ] = value;
		}
	}

	static addObjCampoDinamico(objDestino, parent, name, value,element){
		let contem = false;

		if(!objDestino[parent]) objDestino[parent] = [{}]

		let newObjeto = {};
		for(let objeto of objDestino[parent]){
			if(element.type == 'radio'){	
				if(element.checked && !newObjeto[name]) newObjeto[name]=true;
				else newObjeto[name] = false;
			}else if(!FormHelper.validaEadicionaCheckBoxSelect(element,name,newObjeto,value) && Object.keys(objeto).includes(name)){
				newObjeto[name] = value;
			}else{
				objeto[name] = value;
				contem = true;
			}
		}
		
		if(Object.keys(newObjeto).length && !contem) 
			objDestino[parent].push(newObjeto)

	}

	static validaEadicionaCheckBoxSelect(element,name,obj,value){
		if (element.type == "checkbox" && name){
			if(element.checked) obj[ name ] = true;
			else obj[ name ] = false;
			return true;
		}else if(element.type == "radio" && !element.checked){
			console.log('s')
			obj[ name ] = false;
			return true;
		}
		return false;
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