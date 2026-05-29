import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, Pencil, Trash2, Plus, Check, X, BookOpen, Loader2,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import {
  listQuestions, updateQuestion, deleteQuestion, createQuestion,
} from "@/features/questions/api";

const DIFF = {
  facil:   { color: "#50c878", label: "Fácil" },
  medio:   { color: "#f0c040", label: "Médio" },
  dificil: { color: "#fe5f55", label: "Difícil" },
};

const TYPE_LABEL = {
  multipla:     "Múltipla",
  verdadeiro:   "V/F",
  dissertativa: "Dissertativa",
};

const TYPE_COLOR = {
  multipla:     "#9b59b6",
  verdadeiro:   "#009dff",
  dissertativa: "#50c878",
};

export default function ListQuestionsPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    listQuestions()
      .then(setQuestions)
      .catch((err) => setError(err.message ?? "Falha ao carregar perguntas"))
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (q) => { setEditingId(q.id); setEditText(q.text); };

  const saveEdit = async () => {
    setBusy(true);
    try {
      const updated = await updateQuestion(editingId, { text: editText });
      setQuestions((qs) => qs.map((q) => (q.id === editingId ? updated : q)));
      setEditingId(null);
    } catch (err) {
      setError(err.message ?? "Falha ao salvar");
    } finally {
      setBusy(false);
    }
  };

  const removeQ = async (id) => {
    if (!window.confirm("Excluir pergunta?")) return;
    setBusy(true);
    try {
      await deleteQuestion(id);
      setQuestions((qs) => qs.filter((q) => q.id !== id));
    } catch (err) {
      setError(err.message ?? "Falha ao excluir");
    } finally {
      setBusy(false);
    }
  };

  const addNew = async () => {
    if (!newText.trim()) return;
    setBusy(true);
    try {
      const created = await createQuestion({
        text: newText.trim(),
        question_type: "dissertativa",
        difficulty: "medio",
        answer: "—",
      });
      setQuestions((qs) => [created, ...qs]);
      setNewText("");
      setAdding(false);
    } catch (err) {
      const details = Array.isArray(err.details) ? err.details.join(" · ") : null;
      setError(details ?? err.message ?? "Falha ao criar");
    } finally {
      setBusy(false);
    }
  };

  return (
    <CRTFrame>
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-green transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Question Library
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-green transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-green transition-colors">
            <UserCircle2 size={26} />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center gap-6">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-green uppercase flex items-center justify-center gap-2"
             style={{ textShadow: "0 0 12px rgba(80,200,120,0.6)" }}>
            <BookOpen size={14} /> Question Library <BookOpen size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(80,200,120,0.5))" }}>
            LISTAR PERGUNTAS
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            ◆ {questions.length} perguntas ◆
          </p>
        </Motion.div>

        {error && (
          <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase">✗ {error}</p>
        )}

        {loading ? (
          <p className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase flex items-center gap-2">
            <Loader2 size={12} className="animate-spin" /> Carregando...
          </p>
        ) : (
          <div className="w-full max-w-3xl flex flex-col gap-3">
            {questions.length === 0 && (
              <p className="font-pixel text-[10px] tracking-[0.25em] text-balatro-text-dim uppercase text-center py-6">
                Nenhuma pergunta ainda. Use "Gerar Perguntas" ou crie manualmente.
              </p>
            )}
            {questions.map((q, i) => {
              const isEditing = editingId === q.id;
              const diff = DIFF[q.difficulty] ?? { color: "#cbd5e1", label: q.difficulty };
              const typeColor = TYPE_COLOR[q.type] ?? "#cbd5e1";
              return (
                <Motion.div
                  key={q.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.03 }}
                  className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-4 hover:border-balatro-green/60 transition-colors"
                  style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <span className="font-pixel text-base text-balatro-text">#{q.id}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className="font-pixel text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 rounded"
                          style={{ color: typeColor, background: `${typeColor}20` }}
                        >
                          {TYPE_LABEL[q.type] ?? q.type}
                        </span>
                        <span
                          className="font-pixel text-[8px] tracking-[0.2em] uppercase px-2 py-0.5 rounded"
                          style={{ color: diff.color, background: `${diff.color}20` }}
                        >
                          {diff.label}
                        </span>
                      </div>
                      {isEditing ? (
                        <textarea
                          autoFocus
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full bg-balatro-bg-deep border-2 border-balatro-purple rounded-md p-2 text-sm text-balatro-text resize-none font-mono outline-none"
                          rows={2}
                        />
                      ) : (
                        <p className="text-sm text-balatro-text leading-snug">{q.text}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      {isEditing ? (
                        <>
                          <IconButton onClick={saveEdit} color="#50c878" disabled={busy}><Check size={14} /></IconButton>
                          <IconButton onClick={() => setEditingId(null)} color="#fe5f55" disabled={busy}><X size={14} /></IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => startEdit(q)} color="#009dff" disabled={busy}><Pencil size={14} /></IconButton>
                          <IconButton onClick={() => removeQ(q.id)} color="#fe5f55" disabled={busy}><Trash2 size={14} /></IconButton>
                        </>
                      )}
                    </div>
                  </div>
                </Motion.div>
              );
            })}

            {adding ? (
              <Motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-xl border-2 border-balatro-purple bg-balatro-card/80 p-4"
                style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(155,89,182,0.3)" }}
              >
                <textarea
                  autoFocus
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Digite a pergunta..."
                  className="w-full bg-balatro-bg-deep border-2 border-balatro-purple rounded-md p-2 text-sm text-balatro-text resize-none font-mono outline-none mb-3"
                  rows={2}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => { setAdding(false); setNewText(""); }}
                    disabled={busy}
                    className="px-4 py-2 rounded-md bg-balatro-card-edge text-balatro-text font-pixel text-[9px] tracking-[0.2em] uppercase disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={addNew}
                    disabled={busy}
                    className="px-4 py-2 rounded-md bg-balatro-green text-white font-pixel text-[9px] tracking-[0.2em] uppercase disabled:opacity-50"
                  >
                    {busy ? "Adicionando..." : "Adicionar"}
                  </button>
                </div>
              </Motion.div>
            ) : (
              <Motion.button
                onClick={() => setAdding(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-xl border-2 border-dashed border-balatro-card-edge bg-balatro-card/40 hover:border-balatro-green hover:text-balatro-green text-balatro-text-dim p-4 flex items-center justify-center gap-2 font-pixel text-[10px] tracking-[0.25em] uppercase transition-colors"
              >
                <Plus size={16} /> Nova Pergunta
              </Motion.button>
            )}
          </div>
        )}
      </main>
    </CRTFrame>
  );
}

function IconButton({ children, onClick, color, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-8 h-8 rounded-lg border-2 flex items-center justify-center hover:scale-110 transition-transform disabled:opacity-50"
      style={{ borderColor: color, color }}
    >
      {children}
    </button>
  );
}
