import { Formater } from '../helpers/Formater.js';

export class FormHelper {

    static paraObjeto(form) {
        let obj = {};
        let elementos = form.querySelectorAll("input, select, textarea");

        elementos.forEach(elemento => {
            let { name, value } = elemento;
            const parent = elemento.getAttribute("data-parent");
            FormHelper._adicionaCamposObj(obj, elemento, parent, name, value);
        })
        return obj;
    }

    static _adicionaCamposObj(obj, element, parent, name, value) {
        if (!name) return;

        if (value.includes('R$')) value = Formater.moneyToNumber(value);
        if (element.type == 'number') value = parseFloat(value);

        if (parent) FormHelper._addObjCampoDinamico(obj, parent, name, value, element)
        else if (element.type == "checkbox") obj[name] = element.checked
        else obj[name] = value;

    }

    static _addObjCampoDinamico(objDestino, parent, name, value, element) {

        if (!objDestino[parent]) objDestino[parent] = [{}];
        let tamanhoObjDestino = objDestino[parent].length;

        const ultimoObjeto = objDestino[parent][tamanhoObjDestino - 1];
        if (!ultimoObjeto[name]) {
            if (element.type == 'checkbox') value = element.checked;
            ultimoObjeto[name] = value;
        } else {
            let novoItem = {};
            novoItem[name] = value;
            objDestino[parent].push(novoItem);
        }

    }

}