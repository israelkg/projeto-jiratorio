import { useState, useRef, useCallback } from "react";
import {
  CloudUpload, Home, UserCircle2, ChevronLeft,
  FileText, FileSpreadsheet, Presentation, Check, X, Save,
} from "lucide-react";

const ACCEPTED = [".pdf", ".pptx", ".txt", ".csv", ".docx"];

const FILE_ICONS = {
  pdf:  { icon: <FileText size={28} />,         color: "#ef4444", label: "PDF"  },
  pptx: { icon: <Presentation size={28} />,     color: "#f97316", label: "PPTX" },
  txt:  { icon: <FileText size={28} />,         color: "#94a3b8", label: "TXT"  },
  csv:  { icon: <FileSpreadsheet size={28} />,  color: "#22c55e", label: "CSV"  },
  docx: { icon: <FileText size={28} />,         color: "#3b82f6", label: "DOCX" },
};

function getExt(name) {
  return name.split(".").pop().toLowerCase();
}

export default function ImportMaterialPage({ onHome, onBack }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles]       = useState([]);
  const [error, setError]       = useState("");
  const [saved, setSaved]       = useState(false);
  const inputRef = useRef(null);

  const addFiles = (incoming) => {
    setSaved(false);
    const valid   = [];
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
    e.preventDefault(); setDragging(false);
    addFiles(e.dataTransfer.files);
  }, []);

  const remove = (name) => { setSaved(false); setFiles((f) => f.filter((x) => x.name !== name)); };
  const handleSave = () => setSaved(true);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "#1a1a2e" }}>

      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #0ea5e9, transparent)", animationDelay: "2s" }} />
      </div>
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
          </div>
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={e => e.currentTarget.style.color = "#c084fc"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
              <ChevronLeft size={14} /> Voltar
            </button>
          )}
        </div>
        <div className="flex items-center gap-6">
          <button onClick={onHome} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#c084fc"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}>
            <Home size={14} /> Home
          </button>
          <button style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#c084fc"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
            <UserCircle2 size={28} />
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-6">

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-4xl font-black tracking-tight uppercase"
            style={{ background: "linear-gradient(135deg, #f8fafc 0%, #c084fc 55%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Importar Material
          </h1>
          <p className="text-xs font-semibold tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            (PDF, PPTX, TXT, CSV…)
          </p>
          <div className="w-24 h-0.5 mx-auto rounded-full mt-2" style={{ background: "linear-gradient(90deg, #7c3aed, #818cf8)" }} />
        </div>

        {/* Drop zone */}
        <div
          className="w-full max-w-lg rounded-2xl transition-all duration-300 cursor-pointer"
          style={{
            background: dragging ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.04)",
            border: dragging ? "2px dashed #a855f7" : files.length ? "2px dashed rgba(124,58,237,0.4)" : "2px dashed rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
            boxShadow: dragging ? "0 0 40px rgba(168,85,247,0.2)" : "0 20px 50px rgba(0,0,0,0.4)",
          }}
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center gap-4 p-10">
            {/* Upload icon */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: dragging ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.06)",
                border: dragging ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(255,255,255,0.1)",
              }}>
              <CloudUpload size={36} strokeWidth={1.5}
                style={{ color: dragging ? "#c084fc" : "rgba(255,255,255,0.5)", transition: "color 0.3s" }} />
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
                Arrastar e Soltar
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>ou</p>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "white", boxShadow: "0 8px 24px rgba(124,58,237,0.35)" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.35)"; }}>
              Selecionar Arquivo
            </button>

            {/* Format tags */}
            <div className="flex items-center gap-2 flex-wrap justify-center" onClick={e => e.stopPropagation()}>
              {["PDF","PPTX","TXT","CSV","DOCX"].map(f => (
                <span key={f} className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md uppercase"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <input ref={inputRef} type="file" multiple accept={ACCEPTED.join(",")} className="hidden"
          onChange={e => { addFiles(e.target.files); e.target.value = ""; }} />

        {/* Error */}
        {error && <p className="text-xs font-semibold" style={{ color: "#f87171" }}>{error}</p>}

        {/* File list */}
        {files.length > 0 && (
          <div className="w-full max-w-lg flex flex-col gap-2" onClick={e => e.stopPropagation()}>
            {files.map(f => {
              const ext = getExt(f.name);
              const meta = FILE_ICONS[ext] || FILE_ICONS.txt;
              return (
                <div key={f.name} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ color: meta.color }}>{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: "rgba(255,255,255,0.8)" }}>{f.name}</p>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {meta.label} · {(f.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button onClick={() => remove(f.name)} className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent"; }}>
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Salvar */}
        <button
          disabled={!files.length}
          onClick={handleSave}
          className="px-16 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-3"
          style={{
            background: saved ? "linear-gradient(135deg, #059669, #0d9488)" : files.length ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "rgba(255,255,255,0.08)",
            color: files.length ? "white" : "rgba(255,255,255,0.25)",
            boxShadow: saved ? "0 12px 32px rgba(5,150,105,0.4)" : files.length ? "0 12px 32px rgba(124,58,237,0.4)" : "none",
            cursor: files.length ? "pointer" : "not-allowed",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onMouseEnter={e => { if (files.length && !saved) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(124,58,237,0.55)"; } }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = saved ? "0 12px 32px rgba(5,150,105,0.4)" : files.length ? "0 12px 32px rgba(124,58,237,0.4)" : "none"; }}>
          {saved ? <><Check size={18} /> Material Salvo!</> : <><Save size={18} /> Salvar</>}
        </button>
      </main>
    </div>
  );
}
