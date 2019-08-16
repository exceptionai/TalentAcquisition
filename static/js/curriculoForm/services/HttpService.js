export class HttpService {
    post(url, dados) {
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: dados
        })
    }
}