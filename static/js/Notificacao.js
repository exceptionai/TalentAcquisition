class Notificacao{
    invalido(mensagem,titulo){
        toastr.options = {
            "closeButton":true,
            "progressBar":true
        };
        toastr.error(mensagem,titulo);
    }
}