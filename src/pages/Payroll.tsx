import { Download, IndianRupee, TrendingUp, Users, CheckCircle } from "lucide-react";

const PAYROLL = [
  { name: "Arun Kumar", dept: "Engineering", basic: 55000, hra: 22000, allowances: 8000, deductions: 6500, net: 78500, status: "paid" },
  { name: "Priya Sharma", dept: "HR", basic: 45000, hra: 18000, allowances: 6000, deductions: 5200, net: 63800, status: "paid" },
  { name: "Karthik Raj", dept: "Finance", basic: 50000, hra: 20000, allowances: 7000, deductions: 5800, net: 71200, status: "processing" },
  { name: "Meena Devi", dept: "Sales", basic: 35000, hra: 14000, allowances: 5000, deductions: 4100, net: 49900, status: "paid" },
  { name: "Suresh Babu", dept: "Operations", basic: 48000, hra: 19200, allowances: 6500, deductions: 5600, net: 68100, status: "pending" },
  { name: "Lakshmi N", dept: "Engineering", basic: 60000, hra: 24000, allowances: 9000, deductions: 7200, net: 85800, status: "paid" },
];

const totalPayroll = PAYROLL.reduce((s, e) => s + e.net, 0);

export default function Payroll() {
  return (
    <div className="fade-up">
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Payroll</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>May 2026 — Salary processing</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg,#2563eb,#1d4ed8)", border: "none", borderRadius: "10px", padding: "10px 18px", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
          <Download style={{ width: 16, height: 16 }} /> Export Payslips
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "14px", marginBottom: "24px" }}>
        {[
          { label: "Total Payroll", value: `₹${totalPayroll.toLocaleString("en-IN")}`, icon: IndianRupee, color: "#2563eb", bg: "#eff6ff" },
          { label: "Employees Paid", value: PAYROLL.filter((e) => e.status === "paid").length.toString(), icon: CheckCircle, color: "#059669", bg: "#ecfdf5" },
          { label: "Avg. Salary", value: `₹${Math.round(totalPayroll / PAYROLL.length).toLocaleString("en-IN")}`, icon: TrendingUp, color: "#7c3aed", bg: "#f5f3ff" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e2e8f0", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: "38px", height: "38px", background: bg, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon style={{ width: 18, height: 18, color }} />
              </div>
              <span style={{ fontSize: "13px", color: "#64748b" }}>{label}</span>
            </div>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Payroll table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Users style={{ width: 16, height: 16, color: "#64748b" }} />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#0f172a" }}>Salary Breakdown — May 2026</span>
          </div>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>{PAYROLL.length} employees</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["Employee", "Dept", "Basic", "HRA", "Allowances", "Deductions", "Net Pay", "Status", ""].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYROLL.map((e) => (
                <tr key={e.name} style={{ borderBottom: "1px solid #f8fafc" }}
                  onMouseEnter={(ev) => ((ev.currentTarget as HTMLTableRowElement).style.background = "#f8fafc")}
                  onMouseLeave={(ev) => ((ev.currentTarget as HTMLTableRowElement).style.background = "transparent")}>
                  <td style={{ padding: "13px 16px", fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>{e.name}</td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#64748b" }}>{e.dept}</td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#1e293b" }}>₹{e.basic.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#1e293b" }}>₹{e.hra.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#059669" }}>+₹{e.allowances.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "13px 16px", fontSize: "13px", color: "#dc2626" }}>-₹{e.deductions.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "13px 16px", fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>₹{e.net.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{
                      display: "inline-flex", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600,
                      background: e.status === "paid" ? "#ecfdf5" : e.status === "processing" ? "#eff6ff" : "#fffbeb",
                      color: e.status === "paid" ? "#059669" : e.status === "processing" ? "#2563eb" : "#d97706",
                      textTransform: "capitalize",
                    }}>{e.status}</span>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <button style={{ background: "#f1f5f9", border: "none", borderRadius: "7px", padding: "6px 10px", cursor: "pointer", fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Download style={{ width: 12, height: 12 }} /> Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
