import React, { useState } from "react";
import { api } from "./api";
import UploadArea from "./components/UploadArea";
import PromptInput from "./components/PromptInput";
import SummaryEditor from "./components/SummaryEditor";
import EmailShare from "./components/EmailShare";

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [prompt, setPrompt] = useState("Summarize in concise bullet points highlighting action items and owners.");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailing, setEmailing] = useState(false);
  const [sentOK, setSentOK] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    setError("");
    setSentOK(false);
    if (transcript.trim().length < 30) return setError("Transcript is too short (min 30 chars).");
    if (prompt.trim().length < 3) return setError("Please enter a valid prompt.");

    try {
      setLoading(true);
      const { data } = await api.post("/summarize", { transcript, prompt });
      setSummary(data.summary || "");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async ({ to, subject, body }) => {
    setError("");
    setSentOK(false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return setError("Please enter a valid recipient email.");
    if (!body.trim()) return setError("Email body cannot be empty.");
    try {
      setEmailing(true);
      const { data } = await api.post("/send-email", { to, subject, body });
      setSentOK(Boolean(data.ok));
    } catch (e) {
      setError(e.message);
    } finally {
      setEmailing(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="h1">AI-powered meeting notes summarizer and share</div>
        {/* <p className="lead">Frontend kept intentionally basic — focus on functionality, not design.</p> */}

        {error && <div className="err" role="alert">{error}</div>}

        <UploadArea transcript={transcript} setTranscript={setTranscript} />
        <PromptInput prompt={prompt} setPrompt={setPrompt} onGenerate={generate} loading={loading} />
        <SummaryEditor summary={summary} setSummary={setSummary} />
        <EmailShare summary={summary} onSend={sendEmail} emailing={emailing} sentOK={sentOK} />

        <div className="hr" />
        <div className="small">© 2025 Meeting Notes. All rights reserved.
</div>
      </div>
    </div>
  );
}
