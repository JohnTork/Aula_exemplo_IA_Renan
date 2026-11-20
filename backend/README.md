# Minha Agenda Inteligente - API

Backend REST em Node.js e Express para o projeto Minha Agenda Inteligente.

## Tecnologias

- Node.js
- Express
- Sequelize
- SQLite para desenvolvimento local
- PostgreSQL para ambientes configurados
- CORS
- Dotenv

## Estrutura

```text
beckendRenan/
├── src/
│   ├── config/database.js
│   ├── controller/taskController.js
│   ├── middleware/errorHandler.js
│   ├── model/taskModel.js
│   ├── router/taskRouter.js
│   ├── service/taskService.js
│   └── index.js
├── data/agenda.sqlite
├── .env.example
├── .gitignore
├── index.js
└── package.json
```

Por padrão, o banco SQLite é criado automaticamente em `data/agenda.sqlite`.

## Pré-requisitos

- Node.js 18 ou superior
- npm

## Instalação

```powershell
cd C:\Users\john19147236\Documents\beckendRenan
npm install
Copy-Item .env.example .env
```

## Configuração

`.env` pode conter:

```text
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

Use `CORS_ORIGIN=*` apenas em ambiente local. Para múltiplas origens, separe os valores por vírgula.

## Execução

```powershell
npm run dev
```

Ou:

```powershell
npm start
```

A URL padrão neste projeto unificado é `http://localhost:3001`.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/health` | Verifica se o servidor está ativo |
| GET | `/api/tasks` | Lista tarefas |
| GET | `/api/tasks/:id` | Consulta uma tarefa |
| POST | `/api/tasks` | Cadastra uma tarefa |
| PUT | `/api/tasks/:id` | Atualiza uma tarefa |
| PATCH | `/api/tasks/:id` | Atualiza campos da tarefa |
| DELETE | `/api/tasks/:id` | Remove uma tarefa |

Filtros disponíveis em `GET /api/tasks`: `search`, `category` e `status`.

## Modelo da tarefa

```json
{
  "title": "Estudar para a prova",
  "description": "Revisar os capítulos 3 e 4",
  "category": "Estudos",
  "date": "2026-11-20",
  "time": "19:00",
  "status": "Pendente"
}
```

Categorias válidas:

- Estudos
- Aulas
- Compromissos
- Compras
- Visitas
- Outros

Status válidos:

- Pendente
- Em andamento
- Concluída

## Exemplos

Criar:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3001/api/tasks" -ContentType "application/json" -Body '{"title":"Estudar","description":"","category":"Estudos","date":"2026-11-20","time":"19:00","status":"Pendente"}'
```

Listar com filtros:

```powershell
Invoke-RestMethod -Uri "http://localhost:3001/api/tasks?category=Estudos&status=Pendente"
```

Atualizar status:

```powershell
Invoke-RestMethod -Method Patch -Uri "http://localhost:3001/api/tasks/SEU_ID" -ContentType "application/json" -Body '{"status":"Concluída"}'
```

Excluir:

```powershell
Invoke-RestMethod -Method Delete -Uri "http://localhost:3001/api/tasks/SEU_ID"
```

## Integração com o Frontend

O frontend pode consumir `http://localhost:3001/api/tasks`. Os campos enviados e recebidos correspondem ao modelo já usado por `src/lib/tasks.ts`.
