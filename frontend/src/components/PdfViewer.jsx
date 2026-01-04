import React from "react";

export default function PdfViewer({ canvasRef, hasPdf }) {
  return (
    <section className="viewer">
      <div className="canvas-shell">
        <canvas ref={canvasRef} className="pdf-canvas" />
        {!hasPdf && (
          <div className="empty-state">
            <h2>Open a PDF to get started</h2>
            <p>Drop a spec, contract, or design doc and ask the assistant to explain it.</p>
          </div>
        )}
      </div>
    </section>
  );
}
