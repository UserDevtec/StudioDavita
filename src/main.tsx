import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Navigate, NavLink, Route, Routes, useLocation, useParams } from "react-router-dom";
import { ArrowUpRight, Film, Menu, Play, X } from "lucide-react";
import "./styles.css";

type WorkItem = {
  title: string;
  type: string;
  image: string;
  note: string;
  slug?: string;
  detail?: string;
};

const graphicWork: WorkItem[] = [
  {
    title: "Graphic design",
    type: "Print & campaign",
    slug: "graphic-design",
    image: "/work/work-05.png",
    note: "Brochures, magazines, campaign visuals and branded materials.",
    detail: "A focused collection of printed campaigns, magazines, layout systems and branded visuals built around strong hierarchy and an editorial rhythm.",
  },
  {
    title: "Photography",
    type: "Image direction",
    slug: "photography",
    image: "/work/work-11.jpg",
    note: "Portraits and visual stories with a clear editorial tone.",
    detail: "Photography work shaped for campaign context: clear portraits, atmosphere, composition and image direction that support a wider visual story.",
  },
  {
    title: "Social content",
    type: "Digital assets",
    slug: "social-content",
    image: "/work/work-22.png",
    note: "Social media visuals, mobile-first formats and campaign sets.",
    detail: "Mobile-first visuals and social campaign pieces designed for fast recognition, flexible formats and a consistent brand feeling across channels.",
  },
];

const featuredProjects: WorkItem[] = [
  ...graphicWork,
  {
    title: "Editorial layout",
    type: "Publication design",
    slug: "editorial-layout",
    image: "/work/work-01.png",
    note: "Magazine-inspired layouts with a clean, confident structure.",
    detail: "Editorial pages and printed assets with strong spacing, image scale and typographic contrast.",
  },
  {
    title: "Campaign visuals",
    type: "Brand campaign",
    slug: "campaign-visuals",
    image: "/work/work-12.png",
    note: "Campaign materials that combine typography, image and energy.",
    detail: "A visual campaign direction that translates one idea into flexible assets for print, web and social.",
  },
  {
    title: "Poster series",
    type: "Graphic system",
    slug: "poster-series",
    image: "/work/work-06.png",
    note: "A bold poster-led direction with expressive composition.",
    detail: "A graphic system built around impactful type, confident cropping and repeatable campaign rules.",
  },
  {
    title: "Music artwork",
    type: "Visual identity",
    slug: "music-artwork",
    image: "/work/work-19.png",
    note: "Artwork, covers and visual assets with a cinematic feel.",
    detail: "Artwork and supporting visual assets with a polished atmosphere and a clear brand world.",
  },
  {
    title: "Brand moments",
    type: "Social & print",
    slug: "brand-moments",
    image: "/work/work-20.png",
    note: "Small but memorable brand assets across formats.",
    detail: "Compact brand moments and supporting visuals designed to make a campaign feel coherent at every touchpoint.",
  },
];

const gallery = [
  "/work/work-01.png",
  "/work/work-02.png",
  "/work/work-03.png",
  "/work/work-05.png",
  "/work/work-06.png",
  "/work/work-10.jpg",
  "/work/work-12.png",
  "/work/work-13.png",
  "/work/work-16.png",
  "/work/work-19.png",
  "/work/work-20.png",
  "/work/work-22.png",
];

const videos = [
  ["Stamceldonoren bedankt!", "01:11", "Een korte film over hoop, donoren en het verschil maken.", "/videos/video-01.mp4", "/video-posters/video-01.jpg"],
  ["Een bijzondere verjaardag voor Brian", "03:24", "Een persoonlijk verhaal rond een stamceldonor en een nieuwe toekomst.", "/videos/video-02.mp4", "/video-posters/video-02.jpg"],
  ["Jungheinrich, het eldorado voor servicemonteurs.", "01:57", "Employer branding met tempo, waardering en helder verhaal.", "/videos/video-03.mp4", "/video-posters/video-03.jpg"],
  ["HVDZ Trakteer jezelf op Leiden", "00:31", "Campagne voor de binnenstad promotie van Leiden.", "/videos/video-04.mp4", "/video-posters/video-04.jpg"],
  ["One Young World 2018 | Unilever", "04:06", "Event storytelling rond jonge leiders en positieve impact.", "/videos/video-05.mp4", "/video-posters/video-05.jpg"],
  ["Dit zijn wij | Geert", "01:00", "Een compact karakterverhaal voor Dirk Kuyt Foundation.", "/videos/video-06.mp4", "/video-posters/video-06.jpg"],
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
    title: "Portfolio detail",
    type: "Campaign detail",
    slug: "portfolio-detail",
    image: "/work/work-02.png",
    note: "Detailed visual work from the archive.",
    detail: "A close-up portfolio piece with campaign styling and visual polish.",
  },
  {
    title: "Printed story",
    type: "Print design",
    slug: "printed-story",
    image: "/work/work-03.png",
    note: "Printed campaign material with a clear rhythm.",
    detail: "Print-led design work with structured layouts and expressive imagery.",
  },
  {
    title: "Visual set",
    type: "Mixed media",
    slug: "visual-set",
    image: "/work/work-13.png",
    note: "A mixed set of designed moments.",
    detail: "A compact visual set for campaign storytelling across multiple formats.",
  },
];

