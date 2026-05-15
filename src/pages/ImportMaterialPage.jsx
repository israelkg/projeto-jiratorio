import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  CloudUpload, Home, UserCircle2, ChevronLeft,
  FileText, FileSpreadsheet, Presentation, Check, X, Save, Sparkles, Loader2,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { uploadMaterial } from "@/features/materials/api";
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
  pending:    "#cbd5e1",
  uploading:  "#009dff",
  processing: "#f0c040",
  ready:      "#50c878",
  failed:     "#fe5f55",
};

function getExt(name) {
  return name.split(".").pop().toLowerCase();
}

export default function ImportMaterialPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [dragging, setDragging] = useState(false);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const addFiles = (incoming) => {
    const valid = [];
    const invalid = [];
    Array.from(incoming).forEach((f) => {
      const ext = "." + getExt(f.name);
      if (ACCEPTED.includes(ext)) valid.push(f);
      else invalid.push(f.name);
    });
    setError(invalid.length ? `Formato não suportado: ${invalid.join(", ")}` : "");

    setEntries((prev) => {
      const names = prev.map((e) => e.file.name);
      const fresh = valid
        .filter((f) => !names.includes(f.name))
        .map((file) => ({ file, status: "pending", id: null, error: null }));
      return [...prev, ...fresh];
    });
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const remove = (name) => {
    setEntries((es) => es.filter((e) => e.file.name !== name));
  };

  const setEntryState = (name, patch) => {
    setEntries((es) => es.map((e) => (e.file.name === name ? { ...e, ...patch } : e)));
  };

  const handleUploadAll = async () => {
    const pending = entries.filter((e) => e.status === "pending" || e.status === "failed");
    for (const entry of pending) {
      setEntryState(entry.file.name, { status: "uploading", error: null });
      try {
        const result = await uploadMaterial(entry.file);
        setEntryState(entry.file.name, {
          status: result.status,
          id: result.id,
          error: result.parse_error,
        });
      } catch (err) {
        setEntryState(entry.file.name, {
          status: "failed",
          error: err.message ?? "Falha no upload",
        });
      }
    }
  };

  const pendingCount = entries.filter((e) => e.status === "pending" || e.status === "failed").length;
  const allReady = entries.length > 0 && entries.every((e) => e.status === "ready");
  const uploading = entries.some((e) => e.status === "uploading");

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
          Spell Components
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
            <Sparkles size={14} /> Spell Components <Sparkles size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(155,89,182,0.5))" }}>
            IMPORTAR MATERIAL
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            ◆ {entries.length} arquivos · Aceita: {ACCEPTED.join(" / ")} ◆
          </p>
        </Motion.div>

        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={cn(
            "w-full max-w-2xl rounded-2xl border-4 border-dashed bg-balatro-card/60 backdrop-blur-md p-8 flex flex-col items-center gap-3 cursor-pointer transition-all",
            dragging ? "border-balatro-purple scale-[1.02]" : "border-balatro-card-edge hover:border-balatro-purple/60",
          )}
          style={{ boxShadow: "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
        >
          <Motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-balatro-purple will-change-transform"
          >
            <CloudUpload size={48} strokeWidth={2} />
          </Motion.div>
          <p className="font-pixel text-sm tracking-[0.2em] uppercase text-balatro-text">
            Arraste arquivos aqui
          </p>
          <p className="font-pixel text-[9px] tracking-[0.3em] uppercase text-balatro-text-dim">
            ou clique para selecionar
          </p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={ACCEPTED.join(",")}
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </Motion.div>

        {error && (
          <Motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-lg border-2 border-balatro-red bg-balatro-red/15 px-4 py-2 flex items-center gap-2"
          >
            <X size={14} className="text-balatro-red" />
            <span className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase">{error}</span>
          </Motion.div>
        )}

        {entries.length > 0 && (
          <div className="w-full max-w-2xl flex flex-col gap-2">
            {entries.map((entry, i) => {
              const cfg = FILE_ICONS[getExt(entry.file.name)] ?? FILE_ICONS.txt;
              const FIcon = cfg.Icon;
              const statusColor = STATUS_COLOR[entry.status] ?? STATUS_COLOR.pending;
              return (
                <Motion.div
                  key={entry.file.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-3 flex items-center gap-3"
                  style={{ boxShadow: "0 6px 0 #000, 0 12px 20px rgba(0,0,0,0.5)" }}
                >
                  <div
                    className="w-12 h-12 rounded-lg border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: cfg.color, color: cfg.color, background: `${cfg.color}15` }}
                  >
                    <FIcon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="font-pixel text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded"
                        style={{ color: cfg.color, background: `${cfg.color}20` }}
                      >
                        {cfg.label}
                      </span>
                      <span
                        className="font-pixel text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded flex items-center gap-1"
                        style={{ color: statusColor, background: `${statusColor}20` }}
                      >
                        {entry.status === "uploading" && <Loader2 size={10} className="animate-spin" />}
                        {entry.status}
                      </span>
                      <span className="text-sm text-balatro-text font-mono truncate">{entry.file.name}</span>
                    </div>
                    <p className="text-[10px] text-balatro-text-dim mt-0.5">
                      {(entry.file.size / 1024).toFixed(1)} KB
                      {entry.error && <span className="text-balatro-red ml-2">· {entry.error}</span>}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(entry.file.name)}
                    disabled={entry.status === "uploading"}
                    aria-label="Remover arquivo"
                    className="w-8 h-8 rounded-lg border-2 border-balatro-card-edge text-balatro-text-dim hover:border-balatro-red hover:text-balatro-red transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <X size={14} />
                  </button>
                </Motion.div>
              );
            })}
          </div>
        )}

        <BalatroButton
          onClick={handleUploadAll}
          disabled={entries.length === 0 || pendingCount === 0 || uploading}
          variant={allReady ? "green" : "purple"}
        >
          {uploading ? (
            <><Loader2 size={18} className="animate-spin" /> Enviando...</>
          ) : allReady ? (
            <><Check size={18} /> Todos prontos!</>
          ) : (
            <><Save size={18} /> Enviar Material ({pendingCount})</>
          )}
        </BalatroButton>
      </main>
    </CRTFrame>
  );
}
