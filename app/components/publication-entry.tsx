import { publication } from "../portfolio";
import { paperProject } from "../interactive-projects";
import { sitePath } from "../site-path";
import Citation from "./citation";
import { ArrowUpRight } from "./icons";
import { ProjectPresentation } from "./project-detail";
import s from "./interactive-world-prototype.module.css";

export default function PublicationEntry() {
  return (
    <article className={s.directoryItem} id="online-learning">
      <div className={s.directoryItemHeading}>
        <h3 className={s.publicationTitle}><a href={publication.url} target="_blank" rel="noreferrer">{publication.title}</a></h3>
        <span className={s.projectBadge}>NeurIPS 2024</span>
        <span className={s.directoryMeta}>First author</span>
      </div>
      <p><strong>Zhipan Xu</strong> and Lijun Zhang</p>
      <p><cite>Advances in Neural Information Processing Systems</cite>, 37, 51930–51962, 2024.</p>
      <div className={`${s.directoryLinks} ${s.publicationLinks}`}>
        <a href={publication.url} target="_blank" rel="noreferrer">Paper <ArrowUpRight /></a>
        <a href={publication.pdf} target="_blank" rel="noreferrer">PDF <ArrowUpRight /></a>
        <a href={sitePath("/#project-paper")}>Explore in research world <ArrowUpRight /></a>
      </div>
      <Citation text={publication.citation} />
      <div className={`${s.detail} ${s.publicationDetail}`}>
        <ProjectPresentation project={paperProject} showLinks={false} />
      </div>
    </article>
  );
}
