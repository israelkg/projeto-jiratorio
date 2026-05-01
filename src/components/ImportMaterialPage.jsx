import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  CloudUpload, Home, UserCircle2, ChevronLeft,
  FileText, FileSpreadsheet, Presentation, Check, X, Save, Sparkles,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { cn } from "@/lib/utils";

const ACCEPTED = [".pdf", ".pptx", ".txt", ".csv", ".docx"];

const FILE_ICONS = {
  pdf:  { Icon: FileText,        color: "#fe5f55", label: "PDF" },
  pptx: { Icon: Presentation,    color: "#f0c040", label: "PPTX" },
  txt:  { Icon: FileText,        color: "#cbd5e1", label: "TXT" },
  csv:  { Icon: FileSpreadsheet, color: "#50c878", label: "CSV" },
  docx: { Icon: FileText,        color: "#009dff", label: "DOCX" },
};

function getExt(name) {
  return name.split(".").pop().toLowerCase();
}

export default function ImportMaterialPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (incoming) => {
    setSaved(false);
    const valid = [];
    const invalid = [];
    Array.from(incoming).forEach((f) => {
      const ext = "." + getExt(f.name);
      if (ACCEPTED.includes(ext)) valid.push(f);
      else invalid.push(f.name);
    });
    if (invalid.length) setError(`Formato não suportado: ${invalid.join(", ")}`);
    else setError("");
    setFiles((prev) => {
      const names = prev.map((f) => f.name);
      return [...prev, ...valid.filter((f) => !names.includes(f.name))];
    });
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const remove = (name) => { setSaved(false); setFiles((f) => f.filter((x) => x.name !== name)); };
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

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
            ◆ {files.length} arquivos · Aceita: {ACCEPTED.join(" / ")} ◆
          </p>
        </Motion.div>

        {/* Drop zone */}
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

        {/* Files list */}
        {files.length > 0 && (
          <div className="w-full max-w-2xl flex flex-col gap-2">
            {files.map((f, i) => {
              const cfg = FILE_ICONS[getExt(f.name)] ?? FILE_ICONS.txt;
              const FIcon = cfg.Icon;
              return (
                <Motion.div
                  key={f.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border-2 border-balatro-card-edge bg-balatro-card/80 backdrop-blur-md p-3 flex items-center gap-3"
                  style={{ boxShadow: "0 6px 0 #000, 0 12px 20px rgba(0,0,0,0.5)" }}
                >
                  <div
                    className="w-12 h-12 rounded-lg border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: cfg.color, color: cfg.color, background: `${cfg.color}15` }}
                  >
                    <FIcon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-pixel text-[8px] tracking-[0.2em] uppercase px-1.5 py-0.5 rounded mr-2"
                      style={{ color: cfg.color, background: `${cfg.color}20` }}
                    >
                      {cfg.label}
                    </span>
                    <span className="text-sm text-balatro-text font-mono truncate">{f.name}</span>
                    <p className="text-[10px] text-balatro-text-dim mt-0.5">{(f.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(f.name)}
                    aria-label="Remover arquivo"
                    className="w-8 h-8 rounded-lg border-2 border-balatro-card-edge text-balatro-text-dim hover:border-balatro-red hover:text-balatro-red transition-colors flex items-center justify-center"
                  >
                    <X size={14} />
                  </button>
                </Motion.div>
              );
            })}
          </div>
        )}

        <BalatroButton
          onClick={handleSave}
          disabled={files.length === 0}
          variant={saved ? "green" : "purple"}
        >
          {saved ? <><Check size={18} /> Salvo!</> : <><Save size={18} /> Salvar Material</>}
        </BalatroButton>
      </main>
    </CRTFrame>
  );
}
