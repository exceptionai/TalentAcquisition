export class Formater {
    static diaMes(strDate) {
        const data = new Date(strDate);
        return `${Formater._duasCasas(data.getDate())}/${Formater._duasCasas(data.getMonth()+1)}`
    }

    static _duasCasas(number) {
        return number.toString().padStart(2, "0");
    }

    static stringData(strDate) {
        const data = new Date(strDate);
        return `${Formater._duasCasas(data.getDate())}/${Formater._duasCasas(data.getMonth()+1)}/${Formater._duasCasas(data.getFullYear())}`
    }
}