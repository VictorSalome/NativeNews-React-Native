import { auth } from "@/services/firebaseConfig";
import { getSecureItem, saveSecureItem } from "@/utils/secureStore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from "@firebase/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface IAuthContext {
  user: User | null;
  tokens: IAuthTokens;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<UserCredential | null>;
  register: (email: string, password: string) => Promise<UserCredential | null>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
}

interface IAuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IResetPassword extends Pick<ICredentials, "email"> {}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<IAuthTokens>({
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  const queryClient = useQueryClient();

  const handleLoadTokens = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getSecureItem("accessToken");
      const refreshToken = await getSecureItem("refreshToken");
      const expiresATstr = await getSecureItem("expiresAt");
      const expiresAt = expiresATstr ? Number(expiresATstr) : null;

      if (accessToken) {
        const currentUser = auth.currentUser;

        if (currentUser) {
          setUser(currentUser);
          setTokens({
            accessToken,
            refreshToken,
            expiresAt,
          });
        } else {
          try {
            setTokens({
              accessToken,
              refreshToken,
              expiresAt,
            });

            if (expiresAt && Date.now() < expiresAt) {
              setUser(auth.currentUser || ({ uid: "temp-user-id" } as any));
            } else {
              const refreshResult = await handleRefreshAccessToken();
            }
          } catch (error) {
            await handleClearAuthData();
          }
        }
      }
    } catch (error) {
      await handleClearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadTokens();
  }, []);

  const handleSaveAuthData = async (
    user: User,
    accessToken: string,
    refreshToken: string,
    expiresAt: number,
  ) => {
    await saveSecureItem("accessToken", accessToken);
    await saveSecureItem("refreshToken", refreshToken);
    await saveSecureItem("expiresAt", expiresAt.toString());

    setUser(user);
    setTokens({
      accessToken,
      refreshToken,
      expiresAt,
    });
  };

  const handleClearAuthData = async () => {
    await saveSecureItem("accessToken", "");
    await saveSecureItem("refreshToken", "");
    await saveSecureItem("expiresAt", "");
    setUser(null);
    setTokens({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
    });
  };

  const handleLoginMutation = useMutation({
    mutationFn: async (credentials: ICredentials) => {
      const { email, password } = credentials;
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );

        const accessToken = await userCredential.user.getIdToken();
        const refreshToken = await userCredential.user.refreshToken;
        // const expiresAt = Date.now() + 1800 * 1000; // 30 minutes
        const expiresAt = Date.now() + 60 * 1000; // 1 minute

        await handleSaveAuthData(
          userCredential.user,
          accessToken,
          refreshToken,
          expiresAt,
        );
        return userCredential;
      } catch (error) {
        throw error;
      }
    },
  });

  const handleRegisterMutation = useMutation({
    mutationFn: async (credentials: ICredentials) => {
      const { email, password } = credentials;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const accessToken = await userCredential.user.getIdToken();
      const refreshToken = await userCredential.user.refreshToken;
      // const expiresAt = Date.now() + 1800 * 1000; // 30 minutes
      const expiresAt = Date.now() + 60 * 1000; // 1 minute
      await handleSaveAuthData(
        userCredential.user,
        accessToken,
        refreshToken,
        expiresAt,
      );
      return userCredential;
    },
  });

  const handleResetPasswordMutation = useMutation({
    mutationFn: async ({ email }: IResetPassword) => {
      await sendPasswordResetEmail(auth, email);
      return true;
    },
  });

  const handleLogoutMutation = useMutation({
    mutationFn: async () => {
      await signOut(auth);
      await handleClearAuthData();
    },
  });

  const handleRefreshAccessToken = async (): Promise<boolean> => {
    try {
      if (user) {
        const newAccessToken = await user.getIdToken(true);
        // const expiresAt = Date.now() + 1800 * 1000; // 30 minutes
        const expiresAt = Date.now() + 60 * 1000; // 1 minute
        await saveSecureItem("accessToken", newAccessToken);
        await saveSecureItem("expiresAt", expiresAt.toString());
        setTokens((prevTokens) => ({
          ...prevTokens,
          accessToken: newAccessToken,
          expiresAt,
        }));
        return true;
      } else if (tokens.refreshToken) {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const newAccessToken = await currentUser.getIdToken(true);
          // const expiresAt = Date.now() + 1800 * 1000; // 30 minutes
          const expiresAt = Date.now() + 60 * 1000; // 1 minute
          await saveSecureItem("accessToken", newAccessToken);
          await saveSecureItem("expiresAt", expiresAt.toString());

          setUser(currentUser);
          setTokens((prevTokens) => ({
            ...prevTokens,
            accessToken: newAccessToken,
            expiresAt,
          }));

          return true;
        }
      }

      await handleClearAuthData();
      return false;
    } catch (error) {
      await handleClearAuthData();
      return false;
    }
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (tokens.expiresAt) {
          const timeToExpiry = tokens.expiresAt - Date.now();
          const minutesToExpiry = Math.floor(timeToExpiry / 1000 / 60);

          if (timeToExpiry < 1800000) {
            // 30 minutos
            handleRefreshAccessToken();
          }
        }
      },
      5 * 60 * 1000,
    ); // Verificar a cada 5 minutos
    return () => clearInterval(interval);
  }, [tokens]);

  const handleAuthOperation = async <T,>(
    operation: () => Promise<T>,
  ): Promise<T | null> => {
    try {
      return await operation();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro na operação de autenticação",
      );
      return null;
    }
  };

  const handleBooleanOperation = async (
    operation: () => Promise<any>,
  ): Promise<boolean> => {
    try {
      await operation();
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated,
        isLoading,
        error,
        login: (email, password) =>
          handleAuthOperation(() =>
            handleLoginMutation.mutateAsync({ email, password }),
          ),
        register: (email, password) =>
          handleAuthOperation(() =>
            handleRegisterMutation.mutateAsync({ email, password }),
          ),
        logout: () => handleLogoutMutation.mutateAsync(),
        refreshAccessToken: handleRefreshAccessToken,

        resetPassword: (email) =>
          handleBooleanOperation(() =>
            handleResetPasswordMutation.mutateAsync({ email }),
          ),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
