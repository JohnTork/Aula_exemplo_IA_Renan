# Aula_exemplo_IA_Renan

## Projeto unificado Minha Agenda Inteligente

Este repositório contém agora o Frontend e o Backend em uma única estrutura:

```text
.
├── frontend/  # Aplicação TanStack/Vite existente
├── backend/   # API Express/SQLite existente
├── package.json
└── README.md
```

### Instalar todos os projetos

```powershell
npm run install:all
```

### Executar o Frontend

```powershell
npm run dev:frontend
```

### Executar o Backend

```powershell
Copy-Item backend/.env.example backend/.env
npm run dev:backend
```

O Backend fica disponível em `http://localhost:3001`.

Comandos adicionais:

- `npm run build:frontend`
- `npm run test:frontend`
- `npm start`
- `npm run start --prefix backend`

## Exemplo de API REST com lista de tarefas

O exemplo usa apenas recursos nativos do Node.js, sem instalar dependências.

1. Instale o Node.js, caso ainda não esteja instalado.
2. No terminal, abra a pasta do projeto e execute:

   ```powershell
   node server.js
   ```

3. Acesse <http://127.0.0.1:3000> no navegador. O front-end chama `GET /api/tarefas` e exibe a resposta JSON.

Para consultar a API diretamente, abra <http://127.0.0.1:3000/api/tarefas>. Para usar outra porta, defina a variável de ambiente `PORT` antes de iniciar o servidor.