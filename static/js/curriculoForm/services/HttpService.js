class HttpService{
    post(url,dados){
        console.log(dados)
        return fetch(url,{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: dados
        })
    }
}