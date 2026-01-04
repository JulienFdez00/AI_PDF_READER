import React from "react";

export default function ApiKeysPanel({
  provider,
  onProviderChange,
  model,
  onModelChange,
  parsingModel,
  onParsingModelChange,
  apiKey,
  onApiKeyChange,
  onSave,
  keyStatus,
}) {
  return (
    <div className="assistant-body">
      <label className="control">
        Provider
        <select value={provider} onChange={onProviderChange}>
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
          <option value="gemini">Gemini</option>
        </select>
      </label>
      <label className="control">
        Model
        <input
          type="text"
          value={model}
          onChange={onModelChange}
          placeholder="claude-sonnet-4-5"
        />
      </label>
      <label className="control">
        Parsing Model <span className="optional">(optional)</span>
        <input
          type="text"
          value={parsingModel}
          onChange={onParsingModelChange}
          placeholder="claude-haiku-4-5"
        />
      </label>
      <label className="control">
        API Key
        <input
          type="password"
          value={apiKey}
          onChange={onApiKeyChange}
          placeholder="sk-..."
        />
      </label>
      <button className="primary" onClick={onSave}>
        Save Credentials
      </button>
      {keyStatus && <div className="hint">{keyStatus}</div>}
      <div className="hint">Keys are stored securely in your local keychain when you save them.</div>
    </div>
  );
}
