const express = require("express");
const app = express();
const path = require('path');

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public'))); // Corrigido aqui

app.get('/', (req, res) => {
    res.render('index')
})

const porta = 3000
app.listen(porta, () => {
    console.log(`Está escutando a porta ${porta}! http://localhost:${porta}`)
})

console.log(`Diretório de trabalho atual: ${process.cwd()}`);