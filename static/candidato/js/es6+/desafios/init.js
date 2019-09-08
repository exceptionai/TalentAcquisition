import { DesafiosCategoriaView } from './views/DesafiosCategoriaView.js';


const view = new DesafiosCategoriaView('desafios');
view.render('Matemática', 'Conhecimentos de operações matemáticas.', null, 20, 0, 5, 30);
view.render('Português', 'Conhecimentos de sintaxe e semântica', null, 15, 0, 5, 30);
view.render('Informática', 'Conhecimentos de pacote office e operações básicas no sistema operacional Windows', null, 10, 0, 5, 20);