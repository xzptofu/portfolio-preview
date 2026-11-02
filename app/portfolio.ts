import { sitePath } from "./site-path";

// Only information displayed on the public site is kept in this preview.
export const profile = {
  name: "Zhipan Xu",
  chineseName: "许知攀",
  email: "zhipan_xu@berkeley.edu",
  cv: sitePath("/Zhipan_Xu_CV.pdf"),
  linkedin: "https://www.linkedin.com/in/zhipan-xu-2a79052b8/",
  scholar: "https://scholar.google.com/citations?user=6wIFtiEAAAAJ",
  github: "https://github.com/xzptofu",
  portrait: sitePath("/profile.jpg"),
};

export const academicLinks = {
  department: "https://eecs.berkeley.edu/",
  berkeley: "https://www.berkeley.edu/",
  nanjing: "https://www.nju.edu.cn/",
  nanjingCS: "https://cs.nju.edu.cn/",
  advisor: "https://ai.nju.edu.cn/zlj/index.htm",
  lab: "https://www.lamda.nju.edu.cn/CH.MainPage.ashx",
  labLead: "https://cs.nju.edu.cn/zhouzh/index.htm",
};

export const experiences = [
  { organization: "Berkeley Artificial Intelligence Research (BAIR)", role: "Graduate Student Researcher", period: "Aug 2026 — Present" },
  { organization: "EvoQuant Technology", role: "Quantitative Researcher", period: "May 2025 — Aug 2026" },
  { organization: "X-Square Asset", role: "Quantitative Research Intern", period: "Feb 2025 — May 2025" },
  { organization: "LAMDA Group, Nanjing University", role: "Undergraduate Researcher", period: "Jul 2023 — Mar 2024" },
];

export const publication = {
  title: "Online Non-convex Learning in Dynamic Environments",
  reference: {
    authors: "Zhipan Xu and Lijun Zhang",
    proceedings: "Advances in Neural Information Processing Systems",
    volume: "37",
    pages: "51930–51962",
    conference: "NeurIPS 2024",
  },
  url: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/5d1233f819202ade06023346df80a6d2-Abstract-Conference.html",
  pdf: "https://proceedings.neurips.cc/paper_files/paper/2024/file/5d1233f819202ade06023346df80a6d2-Paper-Conference.pdf",
  citation: `@inproceedings{xu2024online,
  title = {Online Non-convex Learning in Dynamic Environments},
  author = {Xu, Zhipan and Zhang, Lijun},
  booktitle = {Advances in Neural Information Processing Systems},
  volume = {37},
  pages = {51930--51962},
  year = {2024}
}`,
};

export const openSource = {
  title: "PyNOL",
  description: "Extended a toolkit for non-stationary online learning with FTPL and Adapt-ML-Prod base/meta learners, randomized-mixture components, and online-to-batch evaluation. Packaged and published the toolkit to PyPI.",
  contributions: "https://github.com/xzptofu/PyNOL/tree/xzp",
  package: "https://pypi.org/project/pynol-xzp/",
  figureSource: "https://github.com/xzptofu/PyNOL/blob/xzp/docs/_static/figures/PyNOL_structure.png",
};

export const capstone = {
  title: "Safe robotic manipulation",
  description: "Exploring reinforcement learning and online collision avoidance for safe robotic manipulation.",
};

export const education = [
  { name: "University of California, Berkeley", degree: "MEng · Electrical Engineering & Computer Sciences", period: "Aug 2026 — May 2027", note: "Fung Excellence Award" },
  { name: "Nanjing University", degree: "BS · Computer Science and Technology", period: "Sep 2021 — Jun 2025", note: "First-Class Scholarship" },
];
