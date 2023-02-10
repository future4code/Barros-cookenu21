## <h1 align="center">📇 Labook </h1>

## :memo: Descrição
Projeto desenvolvido como didática de back-end para as turmas JBL LABENU com conteúdos que englobam o universo da criação de APIs com a temática de um rede social.

## Link Documentação Postman
[Doc_Postman](https://documenter.getpostman.com/view/22363157/2s935mtRKC)

## Link Deploy Render
https://labook4.onrender.com

##  👩🏾Pessoa Desenvolvedora do Projeto

 [<img src="https://avatars.githubusercontent.com/u/74737156?v=4" width=115><br><sub>Byron Smith</sub>](https://github.com/byron-smith-nobrega)

## :books: Funcionalidades
* <b>Criar Usuário</b>: Método voltado para a criação de usuários.
* <b>Criar Post</b>: Método voltado para a criação de postagens.
* <b>Buscar Post</b>: Método voltado para a consulta de uma postagem.
* <b>Criar Amizade</b>: Método voltado para a criação de amizade entre usuários.
* <b>Deletar Amizade</b>: Método voltado para a exclusão de uma amizade.
* <b>Criar Curtida</b>: Método voltado para a criação de vínculo entre usuário e postagem.
* <b>Deletar Curtida</b>: Método voltado para a exclusão de vínculo entre usuário e postagem. 
* <b>Criar Comentário </b>: Método voltado para a criação de comentário nas postagens.
* <b>Buscar Feeds Amigos </b>: Método voltado para a consulta de postagens dos amigos.
* <b>Buscar Feeds</b>: Método voltado para a consulta de postagens.

## :wrench: Tecnologias utilizadas
* VS Code
* nodeJS
* expressJS
* axios
* cors
* dotenv
* uuid
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
Após configuração do .env, dê o comando seguinte para rodar a aplicação:
```
npm run start
```
Após o start, dê o comando seguinte para criar as tabelas no banco de dados:
```
npm run migrations
```

Use o Postman ou o Insomnia para realizar as requisições desejadas.

## :dart: Status do projeto
O projeto está em andamento.

