import { capstone, openSource, publication } from "./portfolio";
import { sitePath } from "./site-path";

export type TopicId = "learning" | "signals" | "software" | "robotics";
export type ProjectId = "paper" | "pynol" | "cs289" | "not-my-fault" | "robotics";
export type ProjectLink = { label: string; href: string };

export type Topic = {
  id: TopicId;
  title: string;
  place: string;
  summary?: string;
};

export type ProjectCitation = {
  authors: string;
  proceedings: string;
  volume: string;
  pages: string;
  conference: string;
};

export type Project = {
  id: ProjectId;
  topic: TopicId;
  title: string;
  category: string;
  citation?: ProjectCitation;
  overviewBadge?: string;
  summary: string;
  description: string;
  links: ProjectLink[];
  showInOverview: boolean;
  showDirectoryDetails?: boolean;
};

export const topics: Topic[] = [
  {
    id: "learning",
    title: "Online Learning & Optimization",
    place: "Learning Observatory",
  },
  {
    id: "signals",
    title: "Quant",
    place: "Signal Station",
    summary: "Machine learning for financial data and prediction.",
  },
  {
    id: "robotics",
    title: "Robotics",
    place: "Robot Garden",
  },
  {
    id: "software",
    title: "Fun Projects",
    place: "The Workshop",
  },
];

// The owner chooses what belongs here. Overview summaries and the topic panels
// can differ when a project should appear only after opening its topic.
export const paperProject: Project = {
  id: "paper",
  topic: "learning",
  title: publication.title,
  category: "NeurIPS 2024 · First-author paper",
  citation: publication.reference,
  overviewBadge: "NeurIPS 2024",
  summary: "Designed online non-convex learning algorithms with dynamic and adaptive regret guarantees in changing environments.",
  description: "This work develops expert and meta-algorithm frameworks for online learning with non-convex losses in dynamic environments, with dynamic and adaptive regret guarantees. We evaluate the approach in online constrained meta-learning.",
  links: [
    { label: "Read the paper", href: publication.url },
    { label: "Open PDF", href: publication.pdf },
    { label: "Details & citation", href: sitePath("/publications/#online-learning") },
  ],
  showInOverview: true,
};

export const projects: Project[] = [
  paperProject,
  {
    id: "pynol",
    topic: "learning",
    title: openSource.title,
    category: "Open-source research software · Python",
    summary: "Extended PyNOL with FTPL and Adapt-ML-Prod algorithms and online-to-batch evaluation, then packaged the toolkit for PyPI.",
    description: openSource.description,
    links: [
      { label: "View contributions", href: openSource.contributions },
      { label: "PyPI package", href: openSource.package },
    ],
    showInOverview: true,
  },
  {
    id: "cs289",
    topic: "signals",
    title: "Large Language Models for Post-Earnings-Call Stock Return Prediction",
    category: "In progress",
    summary: "Designing and training a decision-making head on a frozen ChronoGPT model to predict post-earnings-call stock returns.",
    description: "Exploring stock-return prediction after earnings calls by designing and training a decision-making head on a frozen ChronoGPT model.",
    links: [],
    showInOverview: true,
    showDirectoryDetails: false,
  },
  {
    id: "not-my-fault",
    topic: "software",
    title: "Not My Fault",
    category: "Cal Hacks 13.0 · Collaborative prototype",
    summary: "Judge Murphy reviews Overwatch replays; I worked on reconstruction, judgment, and evidence auditing.",
    description: "An Overwatch replay reviewer where Judge Murphy (Sojourn’s dog) examines up to five perspectives of a fight and returns a verdict with clickable evidence, a subjective blame estimate, and advice for the next match.",
    links: [
      { label: "GitHub repository", href: "https://github.com/LuQilin6/OverJudge" },
      { label: "Project overview", href: "https://devpost.com/software/not-my-fault" },
    ],
    showInOverview: false,
  },
  {
    id: "robotics",
    topic: "robotics",
    title: capstone.title,
    category: "In progress",
    summary: "At BAIR, I develop safe robotic manipulation policies with reinforcement learning, using a custom MJX-Warp environment for PPO training and diffusion-policy fine-tuning.",
    description: capstone.description,
    links: [],
    showInOverview: true,
  },
];
