# PROJETO: ORGANIZADOR PESSOAL DE TAREFAS – MVP

## 1. OBJETIVO

Atue como um desenvolvedor Front-end Sênior, com experiência em UX/UI Design, React, TypeScript e desenvolvimento de interfaces responsivas.

Desenvolva exclusivamente o front-end de um MVP (Minimum Viable Product) de um sistema web de organização pessoal de tarefas e compromissos.

### Usuário
O sistema será utilizado por uma pessoa que deseja organizar sua rotina, principalmente estudos, aulas, compromissos importantes, compras, visitas e outras atividades pessoais.

### Problema
O usuário precisa de um lugar centralizado para registrar atividades, consultar seus compromissos e acompanhar o que precisa fazer, evitando esquecimentos e melhorando sua organização pessoal.

### Solução
Criar uma aplicação web simples, intuitiva e responsiva que permita realizar as quatro operações CRUD:

- Create: cadastrar uma tarefa ou compromisso.
- Read: visualizar e consultar tarefas.
- Update: editar tarefas cadastradas.
- Delete: excluir tarefas cadastradas.

O sistema deve utilizar dados simulados, identificados claramente como dados de demonstração.

Todo o conteúdo da interface deve estar em português brasileiro (pt-BR).

---

## 2. PÁGINAS E COMPONENTES

### 2.1. Página principal – Dashboard

Criar uma página inicial contendo:

**Cabeçalho:**
- Nome do sistema: Minha Rotina.
- Subtítulo: Organize seus compromissos e não esqueça o que é importante.
- Botão "Nova tarefa".

**Resumo de atividades:**
Exibir três indicadores:
- Total de tarefas.
- Tarefas pendentes.
- Tarefas concluídas.

**Área de filtros:**
- Campo de pesquisa por título.
- Filtro por categoria.
- Filtro por status.
- Botão para limpar filtros.

**Lista de tarefas:**
Cada tarefa deve apresentar:
- Título.
- Descrição resumida.
- Categoria.
- Data.
- Horário.
- Status.
- Botão para visualizar detalhes.
- Botão para editar.
- Botão para excluir.

Organizar as tarefas por data, apresentando primeiro as mais próximas.

### 2.2. Cadastro de tarefa

Criar um formulário de cadastro com os seguintes campos:

- Título (obrigatório).
- Descrição (opcional).
- Categoria (obrigatória).
- Data (obrigatória).
- Horário (obrigatório).
- Status (obrigatório).

Categorias disponíveis:
- Estudos.
- Aulas.
- Compromissos.
- Compras.
- Visitas.
- Outros.

Status disponíveis:
- Pendente.
- Em andamento.
- Concluída.

Incluir os botões:
- Salvar tarefa.
- Cancelar.

### 2.3. Visualização de tarefa

Ao selecionar uma tarefa, apresentar seus detalhes:
- Título.
- Descrição completa.
- Categoria.
- Data.
- Horário.
- Status.

Disponibilizar as opções de editar e excluir.

### 2.4. Edição de tarefa

Utilizar o mesmo formulário de cadastro, preenchendo automaticamente os dados existentes.

Permitir alterar todos os campos e salvar as modificações.

---

## 3. COMPORTAMENTOS E FLUXOS

### 3.1. Fluxo de cadastro

1. Usuário acessa a página principal.
2. Clica em "Nova tarefa".
3. O sistema apresenta o formulário.
4. Usuário preenche os campos.
5. Clica em "Salvar tarefa".
6. O sistema valida os campos obrigatórios.
7. A tarefa aparece na lista principal.
8. Exibir mensagem de sucesso.

### 3.2. Fluxo de consulta

1. Usuário acessa a lista de tarefas.
2. Visualiza as atividades cadastradas.
3. Pode pesquisar pelo título.
4. Pode filtrar por categoria e status.
5. Pode abrir uma tarefa para consultar seus detalhes.

### 3.3. Fluxo de edição

1. Usuário seleciona uma tarefa.
2. Clica em "Editar".
3. O sistema apresenta os dados preenchidos.
4. Usuário modifica as informações.
5. Clica em "Salvar alterações".
6. A lista é atualizada.

### 3.4. Fluxo de exclusão

1. Usuário seleciona a opção excluir.
2. O sistema apresenta uma confirmação.
3. Usuário confirma ou cancela.
4. Se confirmar, a tarefa é removida da lista.
5. Exibir mensagem de sucesso.

### 3.5. Alteração de status

Permitir alterar o status de uma tarefa entre:
- Pendente.
- Em andamento.
- Concluída.

A mudança deve ser refletida imediatamente na interface e nos indicadores do dashboard.

### 3.6. Estados de interface

Implementar os seguintes estados:

**Estado inicial:**
- Exibir tarefas simuladas para demonstrar o funcionamento.

**Estado vazio:**
- Quando não houver tarefas, exibir uma mensagem convidando o usuário a cadastrar sua primeira atividade.

**Estado sem resultados:**
- Quando os filtros não encontrarem tarefas, informar que nenhum resultado foi encontrado.

**Estado de formulário inválido:**
- Destacar campos obrigatórios não preenchidos.
- Apresentar mensagens de validação próximas aos respectivos campos.

