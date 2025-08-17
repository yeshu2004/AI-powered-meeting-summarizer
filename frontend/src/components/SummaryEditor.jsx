import React from "react";

export default function SummaryEditor({ summary, setSummary }) {
  return (
    <section>
      <div className="hr" />
      <label className="label">Summary (Editable)</label>
      <textarea
        className="textarea"
        placeholder="Your AI summary will appear here…"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
    </section>
  );
}
