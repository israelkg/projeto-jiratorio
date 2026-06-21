/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";

const HomePage             = lazy(() => import("@/pages/HomePage"));
const LoginPage            = lazy(() => import("@/pages/LoginPage"));
const RegisterPage         = lazy(() => import("@/pages/RegisterPage"));
const StudentPlayPage      = lazy(() => import("@/pages/StudentPlayPage"));
const CreateMatchPage      = lazy(() => import("@/pages/CreateMatchPage"));
const ImportPage           = lazy(() => import("@/pages/ImportPage"));
const ImportMaterialPage   = lazy(() => import("@/pages/ImportMaterialPage"));
const ImportSetupPage      = lazy(() => import("@/pages/ImportSetupPage"));
const GenerateQuestionsPage = lazy(() => import("@/pages/GenerateQuestionsPage"));
const ListQuestionsPage    = lazy(() => import("@/pages/ListQuestionsPage"));
const EditQuestionPage     = lazy(() => import("@/pages/EditQuestionPage"));
const ChooseQuestionsPage  = lazy(() => import("@/pages/ChooseQuestionsPage"));
const QuestionCountPage    = lazy(() => import("@/pages/QuestionCountPage"));
const LoadingPage          = lazy(() => import("@/pages/LoadingPage"));
const PowerUpsPage         = lazy(() => import("@/pages/PowerUpsPage"));
const PowerUpsExplainPage  = lazy(() => import("@/pages/PowerUpsExplainPage"));
const SelectPowerUpsPage   = lazy(() => import("@/pages/SelectPowerUpsPage"));
const InventoryPage        = lazy(() => import("@/pages/InventoryPage"));
const RoundQuestionPage    = lazy(() => import("@/pages/RoundQuestionPage"));
const RoundFinishedPage    = lazy(() => import("@/pages/RoundFinishedPage"));
const RoundResultPage      = lazy(() => import("@/pages/RoundResultPage"));
const DuoModePage          = lazy(() => import("@/pages/DuoModePage"));
const SortDrawPage         = lazy(() => import("@/pages/SortDrawPage"));
const QuestionGridPage     = lazy(() => import("@/pages/QuestionGridPage"));
const PassQuestionPage     = lazy(() => import("@/pages/PassQuestionPage"));
const LoadSessionPage      = lazy(() => import("@/pages/LoadSessionPage"));
const DashboardPage        = lazy(() => import("@/pages/DashboardPage"));
const SettingsPage         = lazy(() => import("@/pages/SettingsPage"));

export const PUBLIC_ROUTES = [
  { path: "/login",    label: "Login",     element: LoginPage },
  { path: "/register", label: "Registrar", element: RegisterPage },
  { path: "/aluno",    label: "Aluno",     element: StudentPlayPage },
];

export const PROTECTED_ROUTES = [
  { path: "/",                  label: "Home",                element: HomePage },
  { path: "/create",            label: "Criar Partida",       element: CreateMatchPage },
  { path: "/import-setup",      label: "Importar Material e Alunos", element: ImportSetupPage },
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

export const ROUTES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES];

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      ...PUBLIC_ROUTES.map((r) => ({ path: r.path, Component: r.element })),
      {
        Component: ProtectedRoute,
        children: PROTECTED_ROUTES.map((r) => ({
          path: r.path,
          Component: r.element,
        })),
      },
    ],
  },
]);
