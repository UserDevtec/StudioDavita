import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import { ArrowUpRight, Camera, Film, Menu, Palette, Play, Share2, X } from "lucide-react";
import "./styles.css";

type WorkItem = {
  title: string;
  type: string;
  image: string;
  note: string;
  gallery?: string[];
  slug?: string;
  detail?: string;
};

type PortfolioCategory = "graphic" | "photo" | "social";
type VideoCategory = "verhaal" | "campagne" | "event";
type VideoItem = [string, string, string, string, string, VideoCategory];

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const graphicWork: WorkItem[] = [
  {
    title: "Grafisch ontwerp",
    type: "Print & campagne",
    slug: "grafisch-ontwerp",
    image: asset("work/work-05.png"),
    note: "Brochures, magazines, campagnebeelden en merkgerichte materialen.",
    gallery: [
      asset("portfolio-gallery/cafetpleintje/cafetpleintje-window.png"),
      asset("portfolio-gallery/haagse-schatten/website.png"),
      asset("portfolio-gallery/haagse-schatten/schatkaart.png"),
      asset("portfolio-gallery/haco/screenshot-01.png"),
      asset("portfolio-gallery/haco/screenshot-02.png"),
    ],
    detail: "Een gerichte selectie printcampagnes, magazines, layouts en merkbeelden met sterke hiërarchie en een redactioneel ritme.",
  },
  {
    title: "Fotografie",
    type: "Beeldregie",
    slug: "fotografie",
    image: asset("work/work-11.jpg"),
    note: "Portretten en visuele verhalen met een heldere redactionele toon.",
    detail: "Fotografisch werk dat is ontwikkeld voor campagnecontext: portretten, sfeer, compositie en beeldregie die een groter visueel verhaal ondersteunen.",
  },
  {
    title: "Sociale content",
    type: "Digitale middelen",
    slug: "sociale-content",
    image: asset("work/work-22.png"),
    note: "Social beelden, mobile-first formats en campagnesets.",
    gallery: [
      asset("portfolio-gallery/postnl/mobile-01.png"),
      asset("portfolio-gallery/postnl/mobile-02.png"),
      asset("portfolio-gallery/postnl/mobile-03.png"),
      asset("portfolio-gallery/allianz/veilig-thuis-insta.png"),
      asset("portfolio-gallery/allianz/verbouwen-insta.png"),
    ],
    detail: "Mobile-first beelden en social campagne-items die ontworpen zijn voor snelle herkenning, flexibele formats en een consistente merkbeleving.",
  },
];

const featuredProjects: WorkItem[] = [
  ...graphicWork,
  {
    title: "Redactionele layout",
    type: "Publicatieontwerp",
    slug: "redactionele-layout",
    image: asset("work/work-01.png"),
    note: "Magazine-achtige layouts met een heldere, zelfverzekerde structuur.",
    detail: "Redactionele pagina's en printmiddelen met sterke witruimte, beeldschaal en typografisch contrast.",
  },
  {
    title: "Campagnebeelden",
    type: "Merkcampagne",
    slug: "campagnebeelden",
    image: asset("work/work-12.png"),
    note: "Campagne materiaal waarin typografie, beeld en energie samenkomen.",
    gallery: [
      asset("portfolio-gallery/allianz/veilig-thuis.png"),
      asset("portfolio-gallery/allianz/veilig-thuis-insta.png"),
      asset("portfolio-gallery/allianz/verbouwen.png"),
      asset("portfolio-gallery/allianz/verbouwen-insta.png"),
      asset("portfolio-gallery/allianz/woonsituatie.jpg"),
      asset("portfolio-gallery/allianz/woonsituatie-fullscreen.jpg"),
    ],
    detail: "Een visuele campagnerichting die een idee vertaalt naar flexibele middelen voor print, web en social.",
  },
  {
    title: "Posterserie",
    type: "Grafisch systeem",
    slug: "posterserie",
    image: asset("work/work-06.png"),
    note: "Een uitgesproken posterrichting met expressieve compositie.",
    gallery: [
      asset("portfolio-gallery/cafetpleintje/cafetpleintje-window.png"),
      asset("portfolio-gallery/haagse-schatten/website.png"),
      asset("portfolio-gallery/haagse-schatten/schatkaart.png"),
    ],
    detail: "Een grafisch systeem rond krachtige typografie, bewuste uitsnedes en herhaalbare campagneregels.",
  },
  {
    title: "Muziekbeeld",
    type: "Visuele identiteit",
    slug: "muziekbeeld",
    image: asset("work/work-19.png"),
    note: "Covers en visuele middelen met een filmische sfeer.",
    gallery: [
      asset("portfolio-gallery/haevn/dvd.jpg"),
      asset("portfolio-gallery/haevn/holyground-digipack-2.jpg"),
      asset("portfolio-gallery/haevn/holyground-digipack-3.jpg"),
      asset("portfolio-gallery/haevn/holyground-digipack-4.jpg"),
      asset("portfolio-gallery/haevn/holyground-vinyl.jpg"),
      asset("portfolio-gallery/haevn/holyground-vinyl-inside.jpg"),
    ],
    detail: "Beeldwerk en ondersteunende visuele middelen met een verzorgde sfeer en een duidelijke merkwereld.",
  },
  {
    title: "Merksignalen",
    type: "Social & print",
    slug: "merksignalen",
    image: asset("work/work-20.png"),
    note: "Kleine maar herkenbare merkuitingen in verschillende formats.",
    gallery: [
      asset("portfolio-gallery/haco/screenshot-03.png"),
      asset("portfolio-gallery/haco/screenshot-04.png"),
      asset("portfolio-gallery/haco/screenshot-05.png"),
      asset("portfolio-gallery/haco/screenshot-06.png"),
    ],
    detail: "Compacte merkuitingen en ondersteunende visuals die een campagne op ieder contactmoment samenhang geven.",
  },
];

