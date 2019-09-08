export class Formater {
    static moneyToNumber(money) {
        return parseFloat(
            money.replace('R$', '')
            .replace('.', '')
            .replace(',', '.')
            .replace(/\s/g, '')
        );
    }
}