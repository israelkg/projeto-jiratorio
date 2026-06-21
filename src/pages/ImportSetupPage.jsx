import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  Home, UserCircle2, ChevronLeft, Users, CloudUpload, CheckCircle2, FileText,
  FileSpreadsheet, Presentation, X, Loader2, Check, Trash2, Library, Save,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { createSessionWithCsv } from "@/features/sessions/api";
import { uploadMaterial, listMaterials, deleteMaterial } from "@/features/materials/api";
import { useActiveSessionStore } from "@/features/sessions/store/activeSessionStore";
import { cn } from "@/lib/utils";

const ACCEPTED = [".pdf", ".pptx", ".txt", ".csv", ".docx"];
const FILE_ICONS = {
  pdf:  { Icon: FileText,        color: "#fe5f55", label: "PDF" },
  pptx: { Icon: Presentation,    color: "#f0c040", label: "PPTX" },
  txt:  { Icon: FileText,        color: "#cbd5e1", label: "TXT" },
  csv:  { Icon: FileSpreadsheet, color: "#50c878", label: "CSV" },
  docx: { Icon: FileText,        color: "#009dff", label: "DOCX" },
};
const STATUS_COLOR = {
  pending: "#cbd5e1", uploading: "#009dff", processing: "#f0c040", ready: "#50c878", failed: "#fe5f55",
};
const getExt = (name) => name.split(".").pop().toLowerCase();

export default function ImportSetupPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

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
          Setup da Sessão
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

      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-8 flex flex-col items-center gap-8">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-purple text-glow-purple uppercase">
            ◆ Setup da Sessão ◆
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            IMPORTAR MATERIAL E ALUNOS
          </h1>
        </Motion.div>

        <div className="w-full max-w-3xl flex flex-col gap-8">
          <StudentsSection />
          <MaterialSection />
        </div>
      </main>
    </CRTFrame>
  );
}

