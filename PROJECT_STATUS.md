# PROJECT_STATUS.md

Snapshot do que está pronto neste repositório. Use este arquivo como referência antes de criar novas tasks no Jira para evitar duplicação.

> Última atualização: 2026-04-30 (Fase Balatro completa: 17/17 páginas reestilizadas + Fixes auditoria + Performance)

## Estado atual — sprint Balatro encerrada

- **17 páginas reestilizadas** com tema Balatro completo (CRTFrame + tokens + componentes balatro/)
- **Migração react-router-dom v7** concluída (data router + lazy + Suspense)
- **8 fixes críticos** aplicados pós-auditoria multi-agente
- **3 perf wins**: subset latin de fontes (-86% gzip CSS), Layout compartilhado (BalatroBackground contínuo entre rotas), code-splitting (18 chunks)
- **DevNav** flutuante para QA em DEV
- **23 stories** prontas para import em [jira-balatro-restyle.csv](jira-balatro-restyle.csv)
- **Lint zero erros**, build passa

## Tasks Jira já criadas

### Épicos existentes (não criar de novo)

| Chave | Nome | Status |
|---|---|---|
| MA-3 | Banco de Dados | Em Desenvolvimento |
| MA-11 | PROTÓTIPO | Em Desenvolvimento |
| MA-14 | Backend | Tarefas pendentes |
| MA-15 | FrontEnd | Tarefas pendentes |
| MA-43 | Setup da Sessão | Tarefas pendentes |
| MA-44 | Fluxo da Rodada | Tarefas pendentes |
| MA-45 | Power-ups | Tarefas pendentes |
| MA-46 | Encerramento | Tarefas pendentes |
| MA-47 | Modo Dupla | Tarefas pendentes |
| MA-48 | Infra Front | Tarefas pendentes |

### Stories Front criadas (Sprint 1)

Todas com **status = Concluído** (UI estática, sem API).

| Chave | Tela | Arquivo | Épico | RF |
|---|---|---|---|---|
| MA-49 | Tela Home | [HomePage.jsx](src/components/HomePage.jsx) | MA-43 | — |
| MA-50 | Importar Alunos | [ImportPage.jsx](src/components/ImportPage.jsx) | MA-43 | RF001 |
| MA-51 | Importar Material | [ImportMaterialPage.jsx](src/components/ImportMaterialPage.jsx) | MA-43 | RF002 |
| MA-52 | Criar Partida | [CreateMatchPage.jsx](src/components/CreateMatchPage.jsx) | MA-43 | RF003 |
| MA-53 | Quantidade Perguntas | [QuestionCountPage.jsx](src/components/QuestionCountPage.jsx) | MA-43 | RF004 |
| MA-54 | Loading Geração IA | [LoadingPage.jsx](src/components/LoadingPage.jsx) | MA-43 | RF005 |
| MA-55 | Listar Perguntas | [ListQuestionsPage.jsx](src/components/ListQuestionsPage.jsx) | MA-43 | RF006 |
| MA-56 | Editar Pergunta | [EditQuestionPage.jsx](src/components/EditQuestionPage.jsx) | MA-43 | RF006 |
| MA-57 | Escolher Perguntas | [ChooseQuestionsPage.jsx](src/components/ChooseQuestionsPage.jsx) | MA-43 | RF006 |
| MA-58 | Power-Ups Sliders | [PowerUpsPage.jsx](src/components/PowerUpsPage.jsx) | MA-43 | RF007 |
| MA-59 | Selecionar Power-Ups | [SelectPowerUpsPage.jsx](src/components/SelectPowerUpsPage.jsx) | MA-43 | RF007 |
| MA-60 | Inventário Inicial | [InventoryPage.jsx](src/components/InventoryPage.jsx) | MA-43 | RF008+RF009+RF010 |
| MA-61 | Pergunta + TTS | [RoundQuestionPage.jsx](src/components/RoundQuestionPage.jsx) | MA-44 | RF014 |
| MA-62 | Rodada Finalizada | [RoundFinishedPage.jsx](src/components/RoundFinishedPage.jsx) | MA-44 | RF022 |
| MA-63 | Explicação Power-Ups | [PowerUpsExplainPage.jsx](src/components/PowerUpsExplainPage.jsx) | MA-45 | — |
| MA-64 | Resultado Rodada | [RoundResultPage.jsx](src/components/RoundResultPage.jsx) | MA-46 | RF029 (parcial) |
| MA-65 | Placar Modo Dupla | [DuoModePage.jsx](src/components/DuoModePage.jsx) | MA-47 | RF003 variante |

### Stories Back já no Jira

