import { openSource } from "../portfolio";
import { sitePath } from "../site-path";
import type { Project, ProjectId } from "../interactive-projects";
import PaperChart from "./paper-chart";
import s from "./interactive-world-prototype.module.css";

function ProjectArtwork({ id }: { id: ProjectId }) {
  if (id === "paper") return <PaperChart />;
  if (id === "pynol") return <figure className={s.researchFigure}><a href={sitePath("/research/pynol-architecture.png")} target="_blank" rel="noreferrer"><img src={sitePath("/research/pynol-architecture.png")} width="1783" height="842" loading="lazy" decoding="async" alt="Original PyNOL package architecture diagram" /></a><figcaption>Original <a href={openSource.figureSource}>PyNOL architecture diagram</a>.</figcaption></figure>;
  if (id === "robotics") return <figure className={s.robotArtwork}><img src={sitePath("/prototype-art/robotics-garden-v1.png")} width="1536" height="1024" loading="lazy" decoding="async" alt="" /></figure>;
  if (id === "not-my-fault") return <figure className={s.demoFigure}><img src={sitePath("/fun-projects/not-my-fault-demo.jpg")} width="1920" height="882" loading="lazy" decoding="async" alt="Not My Fault demo screen featuring Judge Murphy in the replay courtroom." /></figure>;
  return null;
}

export function ProjectPresentation({ project, showLinks = true }: { project: Project; showLinks?: boolean }) {
  const hasArtwork = project.id !== "cs289";
  return (
    <div className={`${s.detailBody} ${hasArtwork ? "" : s.detailBodySingle}`}>
      <div className={s.detailCopy}>
        <p>{project.description}</p>
        {showLinks && project.links.length > 0 && <div className={s.detailLinks}>{project.links.map((link) => <a key={link.href} href={link.href}>{link.label} ↗</a>)}</div>}
      </div>
      {hasArtwork && <ProjectArtwork id={project.id} />}
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className={s.detailProject} id={`project-${project.id}`}>
      {project.citation ? (
        <div className={s.citationEntry}>
          <p>{project.citation.authors}.</p>
          <h3>{project.title}.</h3>
          <p><cite>{project.citation.proceedings}</cite>, {project.citation.volume}, <span className={s.citationPages}>{project.citation.pages}</span> <strong>({project.citation.conference})</strong>.</p>
        </div>
      ) : (
        <><p className={s.detailCategory}>{project.category}</p><h3>{project.title}</h3></>
      )}
      <ProjectPresentation project={project} />
    </article>
  );
}
