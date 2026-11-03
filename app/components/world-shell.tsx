import { profile } from "../portfolio";
import { sitePath } from "../site-path";
import s from "./interactive-world-prototype.module.css";

export function WorldHeader() {
  return (
    <header className={s.header}>
      <a href={sitePath("/#top")} className={s.brand}>Zhipan Xu</a>
      <nav aria-label="Main navigation">
        <a href={sitePath("/#world")}>Explore</a>
        <a href={sitePath("/projects/")}>Projects</a>
        <a href={sitePath("/publications/")}>Publications</a>
        <a href={sitePath("/#experience")}>Experience</a>
        <a href={sitePath("/#contact")}>Contact</a>
        <a href={profile.cv} download>Résumé ↗</a>
      </nav>
    </header>
  );
}

export function WorldFooter() {
  return (
    <footer className={s.footer}>
      <span>Zhipan Xu <span lang="zh">许知攀</span></span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
