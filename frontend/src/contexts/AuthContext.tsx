import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { auth } from "../services/axiosService";
import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
} from "../utils/localStorage";

// ---- Types ----
type User = {
  username: string;
  name: string;
  email: string;
  type: "student" | "teacher";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    role: "student" | "teacher"
  ) => Promise<void>;
  logout: () => void;
};

// ---- Context ----
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---- Provider ----
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const res = await auth.login({ username, password });

      const fullName = `${res.first_name} ${res.last_name}`.trim();
      const name = fullName || res.username;

      setUser({
        username: res.username,
        name,
        email: res.email,
        type: res.type === "teacher" ? "teacher" : "student",
      });

      // Persist to localStorage
      setLocalStorage("uid", res.id);
      setLocalStorage("token", res.token);
      setLocalStorage("username", res.username);
      setLocalStorage("email", res.email);
      setLocalStorage("name", name);
      setLocalStorage("type", res.type);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const signup = async (
    username: string,
    email: string,
    password: string,
    type: "student" | "teacher"
  ) => {
    try {
      const res = await auth.signUp({ username, password, email, type });
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = () => {
    clearLocalStorage("token");
    clearLocalStorage("username");
    clearLocalStorage("email");
    clearLocalStorage("name");
    clearLocalStorage("type");
    setUser(null);
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const token = getLocalStorage("token");
    const username = getLocalStorage("username");
    const email = getLocalStorage("email");
    const name = getLocalStorage("name");
    const type = getLocalStorage("type");

    if (token && username && email && name && type) {
      setUser({
        username,
        name,
        email,
        type: type as "student" | "teacher",
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ---- Hook ----
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
