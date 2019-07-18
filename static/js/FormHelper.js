class FormHelper{
	static toJSONString( form ) {
		let obj = {};
		let elements = form.querySelectorAll( "input, select, textarea" );
		for( let i = 0; i < elements.length; ++i ) {
			let element = elements[i];
			let name = element.name;
			let value = element.value;
			let id = element.id;
			
			if(element.type == "checkbox" && name){
				if(element.checked) obj[ name ] = true;
				else obj[name] = false;
			}else if(element.type == "radio"){
				if(element.checked) obj[ name ] = value;
			}else if( name ) {
				obj[ name ] = value;
			}else if(id){
				obj[ id ] = value;
			}
		}

		return JSON.stringify( obj );
	}
}