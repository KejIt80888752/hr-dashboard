import { useState } from "react";
import { CheckCircle, XCircle, AlertCircle, Calendar, TrendingUp } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TODAY_RECORDS = [
  { name: "Arun Kumar", dept: "Engineering", checkIn: "09:02", checkOut: "18:15", status: "present", hours: "9h 13m" },
  { name: "Priya Sharma", dept: "HR", checkIn: "08:55", checkOut: "17:50", status: "present", hours: "8h 55m" },
  { name: "Karthik Raj", dept: "Finance", checkIn: "09:30", checkOut: "--:--", status: "present", hours: "In office" },
  { name: "Meena Devi", dept: "Sales", checkIn: "--:--", checkOut: "--:--", status: "absent", hours: "0h" },
  { name: "Suresh Babu", dept: "Operations", checkIn: "10:15", checkOut: "--:--", status: "late", hours: "In office" },
  { name: "Lakshmi N", dept: "Engineering", checkIn: "09:00", checkOut: "17:00", status: "present", hours: "8h 00m" },
  { name: "Ravi Shankar", dept: "Sales", checkIn: "--:--", checkOut: "--:--", status: "leave", hours: "On Leave" },
];

const WEEKLY = [92, 88, 95, 91, 87, 60];

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string; icon: typeof CheckCircle }> = {
  present: { color: "#059669", bg: "#ecfdf5", label: "Present", icon: CheckCircle },
  absent: { color: "#dc2626", bg: "#fef2f2", label: "Absent", icon: XCircle },
  late: { color: "#d97706", bg: "#fffbeb", label: "Late", icon: AlertCircle },
  leave: { color: "#7c3aed", bg: "#f5f3ff", label: "On Leave", icon: Calendar },
};

export default function Attendance() {
  const [activeTab, setActiveTab] = useState<"today" | "weekly">("today");
  const present = TODAY_RECORDS.filter((r) => r.status === "present").length;
  const absent = TODAY_RECORDS.filter((r) => r.status === "absent").length;
  const late = TODAY_RECORDS.filter((r) => r.status === "late").length;
  const onLeave = TODAY_RECORDS.filter((r) => r.status === "leave").length;

  return (
    <div className="fade-up">
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Attendance</h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Present", value: present, color: "#059669" },
          { label: "Absent", value: absent, color: "#dc2626" },
          { label: "Late", value: late, color: "#d97706" },
          { label: "On Leave", value: onLeave, color: "#7c3aed" },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: "#fff", borderRadius: "14px", padding: "18px", border: "1px solid #e2e8f0" }}>
            <p style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a" }}>{value}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }} />
              <p style={{ fontSize: "13px", color: "#64748b" }}>{label}</p>
            </div>
            <div style={{ marginTop: "10px", height: "4px", background: "#f1f5f9", borderRadius: "2px" }}>
              <div style={{ height: "100%", width: `${(value / TODAY_RECORDS.length) * 100}%`, background: color, borderRadius: "2px" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Weekly trend */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <TrendingUp style={{ width: 16, height: 16, color: "#7c3aed" }} />
          <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Weekly Attendance Rate (%)</h3>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "80px" }}>
          {WEEKLY.map((val, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>{val}%</span>
              <div style={{ width: "100%", height: `${val * 0.6}px`, background: val >= 90 ? "#7c3aed" : val >= 80 ? "#f97316" : "#dc2626", borderRadius: "4px 4px 0 0" }} />
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs + Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: "0", borderBottom: "1px solid #f1f5f9", padding: "0 20px" }}>
          {(["today", "weekly"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "14px 18px",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #7c3aed" : "2px solid transparent",
              fontSize: "13px",
              fontWeight: 600,
              color: activeTab === tab ? "#7c3aed" : "#64748b",
              cursor: "pointer",
              textTransform: "capitalize",
            }}>
              {tab === "today" ? "Today" : "This Week"}
            </button>
          ))}
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              {["Employee", "Department", "Check In", "Check Out", "Hours", "Status"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TODAY_RECORDS.map((r) => {
              const s = STATUS_STYLE[r.status];
              const StatusIcon = s.icon;
              return (
                <tr key={r.name} style={{ borderBottom: "1px solid #f8fafc" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#f8fafc")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}>
                  <td style={{ padding: "13px 16px", fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>{r.name}</td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#64748b" }}>{r.dept}</td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#1e293b", fontFamily: "monospace" }}>{r.checkIn}</td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#1e293b", fontFamily: "monospace" }}>{r.checkOut}</td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#64748b" }}>{r.hours}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "20px", background: s.bg, color: s.color, fontSize: "12px", fontWeight: 600 }}>
                      <StatusIcon style={{ width: 12, height: 12 }} />
                      {s.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
