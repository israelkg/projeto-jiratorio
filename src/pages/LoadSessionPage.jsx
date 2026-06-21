import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { Home, UserCircle2, ChevronLeft, FolderOpen, Play, Trash2, Calendar, Loader2, Plus } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { listSessions, deleteSession, getSession } from "@/features/sessions/api";
import { useActiveSessionStore } from "@/features/sessions/store/activeSessionStore";

export default function LoadSessionPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);
  const setActiveSession = useActiveSessionStore((s) => s.setSession);

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const reload = () => {
    setLoading(true);
    setError(null);
    listSessions()
      .then(setSessions)
      .catch((err) => setError(err.message ?? "Falha ao carregar sessões"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, []);

  const handleLoad = async (id) => {
    setBusyId(id);
    setError(null);
    try {
      const detail = await getSession(id);
      setActiveSession({ id: detail.id, name: detail.name, joinCode: detail.join_code, students: detail.students });
      navigate("/create");
    } catch (err) {
      setError(err.message ?? "Falha ao carregar sessão");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Excluir sessão? Esta ação não pode ser desfeita.")) return;
    setBusyId(id);
    try {
      await deleteSession(id);
      setSessions((s) => s.filter((x) => x.id !== id));
    } catch (err) {
      setError(err.message ?? "Falha ao excluir");
    } finally {
      setBusyId(null);
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
          <button onClick={onBack} className="font-pixel text-[10px] tracking-[0.3em] uppercase text-balatro-text-dim hover:text-balatro-purple transition-colors flex items-center gap-1.5">
            <ChevronLeft size={14} /> Voltar
          </button>
        </div>
        <div className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
          Saved Runs
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

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-10 flex flex-col items-center gap-8">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-purple text-glow-purple uppercase flex items-center justify-center gap-2">
            <FolderOpen size={14} /> Saved Runs <FolderOpen size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            CARREGAR SESSÃO
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            ◆ {sessions.length} sessões salvas ◆
          </p>
        </Motion.div>

        <BalatroButton variant="green" size="md" onClick={() => navigate("/import")}>
          <Plus size={16} /> Nova Sessão (importar CSV)
        </BalatroButton>

        {error && (
          <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase">✗ {error}</p>
        )}

        {loading ? (
          <p className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase flex items-center gap-2">
            <Loader2 size={12} className="animate-spin" /> Carregando sessões...
          </p>
        ) : sessions.length === 0 ? (
          <p className="font-pixel text-[12px] tracking-[0.2em] text-balatro-text-dim uppercase py-12 text-center">
            Nenhuma sessão salva ainda.<br />
            <span className="text-[10px]">Crie uma importando uma lista CSV de alunos.</span>
          </p>
        ) : (
          <div className="w-full max-w-3xl flex flex-col gap-3">
            {sessions.map((sess, i) => (
              <Motion.div
                key={sess.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-4 flex items-center gap-4 hover:border-balatro-purple/60 transition-colors"
                style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
              >
                <div className="w-12 h-12 rounded-lg border-2 border-balatro-purple bg-balatro-purple/15 flex items-center justify-center text-balatro-purple shrink-0">
                  <FolderOpen size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-pixel text-[11px] tracking-[0.15em] uppercase text-balatro-text">
                    {sess.name}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-balatro-text-dim font-mono flex-wrap">
                    <span>{sess.students_count} alunos</span>
                    {sess.question_count != null && <><span>·</span><span>{sess.question_count} perguntas</span></>}
                    {sess.current_round != null && <><span>·</span><span>Rodada {sess.current_round}</span></>}
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} /> {new Date(sess.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Motion.button
                    onClick={() => handleLoad(sess.id)}
                    disabled={busyId === sess.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Continuar sessão"
                    className="w-10 h-10 rounded-lg border-2 border-balatro-green text-balatro-green bg-balatro-green/15 flex items-center justify-center hover:shadow-balatro-glow-blue disabled:opacity-50"
                  >
                    {busyId === sess.id ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                  </Motion.button>
                  <Motion.button
                    onClick={() => handleDelete(sess.id)}
                    disabled={busyId === sess.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Excluir sessão"
                    className="w-10 h-10 rounded-lg border-2 border-balatro-red text-balatro-red bg-balatro-red/15 flex items-center justify-center disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                  </Motion.button>
                </div>
              </Motion.div>
            ))}
          </div>
        )}
      </main>
    </CRTFrame>
  );
}
