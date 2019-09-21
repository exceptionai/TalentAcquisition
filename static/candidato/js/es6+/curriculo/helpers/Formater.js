export class Formater {
    static moneyToNumber(money) {
        return parseFloat(
            money.replace('R$', '')
            .replace('.', '')
            .replace(',', '.')
            .replace(/\s/g, '')
        );
    }

    static numberToMoney(number) {
        let numero = number.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }
}