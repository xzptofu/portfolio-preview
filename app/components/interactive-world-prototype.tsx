"use client";

// PROTOTYPE: A navigable illustrated world for the existing personal homepage.
import { useEffect, useRef, useState } from "react";
import { academicLinks, education, experiences, openSource, profile } from "../portfolio";
import { projects, topics, type ProjectId, type Topic, type TopicId } from "../interactive-projects";
import { sitePath } from "../site-path";
import ProjectDetail from "./project-detail";
import { WorldFooter, WorldHeader } from "./world-shell";
import s from "./interactive-world-prototype.module.css";

function TopicDetail({ topic, onClose, inline = false }: { topic: Topic; onClose: () => void; inline?: boolean }) {
  return (
    <section className={s.detail} aria-label={`${topic.title} projects`}>
      <div className={s.detailHeading}>
        <div><p>{topic.place}</p>{!inline && <h2>{topic.title}</h2>}</div>
        {!inline && <button type="button" onClick={onClose} aria-label="Close topic details">Close ×</button>}
      </div>
      {topic.summary && <p className={s.detailIntro}>{topic.summary}</p>}
      {projects.filter((project) => project.topic === topic.id).map((project) => <ProjectDetail key={project.id} project={project} />)}
    </section>
  );
}

function Introduction() {
  return <section className={s.intro} id="about"><h1>Zhipan Xu</h1><figure className={s.introPortrait}><img src={profile.portrait} width="256" height="256" alt="Zhipan Xu" /></figure><p className={s.introBiography}>I am a graduate student in <a href={academicLinks.department}>Electrical Engineering and Computer Sciences</a> at <a href={academicLinks.berkeley}>UC Berkeley</a>. Previously, I received my B.S. from the <a href={academicLinks.nanjingCS}>School of Computer Science</a>, <a href={academicLinks.nanjing}>Nanjing University</a>, where I was very fortunate to be advised by <a href={academicLinks.advisor}>Prof. Lijun Zhang</a> in the <a href={academicLinks.lab}>LAMDA</a> Group, led by <a href={academicLinks.labLead}>Prof. Zhi-Hua Zhou</a>.</p></section>;
}

const experienceSummaries: Record<string, string> = {
  "Berkeley Artificial Intelligence Research (BAIR)": "Developing safe robotic manipulation policies using reinforcement learning and a custom MJX-Warp environment.",
  "EvoQuant Technology": "Built machine-learning systems for quantitative research on commodity futures.",
  "X-Square Asset": "Developed research tools for strategy selection and financial forecasting.",
  "LAMDA Group, Nanjing University": "Developed algorithms for online non-convex learning in dynamic environments.",
};

