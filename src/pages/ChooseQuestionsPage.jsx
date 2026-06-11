import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, Check, Loader2, AlertTriangle,
  LayoutList, CheckSquare, Square, Spade, Heart, Diamond, Club,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { QuestionItem } from "@/features/questions/components/QuestionItem";
import { listQuestions, updateQuestion } from "@/features/questions/api";
import { getSessionQuestions, setSessionQuestions } from "@/features/sessions/api";
import { useActiveSessionStore } from "@/features/sessions/store/activeSessionStore";
import { cn } from "@/lib/utils";

const SUIT_CYCLE = [
  { Icon: Spade,   color: "#f5f5f0" },
  { Icon: Heart,   color: "#fe5f55" },
  { Icon: Diamond, color: "#f0c040" },
  { Icon: Club,    color: "#50c878" },
];
const RANKS = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

function decorate(q, idx) {
  return { ...q, suit: SUIT_CYCLE[idx % SUIT_CYCLE.length], rank: RANKS[idx % RANKS.length] };
}

export default function ChooseQuestionsPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const sessionId = useActiveSessionStore((s) => s.sessionId);

  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const pool = await listQuestions();
        setQuestions(pool.map(decorate));
        if (sessionId) {
          const assigned = await getSessionQuestions(sessionId);
          setSelected(new Set(assigned.map((q) => q.id)));
        } else {
          setSelected(new Set(pool.map((q) => q.id)));
        }
      } catch (err) {
        setError(err.message ?? "Falha ao carregar perguntas");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sessionId]);

  const toggleSelect = (id) => {
    setSaved(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(questions.map((q) => q.id)));
  const deselectAll = () => setSelected(new Set());

  const startEdit = (q) => { setEditingId(q.id); setEditText(q.text); };

  const saveEdit = async () => {
    try {
      const updated = await updateQuestion(editingId, { text: editText });
      setQuestions((qs) => qs.map((q) => (q.id === editingId ? { ...q, text: updated.text } : q)));
      setEditingId(null);
    } catch (err) {
      setError(err.message ?? "Falha ao editar");
    }
  };

  const handleConfirm = async () => {
    if (!sessionId) {
      setError("Nenhuma sessão ativa. Carregue uma sessão na Home para salvar a seleção.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      // Preserva a ordem da lista exibida.
      const ids = questions.filter((q) => selected.has(q.id)).map((q) => q.id);
      await setSessionQuestions(sessionId, ids);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message ?? "Falha ao salvar seleção");
    } finally {
      setSaving(false);
    }
  };

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      <nav className="relative z-10 flex items-center justify-between px-8 py-4 border-b-2 border-balatro-card-edge bg-black/40 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-red" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-gold" />
            <span className="w-2.5 h-2.5 rounded-full bg-balatro-green" />
          </div>
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Hand Selection
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-2">
            <Home size={14} /> Home
          </button>
          <button className="text-balatro-text-dim hover:text-balatro-purple transition-colors">
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
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-purple text-glow-purple uppercase flex items-center justify-center gap-2">
            <LayoutList size={14} /> Hand Selection <LayoutList size={14} />
          </p>
          <h1 className="font-pixel text-2xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            ESCOLHER PERGUNTAS
          </h1>
        </Motion.div>

        {error && (
          <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase flex items-center gap-2">
            <AlertTriangle size={14} /> {error}
          </p>
        )}

        {loading ? (
          <p className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase flex items-center gap-2">
            <Loader2 size={12} className="animate-spin" /> Carregando...
          </p>
        ) : questions.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <p className="font-pixel text-[11px] tracking-[0.2em] text-balatro-text-dim uppercase text-center">
              Nenhuma pergunta criada ainda.
            </p>
            <button onClick={() => navigate("/generate")} className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-purple hover:underline">
              ◄ Gerar perguntas
            </button>
          </div>
        ) : (
          <>
            <Motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full max-w-5xl flex items-center justify-between gap-4 rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md px-5 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text-dim">
                  Selecionadas:
                </div>
                <span className="font-pixel text-base text-balatro-gold text-glow-gold tabular-nums">
                  {selected.size}/{questions.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ToolbarButton onClick={selectAll}>
                  <CheckSquare size={12} /> Todas
                </ToolbarButton>
                <ToolbarButton onClick={deselectAll}>
                  <Square size={12} /> Nenhuma
                </ToolbarButton>
              </div>
            </Motion.div>

            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {questions.map((q, i) => (
                <QuestionItem
                  key={q.id}
                  question={q}
                  index={i}
                  suitConfig={q.suit}
                  isSelected={selected.has(q.id)}
                  isEditing={editingId === q.id}
                  editText={editText}
                  onToggle={toggleSelect}
                  onStartEdit={startEdit}
                  onSaveEdit={saveEdit}
                  onCancelEdit={() => setEditingId(null)}
                  onChangeEditText={setEditText}
                />
              ))}
            </div>

            <Motion.button
              onClick={handleConfirm}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ y: 2, scale: 0.98 }}
              disabled={selected.size === 0 || saving}
              className={cn(
                "px-12 py-4 rounded-2xl font-pixel text-sm tracking-[0.25em] uppercase border-b-4 flex items-center gap-3",
                saved
                  ? "bg-balatro-green text-white border-green-900"
                  : selected.size === 0 || saving
                    ? "bg-balatro-card-edge text-balatro-text-dim border-black cursor-not-allowed opacity-50"
                    : "bg-balatro-purple text-white border-purple-950 hover:shadow-[0_0_32px_rgba(155,89,182,0.6)]",
              )}
            >
              {saving ? <><Loader2 size={18} className="animate-spin" /> Salvando...</>
                : saved ? <><Check size={18} /> Salvo!</>
                : <><Check size={18} /> Confirmar Seleção</>}
            </Motion.button>
          </>
        )}
      </main>
    </CRTFrame>
  );
}

function ToolbarButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-balatro-bg-deep border border-balatro-card-edge text-balatro-text-dim hover:text-balatro-text hover:border-balatro-purple font-pixel text-[9px] tracking-[0.2em] uppercase transition-colors"
    >
      {children}
    </button>
  );
}