const portfolioProjects = rainProjects;

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
  ["2021 - Running", "Therapieland", "Creative Designer", "Concept development and creation of visual materials across print, digital and social media, with a focus on mental health and wellbeing."],
  ["2019 - 2021", "Captains", "Video Creator & Graphic Designer", "Work for clients including PostNL, Fox Sports, Universal, YoungCapital, ANWB, Allianz Direct and more."],
  ["2017 - 2020", "Omroep West", "Freelance Video Editor", "Editor of daily and weekly programs, events, commercials and aftermovies."],
  ["2018 - 2019", "Starsound Productions", "Video Editor & Motion Graphic Designer", "Projects for Nationaal MS Fonds, Make a Wish Foundation, Shell, Unilever and more."],
  ["2016 - 2019", "AT5 & NH Media", "Freelance Video Editor", "Editing for news, weekly programs and local formats."],
  ["2014 - 2017", "Walt Disney Company", "Motion Graphic Design Intern & Operations Assistant", "Promo repacking, bumpers, endboards and on-air workflow support."],
];

const skills = [
  ["Premiere Pro", 92],
  ["Photoshop", 87],
  ["InDesign", 82],
  ["Illustrator", 78],
  ["After Effects", 73],
];

function useReveal() {
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
  }, []);
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
        <Link className="brand" to="/" aria-label="Luminous Graphics home">
          <img src="/logo-lg-line.svg" alt="Luminous Graphics" />
        </Link>
        <button
          className={`menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav id="site-navigation" className={menuOpen ? "is-open" : ""} aria-label="Hoofdnavigatie">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/portfolio">Portfolio</NavLink>
          <NavLink to="/video">Video</NavLink>
          <NavLink to="/experience">Experience</NavLink>
          <NavLink to="/skills">Skills</NavLink>
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
        <Route path="/experience" element={<Experience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logo-options" element={<LogoOptions />} />
      </Routes>
      <Footer />
    </>
  );
}

function getPageTitle(pathname: string) {
  const cleanPath = pathname.replace(/\/$/, "") || "/";

  if (cleanPath === "/") return "Home | Luminous Graphics";
  if (cleanPath === "/portfolio" || cleanPath === "/work") return "Portfolio | Luminous Graphics";
  if (cleanPath === "/video") return "Video | Luminous Graphics";
  if (cleanPath === "/experience") return "Experience | Luminous Graphics";
  if (cleanPath === "/skills") return "Skills | Luminous Graphics";
  if (cleanPath === "/contact") return "Contact | Luminous Graphics";
  if (cleanPath === "/logo-options") return "Logo Options | Luminous Graphics";

  const portfolioMatch = cleanPath.match(/^\/(?:portfolio|work)\/(.+)$/);
  if (portfolioMatch) {
    const project = portfolioProjects.find((item) => item.slug === portfolioMatch[1]);
    return `${project?.title ?? "Project"} | Luminous Graphics`;
  }

  const videoMatch = cleanPath.match(/^\/video\/(.+)$/);
  if (videoMatch) {
    const video = videos.find(([title]) => slugify(title) === videoMatch[1]);
    return `${video?.[0] ?? "Video"} | Luminous Graphics`;
  }

  return "Luminous Graphics";
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
  return <Navigate to={`/portfolio/${slug ?? ""}`} replace />;
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

const chipMessages = ["Design that moves", "Pick a project", "See the work", "Open a story"];

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
      <span>Visual storytelling</span>
      <strong>
        <span className="kb-title-track" style={{ "--title-width": `${titleWidth}px` } as React.CSSProperties}>
          <span className="kb-title" ref={titleRef}>{chipMessages[messageIndex]}</span>
          <i className="kb-dot" aria-hidden="true" />
        </span>
      </strong>
    </div>
  );
}

function Home() {
  useReveal();
  return (
    <main>
      <section className="home-hero page-pad">
        <div className="hero-copy reveal">
          <TypewriterEyebrow text="My name is Davita." />
          <h1>Video editor & graphic designer.</h1>
          <p className="intro">
            Luminous Graphics is the portfolio of Davita: creative design, video editing, motion graphics
            and visual storytelling for brands, campaigns and social content.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/portfolio">
              Explore the portfolio
              <ArrowUpRight size={18} />
            </Link>
            <Link className="button secondary" to="/video">
              Watch video
            </Link>
          </div>
        </div>

        <div className="kinetic-board reveal" aria-label="Portfolio collage">
          <div className="project-rain" aria-label="Featured projects">
            {projectRain.map((project) => (
              <Link
                to={`/portfolio/${project.slug}`}
                style={{
                  "--x": project.x,
                  "--s": project.scale,
                  "--d": project.duration,
                  "--delay": project.delay,
                  "--r1": project.rotateStart,
                  "--r2": project.rotateEnd,
                } as React.CSSProperties}
                key={project.slug}
                aria-label={`Open ${project.title}`}
              >
                <span className="rain-card">
                  <img src={project.image} alt="" />
                  <span className="rain-cta">View project</span>
                </span>
              </Link>
            ))}
          </div>
          <KineticChip />
        </div>
      </section>

      <section className="scroll-words">
        <p className="word-fade" aria-label="Graphic design, photography and videography come together.">
          {"Graphic design, photography and videography come together.".split(" ").map((word, index) => (
            <span style={{ transitionDelay: `${index * 70}ms` }} key={`${word}-${index}`}>
              {word}
            </span>
          ))}
        </p>
      </section>

      <section className="home-random page-pad">
        <div className="section-heading reveal">
          <TypewriterEyebrow text="Portfolio" />
          <h2>Not a neat grid. A living wall of bits, campaigns and stories.</h2>
        </div>
        <div className="random-wall">
          {rotatingProjects.map((project, index) => (
            <Link className={`random-tile tile-${index + 1} reveal`} to={`/portfolio/${project.slug}`} key={project.slug}>
              <img src={project.image} alt="" />
              <span>{project.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="portfolio-modes page-pad">
        <div className="mode-card reveal">
          <span>Graphic design</span>
          <h3>Print, branding and campaign material.</h3>
          <p>Brochures, identities, social visuals and designed assets brought together as one visual archive.</p>
        </div>
        <div className="mode-card reveal">
          <span>Photography</span>
          <h3>People, places and visual atmosphere.</h3>
          <p>Portraits and editorial imagery that support the wider story of a campaign or brand.</p>
        </div>
        <div className="mode-card reveal">
          <span>Videography</span>
          <h3>Edited stories with rhythm and direction.</h3>
          <p>Video content shaped for clarity, emotion and momentum across campaigns and social channels.</p>
        </div>
      </section>

      <section className="home-jump page-pad">
        <Link to="/portfolio" className="jump-card reveal">
          <span>Graphic design / photography</span>
          <strong>See the visual archive</strong>
          <ArrowUpRight />
        </Link>
        <Link to="/video" className="jump-card reveal">
          <span>Videography</span>
          <strong>Watch the story list</strong>
          <Film />
        </Link>
      </section>
    </main>
  );
}

function Portfolio() {
  useReveal();
  return (
    <main>
      <PageIntro eyebrow="Portfolio" title="My latest work." text="A deliberately mixed collection of graphic design, photography, branding, print and social work from the current Luminous Graphics portfolio." />
      <section className="case-section page-pad">
        <div className="case-grid">
          {graphicWork.map((item, index) => (
            <Link className="case-card reveal" to={`/portfolio/${item.slug}`} key={item.title}>
              <div className="case-art">
                <img src={item.image} alt={`${item.title} portfolio item`} />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
              </div>
              <div className="case-meta">
                <p>{item.type}</p>
                <h3>{item.title}</h3>
                <span>{item.note}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mosaic">
          {portfolioProjects.map((project, index) => (
            <Link className={`mosaic-item m-${(index % 5) + 1} reveal`} to={`/portfolio/${project.slug}`} key={project.slug}>
              <img src={project.image} alt={`${project.title} portfolio item`} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function Video() {
  useReveal();
  return (
    <main>
      <PageIntro eyebrow="Videography" title="Stories with pace, clarity and feeling." text="Selected video editing and storytelling work from the existing Luminous Graphics portfolio." />
      <section className="video-section page-pad">
        <div className="video-grid">
          {videos.map(([title, duration, note, src, poster], index) => (
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
              <small>{String(index + 1).padStart(2, "0")} / Video editing & storytelling</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

function PortfolioDetail() {
  const { slug } = useParams();
  const project = portfolioProjects.find((item) => item.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  useReveal();

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen]);

  if (!project) {
    return (
      <main>
        <PageIntro eyebrow="Project" title="Project not found." text="This project is not available in the current Luminous Graphics selection." />
      </main>
    );
  }

  const related = portfolioProjects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <main>
      <section className="detail-hero page-pad reveal">
        <div className="detail-copy">
          <TypewriterEyebrow text={project.type} />
          <h1>{project.title}</h1>
          <p className="intro">{project.detail}</p>
          <Link className="button secondary" to="/portfolio">Back to portfolio</Link>
        </div>
        <button className="detail-media image-zoom-trigger" type="button" onClick={() => setLightboxOpen(true)}>
          <img src={project.image} alt={`${project.title} project detail`} />
          <span>View larger</span>
        </button>
      </section>
      <section className="detail-body page-pad">
        <article className="detail-panel reveal">
          <span>Approach</span>
          <h2>Designed to feel clear, flexible and memorable.</h2>
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
      {lightboxOpen && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} larger preview`} onClick={() => setLightboxOpen(false)}>
          <button className="lightbox-close" type="button" aria-label="Close preview" onClick={() => setLightboxOpen(false)}>
            <X size={20} />
          </button>
          <img src={project.image} alt={`${project.title} enlarged`} onClick={(event) => event.stopPropagation()} />
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
        <PageIntro eyebrow="Video" title="Video not found." text="This video is not available in the current Luminous Graphics selection." />
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
        // Browser autoplay rules can still block playback in some contexts.
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
          <Link className="button secondary" to="/video">Back to videos</Link>
        </div>
        <div className="detail-media video-player">
          <video ref={playerRef} src={src} poster={poster} controls autoPlay playsInline />
        </div>
      </section>
      <section className="detail-body video-detail-body page-pad">
        <article className="detail-panel reveal" ref={storyPanelRef}>
          <span>Story direction</span>
          <h2>Edited for rhythm, clarity and emotional momentum.</h2>
          <p>Each video is presented as a compact story piece, with attention for pacing, structure, message and visual consistency.</p>
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
              <span>Interesting video / {itemDuration}</span>
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
      <PageIntro eyebrow="Experience" title="Creative work across media, campaigns and broadcast." text="A career path shaped by design, editing, motion and storytelling for brands, media and social campaigns." />
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
    </main>
  );
}

