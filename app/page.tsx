"use client";

import { useState } from "react";
import { Mail, User, FileText, MessageSquare, UploadCloud, X, Send, Loader2 } from "lucide-react";

export default function Home() {
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/send-email", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setSending(false);

    if (data.success) {
      setStatus("Email sent successfully ✅");
      form.reset();
      setFileName("");
      setFileInputKey((prev) => prev + 1);
    } else {
      setStatus("Something went wrong ❌");
    }
  }

  return (
    <main style={{ background: "#f3f4f6", minHeight: "100vh", padding: "24px" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto", background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        {/* Header */}
        <div style={{ background: "#1e3a5f", padding: "28px 24px" }}>
          <h1 style={{ color: "#fff", fontSize: "24px", margin: 0 }}>CompassHome Mailer</h1>
          <p style={{ color: "#cbd5e1", fontSize: "14px", margin: "6px 0 0 0" }}>
            Send professional documents to your clients.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
          <label style={label}><Mail size={14} /> Recipient Email</label>
          <input name="to" type="email" placeholder="customer@example.com" required style={input} />

          <label style={label}><User size={14} /> Customer Name</label>
          <input name="recipientName" placeholder="John Doe" required style={input} />

          <label style={label}><FileText size={14} /> Document Title</label>
          <input name="documentTitle" placeholder="Rental Application" required style={input} />

          <label style={label}><MessageSquare size={14} /> Message</label>
          <textarea name="bodyText" placeholder="Type your message..." required rows={5} style={{ ...input, resize: "vertical" }} />

          <label style={label}><UploadCloud size={14} /> Upload PDF</label>
          <div style={{ position: "relative" }}>
            <label style={uploadBox}>
              <UploadCloud size={28} color="#1e3a5f" style={{ marginBottom: "8px" }} />
              <span style={{ fontWeight: 600, color: "#1e3a5f" }}>
                {fileName ? fileName : "Click to upload a PDF"}
              </span>
              <span style={{ fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
                PDF documents only
              </span>
              <input
                key={fileInputKey}
                name="file"
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
            </label>
            {fileName && (
              <button
                type="button"
                onClick={() => {
                  setFileName("");
                  setFileInputKey((prev) => prev + 1);
                }}
                style={deleteButton}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button type="submit" disabled={sending} style={{ ...button, opacity: sending ? 0.8 : 1 }}>
            {sending ? (
              <>
                <Loader2 size={16} style={{ animation: "spin 0.7s linear infinite" }} />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Email
              </>
            )}
          </button>

          {status && <p style={{ textAlign: "center", marginTop: "12px" }}>{status}</p>}
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}

const label: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "13px",
  fontWeight: 600,
  color: "#1e3a5f",
  margin: "16px 0 6px 0",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "14px",
  boxSizing: "border-box",
};

const uploadBox: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "28px",
  border: "2px dashed #cbd5e1",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
};

const deleteButton: React.CSSProperties = {
  position: "absolute",
  top: "8px",
  right: "8px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "24px",
  height: "24px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const button: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  marginTop: "24px",
  background: "#1e3a5f",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};