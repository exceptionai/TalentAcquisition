import { HttpService } from "./HttpService.js";
import { UsuarioService } from "../../shared/usuario/services/UsuarioService.js";

export class CurriculoService {

    constructor() {
        this._http = new HttpService();
        this._userService = new UsuarioService();
    }

    buscarCurriculo() {
        const candidatoID = this._userService.dadosRequisicao.candidatoID;
        const token = this._userService.dadosRequisicao.token;
        return fetch(`/service/candidato/curriculo?candidatoID=${candidatoID}&token=${token}`).then(res => res.json());
        // Promise.resolve({ candidato: { nome: "Renan do Nascimento Sanches", idade: 22, email: "renan.sanches_123@hotmail.com" }, endereco: { uf: "SP", cidade: "São Paulo", rua: "Rua 123", numero: "425", cep: "08140-060" }, cursosComplementares: { nome: "Regex avançado", instituicao: "Alura" }, experienciasAnteriores: { nomeEmpresa: "Resource IT", cargo: "Analista de Suporte Jr.", dataSaida: "2019-01-31", dataEntrada: "2018-05-01" }, formacaoAcademica: { curso: "Segurança da Informação", situacaoFormacao: "interrompido", nivelCurso: "graduacao", nomeInstituicao: "Universidade Nove de Julho" }, idiomas: { nivelFala: "intermediario", nivelLeitura: "fluente", nivelEscrita: "fluente" } }
    }

    loadEstados(element) {
        return new Promise(resolve => {
            $.ajax({
                url: '/json/estados.json',
                method: 'get',
                dataType: 'json',
                beforeSend: function() {
                    $(element).html('<option>Carregando...</option>');
                }
            }).done(function(response) {
                resolve(response.estados);
            });
        });
    }

    carregarCep(CEP) {
        return this._http.getJSON(`https://viacep.com.br/ws/${CEP}/json`)

    }

    enviar(url, data) {
        return new Promise((resolve, reject) => {
            this._http.post(url, data)
                .then(() => resolve('Curriculo enviado com sucesso'))
                .catch(erro => {
                    console.log(erro);
                    reject('Erro ao enviar o currículo');
                })
        });
    }
}