class PontuacaoService {

    lista_pontuacoes() {
        console.log('teste')
        fetch('/analises/curriculo').then(response => {
           response.json().then(candidatos=>{
                for(let candidato of candidatos) {
                    new PontuacaoView().monta_tabela(candidato)
                }
           })
        })
    }

}