function Background() {
  return (
    <section className={s.background} id="experience">
      <h2>Experience &amp; education</h2>
      <div className={s.backgroundColumns}>
        <div>
          <h3>Experience</h3>
          {experiences.map((e) => (
            <article className={s.backgroundRow} key={e.organization}>
              <strong>{e.organization}</strong>
              <span className={s.backgroundRole}>{e.role}</span>
              <span className={s.backgroundPeriod}>{e.period}</span>
              <p>{experienceSummaries[e.organization]}</p>
            </article>
          ))}
        </div>
        <div>
          <h3>Education</h3>
          {education.map((e) => (
            <article className={s.backgroundRow} key={e.name}>
              <strong>{e.name}</strong>
              <span className={s.backgroundRole}>{e.degree}</span>
              <span className={s.backgroundPeriod}>{e.period}</span>
              <p>{e.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return <section className={s.contact} id="contact"><h2>Get in touch</h2><p>Find my research, code, résumé, or send me an email.</p><div className={s.contactLinks}><a href={`mailto:${profile.email}`}>Email ↗</a><a href={profile.scholar}>Google Scholar ↗</a><a href={profile.github}>GitHub ↗</a><a href={profile.linkedin}>LinkedIn ↗</a><a href={profile.cv} download>Résumé ↓</a></div></section>;
}

export default function InteractiveWorldPrototype() {
  const [selection, setSelection] = useState<{ topic: TopicId; location: "map" | "overview" } | null>(null);
  const [targetProject, setTargetProject] = useState<ProjectId | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const overviewButtons = useRef<Partial<Record<TopicId, HTMLButtonElement | null>>>({});
  const selectedOnMap = selection?.location === "map" ? topics.find((topic) => topic.id === selection.topic) : undefined;

  useEffect(() => {
    function openProjectFromHash() {
      const project = projects.find((item) => `#project-${item.id}` === window.location.hash);
      if (project) {
        setTargetProject(project.id);
        setSelection({ topic: project.topic, location: "map" });
      }
    }
    openProjectFromHash();
    window.addEventListener("hashchange", openProjectFromHash);
    return () => window.removeEventListener("hashchange", openProjectFromHash);
  }, []);

  useEffect(() => {
    if (selection?.location === "map") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const target = targetProject ? document.getElementById(`project-${targetProject}`) : detailRef.current;
      target?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    }
  }, [selection, targetProject]);

  function clearDeepLink() {
    setTargetProject(null);
    if (window.location.hash.startsWith("#project-")) {
      window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#world`);
    }
  }

  function select(id: TopicId, location: "map" | "overview") {
    clearDeepLink();
    setSelection((current) => current?.topic === id && current.location === location ? null : { topic: id, location });
    if (location === "overview") {
      window.requestAnimationFrame(() => overviewButtons.current[id]?.scrollIntoView({ block: "nearest", behavior: "auto" }));
    }
  }

  function closeTopic() {
    clearDeepLink();
    setSelection(null);
  }

  return (
    <div className={s.worldPage} id="top">
      <WorldHeader />
      <main>
        <Introduction />
        <section className={s.world} id="world" aria-labelledby="world-heading">
          <div className={s.worldHeading}><h2 id="world-heading">Explore my work</h2><p>Choose a place to explore a topic.</p></div>
          <div className={s.scene}>
            <img className={s.sceneImage} src={sitePath("/prototype-art/research-world.png")} alt="" width="1672" height="941" />
            <svg className={s.orbits} viewBox="0 0 1000 610" preserveAspectRatio="none" aria-hidden="true"><path d="M200 290 C350 340 425 280 510 325 S700 220 810 285" /><path d="M250 470 C390 425 430 335 510 325 S670 450 780 465" /><circle r="3" fill="#ffe4a9"><animateMotion dur="10s" repeatCount="indefinite" path="M200 290 C350 340 425 280 510 325 S700 220 810 285" /></circle><circle r="3" fill="#ffe4a9"><animateMotion dur="13s" repeatCount="indefinite" path="M250 470 C390 425 430 335 510 325 S670 450 780 465" /></circle></svg>
            <div className={s.hotspots}>{topics.map((topic) => <button key={topic.id} type="button" className={`${s.hotspot} ${s[topic.id]}`} aria-pressed={selection?.location === "map" && selection.topic === topic.id} aria-controls="topic-detail" onClick={() => select(topic.id, "map")}><span className={s.hotspotDot} aria-hidden="true" /><span className={s.hotspotText}><strong>{topic.title}</strong><small>{topic.place}</small></span></button>)}</div>
          </div>
          <div className={s.mobilePlaces} aria-label="Choose a place">{topics.map((topic) => <button key={topic.id} type="button" aria-pressed={selection?.location === "map" && selection.topic === topic.id} aria-controls="topic-detail" onClick={() => select(topic.id, "map")}><span className={s.hotspotText}><strong>{topic.title}</strong><small>{topic.place}</small></span><span aria-hidden="true">↗</span></button>)}</div>
        </section>
        <div ref={detailRef} className={s.detailAnchor} id="topic-detail" aria-live="polite">{selectedOnMap && <TopicDetail topic={selectedOnMap} onClose={closeTopic} />}</div>
        <noscript><section className={s.noScript}><h2>Project links</h2><p><a href={sitePath("/publications/#online-learning")}>Online Non-convex Learning</a> · <a href={openSource.contributions}>PyNOL contributions</a> · <a href={sitePath("/projects/")}>All projects</a></p></section></noscript>
        <section className={s.projectIndex} id="projects">
          <div className={s.sectionTitle}><h2>Explore by topic</h2><a href={sitePath("/projects/")}>All projects ↗</a></div>
          <div className={s.projectList}>
            {topics.map((topic, i) => {
              const overview = projects.filter((project) => project.topic === topic.id && project.showInOverview);
              const expanded = selection?.location === "overview" && selection.topic === topic.id;
              return (
                <section className={s.projectRow} id={`topic-${topic.id}`} key={topic.id}>
                  <span className={s.rowNumber}>0{i + 1}</span>
                  <div className={s.rowMain}>
                    <h3>{topic.title}</h3>
                    {overview.length > 0 ? overview.map((project) => <div className={s.projectPreview} key={project.id}><h4><span>{project.title}</span>{project.overviewBadge && <span className={s.projectBadge}>{project.overviewBadge}</span>}</h4><p>{project.summary}</p></div>) : topic.summary && <p>{topic.summary}</p>}
                    <button ref={(element) => { overviewButtons.current[topic.id] = element; }} type="button" aria-expanded={expanded} aria-controls={`overview-detail-${topic.id}`} aria-label={`${expanded ? "Close" : "Explore"} ${topic.title}`} onClick={() => select(topic.id, "overview")}>{expanded ? "Close topic ×" : "Explore topic +"}</button>
                  </div>
                  <div className={s.overviewDetail} id={`overview-detail-${topic.id}`} hidden={!expanded}>{expanded && <TopicDetail topic={topic} onClose={closeTopic} inline />}</div>
                </section>
              );
            })}
          </div>
        </section>
        <Background />
        <Contact />
      </main>
      <WorldFooter />
    </div>
  );
}