function Skills() {
  useReveal();
  return (
    <main>
      <PageIntro eyebrow="Skills" title="A toolkit for motion, layout and visual storytelling." text="Software and craft areas Davita uses across editing, design, motion and campaign content." />
      <section className="skills-section skills-showcase page-pad">
        <div className="skill-copy">
          <TypewriterEyebrow text="Creative toolkit" />
          <h2>From rough cut to polished campaign system.</h2>
          <p>Video, print and digital assets are treated as one workflow: structure first, then rhythm, image, type and motion.</p>
        </div>
        <div className="skill-stack">
          {skills.map(([skill, level], index) => (
            <article
              className={`skill-card skill-card-${index + 1}`}
              style={{ "--skill-delay": `${index * 95}ms` } as React.CSSProperties}
              key={skill}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{skill}</strong>
              <i>{level}%</i>
            </article>
          ))}
        </div>
      </section>
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
            <h1>Let's create something luminous.</h1>
            <p className="intro">Tell Davita about the idea, campaign or visual story you want to shape.</p>
          </div>
        </div>
        <form className="contact-form reveal" action="mailto:luminousdavita@gmail.com" method="post" encType="text/plain">
          <label>
            <span>Name</span>
            <input name="name" type="text" autoComplete="name" placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" />
          </label>
          <label className="full">
            <span>Project type</span>
            <select name="projectType" defaultValue="">
              <option value="" disabled>Select a direction</option>
              <option>Graphic design</option>
              <option>Video editing</option>
              <option>Motion graphics</option>
              <option>Photography</option>
              <option>Other</option>
            </select>
          </label>
          <label className="full">
            <span>Message</span>
            <textarea name="message" rows={7} placeholder="Tell me a little about the project..." />
          </label>
          <button className="button primary" type="submit">Send message</button>
        </form>
        <div className="contact-note reveal">
          <span>Prefer email?</span>
          <a href="mailto:luminousdavita@gmail.com">luminousdavita@gmail.com</a>
        </div>
      </section>
    </main>
  );
}

function LogoOptions() {
  const options = [
    ["Option 1", "Minimal studio mark", "/logo-option-1.svg"],
    ["Option 2", "Editorial wordmark", "/logo-option-2.svg"],
    ["Option 3", "Color-window monogram", "/logo-option-3.svg"],
  ];

  return (
    <main>
      <PageIntro
        eyebrow="Logo directions"
        title="Three professional logo options."
        text="Three possible routes for Luminous Graphics: restrained studio, editorial, and a warmer color-led monogram."
      />
      <section className="logo-options page-pad">
        {options.map(([title, label, src]) => (
          <article className="logo-card reveal" key={title}>
            <div className="logo-preview">
              <img src={src} alt={`${title} for Luminous Graphics`} />
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
      <span>© 2026 Luminous Graphics</span>
      <a href="https://devtec.nl" target="_blank" rel="noreferrer">
        Crafted by Devtec
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
