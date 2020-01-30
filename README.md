# hbsisapp
teste Desafio Bureau Consumidor app Laravel/react

1. Depois do clone ou download, na pasta raiz, abrir o terminal e executar $ composer update para o composer fazer download dos arquivos.

Para executar o app laravel em um apache:
2. criar um banco de dados e o configurar no arquivo .env.example na raiz:


DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hbsisapp
DB_USERNAME=root
DB_PASSWORD=

salve o arquivo sem o ".example", apenas como ".env"

3. Para executar criar as tabelas no banco de dados usamos o migration: $ php artisan migrate

4. Para regenerar corretamente as classes e seus componentes: $ composer dump-autoload

5.  Para popular o banco de dados executamos o seeder: $ php artisan db:seed

6. iniciar o laravel com $ php artisan serve

7. inicializar o react com $ npm run dev

O aplicativo executar em http://127.0.0.1:8000

O teste é padrão, no terminal:

1. cd react-testing

2. $ npm test