/* ---------------- Alunos (CSV → sessão) ---------------- */
function StudentsSection() {
  const setActiveSession = useActiveSessionStore((s) => s.setSession);
  const activeName = useActiveSessionStore((s) => s.sessionName);

  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [doneMsg, setDoneMsg] = useState(null);
  const inputRef = useRef(null);

  const pick = (f) => {
    if (!f) return;
    if (!f.name.endsWith(".csv")) { setError("Apenas .csv para a lista de alunos."); setFile(null); return; }
    setError(""); setFile(f);
  };

  const submit = async () => {
    if (!file) { setError("Selecione o arquivo .csv da turma."); return; }
    if (!name.trim()) { setError("Dê um nome para a sessão."); return; }
    setSubmitting(true); setError("");
    try {
      const result = await createSessionWithCsv({ name: name.trim(), file });
      setActiveSession({ id: result.session.id, name: result.session.name, joinCode: result.session.join_code, students: result.students });
      setDoneMsg(`Sessão "${result.session.name}" criada com ${result.imported_count} alunos. Código da turma: ${result.session.join_code}`);
    } catch (err) {
      const details = Array.isArray(err.details) ? err.details.join(" · ") : null;
      setError(details ?? err.message ?? "Falha ao importar alunos");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border-2 border-balatro-green/50 bg-balatro-card/70 backdrop-blur-md p-6 flex flex-col gap-4"
             style={{ boxShadow: "0 10px 0 #000, 0 16px 28px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center gap-2 border-b-2 border-balatro-card-edge pb-3">
        <Users size={16} className="text-balatro-green" />
        <span className="font-pixel text-[11px] tracking-[0.3em] text-balatro-green uppercase">1 · Importar Alunos</span>
        {activeName && (
          <span className="font-pixel text-[8px] tracking-[0.2em] text-balatro-green uppercase ml-auto">
            ◆ ativa: {activeName}
          </span>
        )}
      </div>

      <label className="flex flex-col gap-1">
        <span className="font-pixel text-[9px] tracking-[0.2em] text-balatro-text-dim uppercase">Nome da Sessão</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Biologia · 9º Ano"
               className="balatro-input" disabled={submitting} />
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          "rounded-xl border-4 border-dashed p-6 flex flex-col items-center gap-2 cursor-pointer transition-all",
          file ? "border-balatro-green bg-balatro-green/10" : "border-balatro-card-edge hover:border-balatro-green/60",
        )}
      >
        {file ? (
          <div className="flex items-center gap-2 text-balatro-green">
            <CheckCircle2 size={20} />
            <span className="text-sm font-mono text-balatro-text">{file.name}</span>
            <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-balatro-text-dim hover:text-balatro-red"><X size={14} /></button>
          </div>
        ) : (
          <>
            <CloudUpload size={32} className="text-balatro-green" />
            <span className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text-dim">Clique para escolher o .csv (nome, ra)</span>
          </>
        )}
        <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
      </div>

      {error && <p className="font-pixel text-[9px] tracking-[0.15em] text-balatro-red uppercase">✗ {error}</p>}
      {doneMsg && <p className="font-pixel text-[9px] tracking-[0.15em] text-balatro-green uppercase">✓ {doneMsg}</p>}

      <BalatroButton onClick={submit} disabled={!file || submitting} variant="green" size="md" className="self-start">
        {submitting ? <><Loader2 size={16} className="animate-spin" /> Importando...</> : <><CheckCircle2 size={16} /> Importar Alunos</>}
      </BalatroButton>
    </section>
  );
}

/* ---------------- Material (arquivos) ---------------- */
function MaterialSection() {
  const [dragging, setDragging] = useState(false);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const inputRef = useRef(null);

  const refreshSaved = useCallback(() => {
    return listMaterials().then(setSaved).catch(() => {}).finally(() => setLoadingSaved(false));
  }, []);
  useEffect(() => { refreshSaved(); }, [refreshSaved]);

  const addFiles = (incoming) => {
    const valid = [], invalid = [];
    Array.from(incoming).forEach((f) => {
      (ACCEPTED.includes("." + getExt(f.name)) ? valid : invalid).push(f);
    });
    setError(invalid.length ? `Formato não suportado: ${invalid.map((f) => f.name).join(", ")}` : "");
    setEntries((prev) => {
      const names = prev.map((e) => e.file.name);
      return [...prev, ...valid.filter((f) => !names.includes(f.name)).map((file) => ({ file, status: "pending", error: null }))];
    });
  };

  const onDrop = useCallback((e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }, []);
  const setEntryState = (n, patch) => setEntries((es) => es.map((e) => (e.file.name === n ? { ...e, ...patch } : e)));

  const uploadAll = async () => {
    const pending = entries.filter((e) => e.status === "pending" || e.status === "failed");
    for (const entry of pending) {
      setEntryState(entry.file.name, { status: "uploading", error: null });
      try {
        const r = await uploadMaterial(entry.file);
        setEntryState(entry.file.name, { status: r.status, error: r.parse_error });
      } catch (err) {
        setEntryState(entry.file.name, { status: "failed", error: err.message ?? "Falha" });
      }
    }
    refreshSaved();
  };

  const removeSaved = async (id) => {
    if (!window.confirm("Excluir este material?")) return;
    try { await deleteMaterial(id); setSaved((l) => l.filter((m) => m.id !== id)); }
    catch (err) { setError(err.message ?? "Falha ao excluir"); }
  };

  const pendingCount = entries.filter((e) => e.status === "pending" || e.status === "failed").length;
  const uploading = entries.some((e) => e.status === "uploading");

  return (
    <section className="rounded-2xl border-2 border-balatro-purple/50 bg-balatro-card/70 backdrop-blur-md p-6 flex flex-col gap-4"
             style={{ boxShadow: "0 10px 0 #000, 0 16px 28px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center gap-2 border-b-2 border-balatro-card-edge pb-3">
        <Library size={16} className="text-balatro-purple" />
        <span className="font-pixel text-[11px] tracking-[0.3em] text-balatro-purple uppercase">2 · Importar Material</span>
        <span className="font-pixel text-[8px] tracking-[0.2em] text-balatro-text-dim uppercase ml-auto">{ACCEPTED.join(" / ")}</span>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        className={cn(
          "rounded-xl border-4 border-dashed p-6 flex flex-col items-center gap-2 cursor-pointer transition-all",
          dragging ? "border-balatro-purple bg-balatro-purple/10 scale-[1.01]" : "border-balatro-card-edge hover:border-balatro-purple/60",
        )}
      >
        <CloudUpload size={32} className="text-balatro-purple" />
        <span className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-text-dim">Arraste ou clique para escolher arquivos</span>
        <input ref={inputRef} type="file" multiple accept={ACCEPTED.join(",")} className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>

      {error && <p className="font-pixel text-[9px] tracking-[0.15em] text-balatro-red uppercase">✗ {error}</p>}

      {entries.length > 0 && (
        <div className="flex flex-col gap-2">
          {entries.map((entry) => {
            const cfg = FILE_ICONS[getExt(entry.file.name)] ?? FILE_ICONS.txt;
            const FIcon = cfg.Icon;
            const sc = STATUS_COLOR[entry.status] ?? STATUS_COLOR.pending;
            return (
              <div key={entry.file.name} className="rounded-lg border-2 border-balatro-card-edge bg-balatro-bg-deep p-2 flex items-center gap-2">
                <div className="w-9 h-9 rounded border-2 flex items-center justify-center shrink-0" style={{ borderColor: cfg.color, color: cfg.color }}>
                  <FIcon size={16} />
                </div>
                <span className="text-xs font-mono text-balatro-text truncate flex-1">{entry.file.name}</span>
                <span className="font-pixel text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded flex items-center gap-1" style={{ color: sc, background: `${sc}20` }}>
                  {entry.status === "uploading" && <Loader2 size={9} className="animate-spin" />}{entry.status}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <BalatroButton onClick={uploadAll} disabled={pendingCount === 0 || uploading} variant="purple" size="md" className="self-start">
        {uploading ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : <><Save size={16} /> Enviar Material ({pendingCount})</>}
      </BalatroButton>

      {/* Já importados */}
      <div className="flex flex-col gap-2 mt-2 border-t-2 border-balatro-card-edge pt-3">
        <span className="font-pixel text-[9px] tracking-[0.2em] text-balatro-text-dim uppercase">Materiais importados: {saved.length}</span>
        {loadingSaved ? (
          <p className="font-pixel text-[9px] text-balatro-text-dim uppercase flex items-center gap-2"><Loader2 size={10} className="animate-spin" /> Carregando...</p>
        ) : saved.length === 0 ? (
          <p className="font-pixel text-[9px] text-balatro-text-dim uppercase">Nenhum ainda.</p>
        ) : saved.map((m) => {
          const cfg = FILE_ICONS[m.kind] ?? FILE_ICONS.txt;
          const MIcon = cfg.Icon;
          const sc = STATUS_COLOR[m.status] ?? STATUS_COLOR.pending;
          return (
            <div key={m.id} className="rounded-lg border-2 border-balatro-card-edge bg-balatro-bg-deep p-2 flex items-center gap-2">
              <div className="w-9 h-9 rounded border-2 flex items-center justify-center shrink-0" style={{ borderColor: cfg.color, color: cfg.color }}>
                <MIcon size={16} />
              </div>
              <span className="text-xs font-mono text-balatro-text truncate flex-1">{m.name}</span>
              <span className="font-pixel text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded" style={{ color: sc, background: `${sc}20` }}>{m.status}</span>
              <button onClick={() => removeSaved(m.id)} className="w-7 h-7 rounded border-2 border-balatro-card-edge text-balatro-text-dim hover:border-balatro-red hover:text-balatro-red flex items-center justify-center">
                <Trash2 size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
