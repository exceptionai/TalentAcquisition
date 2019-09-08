import { FormHelper } from '../../curriculoForm/services/FormHelper.js';

describe('FormHelper', function() {

    describe('Conversão de formulário para objeto', function() {

        it('Deve converter objeto vazio', () => {
            const form = $(`<form></form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe("{}");
        })

        it('Deve converter input text para Objeto', () => {
            const form = $(`<form><input type="text" name="nome" value="João"></form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"nome":"João"}`);

        })

        it('Não Deve converter input text para Objeto', () => {
            const form = $(`<form><input type="text" name="nome"></form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"nome":""}`);

        })

        it('Deve converter input radio para objeto', () => {
            const form = $(`
            <form>
                <input type="radio" name="sexo" value="masculino">
                <input type="radio" name="sexo" value="feminino" checked>
            </form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"sexo":"feminino"}`);
        })

        it('Não Deve converter input radio para objeto', () => {
            const form = $(`
            <form>
                <input type="radio" name="sexo" value="masculino">
                <input type="radio" name="sexo" value="feminino">
            </form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"sexo":""}`);
        })

        it('Deve converter select para objeto', () => {
            const form = $(`
            <form>
                <select name="cidade">
                    <option value="Rio de janeiro">
                    <option value="São Paulo" selected>
                </select>
            </form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"cidade":"São Paulo"}`);

        })

        it('Não Deve converter select para objeto', () => {
            const form = $(`
            <form>
                <select name="cidade">
                    <option value="Rio de janeiro">
                    <option value="São Paulo">
                </select>
            </form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"cidade":""}`);

        })

        it('Deve converter textarea para objeto', () => {
            const form = $(`
            <form>
                <textarea name="comentarios">gostei do sistema</textarea>
            </form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"comentarios":"gostei do sistema"}`);
        })


        it('Não deve converter textarea para objeto', () => {
            const form = $(`
            <form>
                <textarea name="comentarios"></textarea>
            </form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"comentarios":""}`);
        })

        it('Deve converter checkbox checado para objeto', () => {
            const form = $(`
            <form>
                <input type="checkbox" name="enviarEmail" checked>
            </form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"enviarEmail":true}`);
        })


        it('Deve converter checkbox não checado para objeto', () => {
            const form = $(`
            <form>
                <input type="checkbox" name="enviarEmail">
            </form>`).get(0)

            const objForm = FormHelper.paraObjeto(form);

            expect(JSON.stringify(objForm)).toBe(`{"enviarEmail":false}`);
        })
    })

})