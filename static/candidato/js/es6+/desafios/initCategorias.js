import { DesafiosCategoriaController } from "./controllers/DesafiosCategoriaController.js";


const desafiosCategoriaController = new DesafiosCategoriaController();
window.interceptarCliques = true;
console.log($("[modal-element]"))

$("a").click(function(e) {
    if (this.hasAttribute('modal-link')) {
        $("[modal-element]").modal("hide");
        window.interceptarCliques = false;

    }
});