import { BarChart2, Download, FileText, TrendingUp, Users, CreditCard, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const MONTHLY_HIRING = [
  { month: "Dec", hired: 12 }, { month: "Jan", hired: 19 }, { month: "Feb", hired: 15 },
  { month: "Mar", hired: 22 }, { month: "Apr", hired: 28 }, { month: "May", hired: 24 },
];
const PAYROLL_TREND = [
  { month: "Dec", amount: 380000 }, { month: "Jan", amount: 395000 }, { month: "Feb", amount: 388000 },
  { month: "Mar", amount: 412000 }, { month: "Apr", amount: 428000 }, { month: "May", amount: 417200 },
];

const REPORT_TYPES = [
  { title: "Employee Report", desc: "Full headcount, demographics & department summary", icon: Users, color: "#7c3aed", bg: "#f5f3ff" },
  { title: "Payroll Report", desc: "Monthly salary breakdown, deductions & net pay", icon: CreditCard, color: "#059669", bg: "#ecfdf5" },
  { title: "Attendance Report", desc: "Daily, weekly and monthly attendance analysis", icon: Calendar, color: "#d97706", bg: "#fffbeb" },
  { title: "Leave Report", desc: "Leave balances, usage patterns and trends", icon: FileText, color: "#7c3aed", bg: "#f5f3ff" },
];

export default function Reports() {
  return (
    <div className="fade-up">
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Reports</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Analytics and downloadable HR reports</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#7c3aed,#6d28d9)", border: "none", borderRadius: "10px", padding: "10px 18px", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
          <Download style={{ width: 16, height: 16 }} /> Export All
        </button>
      </div>

      {/* Quick reports */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "14px", marginBottom: "24px" }}>
        {REPORT_TYPES.map(({ title, desc, icon: Icon, color, bg }) => (
          <div key={title} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "18px", cursor: "pointer", transition: "box-shadow 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}>
            <div style={{ width: "40px", height: "40px", background: bg, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
              <Icon style={{ width: 18, height: 18, color }} />
            </div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a", marginBottom: "5px" }}>{title}</p>
            <p style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5, marginBottom: "12px" }}>{desc}</p>
            <button style={{ display: "flex", alignItems: "center", gap: "5px", background: bg, border: "none", borderRadius: "7px", padding: "6px 10px", fontSize: "12px", color, fontWeight: 600, cursor: "pointer" }}>
              <Download style={{ width: 12, height: 12 }} /> Download
            </button>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <BarChart2 style={{ width: 16, height: 16, color: "#7c3aed" }} />
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Monthly Hiring (Last 6 months)</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MONTHLY_HIRING} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#0f172a", border: "none", borderRadius: "10px", color: "#f1f5f9", fontSize: "13px" }} />
              <Bar dataKey="hired" name="Hired" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <TrendingUp style={{ width: 16, height: 16, color: "#059669" }} />
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Monthly Payroll (₹)</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={PAYROLL_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Payroll"]} contentStyle={{ background: "#0f172a", border: "none", borderRadius: "10px", color: "#f1f5f9", fontSize: "13px" }} />
              <Line type="monotone" dataKey="amount" stroke="#059669" strokeWidth={2.5} dot={{ r: 4, fill: "#059669" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
