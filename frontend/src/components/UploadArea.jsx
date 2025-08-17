import React from "react";

export default function UploadArea({ transcript, setTranscript }) {
  const onFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = f.name.split(".").pop().toLowerCase();
    if (!["txt"].includes(ext)) {
      alert("Only .txt supported for uploads. You can paste text too.");
      e.target.value = "";
      return;
    }
    const text = await f.text();
    if (text.trim().length < 30) {
      alert("Transcript too short (min 30 chars).");
      return;
    }
    setTranscript(text);
  };

  return (
    <section>
      <div className="header">
        <p className="lead">The application is an AI-powered meeting notes summarizer and share.</p>
      </div>
      <div className="hr" />
      <h3 className="h1" style={{fontSize:16}}>How it Works</h3>
      <ul className="small" style={{marginBottom:16}}>
        <li>You should be able to <strong>upload a text transcript</strong> or paste it below.</li>
        <li>Enter a <strong>custom instruction</strong> (e.g., “Summarize in bullet points”).</li>
        <li>Click <strong>Generate Summary</strong> to produce a structured result.</li>
        <li>The summary is <strong>editable</strong>.</li>
        <li>Share the summary via <strong>email</strong>.</li>
      </ul>
      <div className="row" style={{marginBottom:12}}>
        <label className="label">Transcript</label>
        <textarea
          className="textarea"
          placeholder="Paste meeting notes / call transcript here…"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
        <input type="file" accept=".txt" onChange={onFile} />
        <div className="note">Accepts pasted text or .txt upload. Keep under ~200k characters.</div>
      </div>
    </section>
  );
}
