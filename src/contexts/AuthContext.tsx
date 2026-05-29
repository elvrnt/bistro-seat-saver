import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearSession,
  findUserByEmail,
  getSessionUserId,
  getUserById,
  hashPassword,
  saveUser,
  setSessionUserId,
  toPublicUser,
} from "@/lib/auth-storage";
import type { LoginInput, RegisterInput, User } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  register: (input: RegisterInput) => Promise<{ ok: true } | { ok: false; error: string }>;
  login: (input: LoginInput) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = getSessionUserId();
    if (sessionId) {
      const stored = getUserById(sessionId);
      if (stored) {
        setUser(toPublicUser(stored));
      } else {
        clearSession();
      }
    }
    setIsLoading(false);
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const email = input.email.trim().toLowerCase();
    const name = input.name.trim();

    if (!name || !email || !input.password) {
      return { ok: false as const, error: "Заполните все обязательные поля." };
    }

    if (input.password.length < 6) {
      return { ok: false as const, error: "Пароль должен быть не короче 6 символов." };
    }

    if (findUserByEmail(email)) {
      return { ok: false as const, error: "Пользователь с таким email уже зарегистрирован." };
    }

    const passwordHash = await hashPassword(input.password);
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      phone: input.phone?.trim() || undefined,
      passwordHash,
    };

    saveUser(newUser);
    setSessionUserId(newUser.id);
    setUser(toPublicUser(newUser));

    return { ok: true as const };
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    const email = input.email.trim().toLowerCase();
    const stored = findUserByEmail(email);

    if (!stored) {
      return { ok: false as const, error: "Неверный email или пароль." };
    }

    const passwordHash = await hashPassword(input.password);
    if (stored.passwordHash !== passwordHash) {
      return { ok: false as const, error: "Неверный email или пароль." };
    }

    setSessionUserId(stored.id);
    setUser(toPublicUser(stored));

    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, register, login, logout }),
    [user, isLoading, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
