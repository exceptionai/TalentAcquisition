"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormHelper = function () {
    function FormHelper() {
        _classCallCheck(this, FormHelper);
    }

    _createClass(FormHelper, null, [{
        key: "paraObjeto",
        value: function paraObjeto(form) {
            var obj = {};
            var elementos = form.querySelectorAll("input, select, textarea");

            elementos.forEach(function (elemento) {
                var name = elemento.name,
                    value = elemento.value;

                var parent = elemento.getAttribute("data-parent");
                FormHelper.adicionaCamposObj(obj, elemento, parent, name, value);
            });
            return obj;
        }
    }, {
        key: "adicionaCamposObj",
        value: function adicionaCamposObj(obj, element, parent, name, value) {
            if (!name) return;

            if (value.includes('R$')) value = FormHelper.moneyToNumber(value);
            if (element.type == 'number') value = parseFloat(value);

            if (parent) FormHelper.addObjCampoDinamico(obj, parent, name, value, element);else if (element.type == "checkbox") obj[name] = element.checked;else obj[name] = value;
        }
    }, {
        key: "addObjCampoDinamico",
        value: function addObjCampoDinamico(objDestino, parent, name, value, element) {

            if (!objDestino[parent]) objDestino[parent] = [{}];
            var tamanhoObjDestino = objDestino[parent].length;

            var ultimoObjeto = objDestino[parent][tamanhoObjDestino - 1];
            if (!ultimoObjeto[name]) {
                if (element.type == 'checkbox') value = element.checked;
                ultimoObjeto[name] = value;
            } else {
                var novoItem = {};
                novoItem[name] = value;
                objDestino[parent].push(novoItem);
            }
        }
    }, {
        key: "moneyToNumber",
        value: function moneyToNumber(money) {
            return parseFloat(money.replace('R$', '').replace('.', '').replace(',', '.').replace(/\s/g, ''));
        }
    }]);

    return FormHelper;
}();