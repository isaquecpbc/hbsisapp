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

3. Para executar criar as tabelas e popular o banco de dados usamos o migration e o seeder: $ php artisan migrate:fresh --seed

4. inicializar o react com $ npm run dev

5. iniciar o laravel com $ php artisan serve

O aplicativo executar em http://127.0.0.1:8000

O teste é padrão, no cmd:

1. cd react-testing

2. $ npm test
