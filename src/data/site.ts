export const site = {
  name: "Ryan Dsouza",
  title: "Data Scientist & ML Engineer",
  pitch: "Data scientist & ML engineer building explainable, reproducible ML systems.",
  intro:
    "I'm a data scientist at KPMG and an M.S. Applied Data Science candidate at the University of Chicago. I build forecasting models, GenAI automation pipelines, and the data engineering underneath them, and I like shipping things end to end, from raw data to a running app.",
  location: "Chicago, IL",
  email: "ryanallandsouza@gmail.com",
  url: "https://ryandotcom.vercel.app",
  resume: "/Ryan_Dsouza_Resume.pdf",
  github: "https://github.com/ryantechs-dotcom",
  linkedin: "https://www.linkedin.com/in/ryan-dsouza-data2002/",
};

export const about = [
  "I care about models people can actually trust: leak audits and baselines before headline numbers, pipelines that rebuild from a clean clone, and outputs the people relying on them can understand.",
  "At KPMG I've built revenue forecasts, reconciliation pipelines over 10M+ rows of banking data, and a Claude-powered agent that writes control-testing summaries across 13 business units. At UChicago my coursework and projects span computer vision, MLOps, big data engineering, and time series.",
];

export type Engagement = {
  /** e.g. "Audit Automation Platform". Omit for roles without named workstreams. */
  name?: string;
  /** e.g. "Internal" or "Financial services client". */
  context?: string;
  points: string[];
};

export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  engagements: Engagement[];
  tech: string[];
};

