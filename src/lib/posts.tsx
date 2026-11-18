export type BlogCategory = "Architecture" | "Technology";

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: BlogCategory;
  badgeLabel: string;
  date: string;
  readTime: string;
  isPaid: boolean;
  priceLabel: string;
  priceAmount: string;
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  freeContent?: string[];
  pullQuote?: {
    quote: string;
    attribution: string;
  };
  lockedPreviewContent?: string[];
}


export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "From code camps to building real websites that ship.",
    subtitle:
      "Lessons learned from transitioning from code camps to real-world web development.",
    excerpt:
      "Honest lessons from learning software development, pushing projects to Vercel and figuring out what it takes to build a solid portfolio.",
    category: "Architecture",
    badgeLabel: "Paid · UGX 10,000",
    date: "Oct 24, 2026",
    readTime: "8 min read",
    isPaid: true,
    priceLabel: "Paid · UGX 10,000",
    priceAmount: "UGX 10,000",
    imageUrl: "/codecamp.jpg",
    imageAlt: "Code camp participants working on their projects",
    imageCaption:
      "Code camp participants working on their projects — Photographed by John Doe, 2026",
    author: {
      name: "Leticia K. N.",
      role: "Software Engineer, CEO of Launch.com",
    },
    freeContent: [
      "Every aspiring software developer eventually reaches a distinct psychological threshold: the moment they realize that finishing a guided code camp curriculum is only the prologue. During bootcamp cohorts—whether diving deep into modern web design, front-end engineering with TypeScript, or mastering component-driven architectures—you live in an environment of safe sandboxes. The repositories are neatly structured, the APIs rarely throw unexpected CORS errors, and the user stories are pre-defined. Transitioning from a student solving isolated coding challenges to a practitioner building real websites that actually ship to production requires a fundamental shift in mindset, demanding that you embrace the messy, unpredictable reality of modern web development where deployment pipelines, state management edge cases, and performance metrics matter just as much as writing clean syntax.",
      "The first major awakening usually happens on the command line during your initial production deployments. For months, code lives locally on your machine, running smoothly on localhost with cached assets and pristine environment variables. The moment you push a project to Vercel or configure a GitHub Actions CI/CD pipeline, the environment shifts entirely. Build errors that never appeared locally suddenly surface due to strict TypeScript type-checking, unescaped entities, or server-side rendering mismatches. Learning how to read build logs, debug environment configuration issues, and optimize asset bundles teaches you a level of discipline that no tutorial can replicate, proving that a reliable engineer is defined not by an absence of bugs, but by the ability to systematically diagnose and resolve them before a user ever sees a broken interface.",
      "Beyond deployment mechanics, building a solid portfolio requires curating projects that solve genuine problems rather than cloning generic template apps. Recruiters and engineering leads can spot a boilerplate tutorial clone within seconds; what captures genuine attention is a web application with intentional UX decisions, responsive layouts across mobile and desktop breakpoints, and thoughtful performance optimizations. Whether it is creating an analytics dashboard, a school management portal, or a personal developer blog, your portfolio must tell a coherent story about your technical growth and your ability to translate complex requirements into clean, human-centered digital experiences—accepting that shipped software is never truly finished, but evolves continuously through user feedback and iterative refactoring.",
    ],
    pullQuote: {
      quote:
        "“A great portfolio isn't a gallery of finished tutorials; it is a living record of problems diagnosed, deployed, and iteratively refined in the wild.”",
      attribution: "NOTES ON SHIPPING PRODUCTION CODE (2026)",
    },
    lockedPreviewContent: [],
  },
  {
    id: "2",
    title: "What working at a health centre taught me about real-world data.",
    subtitle:
      "Lessons learned from transitioning from code camps to real-world web development.",
    excerpt:
      "Moving past basic coding tutorials and looking at how keeping digital records and patient info organized actually helps day-to-day operations.",
    category: "Technology",
    badgeLabel: "Paid · UGX 10,000",
    date: "Oct 24, 2026",
    readTime: "8 min read",
    isPaid: true,
    priceLabel: "Paid · UGX 10,000",
    priceAmount: "UGX 10,000",
    imageUrl: "/health.jpg",
    imageAlt: "Health centre staff working with digital records",
    imageCaption:
      "Health centre staff working with digital records — Photographed by Jane Smith, 2026",
    author: {
      name: "Leticia K. N.",
      role: "Software Engineer, CEO of Launch.com",
    },
    freeContent: [
      "In computer science classrooms and online tutorials, data is almost always presented as pristine, normalized JSON payloads or perfectly structured SQL tables. Rows match columns flawlessly, foreign keys are never orphaned, and missing values are treated as a rare exception. Stepping out of the classroom and into a fast-paced clinical environment—working directly with patient information systems and data quality auditing at a community health centre—completely shatters that illusion. In the real world, data is messy, urgent, and deeply human, captured under pressure by busy clinicians, handwritten on physical intake sheets during peak hours, and entered rapidly into digital records where data integrity is not an abstract database metric, but a critical lifeline that directly influences patient care and institutional accountability.",
      "Working at the intersection of healthcare administration and digital record-keeping reveals how foundational proper database design and information architecture truly are. When a patient arrives at a clinic, every second counts. If patient identifiers are duplicated, appointment histories are fragmented across disconnected registers, or supply tracking logs are inconsistently updated, the entire operational workflow stalls. Managing health records extends far beyond running basic queries or compiling monthly summaries; it requires establishing rigorous auditing routines, standardizing entry conventions, and collaborating with clinical staff so everyone understands why consistent digital organization reduces friction across the entire facility.",
    ],
    pullQuote: {
      quote:
        "“Validation rules and clean database schemas aren't merely technical formalities—they are protective guardrails that return hours of focus back to frontline care.”",
      attribution: "FIELD NOTES FROM HEALTH INFORMATION SYSTEMS (2026)",
    },
    lockedPreviewContent: [
      "This grassroots operational experience fundamentally reshapes how you approach software engineering from the ground up. When you architect a database schema or design a data-entry interface for an administrative portal, you begin designing with genuine empathy for the person typing behind the desk during a busy morning rush...",
      "...realizing that intuitive error handling, offline-resilient form states, and unambiguous field labels are what separate fragile software from dependable infrastructure that quietly organizes chaos in the background.",
    ],
  },
  {
    id: "3",
    title: "Automating my workflow: How I use Zapier and Google tools to save time.",
    subtitle:
      "Lessons learned from transitioning from code camps to real-world web development.",
    excerpt:
      "Simple ways to connect your apps, handle emails automatically and stop doing repetitive manual tasks.",
    category: "Technology",
    badgeLabel: "Paid · UGX 10,000",
    date: "Oct 24, 2026",
    readTime: "8 min read",
    isPaid: true,
    priceLabel: "Paid · UGX 10,000",
    priceAmount: "UGX 10,000",
    imageUrl: "/zapier.jpg",
    imageAlt: "Zapier and Google tools integration",
    imageCaption:
      "Zapier and Google tools integration — Photographed by John Doe, 2026",
    author: {
      name: "Leticia K. N.",
      role: "Software Engineer, CEO of Launch.com",
    },
    freeContent: [
      "Modern knowledge work often feels like an endless cycle of digital housekeeping: copying details from a web inquiry form into a tracking spreadsheet, drafting repetitive email follow-ups, updating project boards, and cross-referencing notification alerts across dozens of open browser tabs. Left unchecked, these micro-tasks silently consume hours of precious cognitive energy every single week, pulling focus away from deep, creative engineering and strategic problem-solving. Over time, it becomes clear that if a digital workflow is repetitive and governed by predictable rules, a human being should not be performing it manually when cloud integrations can execute it instantaneously.",
      "The core philosophy of effective workflow automation is not about over-engineering complex multi-step webhooks for the sake of novelty, but about identifying operational bottlenecks and building straightforward, resilient feedback loops. By connecting Zapier alongside everyday cloud utilities like Google Sheets, Gmail, and Google Drive, a single incoming submission can automatically validate contact details, append a cleanly formatted row to a master tracking sheet, and dispatch a tailored confirmation email within seconds—eliminating manual entry latency while ensuring that no client inquiry or administrative task slips through the cracks.",
    ],
    pullQuote: {
      quote:
        "“If a digital task is repetitive and rule-based, automating it isn't a shortcut—it is how you protect your cognitive bandwidth for high-leverage engineering.”",
      attribution: "SYSTEMS & WORKFLOW ARCHITECTURE (2026)",
    },
    lockedPreviewContent: [
      "Designing these automated pipelines also sharpens the exact same systems-thinking muscles required in full-stack software development. You learn to anticipate malformed payloads, handle asynchronous rate limits gracefully, and structure spreadsheet columns like relational database tables...",
      "...reclaiming hours every week so you can focus on shipping new product features, refining user interfaces, and tackling complex architectural problems that genuinely require human creativity.",
    ],
  },
];

export function getPostById(id: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.id === id);
}