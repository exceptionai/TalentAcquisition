from services.pontuacaoService.helpers.validacaoHelper import ValidacaoHelper
from services.pontuacaoService.models.experienciaAnterior import ExperienciaAnterior


class ExperienciaAnteriorController:

    @staticmethod
    def load_por_form(form):
        ValidacaoHelper.valida_obrigatorios(['cargo1', 'nomeEmpresa1', 'dataEntrada1', 'dataSaida1'], form)
        cargo = form['cargo1']
        nome_empresa = form['nomeEmpresa1']
        emprego_atual = True if 'trabalhoAtual1' in form else False
        data_entrada = form['dataEntrada1']
        data_saida = form['dataSaida1']
        principais_atividades = form['principaisAtividades1']
        salario = form['salario1']

        ValidacaoHelper.valida_data(data_entrada)
        ValidacaoHelper.valida_data(data_saida)

        return ExperienciaAnterior(cargo, nome_empresa, emprego_atual,
                                   data_entrada, data_saida,
                                   principais_atividades, salario)
