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

    static jQuerySerialize() {
        (function($) {
            $.fn.serializeObject = function() {

                var self = this,
                    json = {},
                    push_counters = {},
                    patterns = {
                        "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                        "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
                        "push": /^$/,
                        "fixed": /^\d+$/,
                        "named": /^[a-zA-Z0-9_]+$/
                    };


                this.build = function(base, key, value) {
                    base[key] = value;
                    return base;
                };

                this.push_counter = function(key) {
                    if (push_counters[key] === undefined) {
                        push_counters[key] = 0;
                    }
                    return push_counters[key]++;
                };

                $.each($(this).serializeArray(), function() {

                    // skip invalid keys
                    if (!patterns.validate.test(this.name)) {
                        return;
                    }

                    var k,
                        keys = this.name.match(patterns.key),
                        merge = this.value,
                        reverse_key = this.name;

                    while ((k = keys.pop()) !== undefined) {

                        // adjust reverse_key
                        reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                        // push
                        if (k.match(patterns.push)) {
                            merge = self.build([], self.push_counter(reverse_key), merge);
                        }

                        // fixed
                        else if (k.match(patterns.fixed)) {
                            merge = self.build([], k, merge);
                        }

                        // named
                        else if (k.match(patterns.named)) {
                            merge = self.build({}, k, merge);
                        }
                    }

                    json = $.extend(true, json, merge);
                });

                return json;
            };
        })(jQuery);
    }

}