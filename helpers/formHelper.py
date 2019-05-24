class FormHelper:

    def __init__(self, formulario):
        self.formulario = formulario

    def get_campo(self, nome_campo, boolean=False):
        if nome_campo in self.formulario:
            return self.formulario[nome_campo]
        if boolean:
            return False
        raise Exception(f'Campo {nome_campo} inexistente')
