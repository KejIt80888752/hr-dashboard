import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  MoreVertical,
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  joinDate: string;
  status: "active" | "inactive";
  avatar: string;
}

const EMPLOYEES: Employee[] = [
  { id: "e1", name: "Arun Kumar", role: "Software Engineer", department: "Engineering", email: "arun@hrportal.com", phone: "+91 98765 43210", joinDate: "01 Jan 2024", status: "active", avatar: "AK" },
  { id: "e2", name: "Priya Sharma", role: "HR Manager", department: "HR", email: "priya@hrportal.com", phone: "+91 87654 32109", joinDate: "15 Mar 2023", status: "active", avatar: "PS" },
  { id: "e3", name: "Karthik Raj", role: "Finance Analyst", department: "Finance", email: "karthik@hrportal.com", phone: "+91 76543 21098", joinDate: "10 Jun 2023", status: "active", avatar: "KR" },
  { id: "e4", name: "Meena Devi", role: "Sales Executive", department: "Sales", email: "meena@hrportal.com", phone: "+91 65432 10987", joinDate: "20 Aug 2022", status: "inactive", avatar: "MD" },
  { id: "e5", name: "Suresh Babu", role: "Operations Lead", department: "Operations", email: "suresh@hrportal.com", phone: "+91 54321 09876", joinDate: "05 Feb 2022", status: "active", avatar: "SB" },
  { id: "e6", name: "Lakshmi N", role: "UI/UX Designer", department: "Engineering", email: "lakshmi@hrportal.com", phone: "+91 43210 98765", joinDate: "12 Nov 2023", status: "active", avatar: "LN" },
  { id: "e7", name: "Ravi Shankar", role: "Marketing Manager", department: "Sales", email: "ravi@hrportal.com", phone: "+91 32109 87654", joinDate: "28 Apr 2023", status: "active", avatar: "RS" },
  { id: "e8", name: "Divya M", role: "Backend Developer", department: "Engineering", email: "divya@hrportal.com", phone: "+91 21098 76543", joinDate: "03 Jul 2024", status: "active", avatar: "DM" },
];

const DEPT_COLORS: Record<string, { bg: string; color: string }> = {
  Engineering: { bg: "#eff6ff", color: "#2563eb" },
  HR: { bg: "#ecfdf5", color: "#059669" },
  Finance: { bg: "#fffbeb", color: "#d97706" },
  Sales: { bg: "#fdf4ff", color: "#9333ea" },
  Operations: { bg: "#fff1f2", color: "#e11d48" },
};

const AVATAR_COLORS = [
  "#2563eb", "#7c3aed", "#059669", "#d97706", "#dc2626",
  "#0891b2", "#be185d", "#16a34a",
];

export default function Employees() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const departments = ["All", ...Array.from(new Set(EMPLOYEES.map((e) => e.department)))];

  const filtered = EMPLOYEES.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "All" || e.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="fade-up">
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Employees</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
            {EMPLOYEES.filter((e) => e.status === "active").length} active ·{" "}
            {EMPLOYEES.filter((e) => e.status === "inactive").length} inactive
          </p>
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
          }}
        >
          <Plus style={{ width: 16, height: 16 }} />
          Add Employee
        </button>
      </div>

      {/* Filters */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "14px 16px", marginBottom: "20px", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#94a3b8" }} />
          <input
            placeholder="Search employees…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              padding: "8px 12px 8px 36px",
              fontSize: "13px",
              color: "#1e293b",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                fontWeight: 500,
                cursor: "pointer",
                background: deptFilter === d ? "#2563eb" : "#f1f5f9",
                color: deptFilter === d ? "#fff" : "#64748b",
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Employee cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {filtered.map((emp, i) => {
          const deptStyle = DEPT_COLORS[emp.department] ?? { bg: "#f1f5f9", color: "#64748b" };
          const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
          return (
            <div
              key={emp.id}
              style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                padding: "20px",
                transition: "box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}
            >
              {/* Card header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: avatarColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {emp.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", lineHeight: 1.3 }}>{emp.name}</p>
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{emp.role}</p>
                  </div>
                </div>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "2px" }}>
                  <MoreVertical style={{ width: 16, height: 16 }} />
                </button>
              </div>

              {/* Department badge + status */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    background: deptStyle.bg,
                    color: deptStyle.color,
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  <Building2 style={{ width: 11, height: 11 }} />
                  {emp.department}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: emp.status === "active" ? "#059669" : "#94a3b8",
                  }}
                >
                  {emp.status === "active" ? (
                    <CheckCircle style={{ width: 12, height: 12 }} />
                  ) : (
                    <XCircle style={{ width: 12, height: 12 }} />
                  )}
                  {emp.status === "active" ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Contact info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Mail style={{ width: 13, height: 13, color: "#94a3b8", flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", color: "#64748b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {emp.email}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Phone style={{ width: 13, height: 13, color: "#94a3b8", flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", color: "#64748b" }}>{emp.phone}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Calendar style={{ width: 13, height: 13, color: "#94a3b8", flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", color: "#64748b" }}>Joined {emp.joinDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                <button
                  style={{
                    flex: 1,
                    padding: "7px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#64748b",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  View Profile
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: "7px",
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "8px",
                    fontSize: "12px",
                    color: "#2563eb",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  <Users style={{ width: 12, height: 12, display: "inline", marginRight: "4px" }} />
                  Message
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px",
              color: "#94a3b8",
            }}
          >
            <Users style={{ width: 40, height: 40, margin: "0 auto 12px", opacity: 0.4 }} />
            <p style={{ fontSize: "15px" }}>No employees found</p>
          </div>
        )}
      </div>
    </div>
  );
}
