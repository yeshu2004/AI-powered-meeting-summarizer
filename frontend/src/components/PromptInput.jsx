import React from "react";

export default function PromptInput({ prompt, setPrompt, onGenerate, loading }) {
  return (
    <section>
      <div className="hr" />
      <label className="label">Custom Instruction / Prompt</label>
      <input
        className="input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Summarize in bullet points highlighting action items and owners."
      />
      <div style={{marginTop:12}}>
        <button className="btn" onClick={onGenerate} disabled={loading}>
          {loading ? "Generating…" : "Generate Summary"}
        </button>
      </div>
    </section>
  );
}
