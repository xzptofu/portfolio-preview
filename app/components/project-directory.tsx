"use client";

import { useState } from "react";
import { projects, topics, type ProjectId } from "../interactive-projects";
import { ProjectPresentation } from "./project-detail";
import s from "./interactive-world-prototype.module.css";

export default function ProjectDirectory() {
  const [expandedProjects, setExpandedProjects] = useState<ProjectId[]>([]);

  function toggleProject(id: ProjectId, button: HTMLButtonElement) {
    setExpandedProjects((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    window.requestAnimationFrame(() => button.scrollIntoView({ block: "nearest", behavior: "auto" }));
  }

  return topics.map((topic) => (
    <section className={s.directoryGroup} id={`topic-${topic.id}`} aria-labelledby={`directory-${topic.id}`} key={topic.id}>
      <h2 id={`directory-${topic.id}`}>{topic.title}</h2>
      <div className={s.directoryList}>
        {projects.filter((project) => project.topic === topic.id).map((project) => {
          const expanded = expandedProjects.includes(project.id);
          const hasDetails = project.showDirectoryDetails !== false;
          const primaryLink = project.links.find((link) => link.href.startsWith("https://"));
          return (
            <article className={s.directoryItem} key={project.id}>
              <div className={s.directoryItemHeading}>
                <h3>{project.title}</h3>
                {project.overviewBadge ? <span className={s.projectBadge}>{project.overviewBadge}</span> : <span className={s.directoryMeta}>{project.category}</span>}
              </div>
              <p>{project.summary}</p>
              {(hasDetails || primaryLink) && <div className={s.directoryLinks}>
                {hasDetails && <button type="button" aria-expanded={expanded} aria-controls={`directory-detail-${project.id}`} aria-label={`${expanded ? "Close details" : "View details"}: ${project.title}`} onClick={(event) => toggleProject(project.id, event.currentTarget)}>{expanded ? "Close details ×" : "View details +"}</button>}
                {!expanded && primaryLink && <a href={primaryLink.href}>{primaryLink.label} ↗</a>}
              </div>}
              {hasDetails && <div id={`directory-detail-${project.id}`}>
                {expanded && <div className={`${s.detail} ${s.directoryDetail}`}>
                  {project.citation && <div className={`${s.citationEntry} ${s.directoryCitation}`}>
                    <p>{project.citation.authors}.</p>
                    <p><cite>{project.citation.proceedings}</cite>, {project.citation.volume}, <span className={s.citationPages}>{project.citation.pages}</span> <strong>({project.citation.conference})</strong>.</p>
                  </div>}
                  <ProjectPresentation project={project} />
                </div>}
              </div>}
            </article>
          );
        })}
      </div>
    </section>
  ));
}
