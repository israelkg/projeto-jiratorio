import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { registerSchema } from "@/features/auth/schema";
import { registerRequest } from "@/features/auth/api";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function RegisterPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async ({ name, email, password }) => {
    setSubmitError(null);
    try {
      const data = await registerRequest({ name, email, password });
      setSession({ token: data.token, user: data.user });
      navigate("/", { replace: true });
    } catch (err) {
      const details = Array.isArray(err.details) ? err.details.join(" · ") : null;
      setSubmitError(details ?? err.message ?? "Falha ao registrar");
    }
  };

  return (
    <CRTFrame className="bg-balatro-bg-deep">
      <main className="relative z-10 min-h-screen flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md flex flex-col gap-8">
          <header className="flex flex-col items-center gap-3">
            <GraduationCap size={42} className="text-balatro-gold" />
            <p className="font-pixel text-[10px] tracking-[0.4em] text-balatro-gold uppercase">
              ◆ Cadastro de Professor ◆
            </p>
            <h1 className="font-pixel text-2xl tracking-[0.25em] text-balatro-text uppercase">
              Nova Conta
            </h1>
            <p className="text-[11px] text-balatro-text-dim text-center leading-relaxed max-w-xs">
              A conta é do professor, que cria as partidas e conduz o jogo.
              Os alunos não se cadastram, eles participam pela sessão criada pelo professor.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <Field label="Nome" error={errors.name?.message}>
              <input
                type="text"
                autoComplete="name"
                {...register("name")}
                className="balatro-input"
                placeholder="Seu nome"
              />
            </Field>

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
                autoComplete="new-password"
                {...register("password")}
                className="balatro-input"
                placeholder="mínimo 8 caracteres"
              />
            </Field>

            <Field label="Confirmar Senha" error={errors.confirmPassword?.message}>
              <input
                type="password"
                autoComplete="new-password"
                {...register("confirmPassword")}
                className="balatro-input"
                placeholder="repita a senha"
              />
            </Field>

            {submitError && (
              <p className="font-pixel text-[10px] tracking-[0.2em] text-balatro-red uppercase text-center">
                ✗ {submitError}
              </p>
            )}

            <BalatroButton
              type="submit"
              variant="gold"
              size="lg"
              disabled={isSubmitting}
              className="w-full mt-2"
            >
              {isSubmitting ? "Criando..." : "Criar Conta de Professor"}
            </BalatroButton>
          </form>

          <p className="font-pixel text-[10px] tracking-[0.25em] text-balatro-text-dim uppercase text-center">
            Já tem conta?{" "}
            <Link to="/login" className="text-balatro-red hover:underline">
              Entrar
            </Link>
          </p>
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
