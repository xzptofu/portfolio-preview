"use client";

import { useEffect, useRef, useState } from "react";
import s from "./interactive-world-prototype.module.css";

export default function Citation({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(text); setStatus("copied"); }
    catch { setStatus("failed"); }
    timer.current = setTimeout(() => setStatus("idle"), 4000);
  }
  return (
    <details className={s.citation}>
      <summary><span className={s.citationLabel}>Cite this paper</span><span aria-hidden="true">+</span></summary>
      <div className={s.citationBody}>
        <div className={s.citationToolbar}><span>BibTeX</span><button type="button" onClick={copy}>{status === "copied" ? "Copied ✓" : "Copy citation"}</button></div>
        <pre tabIndex={0} aria-label="BibTeX citation"><code>{text}</code></pre>
        <p className="sr-only" role="status">{status === "copied" ? "Citation copied to clipboard." : ""}</p>
        {status === "failed" && <p className={s.citationFailure} role="status">Copy is unavailable. You can select and copy the citation above.</p>}
      </div>
    </details>
  );
}
