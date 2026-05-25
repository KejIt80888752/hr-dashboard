import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const DEMO_USERS = [
  { role: "Super Admin", email: "admin@hrportal.com", password: "admin123" },
  { role: "HR Manager", email: "hr@hrportal.com", password: "hr123" },
  { role: "Recruiter", email: "recruiter@hrportal.com", password: "rec123" },
  { role: "Finance", email: "finance@hrportal.com", password: "fin123" },
  { role: "Viewer", email: "viewer@hrportal.com", password: "view123" },
];

const STAT_CARDS = [
  { value: "2024", label: "Est." },
  { value: "248+", label: "Employees" },
  { value: "5", label: "Departments" },
  { value: "Integrated", label: "Payroll & GST" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate("/dashboard");
    else setError("Invalid email or password.");
  };

  const fillCredentials = (u: typeof DEMO_USERS[0]) => {
    setEmail(u.email);
    setPassword(u.password);
    setError("");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#f0f2f5", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{
        display: "flex",
        width: "100%",
        maxWidth: "900px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
      }}>
        {/* ── Left Panel ── */}
        <div style={{
          flex: "0 0 45%",
          background: "linear-gradient(160deg, #2d1b69 0%, #3b1f8c 40%, #1e1245 100%)",
          padding: "40px 36px",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
        }}>
          {/* Logo + company */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
            <div style={{
              width: "52px",
              height: "52px",
              background: "#fff",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="4" y="8" width="24" height="16" rx="3" fill="#3b1f8c"/>
                <rect x="8" y="12" width="6" height="4" rx="1" fill="#f97316"/>
                <rect x="18" y="12" width="6" height="4" rx="1" fill="#f97316"/>
                <rect x="8" y="18" width="16" height="2" rx="1" fill="#94a3b8"/>
              </svg>
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: "17px", lineHeight: 1.2, color: "#fff" }}>HR Portal</p>
              <p style={{ fontSize: "11px", color: "#f97316", fontWeight: 600, letterSpacing: "1.2px", textTransform: "uppercase", marginTop: "2px" }}>
                Human Resource Management
              </p>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: "12px" }}>
            HR Management<br />Dashboard
          </h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.6, marginBottom: "28px" }}>
            Complete HR operations — Employees, Payroll, Recruitment, Attendance & more. Manage your entire workforce from one place.
          </p>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "auto" }}>
            {STAT_CARDS.map(({ value, label }) => (
              <div key={label} style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "16px",
              }}>
                <p style={{ fontSize: "20px", fontWeight: 800, color: "#f97316", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "5px" }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ fontSize: "11px", color: "#64748b" }}>
              📍 Chennai, Tamil Nadu, India
            </p>
            <p style={{ fontSize: "11px", color: "#64748b", marginTop: "3px" }}>
              📞 +91 98765 43210
            </p>
            {/* The Raise logo */}
            <div style={{ marginTop: "20px" }}>
              <img
                src="/hr-dashboard/the-raise-logo.png"
                alt="The Raise — Powered by KEJ IT"
                style={{ width: "120px", opacity: 0.85, filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div style={{
          flex: 1,
          background: "#fff",
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
        }}>
          <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>Sign In</h2>
          <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "32px" }}>Access your dashboard</p>

          {error && (
            <div style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "#dc2626",
              marginBottom: "16px",
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px", marginBottom: "28px" }}>
            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "7px" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@hrportal.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  background: "#f9fafb",
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "11px 14px",
                  fontSize: "14px",
                  color: "#0f172a",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#374151", marginBottom: "7px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    background: "#f9fafb",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "11px 44px 11px 14px",
                    fontSize: "14px",
                    color: "#0f172a",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#f97316")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, display: "flex" }}
                >
                  {showPassword ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#fdba74" : "#f97316",
                border: "none",
                borderRadius: "10px",
                padding: "13px",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                letterSpacing: "0.3px",
              }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#ea6b0a"; }}
              onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#f97316"; }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {/* Demo credentials */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "12px" }}>
              Demo Credentials — click to fill
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {DEMO_USERS.map((u) => (
                <button
                  key={u.role}
                  type="button"
                  onClick={() => fillCredentials(u)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 12px",
                    background: email === u.email ? "#fff7ed" : "transparent",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                    borderLeft: email === u.email ? "3px solid #f97316" : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => { if (email !== u.email) (e.currentTarget as HTMLButtonElement).style.background = "#f9fafb"; }}
                  onMouseLeave={(e) => { if (email !== u.email) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>{u.role}</span>
                  <span style={{ fontSize: "12px", color: "#9ca3af" }}>{u.email}</span>
                </button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: "12px", color: "#d1d5db", textAlign: "center", marginTop: "auto", paddingTop: "20px" }}>
            Toggle Dark / Light mode
          </p>
        </div>
      </div>
    </div>
  );
}
