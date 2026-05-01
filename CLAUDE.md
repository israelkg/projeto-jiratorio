# CLAUDE.md

Guia para o Claude Code trabalhar neste repositório. Projeto em estágio inicial — a maior parte do código ainda vai ser escrita, então as decisões abaixo são a base que deve ser seguida e expandida.

## Visão geral

**Sistema de Revisão Gamificada** (codinome `projeto-jiratorio`) — aplicação web que transforma material de estudo em rodadas de perguntas com mecânicas de gamificação (power-ups, inventário, modo dupla). Frontend SPA. Backend ainda não definido neste repositório.

## Stack

| Camada | Ferramenta | Versão |
|---|---|---|
| Build | Vite | ^8 |
| UI | React | ^19 |
| Estilo | Tailwind CSS v4 + tw-animate-css | ^4.2 |
| Componentes | shadcn (style `base-nova`, JSX) + @base-ui/react | — |
| Ícones | lucide-react | — |
| Animações | motion (framer-motion successor) | ^12 |
| Roteamento | react-router-dom | ^7 |
| Estado servidor | @tanstack/react-query | ^5 |
| Estado cliente | zustand | ^5 |
| Forms | react-hook-form + @hookform/resolvers + zod | — |
| HTTP | axios | ^1 |
| Lint | ESLint flat config v9 + react-hooks + react-refresh | ^9 |
| Tipos | JSDoc opcional (sem TypeScript) | — |

Path alias: `@/` → `src/` (configurado em [vite.config.js](vite.config.js) e [jsconfig.json](jsconfig.json)).

## Comandos

```bash
npm run dev       # Vite dev server com HMR
npm run build     # build de produção
npm run preview   # serve o build local
npm run lint      # ESLint em todo o projeto
```

Não há script de testes configurado ainda. Se for adicionar, padronize com Vitest + React Testing Library (combina com Vite, mesma stack).

## Estrutura atual

```
src/
├── App.jsx              # roteamento manual via useState (refatorar p/ react-router)
├── main.jsx             # entrypoint, StrictMode
├── index.css            # Tailwind v4 + tokens shadcn
├── App.css
├── assets/              # imagens estáticas
├── components/
│   ├── *Page.jsx        # páginas (todas no mesmo nível — reorganizar)
│   └── ui/              # primitivos shadcn (apenas button.jsx por enquanto)
└── lib/
    └── utils.js         # cn() — clsx + tailwind-merge
```

## Estrutura alvo (a evoluir conforme o projeto cresce)

```
src/
├── app/                 # bootstrap, providers (QueryClient, Router, Theme)
│   ├── providers.jsx
│   └── router.jsx
├── pages/               # rotas de alto nível (1 arquivo por rota)
├── features/            # módulos por domínio (questions, rounds, power-ups, inventory, duo)
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── api/         # chamadas axios + queries
│       ├── store.js     # zustand store local da feature
│       └── schema.js    # zod schemas
├── components/ui/       # shadcn primitives
├── components/          # componentes compartilhados não-shadcn
├── hooks/               # hooks compartilhados
├── lib/                 # utils, axios instance, constants
└── styles/
```

Mover páginas para `pages/` e separar lógica de domínio em `features/` assim que houver chamadas reais à API.

## Convenções

### Componentes

- **JSX, não TSX.** O projeto não usa TypeScript. Use JSDoc quando precisar tipar props complexas.
- **Default export** para páginas; **named export** para componentes reutilizáveis e hooks.
- Componentes em PascalCase, arquivos com o mesmo nome (`HomePage.jsx`).
- Hooks customizados começam com `use` (`useQuestions`, `usePowerUps`).
- Subcomponentes pequenos (ex.: `ActionButton` em `HomePage.jsx`) podem ficar no mesmo arquivo enquanto forem usados só ali. Se forem reusados, extrair.

### Estilização

