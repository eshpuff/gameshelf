# 🎮 GameShelf

Bem-vindo ao **GameShelf**, a sua estante de jogos pessoal! Este projeto foi criado para ajudar jogadores a organizar, avaliar e redescobrir a sua coleção de jogos de uma forma simples e visualmente agradável.

## ✨ Funcionalidades

* **Autenticação de Utilizador:** Crie uma conta e faça login para ter acesso à sua estante pessoal.
* **Estante de Jogos Pessoal:** Adicione jogos à sua estante, incluindo título, gênero, plataforma, nota (de 0 a 5 estrelas), tempo de jogo e se o platinou.
* **Edição e Remoção:** Atualize as informações de um jogo ou remova-o da sua estante a qualquer momento.
* **Recomendações:** Descubra novos jogos para adicionar à sua coleção através de uma página de recomendações.
* **Sugestão Aleatória:** Não sabe o que jogar? Use o botão "o que jogar a seguir?" para que um jogo da lista de recomendações seja adicionado à sua estante.
* **Estante de Platinados:** Uma secção especial no seu dashboard exibe todos os jogos que você já conquistou a platina!

## 🚀 Tecnologias Utilizadas

* **Frontend:**
    * [**React**](https://reactjs.org/) - Para a construção da interface de utilizador reativa e componentizada.
    * [**Tailwind CSS**](https://tailwindcss.com/) - Para a estilização rápida e moderna, diretamente no código.
    * [**React Router**](https://reactrouter.com/) - Para a gestão da navegação entre as páginas.
    * [**Axios**](https://axios-http.com/) - Para fazer os pedidos à nossa API backend.

* **Backend:**
    * [**Flask**](https://flask.palletsprojects.com/) - Um micro-framework Python para criar a nossa API RESTful.
    * [**SQLAlchemy**](https://www.sqlalchemy.org/) - Para interagir com a base de dados de forma simples.

* **API Externa:**
    * [**RAWG Video Games Database API**](https://rawg.io/apidocs) - Para obter as imagens e informações dos jogos.

## 🛠️ Como Executar o Projeto Localmente

Para ter o GameShelf a funcionar na sua máquina, siga estes passos:

### Pré-requisitos

* Python 3
* Node.js e npm

### Backend (Flask)

1.  **Navegue para a pasta do backend:**
    ```bash
    cd caminho/para/a/pasta-backend
    ```

2.  **Crie e ative um ambiente virtual:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure a sua chave da API RAWG** no seu arquivo de configuração do Flask.

5.  **Inicie o servidor backend:**
    ```bash
    flask run
    ```
    O servidor estará a funcionar em `http://127.0.0.1:5000`.

### Frontend (React)

1.  **Abra um novo terminal e navegue para a pasta do frontend:**
    ```bash
    cd caminho/para/a/pasta-frontend
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie a aplicação React:**
    ```bash
    npm start
    ```
    A aplicação abrirá no seu navegador em `http://localhost:3000`.
