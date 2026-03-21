import { useState, useRef, useCallback } from "react";
import { CloudUpload, Home, UserCircle2, CheckCircle2, FileText, X, ChevronLeft } from "lucide-react";

export default function ImportPage({ onHome, onBack }) {
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
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: "#1a1a2e" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full opacity-15 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ background: "radial-gradient(circle, #2563eb, transparent)", animationDelay: "1.5s" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Nav bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-4"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}>
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
          <button
            onClick={onHome}
            className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:opacity-100"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#c084fc"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
          >
            <Home size={14} />
            Home
          </button>
          <button className="transition-all duration-200" style={{ color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={e => e.currentTarget.style.color = "#c084fc"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>
            <UserCircle2 size={28} />
          </button>
        </div>
      </nav>

      {/* Page content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 gap-8">

        {/* Title */}
        <div className="text-center space-y-2">
          <h1
            className="text-4xl font-black tracking-tight uppercase"
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #c084fc 60%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Importar Alunos
          </h1>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#a78bfa" }}>
            Formato CSV
          </p>
        </div>

        {/* Drop zone card */}
        <div
          className="w-full max-w-md rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: dragging
              ? "2px dashed #a855f7"
              : file
              ? "2px dashed #22c55e"
              : "2px dashed rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            boxShadow: dragging
              ? "0 0 40px rgba(168,85,247,0.25)"
              : file
              ? "0 0 40px rgba(34,197,94,0.15)"
              : "0 20px 50px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
          }}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <div className="flex flex-col items-center justify-center gap-4 p-12">

            {file ? (
              /* File selected state */
              <>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}>
                    <FileText size={36} style={{ color: "#4ade80" }} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "#22c55e" }}>
                    <CheckCircle2 size={14} color="white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold" style={{ color: "#4ade80" }}>{file.name}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#f87171"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                >
                  <X size={12} />
                  Remover arquivo
                </button>
              </>
            ) : (
              /* Default upload state */
              <>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: dragging ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.06)",
                    border: dragging ? "1px solid rgba(168,85,247,0.5)" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <CloudUpload
                    size={36}
                    strokeWidth={1.5}
                    style={{ color: dragging ? "#c084fc" : "rgba(255,255,255,0.5)", transition: "color 0.3s" }}
                  />
                </div>

                <div className="text-center space-y-1">
                  <p className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>
                    Arrastar e Soltar
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>ou</p>
                </div>

                {/* Select file button */}
                <button
                  onClick={() => inputRef.current?.click()}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                    color: "white",
                    boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(124,58,237,0.5)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(124,58,237,0.35)";
                  }}
                >
                  Selecionar Arquivo
                </button>
              </>
            )}

            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={e => handleFile(e.target.files?.[0])}
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-xs font-semibold" style={{ color: "#f87171" }}>{error}</p>
        )}

        {/* Concluir button */}
        <button
          disabled={!file}
          className="px-16 py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-300"
          style={{
            background: file
              ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
              : "rgba(255,255,255,0.08)",
            color: file ? "white" : "rgba(255,255,255,0.25)",
            boxShadow: file ? "0 12px 32px rgba(124,58,237,0.4)" : "none",
            cursor: file ? "pointer" : "not-allowed",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          onMouseEnter={e => {
            if (file) {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 18px 40px rgba(124,58,237,0.55)";
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = file ? "0 12px 32px rgba(124,58,237,0.4)" : "none";
          }}
        >
          Concluir
        </button>
      </main>
    </div>
  );
}
