# Projeto Jiratorio — Sistema de Revisão Gamificada

Aplicação web que transforma material de estudo em rodadas de perguntas com mecânicas de gamificação inspiradas no jogo **Balatro** (cartas + power-ups + inventário + modo dupla).

Frontend SPA. Backend ainda não integrado neste repositório.

---

## Stack

| Camada | Ferramenta |
|---|---|
| Build | Vite ^8 |
| UI | React 19 (JSX, sem TypeScript) |
| Estilo | Tailwind CSS v4 + tw-animate-css |
| Componentes | shadcn (style `base-nova`) + @base-ui/react |
| Animações | motion (framer-motion successor) |
| Ícones | lucide-react |
| Roteamento | react-router-dom v7 (data router + lazy + Suspense) |
| Estado servidor | @tanstack/react-query |
| Estado cliente | zustand (com persist) |
| Forms | react-hook-form + zod |
| HTTP | axios |
| Lint | ESLint v9 (flat config) |
| Testes | Vitest + Testing Library |

---

## Comandos

```bash
npm install          # instala dependências
npm run dev          # vite dev server (http://localhost:5173)
npm run build        # build de produção
npm run preview      # serve o build local
npm run lint         # ESLint zero erros
npm test             # rodar testes (vitest run)
npm run test:watch   # vitest em modo watch
npm run test:ui      # vitest UI no browser
```

---

## Estrutura

```
src/
├── app/         # bootstrap (providers, router, Layout, queryClient)
├── pages/       # 24 rotas *Page.jsx (lazy loaded)
├── components/
│   ├── balatro/ # design system Balatro (CRT, cards, buttons, background)
│   ├── dev/     # DevNav (atalhos QA em DEV)
│   └── ui/      # shadcn primitives
├── features/    # módulos por domínio
│   ├── questions/  # components + schema zod
│   ├── round/      # components + store (Timer, ScoreHUD, modais)
│   ├── settings/   # store de qualidade gráfica
│   └── students/   # store + schema zod (CSV import)
├── lib/         # api (axios), random, suits, utils, tests
└── test/        # vitest setup
```

Detalhes de convenções, padrões e dívida técnica em [CLAUDE.md](CLAUDE.md).
Status atual e backlog de tarefas em [PROJECT_STATUS.md](PROJECT_STATUS.md).

---

## Sistema de qualidade gráfica

Configurável em **Opções** ou via DevNav (canto inferior direito em DEV):

- **LOW** — performance máxima, sem efeitos
- **MEDIUM** — balanceado (padrão)
- **ULTRA** — visual completo (SVG goo, blobs animados, scanlines, foil)

Persistido em `localStorage`.

---

## Domínio (Sistema de Revisão Gamificada)

**Fluxo principal:**

1. Professor importa lista de alunos (CSV) e material de estudo (PDF/PPTX/TXT)
2. IA gera perguntas a partir do material
3. Professor revisa, edita e seleciona perguntas
4. Configura power-ups, inventário e timer
5. Inicia rodadas: sorteio Inquisidor/Vítima → escolha pergunta → leitura → resposta
6. Acerto = pontos + sorteio de power-up. Erro = penalidade ou repasse
7. Final: ranking + dashboard de métricas

Mecânicas de gamificação: **inverter pergunta**, **pular vez**, **resposta em dupla**, **roubar ponto**, **+30 segundos**, **dica**, **escudo**, **pontos em dobro**, **trocar questão**.

---

## Desenvolvimento assistido por IA

Este projeto utiliza **Claude Code** como ferramenta de desenvolvimento e refatoração.

- [CLAUDE.md](CLAUDE.md) — guia de arquitetura, convenções e dívida técnica
- [PROJECT_STATUS.md](PROJECT_STATUS.md) — snapshot de tarefas concluídas vs pendentes
- [.claude/agents/](.claude/agents/) — configurações de subagentes especializados (revisão de código, debug, refatoração, arquitetura)
- [jira-balatro-restyle.csv](jira-balatro-restyle.csv) — export de stories Jira da reestilização Balatro

Toda decisão arquitetural, escolha de stack e revisão de implementação foi avaliada e aprovada manualmente. A IA é usada como **par de programação acelerado**, não como substituto da análise crítica.

Histórico de evolução está nos commits, divididos por temas (ondas de refatoração, fixes pós-auditoria, adoção de design system, extração de componentes, etc).

---

## Autoria

- **Front-end:** Israel Gonçalves
- **Back-end / DB:** Luís Otávio + João Lucas Schneider
- **Protótipo:** Brenon Moraes + Eduarda Bertella

Projeto acadêmico — Métodos Ágeis · Sprint 1.
