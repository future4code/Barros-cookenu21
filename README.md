## <h1 align="center">📇 Cookenu21 </h1>

## :memo: Descrição
Projeto desenvolvido como didática de back-end para as turmas JBL LABENU com conteúdos que englobam o universo da criação de APIs com a temática de um rede social de receitas.

## Link Documentação Postman
[Doc_Postman](https://documenter.getpostman.com/view/22363157/2s93CNLYKU)

## Link Deploy Render
https://cookenu21.onrender.com

##  👩🏾Pessoa Desenvolvedora do Projeto

 [<img src="https://avatars.githubusercontent.com/u/74737156?v=4" width=115><br><sub>Byron Smith</sub>](https://github.com/byron-smith-nobrega)

## :books: Funcionalidades
* <b>Signup</b>: Método voltado para a criação de usuários.
* <b>Login</b>: Método voltado a fornecer acesso do usuário ao sistema.
* <b>Profile</b>: Método voltado para o usuário pegar as informações do seu perfil.
* <b>Profile Other</b>: Método voltado para o usuário pegar as informações do perfil de outro usuário.
* <b>Get User All</b>: Método voltado para a consulta de todos dos usuário cadastrados.
* <b>Deleted User</b>: Método voltado para a exclusão de um usuário.
* <b>Recover Password</b>:  Método voltado para a recuperação da senha.
* <b>Create Recipe</b>: Método voltado para a criação de receitas.
* <b>Recipe All</b>: Método voltado para a consulta de todas as receitas.
* <b>Get Recipe</b>: Método voltado para a consulta de uma receita.
* <b>Edit Recipe</b>: Método voltado para a edição de receitas.
* <b>Deleted Recipe</b>: Método voltado para a exclusão de receitas.
* <b>Follow</b>: Método voltado para a criação de seguidores.
* <b>Feed Followers</b>: Método voltado para a consulta de receitas dos seguidores.
* <b>Unfollow</b>: Método voltado para a exclusão de seguidores.

## :wrench: Tecnologias utilizadas
* VS Code
* nodeJS
* expressJS
* axios
* cors
* dotenv
* uuid
* bcrupt
* jsonwebtoken
* nodemailer
* MySQL


## :rocket: Rodando o projeto
Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para instalar as dependências:
```
npm install
```
Após instaladas as dependências, configure o arquivo .env:
```
DB_HOST = 
DB_USER = ""
DB_PASS = ""
DB_NAME = ""
```
Após configuração do .env, dê o comando seguinte para criar as tabelas no banco de dados: rodar a aplicação:
```
npm run migrations
```
Após o migrations, dê o comando seguinte para crodar a aplicação:
```
npm run start
```

Use o Postman ou o Insomnia para realizar as requisições desejadas.

## :dart: Status do projeto
O projeto está em andamento.

