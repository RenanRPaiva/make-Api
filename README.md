[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555)](https://www.linkedin.com/in/renan-r-s-paiva/)

<br />
<div align="center">
    <a href="https://github.com/RenanRPaiva/make-Api">
    <img src="https://user-images.githubusercontent.com/101148797/182475941-facfe762-91bf-405b-ba78-20bdd5db4be4.svg" alt="Logo Make" />
  </a>
  <h3 align="center">Make + (API)</h3>

   <p align="center">
    Api Admin com Mongoose para gerenciar cetegorias, serviços e usuários do Make +.
    <br />
  </p>
</div>

<details>
  <summary>Sumário</summary>
  <ol>
    <li><a href="#sobre-o-projeto">Sobre o projeto</a></li>
    <li><a href="#processo-de-trabalho">Processo de trabalho</a></li>
    <li>
      <a href="#como-executar-o-projeto">Como executar o projeto</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#executando-a-api">Executando a API</a></li>
      </ul>
    </li>
    <li><a href="#tecnologias-utilizadas">Tecnologias utilizadas</a></li>
    <li><a href="#autor">Autor</a></li>
    <li><a href="#agradecimentos">Agradecimentos</a></li>
  </ol>
</details>

# Sobre o projeto

A dificuldade na marcação e contato com uma maquiadora, ter acesso a seus trabalhos, pode fazer um pedido, ter um evento onde vai precisar de uma maquiadora para vários tipos de serviços.

Conseguir ter acesso a todas essas informações em unico lugar é difícil, a Make+ vem com uma solução simples.

Neste projeto foi desenvolvido um administrador para gerenciar as categorias, serviços com seus valores e usuários.


Os recursos disponiveis e implementados foram:

- AdminJS criado para consumir a base de dados Mysql e Mongoose;
- Possui CRUD para os Serviços, categorias e usuários.
- Possui camada de services;
- Valida por e-mail o usuário;
- Autenticação para acesso ao adminJS para usuários e administrador;

# Processo de trabalho

O primeiro passo foi escolher um problema: Pessoas que tem dificuldade para contratar uma maquiadora, ter acesso ao valores e tipos de serviços e maquiadora que possui todo um processo manual para passar as informações dos seus serviços.

Para o Front-end: 

Seguindo a proposta do Bootcamp, a solução do problema foi implementada em duas etapas. Uma primeira onde o foco foi o cliente final que realiza os pedidos através da Web e uma segunda que complementou a solução focando na maquiadora que faz o acesso através de um aplicativo nativo.

Como o foco deste projeto era o desenvolvimento do back-end, ainda será adaptada para o front-end.

Para o Back-end:

O projeto foi desenvolvido em uma API com Express utilizando Typescript como ferramenta, listando os serviços, categorias dos serviços e usuários.
# Como executar o projeto

## Pré-requisitos

Antes de seguir o passo a passo para executar o projeto é preciso ter instalado no computador o [Git](https://git-scm.com/), o [Node.js](https://nodejs.org) e o gerenciador de pacotes `npm` (instalado junto com o Node.js) ou `yarn`.

## Executando a API

Siga os passos abaixo para executá-la:

- Faça o download do código fonte no computador do Make-API:
```sh
git clone https://github.com/RenanRPaiva/make-Api.git
```

- Com o terminal na pasta `api` execute os comandos abaixo para instalar as dependências e iniciar a API:
```sh
npm install
npm run dev
```
ou

```sh
yarn add
yarn dev
```

Link da API no Github: [Github](https://github.com/RenanRPaiva/make-Api)

# Tecnologias utilizadas
- Typescript
- MySQL
- Mongoose
- ChartJS
- Moment
- Sequelize
- Bcrypt
- AdminJS
- Express
- Node-mailer
- Entre outras lib's.

# Autor
Renan Rodrigues S. Paiva - renan_13rj@yahoo.com.br

https://www.linkedin.com/in/renan-r-s-paiva/

# Agradecimentos

Obrigado [Infnet](https://www.infnet.edu.br/). Este projeto foi uma grande oportunidade de iniciar no desenvolvimento com o back-end.
