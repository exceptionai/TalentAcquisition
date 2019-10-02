import { FormHelper } from "../candidato/js/es6+/curriculo/services/FormHelper.js";

localStorage.clear();

toastr.options = {
    "closeButton": true,
    "progressBar": true
};

window.pontosObtidos = false;
window.emailEnviado = false;

const trataErroResponse = response => {
    if (!response.ok && response.status === 401) {
        $("#error-handler").text("Usuário ou Senha Inválidos")
        throw { mensagem: "Usuario ou senha inválidos" };
    } else if (!response.ok) {
        throw new Error(response);
    }
    return response;
}

const sucessoLogin = (response, tipoUsuarioID) => {

    localStorage.setItem('tipoUsuarioID', response.tipoUsuarioID);
    localStorage.setItem('candidatoID', response.candidatoID);
    localStorage.setItem('token', response.token);
    localStorage.setItem('login', true);
    switch (tipoUsuarioID) {
        case 1:
            window.location = "/";
            break;
        case 2:
            window.location = "/recrutador";

    }

}

const trataErro = error => {
    if (error.mensagem) {
        toastr.error(error.mensagem, "Erro Login");
    } else {
        toastr.error("Ocorreu um erro ao realizar o login", "Erro Login");
    }
}


const validarLogin = $form => {
    $form.validate({
        rules: {
            passwordLogin: {
                required: true
            },
            emailLogin: {
                required: true
            }
        },
        messages: {
            passwordLogin: "Por favor preencha este campo",
            emailLogin: {
                required: "Por favor preencha este campo",
                email: "Email no formato inválido"
            }
        },
        errorPlacement: function(error, element) {
            error.addClass('has-error');
            error.insertAfter(element);
        }
    })
}

$("#enviar").click(e => {
    e.preventDefault();
    const $form = $("#loginForm");

    validarLogin($form);
    const tipoUsuario = $("#recrutador").is(':checked') ? 2 : 1;

    if ($form.valid()) {
        const email = $("#emailLogin").val();
        const senha = $("#passwordLogin").val();
        fetch(`/service/candidato/autenticar`, {
                method: "POST",
                body: JSON.stringify({ email, senha, tipoUsuario }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => trataErroResponse(res))
            .then(res => res.json())
            .then(res => sucessoLogin(res, tipoUsuario))
            .catch(error => trataErro(error))
    }

})

const resetarWizard = () => {
    $('[href="#about"]').click();
    $(".tab-pane").removeClass("active");
    $(".tab-pane").first().addClass("active");
    $("form").trigger("reset");
}

const voltarTelaLogin = e => {
    e.preventDefault();
    const loginContainer = $("#login");
    const campoRegistro = $("#register");
    const containerRegistro = $("#register-container");
    campoRegistro.fadeOut(300, () => {
        campoRegistro.addClass("d-none");
        containerRegistro.addClass("d-none");
        loginContainer.removeClass("d-none");
        $("#error-handler").empty()
        loginContainer.hide();
        loginContainer.fadeIn(500);
        resetarWizard();

    })

}


$(".tab-login").click(voltarTelaLogin)


$("#finalizarRegistro").click(e => {
    e.preventDefault($(".wizard-card form")[0]);
    FormHelper.jQuerySerialize();
    const objForm = $(".wizard-card form").serializeObject();
    fetch("/service/candidato", {
        method: "POST",
        body: JSON.stringify(objForm),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.ok) return res
    }).then(res => {
        toastr.success("Cadastro finalizado com sucesso, por favor realize o login!", "Cadastro Finalizado");
        voltarTelaLogin(e);
    }).catch(erro => {
        toastr.error("Ocorreu um erro ao finalizar o cadastro", "Erro ao finalizar o cadastro");
        console.log(erro);
    })

})

$("#registrar").click(e => {
    e.preventDefault();
    const loginContainer = $("#login");
    loginContainer.fadeOut(300, () => {
        loginContainer.addClass("d-none")
        $(".moving-tab").css("width", $(".nav-pills li.active").css('width'))
        const campoRegistro = $("#register");
        campoRegistro.removeClass("d-none")
        campoRegistro.hide();
        $("#register-container").removeClass("d-none")
        campoRegistro.fadeIn(500);
    });
})

$("#recrutador").change(e => {
    const botaoRecrutador = e.target;
    botaoRecrutador.toggle = !botaoRecrutador.toggle
    $("#registrar").fadeTo(400, botaoRecrutador.toggle ? 0 : 1);
    $("#enviar").toggleClass("center-btn");
})