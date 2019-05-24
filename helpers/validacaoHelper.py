from re import search

class ValidacaoHelper:

    @staticmethod
    def valida_obrigatorios(lista_elementos, origem):
        for elemento in lista_elementos:
            if elemento not in origem:
                raise Exception(f'Elemento {elemento} é obrigatório')

    @staticmethod
    def valida_data(data):
        data_valida = search(r'[1-2]\d{3}-[0-1]\d-[0-2]\d', data)
        if not data_valida:
            raise Exception(f'Data: {data} No formato inválido')
