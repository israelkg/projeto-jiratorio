import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Spade } from "lucide-react";
import { CRTFrame } from "@/components/balatro/CRTFrame";
import { BalatroButton } from "@/components/balatro/BalatroButton";
import { loginSchema } from "@/features/auth/schema";
import { loginRequest } from "@/features/auth/api";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((s) => s.setSession);
  const [submitError, setSubmitError] = useState(null);

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

          <p className="font-pixel text-[10px] tracking-[0.25em] text-balatro-text-dim uppercase text-center">
            Sem conta?{" "}
            <Link
              to="/register"
              className="text-balatro-gold hover:underline"
            >
              Registrar
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
