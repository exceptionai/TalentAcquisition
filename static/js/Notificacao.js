class Notificacao{

    static _configToaster(){
        toastr.options = {
            "closeButton":true,
            "progressBar":true
        };
    }

    static invalido(mensagem,titulo){
        Notificacao._configToaster();
        toastr.error(mensagem,titulo);
    }

    static sucesso(mensagem,titulo){
        Notificacao._configToaster();
        toastr.success(mensagem,titulo);
    }
}