# Grupo04-xp49
Ecommerceapi
A API foi escrita em linguagem JS(javaScript). Foram utilizadas as bibliotecas: mongoose, node express, dotenv, nodemon, jsonwebtoken, crypto-js e cors. O banco de dados escolhido foi o MongoDB, que, por ser um banco de dados NoSQL, não possuí schema, tornado-o mais flexível e sua estrutura variável. Para o teste dos endpoints, utilizei o Postman. O cógido foi versionado no GitHub e Railway, facilitando o envio de deploy para equipe de frontend realizar os testes do APP de forma mais dinâmica.

GitHub do projeto de front: https://github.com/rodrigobruno/desafio-4-grupo-4-front-end-ecommerce

URL para consumo do APP: https://desafio-4-grupo-4-front-end-ecommerce.vercel.app/

URL para consumo da API: https://grupo04-xp49-production.up.railway.app

Abaixo estão os caminhos utilizados para realizar os testes da API:

USER:

Login: https://grupo04-xp49-production.up.railway.app/api/auth/login (POST)

Register: https://grupo04-xp49-production.up.railway.app/api/auth/register (POST)

Delete: https://grupo04-xp49-production.up.railway.app/api/users/:id (DELETE)

Get User: https://grupo04-xp49-production.up.railway.app/api/users/:id (GET)

Get All User: https://grupo04-xp49-production.up.railway.app/api/users/ (GET)

Update User: https://grupo04-xp49-production.up.railway.app/api/users/:id (PUT)

PRODUCTS:

Create Product: https://grupo04-xp49-production.up.railway.app/api/products (POST)

Delete Product: https://grupo04-xp49-production.up.railway.app/api/products/:id (DELETE)

Get Product: https://grupo04-xp49-production.up.railway.app/api/products/:id (GET)

Get All Product: https://grupo04-xp49-production.up.railway.app/api/products/ (GET)

Update Product: https://grupo04-xp49-production.up.railway.app/api/products/:id (PUT)

ORDER:

Create Order: https://grupo04-xp49-production.up.railway.app/api/orders/ (POST)

Delete Order: https://grupo04-xp49-production.up.railway.app/api/orders/:id (DELETE)

Get Order: https://grupo04-xp49-production.up.railway.app/api/orders/:id (GET)

Get All Order: https://grupo04-xp49-production.up.railway.app/api/orders/ (GET)

Get All User Oreder: https://grupo04-xp49-production.up.railway.app/api/orders/user/:userId (GET)

Update Order: https://grupo04-xp49-production.up.railway.app/api/orders/:id (PUT)

CATEGORIES:

Create Category: https://grupo04-xp49-production.up.railway.app/api/categories/ (POST)

Delete Category: https://grupo04-xp49-production.up.railway.app/api/categories/:id (DELETE)

Get Category: https://grupo04-xp49-production.up.railway.app/api/categories/:id (GET)

Get All Categories: https://grupo04-xp49-production.up.railway.app/api/categories/ (GET)

Update Category: https://grupo04-xp49-production.up.railway.app/api/categories/:id (PUT)

BANNER:

Create Banner: https://grupo04-xp49-production.up.railway.app/api/banners/ (POST)

Delete Banner: https://grupo04-xp49-production.up.railway.app/api/banners/:id (DELETE)

Get All Banner: https://grupo04-xp49-production.up.railway.app/api/banners/ (GET)

Update Banner: https://grupo04-xp49-production.up.railway.app/api/banners/:id (PUT)

Por fim, gostaria de agradecer imensamente o professor Erik Borges e a equipe de front por todo auxílio prestado.
