const desbloqueaveis = [{
        descricao: 'Tema Padrão',
        imagem: 'https://www.htmlcsscolor.com/preview/gallery/624862.png',
        pontos_minimos: 0,
        tipo: 'tema',
        obtido: localStorage.getItem('tema') === '',
        tema: ''
    },
    {
        descricao: 'Tema Dark',
        imagem: 'http://html-color.org/pt/333232.jpg',
        pontos_minimos: 50,
        tipo: 'tema',
        obtido: localStorage.getItem('tema') === 'dark-theme',
        tema: 'dark-theme'
    },
    {
        descricao: 'Tema Pink',
        imagem: 'https://p6k6v3j7.stackpathcdn.com/wp-content/uploads/patterns2/C0241.jpg',
        pontos_minimos: 150,
        tipo: 'tema',
        obtido: false
    },
    {
        descricao: 'Tema Futurístico',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrYfHbMY87E4ICOI6j9RYWUZCr3F5XtT6xMvfb3sbIE0cBpAQIhQ',
        pontos_minimos: 250,
        tipo: 'tema',
        obtido: false
    }

]

export class DesbloqueavelService {

    buscarDesbloqueaveis() {
        return fetch("/service/candidato/desbloqueavel?candidatoID=1")
            .then(res => res.json())
        new Promise(resolve => {
            resolve(desbloqueaveis)
        })

        fetch('/desbloqueaveis', { body: 1 })
            .then(res => res.json())
            .then(desbloqueaveis => desbloqueaveis)
    }

}