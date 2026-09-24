// Every project on the site lives here. To add one, append an entry:
// the home page cards and the /projects/[slug] case-study page are generated from it.

export type Project = {
  slug: string;
  title: string;
  /** One sentence shown on the card and at the top of the case study. */
  summary: string;
  year: number;
  /** e.g. course, employer, or team size. */
  context: string;
  featured: boolean;
  /** Headline result shown on the card. */
  metric?: { value: string; label: string };
  tech: string[];
  /** Omit for projects that aren't public yet. */
  repo?: string;
  demo?: string;
  image?: { src: string; alt: string; width: number; height: number; caption?: string };
  problem: string[];
  approach: string[];
  /** Monospace diagram rendered as-is. */
  architecture?: string;
  results?: { columns: string[]; rows: string[][]; note?: string };
  next: string[];
};

const gh = (repo: string) => `https://github.com/ryantechs-dotcom/${repo}`;

export const projects: Project[] = [
  {
    slug: "pill-identification",
    title: "Pill Identification",
    summary:
      "Classification, segmentation, and instance segmentation of pharmaceutical pills from photos, served through a Dockerized demo app.",
    year: 2026,
    context: "UChicago · Advanced Computer Vision & Deep Learning · Team of 4",
    featured: true,
    metric: { value: "94.8%", label: "U-Net mean IoU" },
    tech: ["PyTorch", "TensorFlow", "EfficientNet", "YOLOv8-seg", "FastAPI", "Qdrant", "Docker"],
    repo: gh("Pill-Image-Classification"),
    image: {
      src: "/projects/pill-unet-segmentation.png",
      alt: "Pill photos next to ground-truth masks and U-Net predicted masks",
      width: 866,
      height: 1190,
      caption: "U-Net segmentation on held-out C3PI photos: input, ground truth, prediction.",
    },
    problem: [
      "A pill outside its labeled bottle loses the information that identifies it: name, dosage, imprint. A large and growing share of U.S. poison control calls are pill-ID requests, driven by pills leaving their packaging and by generic manufacturers changing a drug's color, shape, or size.",
      "We treated \"what pill is this\" (classification) and \"where are the pills\" (instance segmentation) as the two different problems they are, and trained a model for each.",
    ],
    approach: [
      "Scraped the NLM C3PI catalog (8,081 raw rows) down to 4,256 clean classification images across 172 classes and 1,226 real segmentation masks.",
      "Classification: a from-scratch CNN baseline, then EfficientNetB0 transfer learning.",
      "Segmentation: a ViT segmenter and a U-Net trained on real C3PI masks.",
      "Instance segmentation: YOLOv8-seg, two-stage fine-tuned on a real annotated multi-pill dataset (6,609 / 826 / 826 split).",
      "Ran a near-duplicate leak audit before reporting any numbers. It forced a data fix, and every result below is post-fix.",
      "Abandoned a synthetic-composite YOLO dataset after an audit found 0 of 370 sampled C3PI image/mask pairs reliable enough to composite from.",
    ],
    architecture: `C3PI scraper --> manifests --> train / val / test folders
                                   |
          +------------------------+-------------------------+
          v                        v                         v
  CNN / EfficientNetB0      ViT / U-Net masks        YOLOv8-seg (real COCO data)
          +------------------------+-------------------------+
                                   v
          FastAPI backend --> JS frontend      Qdrant: "similar pills on file"
                    (docker compose: api + qdrant)`,
    results: {
      columns: ["Model", "Task", "Result"],
      rows: [
        ["CNN baseline", "Classification", "37.7% top-1 (F1 0.36)"],
        ["EfficientNetB0", "Classification", "64.2% top-1 (F1 0.63)"],
        ["ViT segmenter", "Segmentation", "83.7% mean IoU"],
        ["U-Net", "Segmentation", "94.8% mean IoU"],
        ["YOLOv8-seg", "Instance segmentation", "91.5% mask mAP@50 · 75.3% mAP@50–95"],
      ],
      note: "Held-out test sets. The single-model EfficientNetB0 (no OCR) already outperforms MobileDeepPill's multi-CNN retrieval baseline on the same C3PI lineage, though task framing differs across published work.",
    },
    next: [
      "Add imprint OCR to close the gap on visually identical pills.",
      "Host the demo publicly (deployment notes are in pill_webapp/HOSTING.md).",
    ],
  },
  {
    slug: "global-trade-news",
    title: "Global Trade News",
    summary:
      "A MySQL warehouse linking UN Comtrade trade flows to GDELT news and geopolitical events, with a multi-page Streamlit dashboard on top.",
    year: 2026,
    context: "UChicago · Data Engineering Platforms · Team of 4",
    featured: true,
    metric: { value: "HS-6 × month", label: "trade flows joined to world news" },
    tech: ["Python", "MySQL", "GCP Cloud SQL", "Streamlit", "pydeck", "FastAPI"],
    repo: gh("Global-Trade-News"),
    image: {
      src: "/projects/trade-eer.png",
      alt: "Entity-relationship diagram of the trade warehouse: fact_trade_granular joined to seven mapping dimensions",
      width: 1002,
      height: 1384,
      caption: "Warehouse EER model: one granular fact table, foreign-keyed to every dimension.",
    },
    problem: [
      "Trade data tells you how volume moved; news tells you why. The two live in different systems with different keys, so asking \"what happened to steel imports when tariffs were in the headlines?\" means stitching them together by hand.",
    ],
    approach: [
      "Designed a star schema: fact_trade_granular at (period, reporter, flow, partner, commodity, customs, transport) grain, plus news_articles, news_events, and a pre-aggregated news_linking rollup.",
      "Wrote resumable, budget-aware ETL for the Comtrade API (~500 calls/day cap). It detects the 100k-row page cap and refetches truncated chunks in HS-code batches.",
      "Pulled GDELT articles and CAMEO-coded events with exponential backoff, scored each article against every commodity search term, and attributed it to exactly one commodity (runner-up kept for QA).",
      "Joined trade to news on cmd_code × period, and built a five-page dashboard: corridors, country profiles, commodity share, and concentration risk (HHI + volatility).",
    ],
    architecture: `UN Comtrade API --ETL--+                +-- Streamlit dashboard (5 pages)
                       +--> MySQL ------+
GDELT DOC + Events -ETL+   warehouse    +-- FastAPI chat backend
Reference CSVs --> 7 dimension tables`,
    next: [
      "A \"Risk Overlay\" page combining structural concentration (HHI) with GDELT tone.",
      "Soft (weighted) attribution for articles that span several commodities.",
    ],
  },
  {
    slug: "crossfit-mlops",
    title: "CrossFit Strength MLOps Pipeline",
    summary:
      "A fully reproducible ML pipeline with versioned data, features, and models, benchmarked against two AutoML frameworks.",
    year: 2026,
    context: "UChicago · ML Ops",
    featured: true,
    metric: { value: "1 command", label: "rebuilds data, features & models" },
    tech: ["DVC", "Feast", "MLflow", "XGBoost", "PyCaret", "H2O"],
    repo: gh("CrossFit-Strength-Forecasting"),
    problem: [
      "Predict a CrossFit athlete's total strength from demographics and training background. The model is simple on purpose. The point is the infrastructure: every dataset, feature set, and model is versioned and rebuilds from a clean clone.",
    ],
    approach: [
      "DVC stage graph (dvc.yaml + dvc.lock) for data and pipeline versioning.",
      "Feast feature views (v1, v2) retrieved at training time.",
      "MLflow experiment tracking and a model registry tagged with feature version, over a 2×2 grid of feature version × hyperparameters.",
      "A leakage guard that always drops the target's components, and two-stage outlier handling (hard thresholds, then z-score).",
      "Patched a PyCaret/MLflow autologger crash (pycaret#4100) and logged runs through MLflow's public API instead.",
    ],
    architecture: `ingest -> preprocess -> feature_engineering -> split (Feast) -> train -> evaluate -> compare
                                 |
                                 +-> automl_pycaret --+
                                 +-> automl_h2o ------+-> automl_compare`,
    results: {
      columns: ["Model", "RMSE", "MAE", "R²"],
      rows: [
        ["XGBoost (hand-configured)", "151.5", "117.9", "0.701"],
        ["PyCaret best: LightGBM", "151.3", "118.0", "0.694"],
        ["H2O best: Stacked Ensemble", "150.2", "117.3", "n/a"],
      ],
      note: "Held-out test set, n = 5,822. Two independent AutoML searches landed within about 1 RMSE of the hand-tuned model, which suggests the signal in these features is close to saturated.",
    },
    next: [
      "Fix the upstream encoding that leaves v2's engineered survey features constant, so the v1-vs-v2 comparison means something.",
    ],
  },
  {
    slug: "job-recommender",
    title: "Distributed Job Recommender",
    summary:
      "A two-stage job recommender on AWS EMR: Word2Vec embeddings, LSH candidate retrieval, and a neural ranking model.",
    year: 2025,
    context: "Big data project",
    featured: true,
    metric: { value: "3 GB+", label: "job-application data on AWS EMR" },
    tech: ["PySpark", "AWS EMR", "S3", "Spark ML", "TensorFlow"],
    repo: gh("Distributed-Job-Recommender"),
    problem: [
      "Recommend jobs to ~390K CareerBuilder users from their work histories and past applications, at a scale where a full user × job distance matrix isn't an option.",
    ],
    approach: [
      "Trained 100-d Word2Vec embeddings for job postings and user work histories, written to S3 as Parquet per time window.",
      "Retrieval: Spark ML BucketedRandomProjectionLSH over job vectors for approximate nearest neighbors.",
      "Ranking: an MLP (256 → 128 → 64, dropout 0.3) on concatenated user and job vectors, trained on applications vs. 3 sampled negatives each.",
    ],
    architecture: `jobs --> clean + tokenize --> Word2Vec --> job vectors -----------+
history --> title tokens --> Word2Vec --> mean --> user vectors --+
                                                                  v
          Retrieval: LSH over job vectors --> top-k jobs per user
          Ranking:   MLP on [user || job]  --> P(apply)`,
    results: {
      columns: ["Model", "Split", "Accuracy", "ROC-AUC"],
      rows: [["Ranking MLP", "20% held-out, window 6 sample", "95.5%", "0.997"]],
      note: "These numbers come from a small sample of one window with random negatives, which makes the task easy. Treat them as proof the pipeline works end to end, not a production estimate.",
    },
    next: [
      "Fix a retrieval-evaluation bug where precision@k always comes out 1.0 (the hit check tests the join key).",
      "Evaluate on a later time window with ranking metrics (precision@k, NDCG) and hard negatives.",
    ],
  },
  {
    slug: "order-matching-engine",
    title: "Order-Matching Engine",
    summary:
      "A limit order book and matching engine in Java with market-maker quotes and pro-rata fill allocation.",
    year: 2025,
    context: "Object-oriented design",
    featured: true,
    metric: { value: "O(log n)", label: "best bid / ask lookup" },
    tech: ["Java 16+", "OOP", "Flyweight", "Singleton"],
    repo: gh("order-matching-engine"),
    problem: [
      "Build the core of an exchange: accept orders and two-sided quotes, keep each product's book sorted, and match crossing orders correctly without floating-point money errors.",
    ],
    approach: [
      "Each book side is a TreeMap<Price, List<Tradable>>; the BUY side is reverse-ordered so best bid and best ask are both firstKey().",
      "Every add triggers tryTrade(), which trades level by level while best bid ≥ best ask.",
      "Pro-rata allocation across resting orders at a price level, capped so a level is never over-filled.",
      "Immutable integer-cent Price objects, cached by a Flyweight factory; fills reported as immutable record DTOs.",
    ],
    architecture: `ProductManager (Singleton) --> ProductBook (one per symbol)
                                 +-- BUY  side  TreeMap<Price, List<Tradable>>  (desc)
                                 +-- SELL side  TreeMap<Price, List<Tradable>>  (asc)
                                 +-- tryTrade() --> UserManager <-- TradableDTO
PriceFactory (Flyweight) --> Price (immutable, integer cents)`,
    next: [
      "Price-time (FIFO) priority behind a FillPolicy interface.",
      "JUnit tests for matching invariants: no over-fills, volume conserved.",
    ],
  },
  {
    slug: "lights-out-solver",
    title: "Lights Out Solver",
    summary:
      "Precomputes every solvable 5×5 Lights Out board with one BFS, then returns a guaranteed-shortest solution by lookup.",
    year: 2025,
    context: "Algorithms",
    featured: true,
    metric: { value: "8.4M", label: "boards precomputed" },
    tech: ["Java", "BFS", "Hashing"],
    repo: gh("Lights-Out-Solver"),
    problem: [
      "Solve any 5×5 Lights Out board in the fewest presses, or prove it has no solution.",
    ],
    approach: [
      "Only 2²³ = 8,388,608 of the 2²⁵ boards are solvable, because the toggle matrix has rank 23 over GF(2).",
      "A single BFS from the all-off board records each state's parent. Every press is its own inverse, so the path back is a shortest solution.",
      "The hash map is presized to 11,184,811 buckets so all states fit without a rehash; boards pack their cells into a cached bit-pattern hash.",
      "A board missing from the map is unsolvable, so impossibility detection is free.",
    ],
    next: [
      "Gaussian elimination over GF(2) to scale beyond 5×5 with near-zero memory.",
      "Store boards as 25-bit ints to cut memory by roughly 10×.",
    ],
  },
  {
    slug: "job-application-agent",
    title: "Job-Application Agent",
    summary:
      "A local LLM pipeline that finds, scores, and pre-fills job applications using free-tier models only, and is built so it can never submit on its own.",
    year: 2026,
    context: "Personal project",
    featured: false,
    tech: ["Python", "OpenRouter", "Playwright", "Claude Code skills", "SQLite", "pytest"],
    problem: [
      "Applying to jobs is mostly repetitive: finding relevant postings, judging fit, and retyping the same answers into different forms. I wanted to automate the busywork without handing an LLM the ability to invent answers or hit submit on my behalf.",
    ],
    approach: [
      "Discovers postings from free, no-key job-board APIs (Greenhouse, Remotive, Arbeitnow) and filters by location deterministically before any LLM call, so irrelevant postings cost nothing.",
      "Extracts and normalizes each posting into a JSON schema, scores it against my candidate profile, and shows a ranked shortlist. Nothing moves forward until I approve a job.",
      "For approved jobs, opens the form in a visible browser and fills only the answers my profile explicitly supports. Anything ambiguous or sensitive comes back null and flagged for me.",
      "QA combines a model report with deterministic Python checks, and the checks can only downgrade the verdict, so a hallucinated \"looks great\" can't wave a bad application through.",
      "Hard guarantees: the client refuses any model that isn't free, the browser agent has no submit method, a fail-closed click classifier refuses anything not recognized as navigation, and the database refuses to mark a job submitted without my confirmation.",
      "A Claude Code skill with Playwright MCP handles real multi-step application wizards, consulting the same click guard before every click.",
    ],
    architecture: `discover --> extract --> match --> shortlist --> [ I approve ]
                                                        |
                                                        v
          browser: inspect form --> fill supported answers --> upload resume
                                                        |
                                                        v
          QA (model + deterministic checks) --> [ I review and submit ]`,
    next: [
      "Add an explicit shortlist step as an extra gate between scoring and approval.",
    ],
  },
  {
    slug: "mapreduce-movie-recommender",
    title: "MapReduce Movie Recommender",
    summary:
      "Item-item collaborative filtering as a three-stage MapReduce job that runs locally or on Hadoop / EMR unchanged.",
    year: 2024,
    context: "Distributed systems",
    featured: false,
    tech: ["Python", "mrjob", "Hadoop", "AWS EMR"],
    repo: gh("MapReduce-Movie-Recommender"),
    problem: ["Find similar movies from MovieLens ratings in a way that scales out without rewriting the job."],
    approach: [
      "Stage 1 groups ratings by user, stage 2 emits co-rated movie pairs and computes cosine similarity, stage 3 re-keys so the shuffle sorts results.",
      "Keeps a pair only if more than 10 users rated both and similarity exceeds 0.95, removing high-similarity, low-evidence pairs.",
    ],
    next: [
      "Mean-center ratings (adjusted cosine) for users who rate everything high.",
      "Cap per-user histories, since pair generation is O(k²) in each user's ratings.",
    ],
  },
  {
    slug: "credit-approval-classifier",
    title: "Credit Card Approval Classifier",
    summary: "A random forest approval model served through a Flask form, with a responsible-ML review of its features.",
    year: 2023,
    context: "Early ML project",
    featured: false,
    tech: ["Python", "scikit-learn", "Flask"],
    repo: gh("Credit-Approval-Classifier"),
    problem: ["Predict credit card approval from applicant demographics and finances (1,518 applicants after cleaning)."],
    approach: [
      "Cleaned and encoded 14 features, trained a random forest, and served the pickled pipeline behind a Flask form.",
      "Only about 11% of labels are positive, so accuracy alone overstates performance.",
    ],
    next: [
      "Drop protected attributes (gender, marital status) and test for proxy leakage, as ECOA would require.",
      "Report precision, recall, and ROC-AUC against a majority-class baseline; add SHAP explanations.",
    ],
  },
  {
    slug: "vulcan-store",
    title: "Vulcan Store",
    summary: "A Next.js storefront with a persistent cart and real server-side Stripe Checkout sessions.",
    year: 2023,
    context: "Web development",
    featured: false,
    tech: ["Next.js", "React", "Stripe", "Recoil", "Tailwind"],
    repo: gh("Vulcan-Ecommerce"),
    problem: ["Build a storefront where prices and payments are enforced by the server and Stripe, not by whatever the browser sends."],
    approach: [
      "A Next.js route handler turns the cart into Stripe line items and creates a Checkout Session, so the secret key never reaches the browser.",
      "Products carry Stripe Price IDs, so Stripe enforces prices rather than the client.",
      "Global cart state with Recoil, shared across the shop, cart, and navbar.",
    ],
    architecture: `Shop / Cart (client) --> Recoil cartState
        | POST cart
        v
/api/checkout (server) --> Stripe Checkout Session --> Stripe-hosted page`,
    next: [
      "Verify payments with a Stripe webhook before showing the success page.",
      "Move success and cancel URLs to environment variables for deployment.",
    ],
  },
  {
    slug: "conception-of-race",
    title: "The Conception of Race",
    summary:
      "An interactive multi-page history of how \"race\" was constructed as a scientific category, from Linnaeus to the American eugenics movement.",
    year: 2024,
    context: "Anthropology coursework companion",
    featured: false,
    tech: ["React", "React Router", "Tailwind"],
    repo: gh("Race-History-Anthropology"),
    problem: [
      "Turn anthropology coursework on scientific racism into something the public can actually read: a navigable history rather than a paper.",
    ],
    approach: [
      "A timeline of U.S. eugenics, from Galton's coinage of the term through state sterilization laws, Buck v. Bell, and the last repeal.",
      "Pages on Linnaeus, Charles Davenport, and Harvard's role in American eugenics, closing with how that legacy has been challenged.",
      "React Router pages, each a self-contained component, styled with Tailwind.",
    ],
    next: [],
  },
  {
    slug: "loan-calculator",
    title: "Loan Amortization Calculator",
    summary: "A React + TypeScript app that turns a loan amount, rate, and term into a full month-by-month amortization schedule.",
    year: 2022,
    context: "Web development",
    featured: false,
    tech: ["React", "TypeScript"],
    repo: gh("Loan-Calculator"),
    problem: ["See exactly how each monthly payment splits between interest and principal over the life of a loan."],
    approach: [
      "Form state feeds an annuity calculation over years × 12 months.",
      "Renders payment, interest, principal, and remaining balance as a currency-formatted table.",
    ],
    next: ["Chart the principal-vs-interest split over time.", "Support extra-payment scenarios."],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
