export class NotificacaoService {

    static _configToaster() {
        toastr.options = {
            "closeButton": true,
            "progressBar": true
        };
    }

    static invalido(mensagem, titulo) {
        NotificacaoService._configToaster();
        toastr.error(mensagem, titulo);
    }

    static sucesso(mensagem, titulo) {
        NotificacaoService._configToaster();
        toastr.success(mensagem, titulo);
    }
}