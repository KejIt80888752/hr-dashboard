import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Users,
  LogOut,
  Building2,
  Menu,
  X,
  Bell,
  Clock,
  Calendar,
  IndianRupee,
  Briefcase,
  BarChart2,
  Settings,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/employees", icon: Users, label: "Employees" },
    ],
  },
  {
    label: "HR Operations",
    items: [
      { to: "/attendance", icon: Clock, label: "Attendance" },
      { to: "/leave", icon: Calendar, label: "Leave Management" },
      { to: "/payroll", icon: IndianRupee, label: "Payroll" },
    ],
  },
  {
    label: "Recruitment",
    items: [
      { to: "/jobs", icon: Briefcase, label: "Jobs & Recruitment" },
      { to: "/resume", icon: FileText, label: "Resume Upload" },
    ],
  },
  {
    label: "Finance",
    items: [
      { to: "/payments", icon: CreditCard, label: "Payments" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { to: "/reports", icon: BarChart2, label: "Reports" },
    ],
  },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const SidebarContent = () => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
      {/* Logo */}
      <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: "11px", flexShrink: 0 }}>
        <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(37,99,235,0.4)" }}>
          <Building2 style={{ width: 18, height: 18, color: "#fff" }} />
        </div>
        <div>
          <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "15px", lineHeight: 1 }}>HR Portal</p>
          <p style={{ color: "#475569", fontSize: "10px", marginTop: "3px" }}>Management System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV_SECTIONS.map(({ label, items }) => (
          <div key={label} style={{ marginBottom: "8px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, color: "#334155", textTransform: "uppercase", letterSpacing: "0.7px", padding: "6px 10px 4px" }}>
              {label}
            </p>
            {items.map(({ to, icon: Icon, label: itemLabel }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 10px",
                  borderRadius: "9px",
                  textDecoration: "none",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: "13px",
                  color: isActive ? "#fff" : "#94a3b8",
                  background: isActive ? "linear-gradient(135deg,#2563eb,#1d4ed8)" : "transparent",
                  transition: "all 0.15s",
                  boxShadow: isActive ? "0 3px 10px rgba(37,99,235,0.3)" : "none",
                  marginBottom: "1px",
                })}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (!el.classList.contains("active") && !el.getAttribute("aria-current")) {
                    el.style.color = "#e2e8f0";
                    el.style.background = "rgba(255,255,255,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  if (!el.getAttribute("aria-current")) {
                    el.style.color = "#94a3b8";
                    el.style.background = "transparent";
                  }
                }}
              >
                <Icon style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span>{itemLabel}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Settings + User */}
      <div style={{ padding: "10px 10px 14px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
        <NavLink
          to="/settings"
          onClick={() => setSidebarOpen(false)}
          style={({ isActive }) => ({
            display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "9px",
            textDecoration: "none", fontSize: "13px", marginBottom: "10px",
            color: isActive ? "#fff" : "#94a3b8",
            background: isActive ? "linear-gradient(135deg,#2563eb,#1d4ed8)" : "transparent",
            fontWeight: isActive ? 600 : 400,
          })}
        >
          <Settings style={{ width: 16, height: 16 }} />
          <span>Settings</span>
        </NavLink>

        <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 10px", background: "rgba(255,255,255,0.04)", borderRadius: "9px", marginBottom: "8px" }}>
          <div style={{ width: "30px", height: "30px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>
            {user?.name?.charAt(0) ?? "A"}
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <p style={{ color: "#f1f5f9", fontSize: "12px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name}</p>
            <p style={{ color: "#475569", fontSize: "10px" }}>{user?.role}</p>
          </div>
        </div>

        <button onClick={handleLogout} style={{
          width: "100%", display: "flex", alignItems: "center", gap: "9px", padding: "8px 10px",
          background: "transparent", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "9px",
          color: "#f87171", fontSize: "12px", fontWeight: 500, cursor: "pointer",
        }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "transparent")}>
          <LogOut style={{ width: 15, height: 15 }} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      {/* Desktop Sidebar */}
      <aside style={{ width: "220px", background: "#0f172a", flexShrink: 0, position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 50 }} className="hidden-mobile">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} onClick={() => setSidebarOpen(false)} />
          <aside style={{ width: "220px", background: "#0f172a", height: "100%", position: "relative", zIndex: 1 }}>
            <button onClick={() => setSidebarOpen(false)} style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "7px", padding: "5px", color: "#94a3b8", cursor: "pointer" }}>
              <X style={{ width: 15, height: 15 }} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }} className="main-content">
        {/* Header */}
        <header style={{ height: "60px", background: "#fff", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", position: "sticky", top: 0, zIndex: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center" }} className="show-mobile">
              <Menu style={{ width: 20, height: 20 }} />
            </button>
            <span style={{ color: "#64748b", fontSize: "13px" }}>
              Welcome back, <strong style={{ color: "#1e293b" }}>{user?.name}</strong>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "9px", padding: "7px", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", position: "relative" }}>
              <Bell style={{ width: 17, height: 17 }} />
              <span style={{ position: "absolute", top: "6px", right: "6px", width: "7px", height: "7px", background: "#2563eb", borderRadius: "50%", border: "2px solid #fff" }} />
            </button>
            <div style={{ width: "34px", height: "34px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
              {user?.name?.charAt(0) ?? "A"}
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: "22px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 768px) { .main-content { margin-left: 220px !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </div>
  );
}
