"use client";

import { useEffect } from "react";
import { sitePath } from "../../site-path";

// GitHub Pages cannot issue server-side redirects. Keep the old link usable.
export default function ResearchPlatform() {
  const destination = sitePath("/#experience");
  useEffect(() => { window.location.replace(destination); }, [destination]);
  return <main><p>Company experience is on the homepage. <a href={destination}>Go to experience</a>.</p></main>;
}
