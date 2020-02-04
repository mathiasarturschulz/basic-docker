const express = require('express');
const mysql = require('mysql');

// Criação do express
const app = express();

// Criação do conexão com o Banco
const connection = mysql.createConnection({
    // host: '172.17.0.2', // IP do container mysql
    host: 'mysql-container', // Feature do docker, substitue a opção acima
    // (Lembrar o passar a tag --link ao iniciar o container node)
    user: 'root',
    password: 'senha',
    database: 'store'
});

// Estabelecer a conexão
connection.connect();

// Rota de busca de produtos
app.get('/products', function (req, res) {
    // Exemplo didático
    connection.query('SELECT * FROM products', function (error, results) {
        if (error) {
            throw error;
        };

        res.send(results.map(item => ({ name: item.name, price: item.price})));
    });
});

// Setado em qual porta a aplicação estará ouvindo e respondendo
app.listen(9001, '0.0.0.0', function () {
    console.log('Listening on port 9001')
})
