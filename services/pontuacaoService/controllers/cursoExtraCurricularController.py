from services.pontuacaoService.helpers.formHelper import FormHelper
from services.pontuacaoService.helpers.validacaoHelper import ValidacaoHelper
from services.pontuacaoService.models.cursoExtraCurricular import CursoExtraCurricular


class CursoExtraCurricularController:

    @staticmethod
    def load_por_form(form):
        ValidacaoHelper.valida_obrigatorios(['nomeCurso1', 'instituicao1', 'dataCursoInicio1'], form)
        fh = FormHelper(form)

        nome = fh.get_campo('nomeCurso1')
        instituicao = fh.get_campo('instituicao1')
        duracao = fh.get_campo('duracao1')
        data_inicial = fh.get_campo('dataCursoInicio1')
        descricao = fh.get_campo('descricaoCursoExtraCurricular1')
        cursando = fh.get_campo('cursando1', True)

        ValidacaoHelper.valida_data(data_inicial)
        return CursoExtraCurricular(nome, instituicao, duracao, data_inicial, descricao, cursando)

