import { Formater } from '../helpers/Formater.js';

export class FormHelper {

    static paraObjeto(form) {
        let obj = {};
        let elementos = form.querySelectorAll("input, select, textarea");

        elementos.forEach(elemento => {
            let { name, value } = elemento;
            const parent = elemento.getAttribute("data-parent");

            value = FormHelper.format(value, name)
            FormHelper._adicionaCamposObj(obj, elemento, parent, name, value);
        })
        return obj;
    }

    static _adicionaCamposObj(obj, element, parent, name, value) {
        if (!name) return;

        if (element.type == 'number') value = parseFloat(value);

        if (parent) FormHelper._addObjCampoDinamico(obj, parent, name, value, element)
        else if (element.type == "checkbox") obj[name] = element.checked
        else obj[name] = value;

    }

    static format(value, name) {
        let formatedValue = value;
        if (value.includes('R$')) formatedValue = Formater.moneyToNumber(value);
        if (name.includes('telefone')) formatedValue = value.replace(/\D/g, '');
        return formatedValue;
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