from services.pontuacaoService.controllers.cursoExtraCurricularController import CursoExtraCurricularController
from services.pontuacaoService.controllers.experienciaAnteriorController import ExperienciaAnteriorController
from services.pontuacaoService.helpers.formHelper import FormHelper
from services.pontuacaoService.helpers.validacaoHelper import ValidacaoHelper
from services.pontuacaoService.models.curriculo import Curriculo


class CurriculoController:

    @staticmethod
    def load_por_form(form):
        ValidacaoHelper.valida_obrigatorios(['nome', 'email', 'endereco', 'objetivo'], form)
        experiencias_anteriores = [ExperienciaAnteriorController.load_por_form(form)]
        cursos_extracurriculares = CursoExtraCurricularController.load_por_form(form)
        fh = FormHelper(form)

        nome = fh.get_campo('nome')
        idade = fh.get_campo('idade')
        email = fh.get_campo('email')
        endereco = fh.get_campo('endereco')
        objetivo = fh.get_campo('objetivo')
        telefone_residencial = fh.get_campo('telefoneResidencial')
        telefone_celular = fh.get_campo('telefoneCelular')
        estado = fh.get_campo('uf')
        cidade = fh.get_campo('cidade')
        idiomas = None

        return Curriculo(nome, idade, email, endereco,
                         cidade, estado, objetivo,
                         experiencias_anteriores, cursos_extracurriculares,
                         idiomas, telefone_residencial, telefone_celular
                         )
