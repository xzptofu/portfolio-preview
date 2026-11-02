import type { Metadata } from "next";
import PublicationEntry from "../components/publication-entry";
import { WorldFooter, WorldHeader } from "../components/world-shell";
import s from "../components/interactive-world-prototype.module.css";
import { profile } from "../portfolio";
import { sitePath } from "../site-path";

export const metadata: Metadata = {
  title: "Publications — Zhipan Xu",
  description: "Publications by Zhipan Xu in online learning and machine learning.",
};

export default function Publications() {
  return (
    <div className={s.worldPage} id="top">
      <WorldHeader />
      <main className={s.directory}>
        <header className={s.directoryIntro}>
          <a href={sitePath("/")}>← Home</a>
          <h1>Publications</h1>
          <p>My research focuses on learning in dynamic environments. You can also find my publications on <a href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar ↗</a>.</p>
        </header>
        <section className={s.directoryGroup} aria-labelledby="conference-papers">
          <div className={s.publicationGroupHeading}><h2 id="conference-papers">Conference papers</h2><span>2024</span></div>
          <div className={s.directoryList}><PublicationEntry /></div>
        </section>
      </main>
      <WorldFooter />
    </div>
  );
}
