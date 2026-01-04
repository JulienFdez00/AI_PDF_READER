import React, { useRef } from "react";

export default function Toolbar({
  onFileOpen,
  onPrev,
  onNext,
  canPaginate,
  pageIndex,
  numPages,
  scale,
  onScaleChange,
  sidebarOpen,
  onToggleSidebar,
}) {
  const fileInputRef = useRef(null);

  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <button className="toolbar-button" onClick={() => fileInputRef.current?.click()}>
          Open PDF
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={onFileOpen}
          className="hidden-input"
        />
        <div className="divider" />
        <button className="toolbar-button" onClick={onPrev} disabled={!canPaginate}>
          ◀
        </button>
        <button className="toolbar-button" onClick={onNext} disabled={!canPaginate}>
          ▶
        </button>
        <span className="page-indicator">
          Page {pageIndex} / {numPages || "-"}
        </span>
        <div className="divider" />
        <label className="zoom">
          Zoom
          <input
            type="range"
            min="0.6"
            max="1.8"
            step="0.1"
            value={scale}
            onChange={onScaleChange}
          />
        </label>
      </div>
      <div className="toolbar-right">
        <button className="toolbar-button" onClick={onToggleSidebar}>
          {sidebarOpen ? "Hide Assistant" : "Show Assistant"}
        </button>
      </div>
    </header>
  );
}
