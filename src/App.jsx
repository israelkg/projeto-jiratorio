import { useState } from "react";
import HomePage from "./components/HomePage";
import ImportPage from "./components/ImportPage";
import CreateMatchPage from "./components/CreateMatchPage";
import GenerateQuestionsPage from "./components/GenerateQuestionsPage";
import ListQuestionsPage from "./components/ListQuestionsPage";
import PowerUpsPage from "./components/PowerUpsPage";
import InventoryPage from "./components/InventoryPage";
import QuestionCountPage from "./components/QuestionCountPage";
import ChooseQuestionsPage from "./components/ChooseQuestionsPage";
import SelectPowerUpsPage from "./components/SelectPowerUpsPage";
import LoadingPage from "./components/LoadingPage";
import EditQuestionPage from "./components/EditQuestionPage";

function App() {
  const [page, setPage] = useState("home");

  const go = (p) => setPage(p);

  if (page === "import")    return <ImportPage            onHome={() => go("home")} onBack={() => go("create")} />;
  if (page === "generate")  return <GenerateQuestionsPage onHome={() => go("home")} onBack={() => go("create")} />;
  if (page === "list")      return <ListQuestionsPage     onHome={() => go("home")} onBack={() => go("create")} />;
  if (page === "powerups")   return <PowerUpsPage          onHome={() => go("home")} onBack={() => go("create")} />;
  if (page === "inventory")     return <InventoryPage          onHome={() => go("home")} onBack={() => go("create")} />;
  if (page === "questioncount") return <QuestionCountPage      onHome={() => go("home")} onBack={() => go("create")} />;
  if (page === "choosequestions")  return <ChooseQuestionsPage   onHome={() => go("home")} onBack={() => go("create")} />;
  if (page === "selectpowerups")   return <SelectPowerUpsPage    onHome={() => go("home")} onBack={() => go("create")} />;
  if (page === "loading")          return <LoadingPage            onHome={() => go("home")} onDone={() => go("generate")} />;
  if (page === "editquestion")     return <EditQuestionPage       onHome={() => go("home")} onBack={() => go("list")} onSave={() => go("list")} onDelete={() => go("list")} />;
  if (page === "create")    return (
    <CreateMatchPage
      onHome={() => go("home")}
      onImport={() => go("import")}
      onGenerate={() => go("generate")}
      onList={() => go("list")}
      onPowerUps={() => go("powerups")}
      onInventory={() => go("inventory")}
      onQuestionCount={() => go("questioncount")}
      onChooseQuestions={() => go("choosequestions")}
      onSelectPowerUps={() => go("selectpowerups")}
    />
  );
  return <HomePage onNewSession={() => go("create")} onLoadSession={() => {}} />;
}

export default App;
