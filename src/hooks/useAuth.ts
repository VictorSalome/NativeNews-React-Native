import { useAuthContext } from "@/context/authContext";
import { saveLastEmail } from "@/utils/lastCredentials";

interface AuthResult {
  ok: boolean;
  error?: string;
}

export default function useAuth() {
  const { login, register, logout, resetPassword, error } = useAuthContext();

  const handleSignIn = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    console.log("[useAuth] Iniciando handleSignIn");
    try {
      console.log("[useAuth] Chamando função login do AuthContext");
      const result = await login(email, password);

      if (result) {
        await saveLastEmail(email);
      }
      console.log(
        "[useAuth] Resultado do login:",
        result ? "Sucesso" : "Falha",
      );
      return { ok: !!result };
    } catch (err) {
      console.error(
        "[useAuth] Erro durante login:",
        err instanceof Error ? err.message : "Erro desconhecido",
      );
      return { ok: false, error: error || "Erro ao fazer login" };
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    try {
      const result = await register(email, password);
      return { ok: !!result };
    } catch (err) {
      return { ok: false, error: error || "Erro ao criar conta" };
    }
  };

  const handleResetPassword = async (email: string): Promise<AuthResult> => {
    try {
      const result = await resetPassword(email);
      return { ok: result };
    } catch (err) {
      return { ok: false, error: error || "Erro ao resetar senha" };
    }
  };

  return {
    handleSignIn,
    handleSignUp,
    handleResetPassword,
    logout,
    error,
  };
}
