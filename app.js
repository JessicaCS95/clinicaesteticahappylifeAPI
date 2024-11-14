// Importando o módulo Express para criar o servidor e gerenciar rotas
const express = require('express');

// Importando a conexão com o banco de dados do arquivo 'mulherconectada'
const conexao = require("./conexaobanco");

const app = express(); // Cria uma aplicação Express
const path = require('path'); // Importa o módulo 'path' para lidar com diretórios de arquivos

app.use(express.static(path.join(__dirname, 'public')));

// Configura o diretório onde as views (templates) estão localizadas
app.set('views', path.join(__dirname, 'views'));
// Define EJS como o motor de visualização (view engine) para renderizar templates
app.set('view engine', 'ejs');


// Importando o body-parser para lidar com dados de formulários
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // Configura o body-parser para interpretar dados JSON

app.use(bodyParser.urlencoded({ extended: true })); // Configura o body-parser para interpretar dados de formulários enviados via URL



// Rota GET para a página 'cadastro' – exibe o formulário de cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro'); // Renderiza a view 'cadastro.ejs'
});


// Rota POST para receber os dados do formulário e inseri-los no banco de dados
app.post('/cadastro', function(req, res){
     // Pega os valores enviados pelo formulário
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const whatsapp = req.body.whatsapp;
    const cep = req.body.cep;
    const logradouro = req.body.logradouro;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    
// Conecta ao banco de dados
conexao.connect(function (error) {
    if (error) throw error; // Lança um erro se a conexão falhar

    // SQL de inserção para adicionar os dados no banco
    const sql = 'INSERT INTO dadoscliente (nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, estado, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Executa a query com os dados do formulário
    conexao.query(sql, [nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, cidade, estado], function(error,result){
        if(error) throw error;// Lança um erro se a query falhar

        // Envia uma resposta para o usuário confirmando o cadastro e exibindo o parágrafo
        res.send( `${nome}, seus dados foram cadastrados com sucesso!`);

        });
        
    });
});

//continuar criar READ do banco de dados
app.get('/listadeclientes', function(req, res){
    conexao.connect(function(error){
    if(error) console.log(error);
    
    var sql = "select * from dadoscliente";
    //comando de consulta
    conexao.query(sql, function(error,result){
        if(error) console.log(error);
        //console.log(result); Mostra no terminal o select
    
        res.render("listadeclientes",{dadoscliente:result});
    });
    });
    
    });
    

    



// Configura o servidor para rodar na porta 5000
app.listen(5000);