import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Spade, Eye, GraduationCap, Users } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { loginSchema } from "@/features/auth/schema";
import { loginRequest, guestRequest } from "@/features/auth/api";
import { useAuthStore } from "@/features/auth/store/authStore";
import { joinSession } from "@/features/student/api";
import { useStudentAuthStore } from "@/features/student/store/studentAuthStore";
import { cn } from "@/lib/utils";

const GUEST_FALLBACK = {
  token: "guest-demo-token",
  user: {
    id: 0,
    name: "Visitante",
    email: "guest@local.demo",
    role: "user",
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((s) => s.setSession);
  const setStudentSession = useStudentAuthStore((s) => s.setSession);
  const [submitError, setSubmitError] = useState(null);
  const [guestLoading, setGuestLoading] = useState(false);
  const [mode, setMode] = useState("professor"); // "professor" | "aluno"

  const [joinCode, setJoinCode] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState(null);

  const enterAsStudent = async () => {
    setJoinError(null);
    if (!joinCode.trim() || !joinName.trim()) {
      setJoinError("Informe o código da turma e seu nome.");
      return;
    }
    setJoining(true);
    try {
      const data = await joinSession({ code: joinCode.trim().toUpperCase(), name: joinName.trim() });
      setStudentSession({ token: data.token, student: data.student, session: data.session });
      navigate("/aluno", { replace: true });
    } catch (err) {
      setJoinError(err.message ?? "Não foi possível entrar na turma");
    } finally {
      setJoining(false);
    }
  };

  const enterAsGuest = async () => {
    setGuestLoading(true);
    setSubmitError(null);
    try {
      // Tenta criar sessão de visitante real no backend (tudo funciona).
      const data = await guestRequest();
      setSession({ token: data.token, user: data.user });
    } catch {
      // Backend offline → modo demo local (só navegação de UI).
      setSession(GUEST_FALLBACK);
    }
    const redirectTo = location.state?.from?.pathname ?? "/";
    navigate(redirectTo, { replace: true });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setSubmitError(null);
    try {
      const data = await loginRequest(values);
      setSession({ token: data.token, user: data.user });
      const redirectTo = location.state?.from?.pathname ?? "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setSubmitError(err.message ?? "Falha ao entrar");
    }
  };

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md flex flex-col gap-8">
          <header className="flex flex-col items-center gap-3">
            <Spade size={42} className="text-balatro-red" fill="currentColor" />
            <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-red text-glow-red uppercase">
              ◆ Entrar ◆
            </p>
            <h1 className="font-pixel text-2xl tracking-[0.25em] text-balatro-text uppercase">
              REVISÃO
            </h1>
          </header>

          {/* Abas Professor / Aluno */}
          <div className="grid grid-cols-2 rounded-xl border-2 border-balatro-card-edge overflow-hidden">
            <button
              type="button"
              onClick={() => setMode("professor")}
              className={cn(
                "flex items-center justify-center gap-2 py-3 font-pixel text-[10px] tracking-[0.25em] uppercase transition-all border-b-2",
                mode === "professor"
                  ? "bg-balatro-red/20 text-balatro-red text-glow-red border-balatro-red"
                  : "text-balatro-text-dim border-transparent hover:text-balatro-text hover:bg-white/5",
              )}
            >
              <GraduationCap size={14} /> Professor
            </button>
            <button
              type="button"
              onClick={() => setMode("aluno")}
              className={cn(
                "flex items-center justify-center gap-2 py-3 font-pixel text-[10px] tracking-[0.25em] uppercase transition-all border-b-2",
                mode === "aluno"
                  ? "bg-balatro-blue/20 text-balatro-blue text-glow-blue border-balatro-blue"
                  : "text-balatro-text-dim border-transparent hover:text-balatro-text hover:bg-white/5",
              )}
            >
              <Users size={14} /> Aluno
            </button>
          </div>

          {mode === "aluno" ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center gap-2 text-center">
                <Users size={32} className="text-balatro-blue" />
                <p className="text-[12px] text-balatro-text-dim leading-relaxed max-w-xs">
                  Digite o código que o professor mostrou na tela e o seu nome para entrar na turma.
                </p>
              </div>

              <label className="flex flex-col gap-2">
                <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">Código da turma</span>
                <input
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="Ex: ABC123"
                  maxLength={6}
                  className="balatro-input text-center tracking-[0.4em] uppercase"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">Seu nome</span>
                <input
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  placeholder="Seu nome"
                  className="balatro-input"
                />
              </label>

              {joinError && (
                <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase text-center">✗ {joinError}</p>
              )}

              <BalatroButton
                type="button"
                variant="blue"
                size="lg"
                onClick={enterAsStudent}
                disabled={joining}
                className="w-full"
              >
                {joining ? "Entrando..." : "Entrar na Turma"}
              </BalatroButton>

              <p className="font-pixel text-[10px] tracking-[0.25em] text-balatro-text-dim uppercase text-center">
                É professor?{" "}
                <button
                  type="button"
                  onClick={() => setMode("professor")}
                  className="text-balatro-gold hover:underline uppercase"
                >
                  Entrar aqui
                </button>
              </p>
            </div>
          ) : (
          <>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                autoComplete="email"
                {...register("email")}
                className="balatro-input"
                placeholder="seu@email.com"
              />
            </Field>

            <Field label="Senha" error={errors.password?.message}>
              <input
                type="password"
                autoComplete="current-password"
                {...register("password")}
                className="balatro-input"
                placeholder="••••••••"
              />
            </Field>

            {submitError && (
              <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase text-center">
                ✗ {submitError}
              </p>
            )}

            <BalatroButton
              type="submit"
              variant="red"
              size="lg"
              disabled={isSubmitting}
              className="w-full mt-2"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </BalatroButton>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-balatro-card-edge" />
            <span className="font-pixel text-[8px] tracking-[0.3em] text-balatro-text-dim uppercase">ou</span>
            <div className="flex-1 h-px bg-balatro-card-edge" />
          </div>

          <BalatroButton
            type="button"
            variant="ghost"
            size="md"
            onClick={enterAsGuest}
            disabled={guestLoading}
            className="w-full"
          >
            <Eye size={16} /> {guestLoading ? "Entrando..." : "Entrar como Visitante"}
          </BalatroButton>

          <p className="font-pixel text-[10px] tracking-[0.25em] text-balatro-text-dim uppercase text-center">
            Sem conta?{" "}
            <Link
              to="/register"
              className="text-balatro-gold hover:underline"
            >
              Registrar
            </Link>
          </p>
          </>
          )}
        </div>
      </main>
    </CRTFrame>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-pixel text-[10px] tracking-[0.3em] text-balatro-text-dim uppercase">
        {label}
      </span>
      {children}
      {error && (
        <span className="font-pixel text-[9px] tracking-[0.2em] text-balatro-red uppercase">
          {error}
        </span>
      )}
    </label>
  );
}
