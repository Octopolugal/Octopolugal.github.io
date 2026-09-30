/* Edit this file to update the website. No build step is required.
   Keep the surrounding quotes and commas. Use empty arrays [] for empty sections.
   All records below are EXAMPLES, not claims about SIT Lab's members or work.
   Replace the records, then set each record's sample field to false.
   Paths are relative to the website root. Links appear only when a URL is supplied. */
window.SIT_CONTENT = {
  lab: {
    name: "SIT Lab",
    fullName: "Spatial-Info(rmation)-(in)Telligence",
    tagline: "AI for geo-sciences",
    description: "Exploring the connections between spatial information, artificial intelligence, and the world around us.",
    // Optional: these are hidden until filled in.
    institution: "",
    location: "",
    email: "",
    scholarUrl: "",
    githubUrl: ""
  },
  // Suggested introductory copy. Adapt it to your lab's research agenda.
  researchAreas: [
    { title: "Spatial intelligence", description: "Learning from geographic data to understand patterns, relationships, and places." },
    { title: "Geographic reasoning", description: "Connecting spatial knowledge with AI systems that can reason about our world." },
    { title: "AI for geo-sciences", description: "Bringing data-driven methods to scientific questions with a spatial dimension." }
  ],
  students: [
    { name: "Student name", role: "Ph.D. student", interests: "Spatial AI · Research interests", photo: "", photoPosition: "center", website: "", email: "", sample: true },
    { name: "Chenye Zhang", role: "Ph.D. student", interests: "Hi I am Chenye Zhang, a second-year Ph.D. student in Forest Resources. My research focuses on aboveground biomass modeling using LiDAR and optical remote sensing data.", photo: "assets/images/chenye_zhang.jpeg", photoPosition: "center", website: "", email: "", sample: true },
    { name: "Student name", role: "Master's student", interests: "From robotics to virtual worlds and spatial intelligence, Wenjun Teng is driven by one question: how can machines better understand and act in complex environments? He has received First Prize in the China Division of WRO and the Math League, and holds undergraduate degrees in Mathematics and Cybersecurity. He has also developed a 3D game prototype in Unreal Engine 5 using StateTree, Gameplay Tags, Motion Warping, Niagara, Chaos Physics, and C++/Blueprint systems. His current interests include GeoAI, machine learning, and spatial intelligence.", photo: "assets/images/wenjun_teng.jpg", photoPosition: "center", website: "", email: "", sample: true },
    { name: "Student name", role: "Undergraduate researcher", interests: "Spatial data · Research interests", photo: "", photoPosition: "center", website: "", email: "", sample: true }
  ],
  publications: [
    {
      title: "Your journal article title", authors: "Author names", venue: "Journal name", year: "YEAR", type: "Journal article",
      abstract: "Replace this example with the paper's abstract or a short summary of its research question, method, and findings.",
      paperUrl: "", codeUrl: "", dataUrl: "", sample: true
    },
    {
      title: "Your conference paper title", authors: "Author names", venue: "Conference name", year: "YEAR", type: "Conference paper",
      abstract: "Add a concise description of the paper here. Paper, code, and data links appear when their URLs are provided.",
      paperUrl: "", codeUrl: "", dataUrl: "", sample: true
    },
    {
      title: "Another publication title", authors: "Author names", venue: "Journal or conference name", year: "YEAR", type: "Research paper",
      abstract: "Add the abstract or a short summary here.",
      paperUrl: "", codeUrl: "", dataUrl: "", sample: true
    }
  ],
  presentations: [
    {
      title: "Your conference presentation title", speaker: "Presenter name", event: "Conference or symposium", date: "", dateLabel: "Date to be added", type: "Conference talk",
      summary: "Add a short description of the research presented, its central question, and the audience.",
      slidesUrl: "", videoUrl: "", eventUrl: "", sample: true
    },
    {
      title: "Your invited talk title", speaker: "Presenter name", event: "Host institution or seminar series", date: "", dateLabel: "Date to be added", type: "Invited talk",
      summary: "Add the talk's topic and the ideas you shared with the research community.",
      slidesUrl: "", videoUrl: "", eventUrl: "", sample: true
    },
    {
      title: "Your research poster title", speaker: "Presenter name", event: "Conference or research showcase", date: "", dateLabel: "Date to be added", type: "Poster",
      summary: "Add a brief description of the poster and a link to the presentation file.",
      slidesUrl: "", videoUrl: "", eventUrl: "", sample: true
    }
  ],
  projects: [
    {
      title: "Learning from spatial data", category: "Spatial AI", status: "Ongoing",
      summary: "Example project: learning useful representations of geographic patterns and spatial relationships.",
      question: "What can spatial structure teach an AI model about the world?",
      approach: "Replace this example with your data, methods, and planned evaluation.",
      team: "", funding: "", projectUrl: "", codeUrl: "", sample: true
    },
    {
      title: "Reasoning about geographic space", category: "Geographic reasoning", status: "Ongoing",
      summary: "Example project: connecting geographic knowledge with the reasoning capabilities of AI systems.",
      question: "How can AI reason consistently about locations and spatial relationships?",
      approach: "Describe your research approach and current direction here.",
      team: "", funding: "", projectUrl: "", codeUrl: "", sample: true
    },
    {
      title: "AI for scientific discovery", category: "Geo-sciences", status: "Ongoing",
      summary: "Example project: developing data-driven methods for scientific problems with a spatial dimension.",
      question: "How can spatial learning support a better understanding of physical processes?",
      approach: "Add the scientific problem, research methods, and expected contributions.",
      team: "", funding: "", projectUrl: "", codeUrl: "", sample: true
    }
  ]
};
