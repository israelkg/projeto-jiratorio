import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore, selectIsAuthenticated } from "@/features/auth/store/authStore";
import { fetchCurrentUser } from "@/features/auth/api";

export function ProtectedRoute() {
  const location = useLocation();
  const isAuth = useAuthStore(selectIsAuthenticated);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const clear = useAuthStore((s) => s.clear);
  const needsFetch = isAuth && !user;

  useEffect(() => {
    if (!needsFetch) return;
    let cancelled = false;
    fetchCurrentUser()
      .then((u) => {
        if (!cancelled) setUser(u);
      })
      .catch(() => {
        if (!cancelled) clear();
      });
    return () => {
      cancelled = true;
    };
  }, [needsFetch, setUser, clear]);

  if (!isAuth) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (needsFetch) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="font-pixel text-[10px] tracking-[0.4em] text-balatro-text-dim uppercase animate-pulse">
          ◆ Verificando sessão ◆
        </div>
      </div>
    );
  }

  return <Outlet />;
}
