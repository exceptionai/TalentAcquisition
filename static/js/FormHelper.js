class FormHelper{
	static toJSONString( form ) {
		let obj = {};
		let elements = form.querySelectorAll( "input, select, textarea" );
		
		let newObj = {};
		elements.forEach( element =>{
			let {name, value, id} = element;
			const parent = element.getAttribute("data-parent")

			if(parent){
				let contem = false;
				newObj[name] = value
				if(!obj[parent]) obj[parent] = [{}]
				let newObjeto = {};
				for(let objeto of obj[parent]){
					if(Object.keys(objeto).includes(name)){
						newObjeto[name] = value;
					}else{
						objeto[name] = value;
					}
					if(objeto[name] == value) contem = true;
				}
				
				if(Object.keys(newObjeto).length && !contem) obj[parent].push(newObjeto)

			}else if(element.type == "checkbox" && name){
				if(element.checked) obj[ name ] = true;
				else obj[name] = false;
			}else if(element.type == "radio"){
				if(element.checked) obj[ name ] = value;
			}else if( name ) {
				obj[ name ] = value;
			}else if(id){
				obj[ id ] = value;
			}
		})

		return JSON.stringify( obj );
	}

}