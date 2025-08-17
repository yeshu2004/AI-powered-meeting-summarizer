import React, { useState, useEffect } from "react";

export default function EmailShare({ summary, onSend, emailing, sentOK }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Meeting Summary");
  const [body, setBody] = useState(summary);

  useEffect(() => setBody(summary), [summary]);

  const send = () => onSend({ to, subject, body });

  return (
    <section>
      <div className="hr" />
      <label className="label">Share via Email</label>
      <div className="row">
        <input className="input" placeholder="recipient@example.com" value={to} onChange={(e)=>setTo(e.target.value)} />
        <input className="input" placeholder="Subject" value={subject} onChange={(e)=>setSubject(e.target.value)} />
        <textarea className="textarea" placeholder="Email body…" value={body} onChange={(e)=>setBody(e.target.value)} />
        <div>
          <button className="btn" onClick={send} disabled={emailing || !summary.trim()}>
            {emailing ? "Sending…" : "Send Email"}
          </button>
          {sentOK && <div className="ok" style={{marginTop:8}}>Email sent.</div>}
        </div>
      </div>
    </section>
  );
}
