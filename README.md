# hbsisapp
teste hbsis app Laravel/react

Para executar o laravel em um apache:
1. criar um banco de dados com o configurar no arquivo .env na raiz:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hbsisapp
DB_USERNAME=root
DB_PASSWORD=

2. abrir o cmd na raiz do projeto

3. inicializar o react com $ npm run dev

4. iniciar o laravel com $ php artisan serve

O aplicativo executar em http://127.0.0.1:8000

O teste é padrão, no cmd:

1. cd react-testing

2. $ npm test