const gallery = [
  asset("work/work-01.png"),
  asset("work/work-02.png"),
  asset("work/work-03.png"),
  asset("work/work-05.png"),
  asset("work/work-06.png"),
  asset("work/work-10.jpg"),
  asset("work/work-12.png"),
  asset("work/work-13.png"),
  asset("work/work-16.png"),
  asset("work/work-19.png"),
  asset("work/work-20.png"),
  asset("work/work-22.png"),
];

const videos: VideoItem[] = [
  ["Stamceldonoren bedankt!", "01:11", "Een korte film over hoop, donoren en het verschil maken.", asset("videos/video-01.mp4"), asset("video-posters/video-01.jpg"), "verhaal"],
  ["Een bijzondere verjaardag voor Brian", "03:24", "Een persoonlijk verhaal rond een stamceldonor en een nieuwe toekomst.", asset("videos/video-02.mp4"), asset("video-posters/video-02.jpg"), "verhaal"],
  ["Jungheinrich, het eldorado voor servicemonteurs.", "01:57", "Werkgeversverhaal met tempo, waardering en een heldere boodschap.", asset("videos/video-03.mp4"), asset("video-posters/video-03.jpg"), "campagne"],
  ["HVDZ Trakteer jezelf op Leiden", "00:31", "Campagne voor de binnenstad promotie van Leiden.", asset("videos/video-04.mp4"), asset("video-posters/video-04.jpg"), "campagne"],
  ["One Young World 2018 | Unilever", "04:06", "Eventverhaal rond jonge leiders en positieve impact.", asset("videos/video-05.mp4"), asset("video-posters/video-05.jpg"), "event"],
  ["Dit zijn wij | Geert", "01:00", "Een compact karakterverhaal voor Dirk Kuyt Foundation.", asset("videos/video-06.mp4"), asset("video-posters/video-06.jpg"), "verhaal"],
];

