/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";

const HomePage             = lazy(() => import("@/components/HomePage"));
const CreateMatchPage      = lazy(() => import("@/components/CreateMatchPage"));
const ImportPage           = lazy(() => import("@/components/ImportPage"));
const ImportMaterialPage   = lazy(() => import("@/components/ImportMaterialPage"));
const GenerateQuestionsPage = lazy(() => import("@/components/GenerateQuestionsPage"));
const ListQuestionsPage    = lazy(() => import("@/components/ListQuestionsPage"));
const EditQuestionPage     = lazy(() => import("@/components/EditQuestionPage"));
const ChooseQuestionsPage  = lazy(() => import("@/components/ChooseQuestionsPage"));
const QuestionCountPage    = lazy(() => import("@/components/QuestionCountPage"));
const LoadingPage          = lazy(() => import("@/components/LoadingPage"));
const PowerUpsPage         = lazy(() => import("@/components/PowerUpsPage"));
const PowerUpsExplainPage  = lazy(() => import("@/components/PowerUpsExplainPage"));
const SelectPowerUpsPage   = lazy(() => import("@/components/SelectPowerUpsPage"));
const InventoryPage        = lazy(() => import("@/components/InventoryPage"));
const RoundQuestionPage    = lazy(() => import("@/components/RoundQuestionPage"));
const RoundFinishedPage    = lazy(() => import("@/components/RoundFinishedPage"));
const RoundResultPage      = lazy(() => import("@/components/RoundResultPage"));
const DuoModePage          = lazy(() => import("@/components/DuoModePage"));
const SortDrawPage         = lazy(() => import("@/components/SortDrawPage"));
const QuestionGridPage     = lazy(() => import("@/components/QuestionGridPage"));
const PassQuestionPage     = lazy(() => import("@/components/PassQuestionPage"));
const LoadSessionPage      = lazy(() => import("@/components/LoadSessionPage"));
const DashboardPage        = lazy(() => import("@/components/DashboardPage"));
const SettingsPage         = lazy(() => import("@/components/SettingsPage"));

export const ROUTES = [
  { path: "/",                  label: "Home",                element: HomePage },
  { path: "/create",            label: "Criar Partida",       element: CreateMatchPage },
  { path: "/import",            label: "Importar Alunos",     element: ImportPage },
  { path: "/import-material",   label: "Importar Material",   element: ImportMaterialPage },
  { path: "/generate",          label: "Gerar Perguntas",     element: GenerateQuestionsPage },
  { path: "/list",              label: "Listar Perguntas",    element: ListQuestionsPage },
  { path: "/edit-question",     label: "Editar Pergunta",     element: EditQuestionPage },
  { path: "/choose-questions",  label: "Escolher Perguntas",  element: ChooseQuestionsPage },
  { path: "/question-count",    label: "Quantidade Perguntas", element: QuestionCountPage },
  { path: "/loading",           label: "Loading IA",          element: LoadingPage },
  { path: "/powerups",          label: "Power-Ups (%)",       element: PowerUpsPage },
  { path: "/powerups-explain",  label: "Explicação P-Ups",    element: PowerUpsExplainPage },
  { path: "/select-powerups",   label: "Selecionar P-Ups",    element: SelectPowerUpsPage },
  { path: "/inventory",         label: "Inventário",          element: InventoryPage },
  { path: "/round-question",    label: "Round Question",      element: RoundQuestionPage },
  { path: "/round-finished",    label: "Round Finished",      element: RoundFinishedPage },
  { path: "/round-result",      label: "Round Result",        element: RoundResultPage },
  { path: "/duo-mode",          label: "Modo Dupla",          element: DuoModePage },
  { path: "/sort-draw",         label: "Sorteio Papéis",      element: SortDrawPage },
  { path: "/question-grid",     label: "Grid Perguntas",      element: QuestionGridPage },
  { path: "/pass-question",     label: "Repasse",             element: PassQuestionPage },
  { path: "/load-session",      label: "Carregar Sessão",     element: LoadSessionPage },
  { path: "/dashboard",         label: "Dashboard",           element: DashboardPage },
  { path: "/settings",          label: "Opções / Qualidade",  element: SettingsPage },
];

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: ROUTES.map((r) => ({
      path: r.path,
      Component: r.element,
    })),
  },
]);