export const experience: Role[] = [
  {
    company: "KPMG",
    title: "Advisory Associate, Data Scientist",
    period: "Aug 2025 – Present",
    location: "Chicago, IL",
    summary:
      "I'm on KPMG Advisory's data science team, building ML models, data pipelines, and LLM-powered automation for financial services clients and for KPMG's own lines of business. Most of my work runs end to end: scoping with stakeholders, building the pipeline or model, and shipping something people use day to day.",
    engagements: [
      {
        name: "AI Readiness Assessment",
        context: "Banking client",
        points: [
          "Architected and deployed a multi-agent AI workforce on Azure AI Foundry to run an end-to-end AI-readiness assessment, with agents ingesting and synthesizing 60+ internal client documents alongside KPMG's proprietary knowledge base and external web research.",
          "Designed the orchestration so agents cross-reference findings across sources into a structured capability-gap analysis. It kicked off the client's AI-readiness roadmap and shaped the scope of the next engagement phase.",
        ],
      },
      {
        name: "Control Testing Automation",
        context: "Financial services client",
        points: [
          "Architected a modular Snowflake pipeline (custom SQL extraction plus 12 Python scripts) that processes historical and current-period control data in separate streams before joining them, keeping query runtime down across 13 business units.",
          "Encapsulated completion, compliance-testing, and line-of-business mapping logic into a validated HTML compliance report, designed so logic can migrate from Python to plain SQL as the client's system of record matures.",
          "Extended the pipeline with a Claude-powered agent, guided by a custom SKILL.md, that writes narrative testing-outcome summaries straight from validated SQL results. It eliminated a month of manual testing work, about 2 FTEs of effort per reporting cycle.",
          "Automated a Google Sheets dashboard (Apps Script, JavaScript, SQL) tracking 1,200+ controls across 13 business units and 7 test leads, surfacing completion rates, delays, and control-risk metrics, and cutting reporting turnaround from 24 hours to 1 hour.",
        ],
      },
      {
        name: "Data Reconciliation & Platform Migration",
        context: "Financial services client",
        points: [
          "Engineered a multiprocessing Python reconciliation pipeline over 10M+ rows of banking data for a platform migration, applying bank-sweep, account-hierarchy, and security-ID logic to capture 80% of discrepancies and flag 10–400+ mismatches per bank each day.",
          "Moved the workflow to a SQL-driven pipeline refreshing a Power BI dashboard, so business stakeholders could monitor missing positions and trading-amount variances in real time. The project timeline dropped from 4 months to 3 weeks.",
        ],
      },
      {
        name: "Audit Automation Platform",
        context: "Internal",
        points: [
          "Built and trained 3 NLP models that score audit controls on 4 dimensions (human involvement, data accessibility, clarity, complexity) using labels from audit professionals, reaching 78% precision@5 and rolling up into an automation-feasibility rating for 7,600+ controls.",
          "Shipped a full-stack web app (Streamlit, Flask, Celery, Redis) used by 12 auditors in production, with a real-time automatability dashboard and a batch LLM pipeline that extracts key technologies and drafts automation recommendations per control. Manual review went from 3–4 hours to minutes.",
        ],
      },
      {
        name: "Revenue Forecasting",
        context: "Internal",
        points: [
          "Developed 3 time series forecasting models (BSTS, SARIMAX) for the Advisory, Tax, and Audit lines of business, combining Moody's macroeconomic signals with internal revenue data to reach 87% forecast accuracy.",
          "Enabled scenario projections for conditions like government shutdowns and market downturns, using sensitivity analysis to choose which macro variables to keep.",
        ],
      },
    ],
    tech: ["Python", "SQL", "Snowflake", "Azure AI Foundry", "Claude", "SageMaker", "Power BI", "Streamlit", "Flask", "Celery", "Redis"],
  },
  {
    company: "DePaul University",
    title: "Data Analyst & Transfer Peer Mentor",
    period: "Aug 2024 – Aug 2025",
    location: "Chicago, IL",
    summary:
      "A dual role: mentoring transfer students at DePaul, and building the data tooling the program used to track how its 150+ mentees were doing.",
    engagements: [
      {
        points: [
          "Built automated Python (Pandas, NumPy) reporting scripts and an Excel dashboard tracking 150+ mentees' progress and resource needs, cutting manual data collection time by 20%.",
          "Packaged the reporting and analysis pipeline into Docker images so non-technical senior leads could run analyses on their own, without engineering support.",
          "Analyzed mentee engagement trends in Jupyter to surface the factors behind student success, and presented recommendations to program leadership that shaped mentor expectations and resource allocation.",
          "Walked students through their own pathway data, which taught me to explain the same numbers very differently to administrators and to the students themselves.",
        ],
      },
    ],
    tech: ["Python", "Pandas", "NumPy", "Docker", "Jupyter", "Excel"],
  },
  {
    company: "KPMG",
    title: "Data Science Intern",
    period: "Jun 2023 – Aug 2024",
    location: "Chicago, IL",
    summary:
      "Rotated across KPMG's Tax, Audit, and Advisory lines of business on financial services engagements, including bank operations and payment processing.",
    engagements: [
      {
        points: [
          "Supported a data migration across 5 business lines, mapping 10,000+ rows at 95% accuracy for a smooth system cutover.",
          "Worked cross-functionally on a scalable data architecture that improved system performance by 20% and made data easier to access.",
          "Led COBOL modernization research and proposed an AI/ML-based roadmap projected to cut operational costs and technical debt by 30% over 5 years.",
          "Wrote Python for business logic too complex for Alteryx's built-in tools, helped document audit reports, and delivered client-facing presentations.",
        ],
      },
    ],
    tech: ["Python", "SQL", "Alteryx"],
  },
];

export type School = {
  school: string;
  degree: string;
  period: string;
  detail: string;
};

export const education: School[] = [
  {
    school: "University of Chicago",
    degree: "M.S. Applied Data Science",
    period: "Expected Dec 2026",
    detail:
      "GPA 4.0. ML Ops, Big Data Engineering, Computer Vision, Advanced Machine Learning, Time Series Analysis, Optimization & Simulation.",
  },
  {
    school: "DePaul University",
    degree: "B.S. Data Science & Mathematics",
    period: "Jun 2025",
    detail: "GPA 3.98, Summa Cum Laude.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "SQL", "R", "Java", "JavaScript", "TypeScript"] },
  {
    group: "ML / GenAI",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "YOLOv8", "Claude / LLM agents", "Multi-agent systems", "Azure AI Foundry"],
  },
  {
    group: "Data & MLOps",
    items: ["PySpark", "Snowflake", "Databricks", "MLflow", "DVC", "Docker", "FastAPI"],
  },
  { group: "Cloud", items: ["AWS (SageMaker, EMR, Athena)", "GCP", "Azure", "AWS Certified Cloud Practitioner"] },
  { group: "Web & apps", items: ["React", "Next.js", "Node.js", "Streamlit", "Flask", "Celery", "Redis"] },
  { group: "Analytics", items: ["Power BI", "Tableau", "Plotly", "Matplotlib", "A/B testing"] },
];
