export class NotificacaoService {

    static _configToaster() {
        toastr.options = {
            "closeButton": true,
            "progressBar": true
        };
    }

    static invalido(mensagem, titulo) {
        console.log(mensagem, titulo)
        NotificacaoService._configToaster();
        toastr.error(mensagem, titulo);
    }

    static sucesso(mensagem, titulo) {
        NotificacaoService._configToaster();
        console.log(mensagem, titulo)
        toastr.success(mensagem, titulo);
    }
}