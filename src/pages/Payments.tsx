import { useState } from "react";
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  IndianRupee,
  Download,
  Search,
  Filter,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

const PAYMENTS = [
  { id: "pay_001", name: "Arun Kumar", amount: 12500, status: "success", date: "25 May 2026", method: "UPI", razorpayId: "rzp_live_A1B2C3D4" },
  { id: "pay_002", name: "Priya Sharma", amount: 8000, status: "success", date: "24 May 2026", method: "Card", razorpayId: "rzp_live_E5F6G7H8" },
  { id: "pay_003", name: "Karthik Raj", amount: 15000, status: "pending", date: "24 May 2026", method: "Net Banking", razorpayId: "rzp_live_I9J0K1L2" },
  { id: "pay_004", name: "Meena Devi", amount: 6500, status: "failed", date: "23 May 2026", method: "UPI", razorpayId: "rzp_live_M3N4O5P6" },
  { id: "pay_005", name: "Suresh Babu", amount: 20000, status: "success", date: "23 May 2026", method: "Card", razorpayId: "rzp_live_Q7R8S9T0" },
  { id: "pay_006", name: "Lakshmi N", amount: 9000, status: "success", date: "22 May 2026", method: "UPI", razorpayId: "rzp_live_U1V2W3X4" },
  { id: "pay_007", name: "Ravi Shankar", amount: 11000, status: "pending", date: "22 May 2026", method: "Net Banking", razorpayId: "rzp_live_Y5Z6A7B8" },
];

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string; icon: typeof CheckCircle }> = {
  success: { color: "#059669", bg: "#ecfdf5", label: "Success", icon: CheckCircle },
  pending: { color: "#d97706", bg: "#fffbeb", label: "Pending", icon: Clock },
  failed: { color: "#dc2626", bg: "#fef2f2", label: "Failed", icon: XCircle },
};

export default function Payments() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [initiating, setInitiating] = useState(false);

  const filtered = PAYMENTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.razorpayId.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const totalSuccess = PAYMENTS.filter((p) => p.status === "success").reduce((s, p) => s + p.amount, 0);
  const totalPending = PAYMENTS.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const totalFailed = PAYMENTS.filter((p) => p.status === "failed").reduce((s, p) => s + p.amount, 0);

  const handleRazorpay = () => {
    setInitiating(true);
    // Razorpay SDK integration point
    // Load script dynamically when real key is available
    setTimeout(() => {
      alert("Razorpay integration ready.\nAdd your Key ID in the code to go live.\n\nKey ID: rzp_test_XXXXXXXXXX");
      setInitiating(false);
    }, 1200);
  };

  return (
    <div className="fade-up">
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Payments</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Razorpay payment tracking & management</p>
        </div>
        <button
          onClick={handleRazorpay}
          disabled={initiating}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 600,
            cursor: initiating ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
          }}
        >
          {initiating ? (
            <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} />
          ) : (
            <CreditCard style={{ width: 16, height: 16 }} />
          )}
          {initiating ? "Initiating…" : "New Payment"}
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Collected", amount: totalSuccess, color: "#059669", bg: "#ecfdf5", border: "#bbf7d0" },
          { label: "Pending", amount: totalPending, color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
          { label: "Failed", amount: totalFailed, color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
        ].map(({ label, amount, color, bg, border }) => (
          <div
            key={label}
            style={{
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: "14px",
              padding: "18px 20px",
            }}
          >
            <p style={{ fontSize: "12px", fontWeight: 600, color, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
              {label}
            </p>
            <p style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>
              ₹{amount.toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      {/* Razorpay info banner */}
      <div
        style={{
          background: "#f5f3ff",
          border: "1px solid #ddd6fe",
          borderRadius: "12px",
          padding: "14px 18px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            background: "#7c3aed",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IndianRupee style={{ width: 18, height: 18, color: "#fff" }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#5b21b6" }}>Razorpay Integration Ready</p>
          <p style={{ fontSize: "12px", color: "#8b5cf6", marginTop: "2px" }}>
            Add your Razorpay Key ID &amp; Key Secret in the environment variables to go live.
          </p>
        </div>
        <a
          href="https://dashboard.razorpay.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "12px",
            color: "#7c3aed",
            fontWeight: 600,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          Open Dashboard <ArrowUpRight style={{ width: 13, height: 13 }} />
        </a>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        {/* Table toolbar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
            <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#94a3b8" }} />
            <input
              placeholder="Search by name or ID…"
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Filter style={{ width: 15, height: 15, color: "#94a3b8" }} />
            {["all", "success", "pending", "failed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  background: filter === f ? "#7c3aed" : "#f1f5f9",
                  color: filter === f ? "#fff" : "#64748b",
                  textTransform: "capitalize",
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              background: "#f1f5f9",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "13px",
              color: "#64748b",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            <Download style={{ width: 14, height: 14 }} />
            Export
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["Transaction ID", "Employee", "Amount", "Method", "Date", "Status", ""].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const s = STATUS_STYLE[p.status];
                const StatusIcon = s.icon;
                return (
                  <tr
                    key={p.id}
                    style={{ borderBottom: "1px solid #f8fafc" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#f8fafc")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b", fontFamily: "monospace" }}>
                      {p.razorpayId}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>
                      {p.name}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>
                      ₹{p.amount.toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b" }}>{p.method}</td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#64748b" }}>{p.date}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          background: s.bg,
                          color: s.color,
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <StatusIcon style={{ width: 12, height: 12 }} />
                        {s.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "#7c3aed",
                          fontSize: "12px",
                          fontWeight: 600,
                          cursor: "pointer",
                          padding: "4px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
