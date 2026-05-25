import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Demo credentials — replace with Firebase/backend auth later
const DEMO_USERS = [
  { email: "admin@hrportal.com", password: "admin123", name: "Admin User", role: "Super Admin" },
  { email: "hr@hrportal.com", password: "hr123", name: "Priya Sharma", role: "HR Manager" },
  { email: "recruiter@hrportal.com", password: "rec123", name: "Karthik Raj", role: "Recruiter" },
  { email: "finance@hrportal.com", password: "fin123", name: "Arun Kumar", role: "Finance" },
  { email: "viewer@hrportal.com", password: "view123", name: "Guest User", role: "Viewer" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(() => {
    const stored = localStorage.getItem("hr_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      const userData = { name: found.name, email: found.email, role: found.role };
      setUser(userData);
      localStorage.setItem("hr_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hr_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
