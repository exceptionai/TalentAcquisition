export class Oportunidade {
    constructor(cidade, cargo, area, dataAbertura, requisitos_desejaveis, requisitos_obrigatorios, atividades, salario, beneficios, oportunidadeID) {
        this._cargo = cargo;
        this._area = area;
        this._cidade = cidade;
        this._dataAbertura = dataAbertura;

        this._requisitos_desejaveis = requisitos_desejaveis;
        this._requisitos_obrigatorios = requisitos_obrigatorios;
        this._atividades = atividades;
        this._salario = salario;
        this._beneficios = beneficios;
        this._oportunidadeID = oportunidadeID;
    }

    get oportunidadeID() {
        return this._oportunidadeID;
    }

    get cargo() {
        return this._cargo;
    }

    set cargo(cargo) {
        this._cargo = cargo;
    }

    get area() {
        return this._area;
    }

    set area(area) {
        this._area = area;
    }

    get cidade() {
        return this._cidade;
    }

    set cidade(cidade) {
        this._cidade = cidade;
    }

    get dataAbertura() {
        return this._dataAbertura;
    }

    set dataAbertura(dataAbertura) {
        this._dataAbertura = dataAbertura;
    }

    get requisitos_desejaveis() {
        return this._requisitos_desejaveis;
    }

    set requisitos_desejaveis(requisitos_desejaveis) {
        this._requisitos_desejaveis = requisitos_desejaveis;
    }

    get requisitos_obrigatorios() {
        return this._requisitos_obrigatorios;
    }

    get atividades() {
        return this._atividades;
    }

    set atividades(atividades) {
        this._atividades = atividades;
    }

    get salario() {
        return this._salario;
    }

    set salario(salario) {
        this._salario = salario;
    }

    get beneficios() {
        return this._beneficios;
    }

    set beneficios(beneficios) {
        this._beneficios = beneficios;
    }

}