- **Prefira classes Tailwind a `style={{ ... }}` inline.** Inline só para valores realmente dinâmicos (cores baseadas em props, gradientes calculados). Hoje há muito inline desnecessário — eliminar gradualmente.
- Use `cn()` de [src/lib/utils.js](src/lib/utils.js) para mesclar classes condicionais. Não use template strings com classes.
- Tokens shadcn (cores, raio, sidebar) já estão em [src/index.css](src/index.css). Use as variáveis CSS (`bg-background`, `text-foreground`) em vez de hex codes quando aplicável.
- Hover/focus via Tailwind (`hover:`, `focus-visible:`), não via `onMouseEnter`/`onMouseLeave` mexendo em `style`.

### Estado

- **TanStack Query** para tudo que vem de servidor (perguntas, sessões, materiais). Nunca guardar resposta de API em zustand.
- **zustand** para estado de UI compartilhado entre rotas (sessão atual, configuração da partida, inventário em uso). Um store por feature, não um store global gigante.
- **useState** para estado local de componente.
- **react-hook-form + zod** para todos os formulários. Defina o schema zod em `features/<feature>/schema.js` e reuse para validação cliente + parsing de dados de API.

### Roteamento

- Atualmente o [App.jsx](src/App.jsx) usa `useState` como roteador. **Migrar para `react-router-dom` v7** (já instalado) usando data router (`createBrowserRouter`). Cada `*Page.jsx` vira um `<Route>`. Navegação por `useNavigate`, parâmetros por `useParams`. As props `onHome`, `onBack`, etc. desaparecem.

### HTTP

- Crie uma instância única de axios em `src/lib/api.js` com `baseURL`, interceptors de auth e error. Nunca use `axios` direto nos componentes.
- Combine com TanStack Query: `useQuery({ queryKey: ['questions', filters], queryFn: () => api.get(...) })`.

### Formulários

- Sempre `react-hook-form` + resolver `zodResolver`. Sem state manual de inputs.
- Schemas zod em arquivos próprios (`schema.js`), exportados para uso em formulários e validação de API.

### Imports

- Use o alias `@/` em vez de caminhos relativos profundos (`../../lib/utils` → `@/lib/utils`).
- Imports relativos (`./`, `../`) apenas dentro do mesmo módulo/feature.
- Ordem: libs externas → `@/` internos → relativos → CSS.

### Lint

- `npm run lint` deve passar sem warnings antes de qualquer commit.
- Regra `no-unused-vars` ignora identificadores começando com maiúscula ou `_`. **Não** abuse — remova imports realmente não usados.

## Idioma

UI e textos para o usuário em **português** (já é o padrão das páginas existentes). Código, nomes de variáveis, comentários, mensagens de commit em **inglês**.

## Pontos abertos / dívida técnica conhecida

- [App.jsx](src/App.jsx) usa roteamento manual — migrar para react-router-dom.
- [CreateMatchPage.jsx](src/components/CreateMatchPage.jsx) tem `Sparkles` importado duas vezes (linhas 8 e 14) — erro de sintaxe latente.
- Páginas recebem callbacks (`onHome`, `onBack`, ...) em vez de usar o router.
- Sem `QueryClientProvider` montado — TanStack Query instalado mas não usado.
- Sem instância axios configurada.
- Sem testes.
- Diretório `@/hooks` referenciado em [components.json](components.json) mas não existe.
- Muito inline style em vez de Tailwind utilities.
- Apenas `button.jsx` em `components/ui/` — adicionar mais primitivos shadcn conforme necessário (`npx shadcn@latest add <component>`).

## Quando o Claude trabalhar aqui

- **Antes de criar um arquivo novo**, verifique se há um lugar mais natural seguindo a estrutura alvo acima.
- **Não introduza TypeScript** sem alinhar com o dono do projeto — exigiria conversão completa.
- **Não adicione bibliotecas redundantes** (ex.: outra lib de forms, outro client HTTP, outro state manager). A stack já está definida.
- **Resolva a dívida técnica oportunisticamente**: se você tocar em [App.jsx](src/App.jsx), considere já migrar para react-router. Se tocar em uma página com inline styles pesados, troque para Tailwind no caminho.
- **Use os subagentes** definidos em [.claude/agents/](.claude/agents/) para tarefas especializadas (revisão, debug, arquitetura, refatoração).
