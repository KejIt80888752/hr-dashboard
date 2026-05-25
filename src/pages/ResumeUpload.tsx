import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import {
  Upload,
  FileText,
  CheckCircle,
  X,
  Download,
  Eye,
  Search,
  Briefcase,
  Calendar,
  Loader2,
} from "lucide-react";

interface ResumeFile {
  id: string;
  name: string;
  applicant: string;
  position: string;
  size: string;
  date: string;
  status: "reviewing" | "shortlisted" | "rejected";
}

const SAMPLE_RESUMES: ResumeFile[] = [
  { id: "r1", name: "arun_kumar_resume.pdf", applicant: "Arun Kumar", position: "Software Engineer", size: "245 KB", date: "25 May 2026", status: "reviewing" },
  { id: "r2", name: "priya_sharma_cv.pdf", applicant: "Priya Sharma", position: "HR Manager", size: "189 KB", date: "24 May 2026", status: "shortlisted" },
  { id: "r3", name: "karthik_raj_resume.pdf", applicant: "Karthik Raj", position: "Finance Analyst", size: "312 KB", date: "24 May 2026", status: "reviewing" },
  { id: "r4", name: "meena_devi_cv.docx", applicant: "Meena Devi", position: "Sales Executive", size: "156 KB", date: "23 May 2026", status: "rejected" },
  { id: "r5", name: "suresh_babu_resume.pdf", applicant: "Suresh Babu", position: "Operations Lead", size: "278 KB", date: "22 May 2026", status: "shortlisted" },
];

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  reviewing: { color: "#d97706", bg: "#fffbeb", label: "Reviewing" },
  shortlisted: { color: "#059669", bg: "#ecfdf5", label: "Shortlisted" },
  rejected: { color: "#dc2626", bg: "#fef2f2", label: "Rejected" },
};

export default function ResumeUpload() {
  const [resumes, setResumes] = useState<ResumeFile[]>(SAMPLE_RESUMES);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      const newResumes: ResumeFile[] = Array.from(files).map((f, i) => ({
        id: `new_${Date.now()}_${i}`,
        name: f.name,
        applicant: "New Applicant",
        position: "To be assigned",
        size: `${Math.round(f.size / 1024)} KB`,
        date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        status: "reviewing",
      }));
      setResumes((prev) => [...newResumes, ...prev]);
      setUploading(false);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    simulateUpload(e.dataTransfer.files);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => simulateUpload(e.target.files);

  const removeResume = (id: string) => setResumes((prev) => prev.filter((r) => r.id !== id));

  const filtered = resumes.filter(
    (r) =>
      r.applicant.toLowerCase().includes(search.toLowerCase()) ||
      r.position.toLowerCase().includes(search.toLowerCase()) ||
      r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-up">
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a" }}>Resume Upload</h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
          Upload and manage candidate resumes
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Resumes", value: resumes.length, color: "#2563eb", bg: "#eff6ff" },
          { label: "Shortlisted", value: resumes.filter((r) => r.status === "shortlisted").length, color: "#059669", bg: "#ecfdf5" },
          { label: "Under Review", value: resumes.filter((r) => r.status === "reviewing").length, color: "#d97706", bg: "#fffbeb" },
        ].map(({ label, value, color, bg }) => (
          <div key={label} style={{ background: bg, borderRadius: "14px", padding: "16px 20px", border: `1px solid ${bg}` }}>
            <p style={{ fontSize: "28px", fontWeight: 700, color: "#0f172a" }}>{value}</p>
            <p style={{ fontSize: "13px", color, fontWeight: 500, marginTop: "4px" }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragging ? "#2563eb" : "#e2e8f0"}`,
          borderRadius: "16px",
          padding: "40px 24px",
          textAlign: "center",
          background: dragging ? "#eff6ff" : "#fff",
          cursor: "pointer",
          transition: "all 0.2s",
          marginBottom: "24px",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          onChange={handleChange}
          style={{ display: "none" }}
        />

        {uploading ? (
          <div>
            <Loader2 style={{ width: 40, height: 40, color: "#2563eb", margin: "0 auto 12px", animation: "spin 1s linear infinite" }} />
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#1e293b" }}>Uploading resumes…</p>
          </div>
        ) : uploadSuccess ? (
          <div>
            <CheckCircle style={{ width: 40, height: 40, color: "#059669", margin: "0 auto 12px" }} />
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#059669" }}>Upload successful!</p>
          </div>
        ) : (
          <div>
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "#eff6ff",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Upload style={{ width: 26, height: 26, color: "#2563eb" }} />
            </div>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#1e293b", marginBottom: "6px" }}>
              Drop resumes here or click to upload
            </p>
            <p style={{ fontSize: "13px", color: "#64748b" }}>
              Supports PDF, DOC, DOCX — up to 10 MB each
            </p>
          </div>
        )}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#94a3b8" }} />
            <input
              placeholder="Search resumes…"
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
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>{filtered.length} resumes</span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["File", "Applicant", "Position", "Size", "Date", "Status", "Actions"].map((h) => (
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
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => {
                const s = STATUS_STYLE[r.status];
                return (
                  <tr
                    key={r.id}
                    style={{ borderBottom: "1px solid #f8fafc" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "#f8fafc")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            background: "#f5f3ff",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <FileText style={{ width: 16, height: 16, color: "#7c3aed" }} />
                        </div>
                        <span style={{ fontSize: "13px", color: "#1e293b", fontWeight: 500, maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {r.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", fontWeight: 500, color: "#1e293b" }}>{r.applicant}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Briefcase style={{ width: 13, height: 13, color: "#94a3b8" }} />
                        <span style={{ fontSize: "13px", color: "#64748b" }}>{r.position}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#94a3b8" }}>{r.size}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Calendar style={{ width: 13, height: 13, color: "#94a3b8" }} />
                        <span style={{ fontSize: "13px", color: "#64748b" }}>{r.date}</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          background: s.bg,
                          color: s.color,
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          title="Preview"
                          style={{ background: "#f1f5f9", border: "none", borderRadius: "7px", padding: "6px", cursor: "pointer", color: "#64748b" }}
                        >
                          <Eye style={{ width: 14, height: 14 }} />
                        </button>
                        <button
                          title="Download"
                          style={{ background: "#eff6ff", border: "none", borderRadius: "7px", padding: "6px", cursor: "pointer", color: "#2563eb" }}
                        >
                          <Download style={{ width: 14, height: 14 }} />
                        </button>
                        <button
                          title="Remove"
                          onClick={() => removeResume(r.id)}
                          style={{ background: "#fef2f2", border: "none", borderRadius: "7px", padding: "6px", cursor: "pointer", color: "#dc2626" }}
                        >
                          <X style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                    No resumes found
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
