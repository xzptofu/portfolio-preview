import type { Metadata } from "next";
import ProjectDirectory from "../components/project-directory";
import { sitePath } from "../site-path";
import { WorldFooter, WorldHeader } from "../components/world-shell";
import s from "../components/interactive-world-prototype.module.css";

export const metadata: Metadata = {
  title: "Projects — Zhipan Xu",
  description: "Research, open-source software, and projects by Zhipan Xu.",
};

export default function ProjectsPage() {
  return (
    <div className={s.worldPage} id="top">
      <WorldHeader />
      <main className={s.directory}>
        <header className={s.directoryIntro}>
          <a href={sitePath("/")}>← Home</a>
          <h1>Projects</h1>
          <p>Research, open-source software, and other work I have chosen to share.</p>
        </header>
        <ProjectDirectory />
      </main>
      <WorldFooter />
    </div>
  );
}
