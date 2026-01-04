import React from "react";
import ReactMarkdown from "react-markdown";

export default function AssistantPanel({
  prompt,
  onPromptChange,
  onExplain,
  disabled,
  assistantStatus,
  assistantText,
  isStreaming,
  assistantError,
  parseWithLlm,
  onToggleParseWithLlm,
}) {
  return (
    <div className="assistant-body">
      <div className="assistant-controls">
        <label className="control">
          Prompt
          <textarea
            value={prompt}
            onChange={onPromptChange}
            placeholder="help me understand this page"
          />
        </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={parseWithLlm}
            onChange={onToggleParseWithLlm}
          />
          Parse with LLM
          <span
            className="info-bubble"
            data-tooltip="Ideal for scanned pages but more expensive."
            aria-label="Ideal for scanned pages but more expensive."
          >
            i
          </span>
        </label>
        <button className="primary" onClick={onExplain} disabled={disabled}>
          Help me understand this page
        </button>
      </div>
      <div className="assistant-output">
        <div className={assistantError ? "status status-error" : "status"}>
          Status: {assistantStatus}
        </div>
        {assistantText ? (
          <div className="assistant-markdown">
            <ReactMarkdown>{assistantText}</ReactMarkdown>
          </div>
        ) : isStreaming ? (
          <div className="assistant-empty">Thinking...</div>
        ) : (
          <div className="assistant-empty">Awaiting your prompt.</div>
        )}
      </div>
    </div>
  );
}