**Estado de confirmação:**
- Exibir modal antes de excluir uma tarefa.

**Estado de sucesso:**
- Exibir notificações após cadastrar, editar ou excluir.

**Estado de erro:**
- Apresentar mensagens amigáveis caso uma operação local falhe.

### 3.7. Componentes reutilizáveis

Organizar a interface em componentes:

- Header.
- DashboardSummary.
- TaskList.
- TaskCard.
- TaskForm.
- TaskDetails.
- SearchInput.
- CategoryFilter.
- StatusFilter.
- ConfirmationModal.
- EmptyState.
- ToastNotification.

Utilizar componentes reutilizáveis para manter consistência visual e facilitar futuras evoluções.

---

## 4. LIMITES E RESTRIÇÕES DO ESCOPO

O projeto deve respeitar rigorosamente as seguintes limitações:

### Incluído no MVP
- CRUD completo de tarefas.
- Consulta de detalhes.
- Categorias predefinidas.
- Alteração de status.
- Pesquisa por título.
- Filtros por categoria e status.
- Indicadores de tarefas.
- Layout responsivo.
- Dados simulados para demonstração.

### Armazenamento
- Utilizar dados simulados locais.
- Utilizar estado local da aplicação para controlar as operações.
- Pode utilizar localStorage para preservar os dados no próprio navegador.
- Identificar claramente os dados iniciais como dados de demonstração.
- Não utilizar serviços externos para armazenar informações.

### Explicitamente proibido

NÃO implementar:

- Login ou autenticação.
- Cadastro de usuários.
- Banco de dados.
- Supabase.
- Firebase.
- APIs externas.
- Integrações com Google Calendar.
- Integrações com WhatsApp.
- Envio de notificações reais.
- Envio de e-mails.
- Inteligência artificial.
- Compartilhamento de tarefas.
- Múltiplos usuários.
- Funcionalidades que não estejam descritas neste escopo.

Não criar funcionalidades adicionais por iniciativa própria.

O objetivo é entregar um MVP funcional exclusivamente no front-end.

---

## 5. CRITÉRIOS DE ACEITAÇÃO VISUAL E FUNCIONAL

### 5.1. Identidade visual

Criar uma interface moderna, limpa e minimalista.

Referência de estilo:
- Design semelhante a aplicações modernas de produtividade.
- Cores suaves e agradáveis.
- Fundo em tonalidade clara.
- Cards com cantos arredondados.
- Ícones simples e intuitivos.
- Boa hierarquia visual.
- Tipografia legível.
- Espaçamentos consistentes.
- Botões com estados de interação.

Utilizar uma paleta visual discreta:
- Azul para ações principais.
- Verde para tarefas concluídas.
- Amarelo para tarefas pendentes.
- Laranja para tarefas em andamento.
- Cinza para informações secundárias.

### 5.2. Responsividade

A interface deve funcionar adequadamente em:

- Computadores desktop.
- Notebooks.
- Tablets.
- Smartphones.

No desktop:
- Apresentar dashboard com indicadores na parte superior.
- Exibir lista de tarefas com boa distribuição horizontal.

No tablet:
- Ajustar os indicadores e os cards conforme o espaço disponível.

No smartphone:
- Apresentar layout em coluna única.
- Utilizar cards empilhados.
- Adaptar formulários à largura da tela.
- Evitar rolagem horizontal.
- Manter botões acessíveis e fáceis de tocar.

### 5.3. Acessibilidade

- Utilizar HTML semântico.
- Garantir contraste adequado entre texto e fundo.
- Permitir navegação por teclado.
- Destacar visualmente o foco dos elementos.
- Associar rótulos aos campos dos formulários.
- Utilizar textos acessíveis nos botões e ícones.
- Não utilizar somente cores para representar status.
- Garantir que modais tenham identificação e operação acessíveis.

### 5.4. Critérios funcionais de aceitação

O desenvolvimento será considerado aprovado quando:

1. O usuário conseguir cadastrar uma tarefa.
2. O usuário conseguir visualizar as tarefas cadastradas.
3. O usuário conseguir consultar os detalhes de uma tarefa.
4. O usuário conseguir editar uma tarefa.
5. O usuário conseguir excluir uma tarefa com confirmação.
6. O usuário conseguir alterar o status.
7. Os filtros funcionarem corretamente.
8. A pesquisa por título funcionar corretamente.
9. Os indicadores refletirem os dados existentes.
10. Os formulários apresentarem validações.
11. A interface apresentar estados vazios e mensagens de feedback.
12. As operações funcionarem sem backend ou serviços externos.

### 5.5. Resultado esperado

Entregar uma aplicação web funcional, com navegação intuitiva, interface profissional e todas as operações CRUD funcionando no front-end.

Antes de finalizar:
- Verificar os fluxos de cadastro, consulta, edição e exclusão.
- Verificar os filtros e a pesquisa.
- Verificar a atualização dos indicadores.
- Testar a interface em diferentes tamanhos de tela.
- Garantir que não existam funcionalidades fora do escopo.

Priorize simplicidade, clareza, usabilidade e fidelidade aos requisitos especificados.

Não desenvolver funcionalidades adicionais sem solicitação explícita.