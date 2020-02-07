# teste app WEB API C#/React.JS

> O app insere pessoas e calcula o Imposto de Renda.

## Backend

1. Depois do clone ou download, na pasta raiz, abrir o SQL Server e criar a tabela como no arquivo "/banco de dados.sql";

2. Abrir o projeto no Visual Studio e alterar a conexão do bd no arquivo "WebAppHBSIS\WebAppHBSIS\Web.config" e colocar os parametros de entrada na linha 16 na tag "connectionStrings";

3. Para executar o App compilar e executar em um navegador;

## Frontend
4. Para alterar o url que o WEB API C# ira executar, abrir o arquivo "Base.js" na pasta "hbsis-app-front-react\src\components" alterar a variavel "window.$url_port" na linha 11 

5. Inicializar o react com terminal na raiz do app /hbsis-app-front-react com o comando $ npm start;

O aplicativo deve executar em http://localhost:3000

## Test unitário:

1. cd react-testing

2. $ npm test
