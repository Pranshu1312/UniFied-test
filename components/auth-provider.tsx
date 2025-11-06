"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

type Role = "admin" | "user" | null;

interface AuthContextType {
  user: User | null;
  role: Role;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

async function fetchRole(userId: string): Promise<Role> {
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle(); // ✅ allows 0 rows safely

  if (error) {
    console.warn("[auth] fetchRole warn:", error.message);
    return "user"; // default fallback
  }

  return (data?.role as Role) ?? "user"; // ✅ default to user
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hydrate = useCallback(async () => {
    setIsLoading(true);
    const { data } = await supabase.auth.getSession();

    const sessionUser = data.session?.user ?? null;
    setUser(sessionUser);

    if (sessionUser) {
      const r = await fetchRole(sessionUser.id);
      setRole(r);
    } else {
      setRole(null);
    }

    setIsLoading(false);
  }, []);

  /** Listen for login/logout events */
  useEffect(() => {
    hydrate();

    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (sessionUser) {
          const r = await fetchRole(sessionUser.id);
          setRole(r);
        } else {
          setRole(null);
        }
      }
    );

    return () => sub.subscription.unsubscribe();
  }, [hydrate]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        const signedInUser = data.user!;
        const r = await fetchRole(signedInUser.id);

        setUser(signedInUser);
        setRole(r);

        // ✅ Role-based route redirect
        if (r === "admin") router.push("/admin");
        else router.push("/dashboard");
      } catch (err: any) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });

        if (error) throw error;

        // ✅ Insert into profiles if not auto created
        if (data.user) {
          await supabase.from("profiles").insert({
            id: data.user.id,
            full_name: name,
            role: "user",
          });
        }

        // After register → go login
        router.push("/auth/login");
      } catch (err: any) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    router.push("/auth/login");
  }, [router]);

  const refresh = useCallback(() => hydrate(), [hydrate]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      role,
      isLoading,
      login,
      register,
      logout,
      refresh,
    }),
    [user, role, isLoading, login, register, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
