📝 LEIA-ME.md
📦 Sistema de Controle de Estoque com Login
Este projeto é um sistema completo de controle de estoque com autenticação de usuários, ideal para pequenas empresas que necessitam de gerenciamento de estoques ou materiais armazenados.

🔐 Entrar
O sistema possui uma tela de login simples com dois usuários cadastrados:

Usuário: / Senha: ` 1234 corte/ Senha: 1234

Usuário: / Senha: loja/ Senha: 4567

🗃️ Módulos principais
1. Login
Interface elegante com CSS moderno.

.Validação de usuário e redirecionamento seguro via localStorage.

2. Controle de Estoque (index.html + script.js)
Cadastro de itens com nome, extensão e quantidade.

Edição e remoção com validações.

Filtros por nome e metragem.

Feedback visual de ações.

3. Estoque Local (retalhos.html + retalhos.js)
Separação por tipo (Moletinho e Linho).

Modal para adicionar peso e descrição.

Histórico de exclusões com dados e hora.

Estatísticas de estoque em tempo real.

💾 Armazenamento
Os dados são salvos localmente via localStorage, sem necessidade de backend.

🎨 Estilo
CSS puro e Tailwind para retalhos.

Responsivo, com visual limpo e amigável.

📁 Estrutura

/
├── index.html          # Login
├── stylelogin.css
├── index.js
├── admin/
│   ├── index.html      # Estoque principal
│   ├── style.css
│   ├── script.js
│   ├── retalhos.html
│   ├── retalhos.js
│   └── retalhos.css
✍️ Autor
Raul Fonseca
Desenvolvedor Frontend & entusiasta de soluções práticas para pequenas empresas.

