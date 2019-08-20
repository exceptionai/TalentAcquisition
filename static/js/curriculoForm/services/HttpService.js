export class HttpService {
    post(url, dados) {
        return fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: dados
            })
            .then(res => {
                if (!res.ok) throw new Error();
                return res;
            })
    }
}