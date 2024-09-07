# API-Games
Esta API permite gerenciar um banco de dados de jogos e usuários, com funcionalidades como criação, atualização, exclusão e exibição de games, além de autenticação de usuários por meio de JWT.

### Funcionalidades:
- Gerenciamento de jogos: Exibir, adicionar, atualizar e excluir jogos.
- Cadastro de usuários: Registrar novos usuários.
- Autenticação: Autenticação de usuários para acesso a funcionalidades protegidas.
- Consumo de APIs externas: A API usa bibliotecas como ``axios`` para consumir outras APIs.
- Política de segurança (CORS): Implementa CORS para permitir o consumo de APIs de diferentes origens.
- Autenticação com JWT: Utiliza tokens JWT para autenticar usuários e proteger rotas específicas.

### Tecnologias Usadas
- Node.js
- Express: Framework web usado para construir a API.
- Sequelize: ORM para manipulação do banco de dados.
- MySQL: Banco de dados utilizado.
- EJS: Motor de templates para renderização de views.
- JWT (JSON Web Token): Para autenticação de usuários.
- Axios: Biblioteca para consumo de APIs.
- CORS: Implementado para segurança ao consumir APIs de diferentes origens.

### Instalação pré-requisitos
- Node.js e npm instalados.
- MySQL instalado e configurado.

### Endpoints
##### Exibir a página principal da API
- Rota: ``/paginaApi``
- Método: ``GET``
- Descrição: Exibe a página inicial da API.

### Exibir a página de cadastro
- Rota: ``/paginaCadastro``
- Método: ``GET``
- Descrição: Exibe a página de cadastro de usuários.

### Listar todos os jogos
- Rota: ``/games``
- Método: ``GET``
- Autenticação: Sim, usando JWT.
- Descrição: Exibe todos os jogos cadastrados no banco de dados.

### Exibir um jogo por ID
- Rota: ``/game/:id``
- Método: ``GET``
##### Parâmetros:
- ``id``: ID do jogo a ser exibido.
- Descrição: Retorna os detalhes de um jogo com base no ID.

### Criar um novo jogo
- Rota: ``/game``
- Método: ``POST``
##### Body:
``
{
  "titleVar": "Nome do Jogo",
  "yearVar": 2024,
  "priceVar": 59.99
}
``
### Atualizar um jogo por ID
- Rota: ``/game/:id``
- Método: ``PUT``
##### Parâmetros:
- ``id``: ID do jogo a ser atualizado.
- Body:
``
{
  "titleVar": "Nome do Jogo Atualizado",
  "yearVar": 2025,
  "priceVar": 49.99
}
``

### Deletar um jogo por ID
- Rota: ``/game/:id``
- Método: ``DELETE``
##### Parâmetros:
- ``id``: ID do jogo a ser excluído.
##### Descrição: Remove um jogo do banco de dados com base no ID.

### Cadastrar um novo usuário
- Rota: ``/user``
- Método: ``POST``
##### Body:
``
{
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
``

### Autenticar um usuário
- Rota: ``/auth``
- Método: ``POST``
##### Body:
``
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
``

### Autenticação
##### A API utiliza JWT (JSON Web Tokens) para proteger rotas. Para acessar as rotas protegidas, você deve enviar o token JWT no cabeçalho da requisição da seguinte forma:

##### Exemplo de Cabeçalho HTTP:
``
Authorization: Bearer <seu-token-jwt>
``

### Segurança (CORS)
##### Esta API utiliza o middleware ``cors`` para permitir o consumo de APIs de diferentes origens, garantindo que as políticas de segurança estejam corretas para comunicação com outros domínios.

### Middleware de Autenticação
##### O middleware de autenticação ``authMiddleware`` é aplicado em rotas que precisam de autenticação via JWT. Caso o token seja inválido ou ausente, a requisição é bloqueada.

### Licença
##### Este projeto está licenciado sob os termos da ``MIT License``.
