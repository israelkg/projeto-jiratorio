import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "motion/react";
import {
  CloudUpload, Home, UserCircle2, CheckCircle2, FileText, X, ChevronLeft, Users,
} from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { cn } from "@/lib/utils";

export default function ImportPage() {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  const onBack = () => navigate(-1);

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    if (!f.name.endsWith(".csv")) {
      setError("Apenas arquivos .csv são aceitos.");
      setFile(null);
      return;
    }
    setError("");
    setFile(f);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const removeFile = () => { setFile(null); setError(""); };

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
          Deck Import
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

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 gap-6">
        <Motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className="text-center space-y-2"
        >
          <p className="font-pixel text-[10px] tracking-[0.4em] uppercase flex items-center justify-center gap-2 text-balatro-green"
             style={{ textShadow: "0 0 12px rgba(80,200,120,0.6)" }}>
            <Users size={14} /> Deck Import <Users size={14} />
          </p>
          <h1 className="font-pixel text-3xl md:text-4xl text-balatro-text leading-tight"
              style={{ filter: "drop-shadow(0 0 14px rgba(80,200,120,0.5))" }}>
            IMPORTAR ALUNOS
          </h1>
          <p className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">
            Upload de arquivo .csv com lista de alunos
          </p>
        </Motion.div>

        {/* Drop zone */}
        <Motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => !file && inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={cn(
            "w-full max-w-xl rounded-2xl border-4 border-dashed bg-balatro-card/60 backdrop-blur-md p-10 flex flex-col items-center gap-4 transition-all",
            dragging ? "border-balatro-green scale-105" : file ? "border-balatro-green border-solid" : "border-balatro-card-edge cursor-pointer hover:border-balatro-green/60",
          )}
          style={{ boxShadow: file ? "0 12px 0 #000, 0 18px 32px rgba(80,200,120,0.3)" : "0 8px 0 #000, 0 14px 24px rgba(0,0,0,0.5)" }}
        >
          {file ? (
            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3 w-full"
            >
              <div className="w-16 h-16 rounded-xl border-4 border-balatro-green bg-balatro-green/15 flex items-center justify-center text-balatro-green">
                <CheckCircle2 size={32} />
              </div>
              <p className="font-pixel text-[10px] tracking-[0.2em] uppercase text-balatro-green" style={{ textShadow: "0 0 12px rgba(80,200,120,0.6)" }}>Arquivo Pronto</p>
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg border-2 border-balatro-card-edge bg-balatro-bg-deep">
                <FileText size={18} className="text-balatro-green" />
                <span className="text-sm text-balatro-text font-mono">{file.name}</span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeFile(); }}
                  aria-label="Remover arquivo"
                  className="text-balatro-text-dim hover:text-balatro-red transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-[11px] text-balatro-text-dim">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </Motion.div>
          ) : (
            <>
              <Motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-balatro-green will-change-transform"
              >
                <CloudUpload size={56} strokeWidth={2} />
              </Motion.div>
              <p className="font-pixel text-sm tracking-[0.2em] uppercase text-balatro-text">
                Arraste o .csv aqui
              </p>
              <p className="font-pixel text-[9px] tracking-[0.3em] uppercase text-balatro-text-dim">
                ou clique para selecionar
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </Motion.div>

        {error && (
          <Motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="rounded-lg border-2 border-balatro-red bg-balatro-red/15 px-4 py-2 flex items-center gap-2"
          >
            <X size={14} className="text-balatro-red" />
            <span className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase">
              {error}
            </span>
          </Motion.div>
        )}

        <Motion.button
          onClick={onBack}
          disabled={!file}
          whileHover={file && { y: -3, scale: 1.03 }}
          whileTap={file && { y: 2, scale: 0.98 }}
          className={cn(
            "px-12 py-4 rounded-2xl font-pixel text-sm tracking-[0.25em] uppercase border-b-4 flex items-center gap-3",
            file
              ? "bg-balatro-green text-white border-green-900"
              : "bg-balatro-card-edge text-balatro-text-dim border-black opacity-50 cursor-not-allowed",
          )}
        >
          <CheckCircle2 size={18} /> Confirmar Importação
        </Motion.button>
      </main>
    </CRTFrame>
  );
}
