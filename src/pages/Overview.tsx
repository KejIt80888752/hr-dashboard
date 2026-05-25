import {
  Users,
  CreditCard,
  FileText,
  Briefcase,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STAT_CARDS = [
  {
    label: "Total Employees",
    value: "248",
    change: "+12",
    trend: "up",
    icon: Users,
    color: "#2563eb",
    bg: "#eff6ff",
  },
  {
    label: "Payments Received",
    value: "₹4,82,500",
    change: "+8.2%",
    trend: "up",
    icon: CreditCard,
    color: "#059669",
    bg: "#ecfdf5",
  },
  {
    label: "Resumes Uploaded",
    value: "1,342",
    change: "+34",
    trend: "up",
    icon: FileText,
    color: "#7c3aed",
    bg: "#f5f3ff",
  },
  {
    label: "Open Positions",
    value: "18",
    change: "-3",
    trend: "down",
    icon: Briefcase,
    color: "#d97706",
    bg: "#fffbeb",
  },
];

const hiringData = [
  { month: "Dec", hired: 12, left: 4 },
  { month: "Jan", hired: 19, left: 6 },
  { month: "Feb", hired: 15, left: 3 },
  { month: "Mar", hired: 22, left: 7 },
  { month: "Apr", hired: 28, left: 5 },
  { month: "May", hired: 24, left: 4 },
];

const paymentTrend = [
  { month: "Dec", amount: 320000 },
  { month: "Jan", amount: 380000 },
  { month: "Feb", amount: 350000 },
  { month: "Mar", amount: 420000 },
  { month: "Apr", amount: 460000 },
  { month: "May", amount: 482500 },
];

const deptData = [
  { name: "Engineering", value: 82, color: "#2563eb" },
  { name: "Sales", value: 54, color: "#7c3aed" },
  { name: "HR", value: 28, color: "#059669" },
  { name: "Finance", value: 36, color: "#d97706" },
  { name: "Operations", value: 48, color: "#dc2626" },
];

const recentActivity = [
  { action: "Resume uploaded", name: "Arun Kumar", time: "2 min ago", type: "resume" },
  { action: "Payment received", name: "₹12,500 via Razorpay", time: "15 min ago", type: "payment" },
  { action: "New employee added", name: "Priya Sharma", time: "1 hr ago", type: "employee" },
  { action: "Resume uploaded", name: "Karthik Raj", time: "2 hr ago", type: "resume" },
  { action: "Payment received", name: "₹8,000 via Razorpay", time: "3 hr ago", type: "payment" },
];

const formatINR = (v: number) => `₹${(v / 1000).toFixed(0)}K`;

export default function Overview() {
  return (
    <div className="fade-up">
      {/* Page header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
          Overview of HR operations — {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {STAT_CARDS.map(({ label, value, change, trend, icon: Icon, color, bg }) => (
          <div
            key={label}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  background: bg,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon style={{ width: 20, height: 20, color }} />
              </div>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: trend === "up" ? "#059669" : "#dc2626",
                  background: trend === "up" ? "#ecfdf5" : "#fef2f2",
                  padding: "3px 8px",
                  borderRadius: "20px",
                }}
              >
                {trend === "up" ? <TrendingUp style={{ width: 12, height: 12 }} /> : <TrendingDown style={{ width: 12, height: 12 }} />}
                {change}
              </span>
            </div>
            <p style={{ fontSize: "24px", fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: "13px", color: "#64748b", marginTop: "6px" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
        {/* Hiring chart */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Hiring vs Attrition</h3>
            <p style={{ fontSize: "12px", color: "#64748b" }}>Last 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hiringData} barSize={14} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "none", borderRadius: "10px", color: "#f1f5f9", fontSize: "13px" }}
              />
              <Bar dataKey="hired" name="Hired" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="left" name="Left" fill="#fca5a5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Pie */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Department Strength</h3>
            <p style={{ fontSize: "12px", color: "#64748b" }}>Headcount by department</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deptData}
                cx="45%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {deptData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#0f172a", border: "none", borderRadius: "10px", color: "#f1f5f9", fontSize: "13px" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => <span style={{ fontSize: "12px", color: "#64748b" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment trend + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px" }}>
        {/* Payment Line Chart */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Payment Revenue</h3>
            <p style={{ fontSize: "12px", color: "#64748b" }}>Monthly Razorpay collections</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={paymentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={formatINR} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(v) => [`₹${Number(v).toLocaleString("en-IN")}`, "Revenue"]}
                contentStyle={{ background: "#0f172a", border: "none", borderRadius: "10px", color: "#f1f5f9", fontSize: "13px" }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#2563eb", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#2563eb" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
          <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0f172a" }}>Recent Activity</h3>
              <p style={{ fontSize: "12px", color: "#64748b" }}>Latest events</p>
            </div>
            <button
              style={{
                background: "#eff6ff",
                border: "none",
                borderRadius: "8px",
                padding: "5px 10px",
                fontSize: "12px",
                color: "#2563eb",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              View all <ArrowUpRight style={{ width: 12, height: 12 }} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentActivity.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background:
                      item.type === "payment" ? "#ecfdf5" : item.type === "resume" ? "#f5f3ff" : "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.type === "payment" ? (
                    <CreditCard style={{ width: 14, height: 14, color: "#059669" }} />
                  ) : item.type === "resume" ? (
                    <FileText style={{ width: 14, height: 14, color: "#7c3aed" }} />
                  ) : (
                    <Users style={{ width: 14, height: 14, color: "#2563eb" }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 500, color: "#1e293b", marginBottom: "2px" }}>{item.action}</p>
                  <p style={{ fontSize: "12px", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.name}
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                  <Clock style={{ width: 11, height: 11, color: "#94a3b8" }} />
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
