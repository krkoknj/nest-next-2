// context/AuthContext.tsx
"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { fetcher } from "../lib/fetcher";

interface User {
  userId: number;
  email: string;
}
interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/me`)
      .then((data) => {
        console.log("User data:", data);
        if (data) setUser(data ?? data.user ?? null);
        else setUser(null);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetcher(`${process.env.NEXT_PUBLIC_AUTH_URL}/auth/logout`, {
      method: "POST",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
