import { useState } from "react";
import { Calendar, CheckCircle, XCircle, Clock, Plus } from "lucide-react";

const LEAVE_REQUESTS = [
  { id: "L001", name: "Arun Kumar", type: "Sick Leave", from: "26 May 2026", to: "27 May 2026", days: 2, reason: "Fever and cold", status: "pending", applied: "25 May 2026" },
  { id: "L002", name: "Meena Devi", type: "Casual Leave", from: "28 May 2026", to: "28 May 2026", days: 1, reason: "Personal work", status: "approved", applied: "24 May 2026" },
  { id: "L003", name: "Ravi Shankar", type: "Annual Leave", from: "01 Jun 2026", to: "07 Jun 2026", days: 5, reason: "Family vacation", status: "approved", applied: "20 May 2026" },
  { id: "L004", name: "Lakshmi N", type: "Maternity Leave", from: "15 Jun 2026", to: "15 Sep 2026", days: 90, reason: "Maternity", status: "pending", applied: "25 May 2026" },
  { id: "L005", name: "Suresh Babu", type: "Sick Leave", from: "22 May 2026", to: "22 May 2026", days: 1, reason: "Doctor visit", status: "rejected", applied: "22 May 2026" },
];

const LEAVE_BALANCE = [
  { type: "Annual Leave", total: 18, used: 5, color: "#2563eb" },
  { type: "Sick Leave", total: 12, used: 2, color: "#059669" },
  { type: "Casual Leave", total: 6, used: 3, color: "#d97706" },
  { type: "Maternity / Paternity", total: 90, used: 0, color: "#7c3aed" },
];

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  pending: { color: "#d97706", bg: "#fffbeb", label: "Pending" },
  approved: { color: "#059669", bg: "#ecfdf5", label: "Approved" },
  rejected: { color: "#dc2626", bg: "#fef2f2", label: "Rejected" },
};

export default function LeaveManagement() {
  const [filter, setFilter] = useState("all");

  const filtered = LEAVE_REQUESTS.filter((r) => filter === "all" || r.status === filter);

  return (
    <div className="fade-up">
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Leave Management</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Approve, reject and track employee leaves</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", border: "none", borderRadius: "10px", padding: "10px 18px", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
          <Plus style={{ width: 16, height: 16 }} /> Apply Leave
        </button>
      </div>

      {/* Leave balance */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "14px", marginBottom: "24px" }}>
        {LEAVE_BALANCE.map(({ type, total, used, color }) => (
          <div key={type} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <Calendar style={{ width: 18, height: 18, color }} />
              <span style={{ fontSize: "12px", color: "#64748b" }}>{used}/{total} used</span>
            </div>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>{total - used}</p>
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>{type}</p>
            <div style={{ marginTop: "10px", height: "4px", background: "#f1f5f9", borderRadius: "2px" }}>
              <div style={{ height: "100%", width: `${(used / total) * 100}%`, background: color, borderRadius: "2px" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginRight: "8px" }}>Leave Requests</span>
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "5px 12px", borderRadius: "8px", border: "none", fontSize: "12px", fontWeight: 500, cursor: "pointer",
              background: filter === f ? "#2563eb" : "#f1f5f9", color: filter === f ? "#fff" : "#64748b", textTransform: "capitalize",
            }}>{f}</button>
          ))}
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["Employee", "Leave Type", "From", "To", "Days", "Reason", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const s = STATUS_STYLE[r.status];
                return (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f8fafc" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#f8fafc")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}>
                    <td style={{ padding: "13px 16px", fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>{r.name}</td>
                    <td style={{ padding: "13px 16px", fontSize: "13px", color: "#64748b" }}>{r.type}</td>
                    <td style={{ padding: "13px 16px", fontSize: "13px", color: "#1e293b" }}>{r.from}</td>
                    <td style={{ padding: "13px 16px", fontSize: "13px", color: "#1e293b" }}>{r.to}</td>
                    <td style={{ padding: "13px 16px", fontSize: "13px", fontWeight: 600, color: "#0f172a", textAlign: "center" }}>{r.days}</td>
                    <td style={{ padding: "13px 16px", fontSize: "13px", color: "#64748b", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.reason}</td>
                    <td style={{ padding: "13px 16px" }}>
                      <span style={{ display: "inline-flex", padding: "4px 10px", borderRadius: "20px", background: s.bg, color: s.color, fontSize: "12px", fontWeight: 600 }}>{s.label}</span>
                    </td>
                    <td style={{ padding: "13px 16px" }}>
                      {r.status === "pending" && (
                        <div style={{ display: "flex", gap: "6px" }}>
                          <button title="Approve" style={{ background: "#ecfdf5", border: "none", borderRadius: "7px", padding: "6px", cursor: "pointer", color: "#059669" }}>
                            <CheckCircle style={{ width: 14, height: 14 }} />
                          </button>
                          <button title="Reject" style={{ background: "#fef2f2", border: "none", borderRadius: "7px", padding: "6px", cursor: "pointer", color: "#dc2626" }}>
                            <XCircle style={{ width: 14, height: 14 }} />
                          </button>
                        </div>
                      )}
                      {r.status !== "pending" && (
                        <span style={{ fontSize: "12px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                          <Clock style={{ width: 12, height: 12 }} /> {r.applied}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