const videoFilters: Array<{ id: VideoCategory; label: string; description: string }> = [
  { id: "verhaal", label: "Verhalen", description: "Menselijke films met ritme en gevoel" },
  { id: "campagne", label: "Campagnes", description: "Korte merk- en social video's" },
  { id: "event", label: "Events", description: "Sfeer, impact en verslaglegging" },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const rotatingProjects = featuredProjects.slice(0, 8);
const rainProjects = [
  ...featuredProjects,
  {
    title: "Portfoliodetail",
    type: "Campagnedetail",
    slug: "portfoliodetail",
    image: asset("work/work-02.png"),
    note: "Gedetailleerd visueel werk uit het archief.",
    gallery: [
      asset("portfolio-gallery/allianz/woonsituatie-fullscreen.jpg"),
      asset("portfolio-gallery/haagse-schatten/website.png"),
      asset("portfolio-gallery/haco/screenshot-02.png"),
    ],
    detail: "Een uitgelicht portfolio-item met campagnestijl en visuele afwerking.",
  },
  {
    title: "Printverhaal",
    type: "Printontwerp",
    slug: "printverhaal",
    image: asset("work/work-03.png"),
    note: "Gedrukt campagne materiaal met een helder ritme.",
    gallery: [
      asset("portfolio-gallery/cafetpleintje/cafetpleintje-window.png"),
      asset("portfolio-gallery/haagse-schatten/schatkaart.png"),
      asset("portfolio-gallery/haevn/holyground-digipack-2.jpg"),
    ],
    detail: "Printgericht ontwerp met gestructureerde layouts en expressief beeldgebruik.",
  },
  {
    title: "Visuele set",
    type: "Gemengde media",
    slug: "visuele-set",
    image: asset("work/work-13.png"),
    note: "Een gemengde set ontworpen momenten.",
    gallery: [
      asset("portfolio-gallery/postnl/mobile-01.png"),
      asset("portfolio-gallery/allianz/verbouwen.png"),
      asset("portfolio-gallery/haco/screenshot-05.png"),
      asset("portfolio-gallery/haevn/holyground-vinyl.jpg"),
    ],
    detail: "Een compacte visuele set voor campagneverhalen in meerdere formats.",
  },
];

const portfolioProjects = rainProjects;
const portfolioSlugAliases: Record<string, string> = {
  "graphic-design": "grafisch-ontwerp",
  photography: "fotografie",
  "social-content": "sociale-content",
  "editorial-layout": "redactionele-layout",
  "campaign-visuals": "campagnebeelden",
  "poster-series": "posterserie",
  "music-artwork": "muziekbeeld",
  "brand-moments": "merksignalen",
  "portfolio-detail": "portfoliodetail",
  "printed-story": "printverhaal",
  "visual-set": "visuele-set",
};

const resolvePortfolioSlug = (slug?: string) => {
  if (!slug) return "";
  return portfolioSlugAliases[slug] ?? slug;
};

const findPortfolioProject = (slug?: string) => {
  const resolvedSlug = resolvePortfolioSlug(slug);
  return portfolioProjects.find((item) => item.slug === resolvedSlug);
};

const portfolioFilters: Array<{ id: PortfolioCategory; label: string; description: string }> = [
  { id: "graphic", label: "Grafisch ontwerp", description: "Print, identiteit en campagne materiaal" },
  { id: "photo", label: "Fotografie", description: "Portret, sfeer en beeldregie" },
  { id: "social", label: "Sociale content", description: "Digitale middelen en mobile-first formats" },
];

const portfolioCategoryFor = (project: WorkItem): PortfolioCategory => {
  if (project.slug === "fotografie") return "photo";
  if (["sociale-content", "campagnebeelden", "merksignalen", "visuele-set"].includes(project.slug ?? "")) return "social";
  return "graphic";
};

function PortfolioCategoryIcon({ category }: { category: PortfolioCategory }) {
  if (category === "photo") return <Camera size={20} />;
  if (category === "social") return <Share2 size={20} />;
  return <Palette size={20} />;
}

function VideoCategoryIcon({ category }: { category: VideoCategory }) {
  if (category === "event") return <Camera size={20} />;
  if (category === "campagne") return <Share2 size={20} />;
  return <Film size={20} />;
}

const standoutProjects = [
  {
    project: portfolioProjects.find((item) => item.slug === "grafisch-ontwerp")!,
    eyebrow: "Uitgelicht project",
    images: [
      asset("work/work-16.png"),
      asset("work/work-19.png"),
      asset("portfolio-gallery/haagse-schatten/website.png"),
      asset("portfolio-gallery/haagse-schatten/schatkaart.png"),
    ],
    goal: "Een printproject maken dat overzichtelijk voelt, maar tegelijk genoeg energie en ontdekking in zich heeft.",
    impact: "De campagne krijgt meer karakter door duidelijke routes, herkenbare details en een consistente beeldtaal.",
    assignment: "Een visuele set met kaartmateriaal, campagnebeelden en printitems voor een herkenbare ervaring.",
  },
  {
    project: portfolioProjects.find((item) => item.slug === "muziekbeeld")!,
    eyebrow: "Beeldwereld",
    images: [
      asset("work/work-06.png"),
      asset("portfolio-gallery/haevn/holyground-vinyl.jpg"),
      asset("portfolio-gallery/haevn/holyground-digipack-2.jpg"),
      asset("portfolio-gallery/haevn/holyground-vinyl-inside.jpg"),
    ],
    goal: "Een visuele sfeer neerzetten die past bij muziek, emotie en een zorgvuldig opgebouwd verhaal.",
    impact: "Een herkenbare stijl over meerdere dragers: cover, vinyl, digipack en ondersteunende beelden.",
    assignment: "Artwork en visuele middelen vertalen naar een complete, consistente presentatie.",
  },
  {
    project: portfolioProjects.find((item) => item.slug === "campagnebeelden")!,
    eyebrow: "Print & campagne",
    images: [
      asset("work/work-12.png"),
      asset("portfolio-gallery/allianz/verbouwen.png"),
      asset("portfolio-gallery/allianz/veilig-thuis.png"),
      asset("portfolio-gallery/allianz/woonsituatie-fullscreen.jpg"),
    ],
    goal: "Complexe informatie helder vormgeven zonder dat het materiaal zijn energie verliest.",
    impact: "Printmateriaal dat beter scanbaar wordt en tegelijk een uitgesproken visuele identiteit houdt.",
    assignment: "Brochures, campagnebeelden en redactionele layouts samenbrengen in een sterke lijn.",
  },
];

const clientLogos = ["NOVA FRAME", "LUMA HOUSE", "CANAL EDITS", "FORMA STUDIO", "BRIGHT NORTH", "MOTION VALE"];

const projectRain = rainProjects.map((project, index) => {
  const patterns = [
    ["1%", "0.92", "20s", "0s", "-3deg", "2deg"],
    ["31%", "1.04", "22s", "-3.5s", "2deg", "-2deg"],
    ["61%", "0.96", "19s", "-7s", "-2deg", "3deg"],
    ["88%", "0.9", "23s", "-10.5s", "3deg", "-1deg"],
    ["1%", "1", "20s", "-10s", "2deg", "-3deg"],
    ["31%", "0.92", "22s", "-14s", "-1deg", "2deg"],
    ["61%", "1.04", "19s", "-16s", "3deg", "-2deg"],
    ["88%", "0.86", "23s", "-21s", "-2deg", "2deg"],
    ["16%", "1.14", "24s", "-18s", "-2deg", "2deg"],
    ["46%", "0.84", "18s", "-12s", "2deg", "-1deg"],
    ["74%", "1.2", "25s", "-22s", "-3deg", "1deg"],
  ];
  const [x, scale, duration, delay, rotateStart, rotateEnd] = patterns[index % patterns.length];
  return { ...project, x, scale, duration, delay, rotateStart, rotateEnd };
});

const experience = [
  ["2021 - heden", "Therapieland", "Creatief ontwerper", "Conceptontwikkeling en creatie van visuele middelen voor print, digitaal en social media, met focus op mentale gezondheid en welzijn."],
  ["2019 - 2021", "Captains", "Videomaker & grafisch ontwerper", "Werk voor klanten als PostNL, Fox Sports, Universal, YoungCapital, ANWB, Allianz Direct en meer."],
  ["2017 - 2020", "Omroep West", "Freelance video-editor", "Montage van dagelijkse en wekelijkse programma's, events, commercials en aftermovies."],
  ["2018 - 2019", "Starsound Productions", "Video-editor & bewegend ontwerper", "Projecten voor onder andere Nationaal MS Fonds, Make a Wish Foundation, Shell en Unilever."],
  ["2016 - 2019", "AT5 & NH Media", "Freelance video-editor", "Montage voor nieuws, wekelijkse programma's en lokale formats."],
  ["2014 - 2017", "Walt Disney Company", "Motion design stagiair & operations-assistent", "Promo repacking, bumpers, endboards en ondersteuning van on-air workflows."],
];

const skills = [
  ["Premiere Pro", 92],
  ["Photoshop", 87],
  ["InDesign", 82],
  ["Illustrator", 78],
  ["After Effects", 73],
];

function useReveal(deps: React.DependencyList = []) {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .word-fade span, .experience-card, .skill-card"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.05, rootMargin: "0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, deps);
}

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.title = getPageTitle(pathname);
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <header className="site-header">
        <Link className="brand" to="/" aria-label="StudioDavita startpagina">
          <img src={asset("StudioDavita_logo-iconen-05.svg")} alt="StudioDavita" />
        </Link>
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav id="site-navigation" className={menuOpen ? "is-open" : ""} aria-label="Hoofdnavigatie">
          <NavLink to="/">Start</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/video">Video</NavLink>
          <NavLink to="/ervaring">Ervaring</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/work" element={<Navigate to="/portfolio" replace />} />
        <Route path="/work/:slug" element={<LegacyPortfolioRedirect />} />
        <Route path="/video" element={<Video />} />
        <Route path="/video/:slug" element={<VideoDetail />} />
        <Route path="/ervaring" element={<Experience />} />
        <Route path="/experience" element={<Navigate to="/ervaring" replace />} />
        <Route path="/skills" element={<Navigate to="/ervaring" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logo-opties" element={<LogoOptions />} />
        <Route path="/logo-options" element={<Navigate to="/logo-opties" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

function getPageTitle(pathname: string) {
  const cleanPath = pathname.replace(/\/$/, "") || "/";

  if (cleanPath === "/") return "Start | StudioDavita";
  if (cleanPath === "/portfolio" || cleanPath === "/work") return "Portfolio | StudioDavita";
  if (cleanPath === "/video") return "Video | StudioDavita";
  if (cleanPath === "/ervaring" || cleanPath === "/experience") return "Ervaring | StudioDavita";
  if (cleanPath === "/contact") return "Contact | StudioDavita";
  if (cleanPath === "/logo-opties" || cleanPath === "/logo-options") return "Logo-opties | StudioDavita";

  const portfolioMatch = cleanPath.match(/^\/(?:portfolio|work)\/(.+)$/);
  if (portfolioMatch) {
    const project = findPortfolioProject(portfolioMatch[1]);
    return `${project?.title ?? "Project"} | StudioDavita`;
  }

  const videoMatch = cleanPath.match(/^\/video\/(.+)$/);
  if (videoMatch) {
    const video = videos.find(([title]) => slugify(title) === videoMatch[1]);
    return `${video?.[0] ?? "Video"} | StudioDavita`;
  }

  return "StudioDavita";
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    const timeout = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 80);
    const lateTimeout = window.setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, 420);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
      window.clearTimeout(lateTimeout);
    };
  }, [pathname]);

  return null;
}

function LegacyPortfolioRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/portfolio/${resolvePortfolioSlug(slug)}`} replace />;
}

function TypewriterEyebrow({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const elementRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let start: number | undefined;
    let interval: number | undefined;

    const clearTyping = () => {
      if (start) window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };

    const playTyping = () => {
      clearTyping();
      setDisplayText("");
      let index = 0;
      start = window.setTimeout(() => {
        interval = window.setInterval(() => {
          index += 1;
          setDisplayText(text.slice(0, index));
          if (index >= text.length) {
            window.clearInterval(interval);
          }
        }, 34);
      }, 120);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          playTyping();
        } else {
          clearTyping();
          setDisplayText("");
        }
      },
      { threshold: 0.75 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      clearTyping();
    };
  }, [text]);

  return (
    <p className="eyebrow typewriter-eyebrow" aria-label={text} ref={elementRef}>
      <span aria-hidden="true">{displayText}</span>
      <i aria-hidden="true" />
    </p>
  );
}

const chipMessages = ["Ontwerp dat beweegt", "Kies een project", "Bekijk het werk", "Bekijk een verhaal"];

function KineticChip() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [swapPhase, setSwapPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const titleRef = useRef<HTMLSpanElement | null>(null);
  const [titleWidth, setTitleWidth] = useState(150);

  useLayoutEffect(() => {
    if (!titleRef.current) return;
    setTitleWidth(Math.ceil(titleRef.current.scrollWidth));
  }, [messageIndex]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let changeTimeout: number | undefined;
    let enterTimeout: number | undefined;
    const interval = window.setInterval(() => {
      setSwapPhase("exiting");
      if (changeTimeout) window.clearTimeout(changeTimeout);
      if (enterTimeout) window.clearTimeout(enterTimeout);
      changeTimeout = window.setTimeout(() => {
        setMessageIndex((current) => (current + 1) % chipMessages.length);
        setSwapPhase("entering");
        enterTimeout = window.setTimeout(() => {
          setSwapPhase("idle");
        }, 1200);
      }, 720);
    }, 3200);

    return () => {
      window.clearInterval(interval);
      if (changeTimeout) window.clearTimeout(changeTimeout);
      if (enterTimeout) window.clearTimeout(enterTimeout);
    };
  }, []);

  return (
    <div className={`kb-chip is-${swapPhase}`}>
      <span>Visuele verhalen</span>
      <strong>
        <span className="kb-title-track" style={{ "--title-width": `${titleWidth}px` } as React.CSSProperties}>
          <span className="kb-title" ref={titleRef}>{chipMessages[messageIndex]}</span>
          <i className="kb-dot" aria-hidden="true" />
        </span>
      </strong>
    </div>
  );
}

function FeaturedPortfolioCarousel() {
  const active = standoutProjects[0];
  const project = active.project;
  const supportingImages = active.images;

  return (
    <div className="featured-carousel reveal">
      <div className="featured-main">
        <img src={project.image} alt={`${project.title} uitgelicht project`} />
      </div>

      <article className="featured-text featured-goal">
        <span>Doel</span>
        <p>{active.goal}</p>
      </article>

      <div className="featured-media featured-media-large">
        <img src={supportingImages[1] ?? project.image} alt="" />
      </div>

      <article className="featured-text featured-impact">
        <span>Impact</span>
        <p>{active.impact}</p>
      </article>

      <article className="featured-text featured-assignment">
        <span>Opdracht</span>
        <p>{active.assignment}</p>
      </article>

      <div className="featured-media featured-top-right">
        <img src={supportingImages[0] ?? project.image} alt="" />
      </div>

      <div className="featured-media featured-bottom-left-a">
        <img src={supportingImages[2] ?? project.image} alt="" />
      </div>

      <div className="featured-media featured-bottom-left-b">
        <img src={supportingImages[3] ?? project.image} alt="" />
      </div>

      <div className="featured-media featured-bottom-right">
        <img src={supportingImages[3] ?? project.image} alt="" />
      </div>
    </div>
  );
}

function ClientLogoMark({ name, index }: { name: string; index: number }) {
  const variant = index % 6;

  return (
    <span className="client-wordmark" aria-label={name}>
      <svg className={`client-logo-svg client-logo-svg-${variant}`} viewBox="0 0 220 92" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {variant === 0 && (
            <>
              <path d="M18 46h46M42 18v56M78 23h30c17 0 28 9 28 23s-11 23-28 23H78z" strokeWidth="8" />
              <path d="M152 25h36M152 46h50M152 67h36" strokeWidth="7" />
            </>
          )}
          {variant === 1 && (
            <>
              <circle cx="43" cy="46" r="27" strokeWidth="8" />
              <path d="M78 66c18-34 42-34 62 0M154 24h38M154 46h52M154 68h38" strokeWidth="7" />
            </>
          )}
          {variant === 2 && (
            <>
              <path d="M20 69 50 22l30 47M32 52h36M104 24v44h50M174 24v44h28" strokeWidth="8" />
            </>
          )}
          {variant === 3 && (
            <>
              <path d="M22 24h56v44H22zM94 24h32c16 0 26 9 26 22s-10 22-26 22H94z" strokeWidth="8" />
              <path d="M172 24c18 0 27 44 40 44" strokeWidth="7" />
            </>
          )}
          {variant === 4 && (
            <>
              <path d="M24 68V24h48c16 0 26 8 26 20s-10 20-26 20H24M122 24v44M146 24l44 44M190 24l-44 44" strokeWidth="8" />
            </>
          )}
          {variant === 5 && (
            <>
              <path d="M22 46c22-28 44-28 66 0s44 28 66 0 34-28 48 0" strokeWidth="8" />
              <path d="M26 69h176" strokeWidth="7" />
            </>
          )}
        </g>
      </svg>
    </span>
  );
}

function ClientLogoSlider() {
  const logos = [...clientLogos, ...clientLogos];

  return (
    <section className="client-strip page-pad" aria-label="Merken en klanten">
      <div className="client-strip-copy reveal">
        <TypewriterEyebrow text="Klanten en merken" />
        <h2>Werk voor merken en verhalen.</h2>
      </div>
      <div className="logo-marquee reveal">
        <div className="logo-track">
          {logos.map((logo, index) => (
            <span className="client-logo" key={`${logo}-${index}`}>
              <ClientLogoMark name={logo} index={index} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillSlider() {
  const skillItems = [...skills, ...skills];

  return (
    <section className="client-strip skill-strip page-pad" aria-label="Vaardigheden">
      <div className="client-strip-copy reveal">
        <TypewriterEyebrow text="Vaardigheden" />
        <h2>Tools voor beeld en beweging.</h2>
      </div>
      <div className="logo-marquee skill-marquee reveal">
        <div className="logo-track">
          {skillItems.map(([skill, level], index) => (
            <span className="client-logo skill-logo" key={`${skill}-${index}`}>
              <strong>{skill}</strong>
              <small>{level}%</small>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  useReveal();
  return (
    <main>
      <section className="home-hero page-pad">
        <div className="hero-copy reveal">
          <TypewriterEyebrow text="Mijn naam is Davita." />
          <h1><span className="hero-title-rose">Video-editor</span> & grafisch <span className="hero-title-yellow">ontwerper.</span></h1>
          <p className="intro">
            StudioDavita is het portfolio van Davita: creatief ontwerp, videomontage, bewegend ontwerp
            en visuele verhalen voor merken, campagnes en sociale content.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/portfolio">
              Ontdek het portfolio
              <ArrowUpRight size={18} />
            </Link>
            <Link className="button secondary" to="/video">
              Bekijk video
            </Link>
          </div>
        </div>

        <div className="kinetic-board reveal" aria-label="Portret van Davita">
          <img className="hero-portrait" src={asset("studio/davita-portrait.jpg")} alt="Portret van Davita" />
          <KineticChip />
        </div>
      </section>

      <section className="scroll-words">
        <p className="word-fade" aria-label="Grafisch ontwerp, fotografie en videografie komen samen.">
          {"Grafisch ontwerp, fotografie en videografie komen samen.".split(" ").map((word, index) => (
            <span style={{ transitionDelay: `${index * 70}ms` }} key={`${word}-${index}`}>
              {word}
            </span>
          ))}
        </p>
      </section>

      <section className="home-random page-pad">
        <div className="section-heading reveal">
          <TypewriterEyebrow text="Portfolio" />
          <h2>Beeld, ritme en verhaal.</h2>
        </div>
        <FeaturedPortfolioCarousel />
      </section>

      <ClientLogoSlider />

      <section className="home-jump page-pad">
        <Link to="/portfolio" className="jump-card reveal">
          <span>Grafisch ontwerp / fotografie</span>
          <strong>Bekijk het visuele archief</strong>
          <ArrowUpRight />
        </Link>
        <Link to="/video" className="jump-card reveal">
          <span>Videografie</span>
          <strong>Bekijk de videolijst</strong>
          <Film />
        </Link>
      </section>

      <section className="portfolio-modes page-pad">
        <div className="mode-card reveal">
          <span>Grafisch ontwerp</span>
          <h3>Print, merk ontwikkeling en campagne materiaal.</h3>
          <p>Brochures, identiteiten, social beelden en ontworpen middelen samengebracht in een visueel archief.</p>
        </div>
        <div className="mode-card reveal">
          <span>Fotografie</span>
          <h3>Mensen, plekken en visuele sfeer.</h3>
          <p>Portretten en redactionele beelden die het grotere verhaal van een campagne of merk ondersteunen.</p>
        </div>
        <div className="mode-card reveal">
          <span>Videografie</span>
          <h3>Gemonteerde verhalen met ritme en richting.</h3>
          <p>Videocontent die helderheid, emotie en tempo geeft aan campagnes en social kanalen.</p>
        </div>
      </section>
    </main>
  );
}

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>("graphic");
  const filteredProjects = portfolioProjects.filter((project) => portfolioCategoryFor(project) === activeFilter);
  useReveal([activeFilter]);

  return (
    <main>
      <PageIntro eyebrow="Portfolio" title="Mijn nieuwste werk." text="Een bewust gemengde collectie grafisch ontwerp, fotografie, merk ontwikkeling, print en sociale content uit het huidige StudioDavita portfolio." />
      <section className="case-section page-pad">
        <div className="portfolio-filter-panel reveal" aria-label="Portfolio filter">
          {portfolioFilters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                className={`portfolio-filter-button${isActive ? " is-active" : ""}`}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={isActive}
                key={filter.id}
              >
                <span className="portfolio-filter-icon">
                  <PortfolioCategoryIcon category={filter.id} />
                </span>
                <span>
                  <strong>{filter.label}</strong>
                  <small>{filter.description}</small>
                </span>
              </button>
            );
          })}
        </div>

        <div className="portfolio-board">
          {filteredProjects.map((project, index) => (
            <Link className={`portfolio-board-item board-${(index % 6) + 1} reveal`} to={`/portfolio/${project.slug}`} key={project.slug}>
              <img src={project.image} alt={`${project.title} portfolio-item`} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function Video() {
  const [activeFilter, setActiveFilter] = useState<VideoCategory>("verhaal");
  const filteredVideos = videos.filter(([, , , , , category]) => category === activeFilter);
  useReveal([activeFilter]);

  return (
    <main>
      <PageIntro eyebrow="Videografie" title="Verhalen met tempo, helderheid en gevoel." text="Geselecteerd videomontage- en vertelwerk uit het bestaande StudioDavita portfolio." />
      <section className="video-filter-section page-pad">
        <div className="portfolio-filter-panel video-filter-panel reveal" aria-label="Videofilter">
          {videoFilters.map((filter) => {
            const isActive = activeFilter === filter.id;

            return (
              <button
                className={`portfolio-filter-button${isActive ? " is-active" : ""}`}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={isActive}
                key={filter.id}
              >
                <span className="portfolio-filter-icon">
                  <VideoCategoryIcon category={filter.id} />
                </span>
                <span>
                  <strong>{filter.label}</strong>
                  <small>{filter.description}</small>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="video-section page-pad">
        <div className="video-grid">
          {filteredVideos.map(([title, duration, note, src, poster], index) => (
            <Link className="video-card reveal" to={`/video/${slugify(title)}`} key={title}>
              <div
                className="video-preview"
                onMouseEnter={(event) => {
                  const video = event.currentTarget.querySelector("video");
                  if (video) void video.play();
                }}
                onMouseLeave={(event) => {
                  const video = event.currentTarget.querySelector("video");
                  if (!video) return;
                  video.pause();
                  video.currentTime = 0;
                }}
              >
                <video
                  src={src}
                  poster={poster}
                  muted
                  loop
                  preload="metadata"
                  playsInline
                  aria-label={title}
                />
                <div className="video-play-badge">
                  <Play size={18} fill="currentColor" />
                </div>
              </div>
              <span>{duration}</span>
              <h3>{title}</h3>
              <p>{note}</p>
              <small>{String(index + 1).padStart(2, "0")} / Videomontage & verhalen</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function PortfolioDetail() {
  const { slug } = useParams();
  const resolvedSlug = resolvePortfolioSlug(slug);
  const project = findPortfolioProject(slug);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  useReveal();

  useEffect(() => {
    setPreviewImage(null);
  }, [slug]);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxImage(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxImage]);

  if (slug && resolvedSlug !== slug) {
    return <Navigate to={`/portfolio/${resolvedSlug}`} replace />;
  }

  if (!project) {
    return (
      <main>
        <PageIntro eyebrow="Project" title="Project niet gevonden." text="Dit project is niet beschikbaar binnen de huidige selectie van StudioDavita." />
      </main>
    );
  }

  const related = portfolioProjects.filter((item) => item.slug !== project.slug).slice(0, 2);
  const galleryImages = [project.image, ...(project.gallery ?? [])];
  const activePreview = previewImage ?? project.image;

  return (
    <main>
      <section className="detail-hero page-pad reveal">
        <div className="detail-copy">
          <TypewriterEyebrow text={project.type} />
          <h1>{project.title}</h1>
          <p className="intro">{project.detail}</p>
          <Link className="button secondary" to="/portfolio">Terug naar portfolio</Link>
        </div>
        <div className="detail-visual-stack">
          <button className="detail-media image-zoom-trigger" type="button" onClick={() => setLightboxImage(activePreview)}>
            <img src={activePreview} alt={`${project.title} projectdetail`} />
            <span>Groter bekijken</span>
          </button>
          {galleryImages.length > 1 && (
            <div className="detail-gallery" aria-label={`Extra beelden voor ${project.title}`}>
              <div className="detail-gallery-grid">
                {galleryImages.map((image, index) => (
                  <button
                    className={`gallery-tile${activePreview === image ? " is-active" : ""}`}
                    type="button"
                    key={image}
                    onClick={() => setLightboxImage(image)}
                    onFocus={() => setPreviewImage(image)}
                    onMouseEnter={() => setPreviewImage(image)}
                    aria-label={`Open beeld ${index + 1} van ${project.title}`}
                  >
                    <img src={image} alt={`${project.title} galeriebeeld ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="detail-body page-pad">
        <article className="detail-panel reveal">
          <span>Aanpak</span>
          <h2>Ontworpen om helder, flexibel en herkenbaar te voelen.</h2>
          <p>{project.note}</p>
        </article>
        <div className="detail-related">
          {related.map((item) => (
            <Link className="mini-project reveal" to={`/portfolio/${item.slug}`} key={item.slug}>
              <img src={item.image} alt="" />
              <span>{item.type}</span>
              <strong>{item.title}</strong>
            </Link>
          ))}
        </div>
      </section>
      {lightboxImage && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} grotere preview`} onClick={() => setLightboxImage(null)}>
          <button className="lightbox-close" type="button" aria-label="Preview sluiten" onClick={() => setLightboxImage(null)}>
            <X size={20} />
          </button>
          <img src={lightboxImage} alt={`${project.title} vergroot`} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}

function VideoDetail() {
  const { slug } = useParams();
  const video = videos.find(([title]) => slugify(title) === slug);
  const storyPanelRef = useRef<HTMLElement | null>(null);
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [suggestionHeight, setSuggestionHeight] = useState<number | undefined>();
  useReveal();

  useLayoutEffect(() => {
    if (!storyPanelRef.current) return;

    const updateHeight = () => {
      if (!storyPanelRef.current) return;
      setSuggestionHeight(Math.round(storyPanelRef.current.getBoundingClientRect().height));
    };
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(storyPanelRef.current);
    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [slug]);

  if (!video) {
    return (
      <main>
        <PageIntro eyebrow="Video" title="Video niet gevonden." text="Deze video is niet beschikbaar binnen de huidige selectie van StudioDavita." />
      </main>
    );
  }

  const [title, duration, note, src, poster] = video;
  const relatedVideos = videos.filter(([itemTitle]) => itemTitle !== title);
  const related = relatedVideos[Math.floor(Math.random() * relatedVideos.length)];

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.muted = false;
    player.volume = 1;
    player.currentTime = 0;
    const play = () => {
      void player.play().catch(() => {
        // Autoplay met geluid kan in sommige browsers nog steeds worden geblokkeerd.
      });
    };

    if (player.readyState >= 2) {
      play();
      return;
    }

    player.addEventListener("loadeddata", play, { once: true });
    return () => player.removeEventListener("loadeddata", play);
  }, [src]);

  return (
    <main>
      <section className="detail-hero video-detail page-pad reveal">
        <div className="detail-copy">
          <TypewriterEyebrow text={`Video / ${duration}`} />
          <h1>{title}</h1>
          <p className="intro">{note}</p>
          <Link className="button secondary" to="/video">Terug naar video's</Link>
        </div>
        <div className="detail-media video-player">
          <video ref={playerRef} src={src} poster={poster} controls autoPlay playsInline />
        </div>
      </section>
      <section className="detail-body video-detail-body page-pad">
        <article className="detail-panel reveal" ref={storyPanelRef}>
          <span>Verhaalregie</span>
          <h2>Gemonteerd op ritme, helderheid en emotionele beweging.</h2>
          <p>Elke video wordt neergezet als compact verhaal, met aandacht voor tempo, structuur, boodschap en visuele samenhang.</p>
        </article>
        <div className="detail-related single-related">
          {related && (() => {
            const [itemTitle, itemDuration, itemNote, , itemPoster] = related;
            return (
            <Link
              className="mini-project"
              to={`/video/${slugify(itemTitle)}`}
              key={itemTitle}
              style={suggestionHeight ? { "--suggestion-height": `${suggestionHeight}px` } as React.CSSProperties : undefined}
            >
              <img src={itemPoster} alt="" />
              <span>Interessante video / {itemDuration}</span>
              <strong>{itemTitle}</strong>
              <small>{itemNote}</small>
            </Link>
            );
          })()}
        </div>
      </section>
    </main>
  );
}

function Experience() {
  useReveal();
  return (
    <main>
      <PageIntro eyebrow="Ervaring" title="Creatief werk voor media, campagnes en uitzending." text="Een loopbaan gevormd door ontwerp, montage, beweging en verhalen voor merken, media en social campagnes." />
      <section className="experience-studio page-pad">
        <div className="experience-cards">
          {experience.map(([date, company, role, text], index) => (
            <article
              className={`experience-card experience-card-${index + 1}`}
              style={{ "--card-delay": `${index * 110}ms` } as React.CSSProperties}
              key={`${date}-${company}`}
            >
              <span>{String(index + 1).padStart(2, "0")} / {date}</span>
              <h3>{company}</h3>
              <p>{role}</p>
              <small>{text}</small>
            </article>
          ))}
        </div>
      </section>
      <SkillSlider />
    </main>
  );
}

function Contact() {
  useReveal();
  return (
    <main>
      <section className="contact-page page-pad">
        <div className="contact-intro reveal">
          <div>
            <TypewriterEyebrow text="Contact" />
            <h1>Laten we iets maken dat blijft hangen.</h1>
            <p className="intro">Vertel Davita over het idee, de campagne of het visuele verhaal dat je wilt vormgeven.</p>
          </div>
        </div>
        <form className="contact-form reveal" action="mailto:luminousdavita@gmail.com" method="post" encType="text/plain">
          <label>
            <span>Naam</span>
            <input name="name" type="text" autoComplete="name" placeholder="Je naam" />
          </label>
          <label>
            <span>E-mail</span>
            <input name="email" type="email" autoComplete="email" placeholder="jij@voorbeeld.nl" />
          </label>
          <label className="full">
            <span>Projecttype</span>
            <select name="projectType" defaultValue="">
              <option value="" disabled>Kies een richting</option>
              <option>Grafisch ontwerp</option>
              <option>Videomontage</option>
              <option>Bewegend ontwerp</option>
              <option>Fotografie</option>
              <option>Anders</option>
            </select>
          </label>
          <label className="full">
            <span>Bericht</span>
            <textarea name="message" rows={7} placeholder="Vertel kort iets over het project..." />
          </label>
          <button className="button primary" type="submit">Bericht versturen</button>
        </form>
        <div className="contact-note reveal">
          <span>Liever mailen?</span>
          <a href="mailto:luminousdavita@gmail.com">luminousdavita@gmail.com</a>
        </div>
      </section>
    </main>
  );
}

function LogoOptions() {
  const options = [
    ["Optie 1", "Minimaal studiomerk", asset("logo-option-1.svg")],
    ["Optie 2", "Redactioneel woordmerk", asset("logo-option-2.svg")],
    ["Optie 3", "Monogram met kleurvlak", asset("logo-option-3.svg")],
  ];

  return (
    <main>
      <PageIntro
        eyebrow="Logorichtingen"
        title="Drie professionele logo-opties."
        text="Drie mogelijke richtingen voor StudioDavita: ingetogen studio, redactioneel en een warmer monogram met kleur."
      />
      <section className="logo-options page-pad">
        {options.map(([title, label, src]) => (
          <article className="logo-card reveal" key={title}>
            <div className="logo-preview">
              <img src={src} alt={`${title} voor StudioDavita`} />
            </div>
            <p>{title}</p>
            <h3>{label}</h3>
          </article>
        ))}
      </section>
    </main>
  );
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  useReveal();
  return (
    <section className="page-intro page-pad reveal">
      <TypewriterEyebrow text={eyebrow} />
      <h1>{title}</h1>
      <p className="intro">{text}</p>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <span>© 2026 StudioDavita</span>
      <a href="https://devtec.nl" target="_blank" rel="noreferrer">
        Gemaakt door Devtec
      </a>
    </footer>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>,
);

