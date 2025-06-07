# Loja de Roupas API & Website

Bem-vindo ao projeto Loja de Roupas! Este repositório contém o código-fonte para o website e a API da loja.
![Tela inicial do site](./img/tela-inicial.png)


## Sobre o Projeto

Este projeto visa fornecer uma plataforma online para a venda de roupas, com uma interface de usuário amigável e uma API robusta para gerenciar produtos, pedidos e clientes.

## Tecnologias Utilizadas

*   **Frontend:**  HTML/CSS/JS puro, axios js
*   **Backend:**  Node com Express, TS, sneaks-api 
*   
*   **Outras Ferramentas:** Docker, Git

## Como Executar o Projeto

### Pré-requisitos

*    Node.js v18.x, Docker, TS

### Website (Frontend)

```bash
# Clone o repositório
git clone <https://github.com/Guikino/oklin-store.git>
cd loja-de-roupas # ou o caminho para a pasta do frontend
# Instale as dependências
npm install # ou yarn install
# Inicie o servidor de desenvolvimento
npm start # ou yarn start
```

### API (Backend)

```bash
# Navegue até a pasta da API
cd api # ou o caminho para a pasta da api
# Instale as dependências
# (Comandos específicos para a sua stack de backend)
# Inicie o servidor
# (Comandos específicos para a sua stack de backend)
```

## Endpoints da API (Exemplos)

*   `GET /search` - pesquisa um produto específico e retorna um array de objetos com o resultado.
*   `GET /product/:styleID` - Obtém detalhes de um produto específico.
*   `GET /popular` - Busca os produtos populares e retorna um array de objetos com o resultado.


---