- **MA-12** — Login e Registro de Usuário (Front) — Em Desenvolvimento
- **MA-13** — Login e Registro de Usuário (Back) — Em Desenvolvimento
- **MA-17** a **MA-22** — Backend stories (upload alunos, geração LLM, validação power-ups, gerenciamento de sessão, configuração regras)

## Tasks Front que AINDA NÃO existem no Jira (criar conforme avançar)

### Setup da Sessão (épico MA-43)
- Parser CSV de alunos + render lista (lógica de RF001)
- Fila multi-arquivo material com remoção/reordenação (RF002)
- Persistir modo Individual/Dupla em store zustand (RF003)
- Validação 1:2 alunos no contador (RF004)
- Consolidar QuestionCountPage com GenerateQuestionsPage
- Drag-drop reorder de perguntas (RF006)
- Validação soma pesos power-ups (RF007)
- Tela dedicada Tempo de Resposta — separar de Inventory (RF010)
- Tela Carregar Sessão (RF011)
- Botão Salvar Sessão na hub (RF011)

### Fluxo da Rodada (épico MA-44)
- Tela Sorteio Inquisitor/Vítima com animação (RF012)
- Tela Grid de Perguntas numerado (RF013)
- Componente Timer regressivo reusável (RF015)
- Botões Pause/Retomar timer (RF016)
- Botões Acertou/Errou na rodada ativa (RF017)
- HUD pontuação live (RF018)
- Animação sorteio power-up ao acertar (RF019)
- Modal Ativar Power-Up — selecionar aluno alvo (RF020)
- Tela/fluxo Repasse de Pergunta (RF021)
- Tela Revelar Resposta Correta (RF023)

### Power-ups (épico MA-45)
- Animação Inverter Inquisitor↔Vítima (RF024)
- Modal Pular Vez (RF025)
- Modal Resposta em Dupla (RF026)
- Botão +30s + animação no Timer (RF027)
- Modal Roubar Ponto (RF028)

### Encerramento (épico MA-46)
- Tela Ranking Final dedicada (RF029)
- Botão Finalizar Revisão + dispatch salvar (RF030)
- Tela Dashboard Métricas (RF031)
- Componentes de gráfico (recharts ou similar) (RF031)

### Modo Dupla (épico MA-47)
- Adaptar fluxo da rodada para duplas (RF003 variante)

### Infra Front (épico MA-48)
- Migrar roteamento `useState` em App.jsx → react-router-dom v7
- Configurar QueryClientProvider + axios instance
- Criar estrutura `features/` por domínio
- Refatorar inline styles → Tailwind classes
- Auditoria responsividade projetor + monitor + tablet (RNF004)
- Tela Login (já em andamento — MA-12)
- Guard de rotas autenticadas (RNF005)
- Setup Vitest + React Testing Library

### Estilização Balatro (NOVO — não criado ainda)
Cada item abaixo é candidato a story nova quando for executar:
- Design tokens Balatro em [src/index.css](src/index.css)
- Adicionar pixel font (Press Start 2P ou m6x11)
- Componente `<CRTFrame>` (scanlines + vignette + curvatura)
- Componente `<BalatroBackground>` (shader animado)
- Componente `<BalatroCard>` (hover/select/foil)
- Componente `<ScoreCounter>` (rolling digits + shake)
- Componente `<JokerSlot>` (slots de power-up)
- Reestilizar HomePage com tema Balatro
- Reestilizar CreateMatchPage com tema Balatro
- Reestilizar RoundQuestionPage com tema Balatro
- (... uma por tela conforme priorizar)

## Bugs já corrigidos (não relistar)

- ✅ [CreateMatchPage.jsx](src/components/CreateMatchPage.jsx) — `Sparkles` duplicado removido (build agora passa)

## Dívida técnica conhecida (não duplicar tasks)

Lista completa em [CLAUDE.md](CLAUDE.md) seção "Pontos abertos / dívida técnica conhecida". Reproduzido aqui para referência rápida:

- Roteamento manual em [App.jsx](src/App.jsx)
- Sem `QueryClientProvider`
- Sem instância axios
- Sem testes
- Diretório `@/hooks` referenciado mas inexistente
- Inline styles excessivos
- Apenas `button.jsx` em components/ui

## Agentes Claude Code disponíveis

Em [.claude/agents/](.claude/agents/):

- **architect** — decisões arquiteturais (não escreve código)
- **code-reviewer** — revisão de diff
- **debugger** — diagnóstico de causa raiz
- **refactor-specialist** — refatoração sem mudar comportamento
- **react-specialist** — implementação de features

## Como usar este arquivo

1. Antes de criar nova task no Jira, busca aqui se já existe ou se está em "ainda não criadas".
2. Quando concluir uma task pendente, move da seção "ainda não existem" para a seção de Stories já criadas (e cria/atualiza no Jira).
3. Atualiza a data no topo a cada mudança grande.
