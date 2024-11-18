const mysql = require('mysql');

// Variável que armazena a conexão
const conexaobanco = mysql.createConnection({
  host: "localhost", // Define o endereço do servidor MySQL
  user: "root", // Nome de usuário para autenticação no banco de dados
  password: "", // Senha correspondente ao usuário do MySQL
  database: "cadastrohappylife"
});



// Exporta a conexão do banco de dados para ser utilizada em outros arquivos do projeto
module.exports = conexaobanco;
