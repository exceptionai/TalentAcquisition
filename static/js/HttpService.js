class HttpService{
    post(url,dados){
        console.log(dados)
        return fetch(url,{
            method: 'post',
            body: JSON.stringify(dados)
        })
    }
}