import { useState } from "react";
import { Save, Building2, Bell, Shield, Palette, Globe } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const TABS = [
  { id: "company", label: "Company", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("company");
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ email: true, payroll: true, leave: false, recruitment: true });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="fade-up">
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Settings</h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Manage your HR Portal configuration</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "20px" }}>
        {/* Tab sidebar */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "12px", height: "fit-content" }}>
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px",
              background: activeTab === id ? "#eff6ff" : "transparent",
              border: "none", borderRadius: "8px", cursor: "pointer", marginBottom: "4px",
              color: activeTab === id ? "#2563eb" : "#64748b",
              fontSize: "13px", fontWeight: activeTab === id ? 600 : 400, textAlign: "left",
            }}>
              <Icon style={{ width: 16, height: 16 }} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "28px" }}>
          {activeTab === "company" && (
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", marginBottom: "20px" }}>Company Information</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Company Name", value: "HR Portal", placeholder: "Company name" },
                  { label: "Industry", value: "Information Technology", placeholder: "Industry" },
                  { label: "Founded Year", value: "2024", placeholder: "Year" },
                  { label: "Employee Count", value: "248", placeholder: "Count" },
                  { label: "HQ Location", value: "Chennai, Tamil Nadu", placeholder: "Location" },
                  { label: "Website", value: "www.hrportal.com", placeholder: "Website" },
                ].map(({ label, value, placeholder }) => (
                  <div key={label}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>{label}</label>
                    <input defaultValue={value} placeholder={placeholder} style={{
                      width: "100%", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "8px",
                      padding: "9px 12px", fontSize: "13px", color: "#0f172a", outline: "none", boxSizing: "border-box",
                    }}
                      onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>About / Description</label>
                <textarea rows={3} defaultValue="Complete HR operations management system." style={{
                  width: "100%", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "8px",
                  padding: "9px 12px", fontSize: "13px", color: "#0f172a", outline: "none", resize: "none", boxSizing: "border-box",
                }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
              </div>
              <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Globe style={{ width: 14, height: 14, color: "#94a3b8" }} />
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>Logged in as <strong style={{ color: "#1e293b" }}>{user?.name}</strong> ({user?.role})</span>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", marginBottom: "20px" }}>Notification Preferences</h3>
              {[
                { key: "email" as const, label: "Email Notifications", desc: "Receive all alerts via email" },
                { key: "payroll" as const, label: "Payroll Alerts", desc: "Get notified when payroll is processed" },
                { key: "leave" as const, label: "Leave Requests", desc: "Alert on new leave applications" },
                { key: "recruitment" as const, label: "Recruitment Updates", desc: "New applicants and job posting updates" },
              ].map(({ key, label, desc }) => (
                <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 500, color: "#1e293b" }}>{label}</p>
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "3px" }}>{desc}</p>
                  </div>
                  <button onClick={() => setNotifs((n) => ({ ...n, [key]: !n[key] }))} style={{
                    width: "44px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer",
                    background: notifs[key] ? "#2563eb" : "#e2e8f0", position: "relative", transition: "background 0.2s",
                  }}>
                    <div style={{
                      width: "18px", height: "18px", borderRadius: "50%", background: "#fff",
                      position: "absolute", top: "3px", left: notifs[key] ? "23px" : "3px", transition: "left 0.2s",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    }} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", marginBottom: "20px" }}>Security Settings</h3>
              {[
                { label: "Current Password", placeholder: "••••••••" },
                { label: "New Password", placeholder: "Min 8 characters" },
                { label: "Confirm New Password", placeholder: "Repeat new password" },
              ].map(({ label, placeholder }) => (
                <div key={label} style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "7px" }}>{label}</label>
                  <input type="password" placeholder={placeholder} style={{
                    width: "100%", background: "#f9fafb", border: "1.5px solid #e5e7eb", borderRadius: "8px",
                    padding: "9px 12px", fontSize: "13px", color: "#0f172a", outline: "none", boxSizing: "border-box",
                  }}
                    onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")} />
                </div>
              ))}
              <div style={{ padding: "14px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "10px", marginTop: "8px" }}>
                <p style={{ fontSize: "13px", color: "#92400e" }}>
                  🔒 Enable Two-Factor Authentication for enhanced security
                </p>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#0f172a", marginBottom: "20px" }}>Appearance</h3>
              <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>Choose your sidebar accent colour</p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {["#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626", "#0891b2", "#be185d"].map((c) => (
                  <button key={c} style={{ width: "36px", height: "36px", borderRadius: "50%", background: c, border: c === "#2563eb" ? "3px solid #0f172a" : "3px solid transparent", cursor: "pointer" }} />
                ))}
              </div>
              <p style={{ fontSize: "13px", color: "#64748b", marginTop: "24px", marginBottom: "12px" }}>Dashboard layout</p>
              <div style={{ display: "flex", gap: "12px" }}>
                {["Compact", "Comfortable", "Spacious"].map((l) => (
                  <button key={l} style={{ padding: "8px 16px", borderRadius: "8px", border: "1.5px solid", borderColor: l === "Comfortable" ? "#2563eb" : "#e2e8f0", background: l === "Comfortable" ? "#eff6ff" : "#fff", fontSize: "13px", color: l === "Comfortable" ? "#2563eb" : "#64748b", cursor: "pointer", fontWeight: l === "Comfortable" ? 600 : 400 }}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Save button */}
          <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleSave} style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: saved ? "#059669" : "linear-gradient(135deg,#2563eb,#1d4ed8)",
              border: "none", borderRadius: "10px", padding: "10px 22px",
              color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer",
              transition: "background 0.3s",
            }}>
              <Save style={{ width: 16, height: 16 }} />
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
