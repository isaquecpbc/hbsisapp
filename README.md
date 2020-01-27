# hbsisapp
teste hbsis app Laravel/react

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

3. abrir o terminal na raiz do projeto

4. Para executar criar as tabelas e popular o banco de dados usamos o migration e o seeder: $ php artisan migrate:fresh --seed

5. inicializar o react com $ npm run dev

6. iniciar o laravel com $ php artisan serve

O aplicativo executar em http://127.0.0.1:8000

O teste é padrão, no terminal:

1. cd react-testing

2. $ npm test
