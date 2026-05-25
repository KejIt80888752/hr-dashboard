import { useState } from "react";
import { Briefcase, MapPin, Clock, Users, Plus, Search } from "lucide-react";

const JOBS = [
  { id: "J001", title: "Senior React Developer", dept: "Engineering", location: "Chennai", type: "Full-time", applicants: 42, openings: 2, posted: "20 May 2026", status: "active" },
  { id: "J002", title: "HR Business Partner", dept: "HR", location: "Remote", type: "Full-time", applicants: 18, openings: 1, posted: "18 May 2026", status: "active" },
  { id: "J003", title: "Sales Manager", dept: "Sales", location: "Bangalore", type: "Full-time", applicants: 31, openings: 1, posted: "15 May 2026", status: "active" },
  { id: "J004", title: "Financial Analyst", dept: "Finance", location: "Chennai", type: "Full-time", applicants: 25, openings: 1, posted: "10 May 2026", status: "closed" },
  { id: "J005", title: "UI/UX Designer", dept: "Engineering", location: "Remote", type: "Contract", applicants: 56, openings: 1, posted: "08 May 2026", status: "active" },
  { id: "J006", title: "Operations Coordinator", dept: "Operations", location: "Chennai", type: "Full-time", applicants: 14, openings: 2, posted: "05 May 2026", status: "active" },
];

const DEPT_COLOR: Record<string, { bg: string; color: string }> = {
  Engineering: { bg: "#eff6ff", color: "#2563eb" },
  HR: { bg: "#ecfdf5", color: "#059669" },
  Sales: { bg: "#fdf4ff", color: "#9333ea" },
  Finance: { bg: "#fffbeb", color: "#d97706" },
  Operations: { bg: "#fff1f2", color: "#e11d48" },
};

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = JOBS.filter((j) => {
    const m = j.title.toLowerCase().includes(search.toLowerCase()) || j.dept.toLowerCase().includes(search.toLowerCase());
    return m && (filter === "all" || j.status === filter);
  });

  return (
    <div className="fade-up">
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Jobs & Recruitment</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
            {JOBS.filter((j) => j.status === "active").length} active openings · {JOBS.reduce((s, j) => s + j.applicants, 0)} total applicants
          </p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", border: "none", borderRadius: "10px", padding: "10px 18px", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
          <Plus style={{ width: 16, height: 16 }} /> Post Job
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#94a3b8" }} />
          <input placeholder="Search jobs…" value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "9px 12px 9px 36px", fontSize: "13px", color: "#1e293b", outline: "none", boxSizing: "border-box" }} />
        </div>
        {["all", "active", "closed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "8px 14px", borderRadius: "8px", border: "none", fontSize: "13px", fontWeight: 500, cursor: "pointer",
            background: filter === f ? "#2563eb" : "#fff", color: filter === f ? "#fff" : "#64748b",
            outline: filter === f ? "none" : "1px solid #e2e8f0", textTransform: "capitalize",
          } as React.CSSProperties}>{f}</button>
        ))}
      </div>

      {/* Job cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "16px" }}>
        {filtered.map((job) => {
          const dc = DEPT_COLOR[job.dept] ?? { bg: "#f1f5f9", color: "#64748b" };
          return (
            <div key={job.id} style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px", transition: "box-shadow 0.2s", cursor: "pointer" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div style={{ width: "40px", height: "40px", background: dc.bg, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Briefcase style={{ width: 18, height: 18, color: dc.color }} />
                </div>
                <span style={{
                  padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600,
                  background: job.status === "active" ? "#ecfdf5" : "#f1f5f9",
                  color: job.status === "active" ? "#059669" : "#94a3b8",
                  textTransform: "capitalize",
                }}>{job.status}</span>
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", marginBottom: "6px" }}>{job.title}</h3>
              <span style={{ display: "inline-block", padding: "3px 9px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, background: dc.bg, color: dc.color, marginBottom: "12px" }}>
                {job.dept}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin style={{ width: 13, height: 13, color: "#94a3b8" }} />
                  <span style={{ fontSize: "12px", color: "#64748b" }}>{job.location}</span>
                  <span style={{ fontSize: "12px", color: "#94a3b8", marginLeft: "4px" }}>·</span>
                  <Clock style={{ width: 13, height: 13, color: "#94a3b8" }} />
                  <span style={{ fontSize: "12px", color: "#64748b" }}>{job.type}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Users style={{ width: 13, height: 13, color: "#94a3b8" }} />
                  <span style={{ fontSize: "12px", color: "#64748b" }}><strong style={{ color: "#1e293b" }}>{job.applicants}</strong> applicants · {job.openings} opening{job.openings > 1 ? "s" : ""}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button style={{ flex: 1, padding: "8px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", color: "#64748b", cursor: "pointer", fontWeight: 500 }}>
                  View Applicants
                </button>
                <button style={{ flex: 1, padding: "8px", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "8px", fontSize: "12px", color: "#2563eb", cursor: "pointer", fontWeight: 500 }}>
                  Edit Job
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
