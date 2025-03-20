# Gerenciador Financeiro Simples

Bem-vindo ao **Gerenciador Financeiro Simples**! Este é um aplicativo básico de login e gerenciamento financeiro, criado para fins de aprendizado e uso pessoal. Ele permite que você registre suas credenciais, faça login e gerencie suas finanças de forma simples.

---

## 🚀 Funcionalidades

- **Autenticação de Usuário**:
  - Registro de novos usuários.
  - Login com validação de credenciais.
  
- **Gerenciamento Financeiro**:
  - Adicionar, editar e excluir transações financeiras.
  - Visualizar uma lista de transações.
  - Resumo simples de receitas e despesas.

- **Tecnologias Utilizadas**:
  - **Frontend**: React.js + Vite
  - **Backend**: Node.js + Express
  - **Banco de Dados**: SQLite

---

## 📂 Estrutura do Projeto

### **Frontend**
frontend/
├── index.html              # Arquivo HTML principal
├── package.json            # Configurações do projeto e dependências
├── vite.config.js          # Configuração do Vite
├── public/                 # Arquivos estáticos (opcional)
│   └── (ex.: imagens, ícones)
├── src/                    # Código-fonte do React
|   ├── assets
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Ponto de entrada do React
│   ├── styles/             # Estilos globais
│   │   └── global.css      # Estilos globais para a aplicação
│   ├── services/           # Serviços para consumir APIs
│   │   └── api.js          # Configuração da API
│   ├── context/            # Context API (opcional, para estado global)
│   │   └── AuthContext.jsx # Contexto de autenticação
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header.jsx      # Componente de cabeçalho
│   │   └── Footer.jsx      # Componente de rodapé
│   ├── pages/              # Páginas principais da aplicação
│   │   ├── Login.jsx       # Página de login
│   │   ├── Register.jsx    # Página de registro
│   │   └── Home.jsx        # Página inicial
└── ...

### **Backend**
backend/
├── .env                    # Variáveis de ambiente
├── package.json            # Configurações do projeto e dependências
├── package-lock.json            
├── src/                    # Código-fonte do backend
│   ├── app.js              # Configuração principal do servidor
│   ├── server.js           # Inicialização do servidor
│   ├── database/           # Configuração do banco de dados
│   │   └── db.js           # Configuração do SQLite
│   ├── routes/             # Rotas da aplicação
│   │   └── authRoutes.js   # Rotas de autenticação
│   │   └── financialRoutes.js # Rotas de gerenciamento financeiro
│   ├── controllers/        # Lógica das rotas
│   │   └── authController.js # Controlador de autenticação
│   │   └── financialController.js # Controlador de finanças
│   ├── models/             # Modelos de dados
│   │   └── User.js         # Modelo de usuário
│   │   └── Transaction.js  # Modelo de transação
│   ├── middleware/         # Middlewares
│   │   └── auth.js         # Middleware de autenticação
│   ├── utils/              # Utilitários
│   │   └── helpers.js      # Funções auxiliares
└── ...

---

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Backend
1. Navegue até a pasta do backend:
   ```
   cd backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do backend (use o arquivo `.env.example` como referência)

4. Inicialize o servidor:
   ```
   npm run dev
   ```
   O servidor estará rodando em `http://localhost:3000`

### Frontend
1. Navegue até a pasta do frontend:
   ```
   cd frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie a aplicação:
   ```
   npm run dev
   ```
   A aplicação estará rodando em `http://localhost:5173`

---

## 📚 Documentação

O código está completamente documentado (pasta Documentações) para facilitar o entendimento e aprendizado:

- **Backend**: Os controladores, modelos e rotas contêm comentários explicando sua funcionalidade.
- **Frontend**: Os componentes principais e serviços estão documentados para entendimento do fluxo.

Para entender melhor a estrutura do projeto:
1. Comece examinando o `server.js` no backend
2. Veja como as rotas são organizadas em `routes/`
3. No frontend, o `App.jsx` e `AuthContext.jsx` fornecem uma visão geral da aplicação

---

## 🎓 Uso Educacional

Este projeto foi desenvolvido com finalidade educacional e está disponível para:

- Estudo de arquitetura de aplicações web full-stack
- Aprendizado de autenticação de usuários com JWT
- Implementação de CRUD básico
- Exemplo de integração React com Node.js

Sinta-se livre para clonar, modificar e usar como base para seus próprios projetos de aprendizado!

---

## 👨‍💻 Autor

**Henrique Sanches**

- Projeto desenvolvido para fins de aprendizado e portfólio
- Contato: sanches.hdigital@gmail.com

---

## 📝 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

---

## 🙏 Agradecimentos

- Agradeço a todos que contribuíram com ideias e sugestões para este projeto educacional.
- Feito com 💙, café e JavaScript.

