import { useState } from "react";
import HomePage from "./components/HomePage";
import ImportPage from "./components/ImportPage";

function App() {
  const [page, setPage] = useState("home");

  if (page === "import") return <ImportPage onHome={() => setPage("home")} />;
  return <HomePage onImport={() => setPage("import")} />;
}

export default App;
