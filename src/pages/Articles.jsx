import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const cbs = { fontFamily: "'Canterbury', serif" };
const CBS = ({ children }) => <span style={cbs}>{children}</span>;

// ── SVG Vectors ───────────────────────────────────────────────────────────────

const AuditoriumSVG = () => (
  <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="60" cy="72" rx="38" ry="6" fill="rgba(255,185,55,0.12)" />
    <rect x="22" y="62" width="76" height="8" rx="1" fill="rgba(255,185,55,0.18)" />
    <rect x="26" y="60" width="68" height="3" rx="1" fill="rgba(255,200,80,0.25)" />
    <path d="M22 20 Q18 38 22 62 L30 62 Q26 38 28 20Z" fill="rgba(180,60,10,0.35)" />
    <path d="M98 20 Q102 38 98 62 L90 62 Q94 38 92 20Z" fill="rgba(180,60,10,0.35)" />
    <path d="M35 5 L26 62" stroke="rgba(255,210,80,0.08)" strokeWidth="6" strokeLinecap="round" />
    <path d="M60 2 L60 62" stroke="rgba(255,210,80,0.1)" strokeWidth="7" strokeLinecap="round" />
    <path d="M85 5 L94 62" stroke="rgba(255,210,80,0.08)" strokeWidth="6" strokeLinecap="round" />
    <circle cx="35" cy="5" r="2.5" fill="rgba(255,220,100,0.55)" />
    <circle cx="60" cy="2" r="3" fill="rgba(255,220,100,0.65)" />
    <circle cx="85" cy="5" r="2.5" fill="rgba(255,220,100,0.55)" />
    {[48, 38, 29, 21].map((y, row) => {
      const count = 9 + row * 2;
      const spread = 70 + row * 8;
      const start = 60 - spread / 2;
      return Array.from({ length: count }, (_, i) => {
        const x = start + (spread / (count - 1)) * i;
        const opacity = 0.18 + row * 0.05;
        return (
          <g key={`${row}-${i}`}>
            <ellipse cx={x} cy={y + 3} rx="2.2" ry="1.2" fill={`rgba(255,185,55,${opacity})`} />
            <ellipse cx={x} cy={y} rx="1.5" ry="1.5" fill={`rgba(255,185,55,${opacity + 0.05})`} />
          </g>
        );
      });
    })}
  </svg>
);

const TrophySVG = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="28" y="62" width="24" height="4" rx="1" fill="rgba(255,185,55,0.3)" />
    <rect x="32" y="54" width="16" height="8" rx="1" fill="rgba(255,185,55,0.2)" />
    <path d="M24 16 Q22 36 32 46 Q36 50 40 50 Q44 50 48 46 Q58 36 56 16Z" fill="rgba(255,185,55,0.15)" stroke="rgba(255,185,55,0.35)" strokeWidth="0.8" />
    <path d="M28 20 Q27 30 30 38" stroke="rgba(255,220,120,0.35)" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M24 22 Q16 24 16 32 Q16 40 24 38" stroke="rgba(255,185,55,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M56 22 Q64 24 64 32 Q64 40 56 38" stroke="rgba(255,185,55,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M40 24 L41.5 29 L47 29 L42.5 32 L44 37 L40 34 L36 37 L37.5 32 L33 29 L38.5 29Z" fill="rgba(255,200,60,0.45)" />
  </svg>
);

const SchoolsSVG = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="27" y="30" width="26" height="32" rx="1" fill="rgba(255,185,55,0.15)" stroke="rgba(255,185,55,0.3)" strokeWidth="0.7" />
    <polygon points="27,30 40,16 53,30" fill="rgba(255,185,55,0.2)" stroke="rgba(255,185,55,0.3)" strokeWidth="0.7" />
    <rect x="36" y="48" width="8" height="14" rx="1" fill="rgba(255,185,55,0.18)" />
    {[[31,35],[45,35],[31,43],[45,43]].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="5" height="5" rx="0.5" fill="rgba(255,210,80,0.22)" />
    ))}
    <rect x="8" y="40" width="17" height="22" rx="1" fill="rgba(255,185,55,0.1)" stroke="rgba(255,185,55,0.2)" strokeWidth="0.7" />
    <polygon points="8,40 16.5,28 25,40" fill="rgba(255,185,55,0.12)" stroke="rgba(255,185,55,0.2)" strokeWidth="0.7" />
    {[[10,44],[18,44],[10,51],[18,51]].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="rgba(255,210,80,0.15)" />
    ))}
    <rect x="55" y="40" width="17" height="22" rx="1" fill="rgba(255,185,55,0.1)" stroke="rgba(255,185,55,0.2)" strokeWidth="0.7" />
    <polygon points="55,40 63.5,28 72,40" fill="rgba(255,185,55,0.12)" stroke="rgba(255,185,55,0.2)" strokeWidth="0.7" />
    {[[57,44],[65,44],[57,51],[65,51]].map(([x,y],i) => (
      <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="rgba(255,210,80,0.15)" />
    ))}
    <line x1="4" y1="62" x2="76" y2="62" stroke="rgba(255,185,55,0.15)" strokeWidth="0.8" />
    <line x1="40" y1="16" x2="40" y2="8" stroke="rgba(255,185,55,0.4)" strokeWidth="0.8" />
    <polygon points="40,8 47,11 40,14" fill="rgba(255,185,55,0.45)" />
  </svg>
);

const EventsSVG = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M48 10 L30 42 L42 42 L32 70 L58 34 L44 34Z" fill="rgba(255,185,55,0.2)" stroke="rgba(255,185,55,0.4)" strokeWidth="0.8" strokeLinejoin="round" />
    <path d="M45 16 L33 40 L43 40 L35 62 L54 36 L43 36Z" fill="rgba(255,210,80,0.12)" />
    {[[18,18],[62,22],[14,50],[66,50]].map(([x,y],i) => (
      <g key={i}>
        <line x1={x} y1={y-3} x2={x} y2={y+3} stroke="rgba(255,185,55,0.3)" strokeWidth="0.8" />
        <line x1={x-3} y1={y} x2={x+3} y2={y} stroke="rgba(255,185,55,0.3)" strokeWidth="0.8" />
      </g>
    ))}
  </svg>
);

// ── Data (plain strings only — no JSX in arrays) ───────────────────────────

const statCards = [
  {
    value: "149+",
    label: "Years of Legacy",
    sub: "A century and a half of nurturing excellence, leadership, and talent.",
    svg: <TrophySVG />,
  },
  {
    value: "35+",
    label: "Events",
    sub: "Academics, culture, arts, business, and technology — all under one roof.",
    svg: <EventsSVG />,
  },
  {
    value: "5000+",
    label: "Audience",
    sub: "One of Kolkata's most anticipated inter-school celebrations.",
    svg: <AuditoriumSVG />,
    wide: true,
  },
  {
    value: "25+",
    label: "Schools",
    sub: "The brightest young minds from across the city on one prestigious platform.",
    svg: <SchoolsSVG />,
  },
];

// Each fullText entry is either a plain string or { bold, rest } for highlighted words
const articles = [
  {
    number: "01",
    tag: "Institution",
    titleText: "Calcutta Boys' School",
    titleCbs: true,
    titleSuffix: " \u2013 Committed to the Youth of the Nation",
    preview: "At Calcutta Boys' School, Kolkata, a century-old institution of academic excellence and holistic development, the spirit of youth empowerment beats strongly in every corner.",
    fullText: [
      { cbs: "At Calcutta Boys' School", rest: ", Kolkata, a century-old institution of academic excellence and holistic development, the spirit of youth empowerment beats strongly in every corner. Established in 1877 by Bishop James Mills Thoburn, the school has always carried an unwavering commitment to its students and society at large." },
      "During the early 1980s, Mr. Alfred Martin, the then Principal of the school, recognized the need for a platform through which students could express and showcase their talents. Thus, in 1982, CONCORD was born. Over the decades, CONCORD has grown into Kolkata's oldest and one of its most prestigious inter-school festivals, providing generations of young minds with opportunities to compete, collaborate, and excel.",
      "With each passing year, CONCORD evolves, but its purpose remains rooted in the development of young individuals. In a world experiencing rapid change and countless challenges, the need to empower the youth has never been greater. By investing in their dreams and providing the right platform, CBS believes in illuminating the path for future leaders, creators, innovators, and changemakers.",
      { cbs: "Under the guidance of our Principal, Mr. Raja McGee, Calcutta Boys' School", rest: " continues to reach new heights while remaining true to its founding values. As we celebrate 149 years of educational excellence and legacy, we proudly welcome you to the 44th edition of CONCORD, where talent meets opportunity and aspirations transform into achievements." },
      { cbs: "CONCORD is not merely a fest \u2014 it is a tradition that continues to inspire generations and a testament to the enduring commitment of Calcutta Boys' School", rest: " towards the youth of the nation." },
    ],
  },
  {
    number: "02",
    tag: "Retrospective",
    titleText: "CONCORD 2025 \u2013 A Success Story",
    titleCbs: false,
    preview: "The 43rd edition of CONCORD, held from 8th\u201310th July 2025, was nothing short of spectacular, bringing together talented students from schools across the city for three unforgettable days.",
    fullText: [
      "The 43rd edition of CONCORD, held from 8th July to 10th July 2025, was nothing short of spectacular, bringing together talented students from schools across the city for three unforgettable days of celebration, competition, and creativity.",
      "As Kolkata's oldest inter-school festival, CONCORD 2025 once again lived up to its remarkable legacy. With participation from numerous schools and students across a diverse range of events, the fest became a vibrant platform where talent met opportunity and passion met purpose.",
      "From intense competitive events and thought-provoking intellectual contests to captivating cultural showcases and electrifying stage performances, CONCORD 2025 created an atmosphere brimming with enthusiasm and energy. Every corner of the campus reflected the spirit of innovation, collaboration, and youthful excellence.",
      "One of the defining moments of the fest was the spectacular performance by The As in Town, whose electrifying presence left the audience spellbound and transformed the final evening into a memorable celebration of music and unity.",
      "Beyond the competitions and performances, CONCORD 2025 served as a meeting ground for young minds to exchange ideas, forge friendships, and showcase their abilities on a prestigious platform. The fest successfully united students through art, music, culture, intellect, and innovation.",
      'The motto of CONCORD 2025, "Legacy Meets Rebirth," perfectly captured the essence of the edition. It celebrated the rich traditions that have defined CONCORD for decades while embracing evolution, innovation, and the beginning of a bold new era.',
    ],
  },
  {
    number: "03",
    tag: "Vision",
    titleText: "CONCORD 2026 \u2013 Resurge. Reclaim. Reign.",
    titleCbs: false,
    preview: 'The 44th edition of CONCORD marks the beginning of a powerful new chapter in the journey of Kolkata\'s oldest inter-school festival, guided by the tagline "Resurge. Reclaim. Reign."',
    fullText: [
      'The 44th edition of CONCORD marks the beginning of a powerful new chapter in the journey of Kolkata\'s oldest inter-school festival. Guided by the tagline "Resurge. Reclaim. Reign.", CONCORD 2026 stands as a celebration of revival, ambition, excellence, and unwavering determination.',
      { bold: "Resurge", rest: " signifies the resurgence of a legacy that has inspired generations of students. It represents the spirit of rising once again with greater strength, energy, creativity, and purpose than ever before." },
      { bold: "Reclaim", rest: " embodies the determination to reclaim the prestige, impact, and influence that have made CONCORD a landmark event in Kolkata's student community. It reflects the pursuit of excellence and the commitment to preserving the values that have defined CONCORD for over four decades." },
      { bold: "Reign", rest: " symbolises leadership, achievement, and the pursuit of greatness. It represents the aspiration to stand at the pinnacle of excellence and continue inspiring generations through innovation, creativity, and meaningful experiences." },
      "As CONCORD enters its 44th edition, it seeks to bring together the brightest young minds from across the city on a platform that celebrates talent, encourages innovation, and nurtures future leaders.",
      "More than just a fest, CONCORD 2026 is the return of a legacy \u2014 stronger, bolder, and more determined than ever before. It is the resurgence of a tradition, the reclamation of a legacy, and the reign of excellence.",
    ],
  },
];

// ── Paragraph renderer ────────────────────────────────────────────────────────

const renderPara = (item, i) => {
  let content;
  if (typeof item === "string") {
    content = item;
  } else if (item.bold) {
    content = (
      <>
        <strong style={{ color: "rgba(255,200,80,0.8)", fontWeight: 600 }}>{item.bold}</strong>
        {item.rest}
      </>
    );
  } else if (item.cbs) {
    content = (
      <>
        <CBS>{item.cbs}</CBS>
        {item.rest}
      </>
    );
  }
  return (
    <motion.p
      key={i}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + i * 0.06, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      className="font-abahaya text-justify leading-relaxed"
      style={{ fontSize: "clamp(0.93rem,1.4vw,1.12rem)", lineHeight: 1.8, color: "rgba(255,218,172,0.6)" }}
    >
      {content}
    </motion.p>
  );
};

const ArticleTitle = ({ article }) => {
  if (article.titleCbs) {
    return (
      <>
        <CBS>{article.titleText}</CBS>
        {article.titleSuffix}
      </>
    );
  }
  return <>{article.titleText}</>;
};

// ── Stat Card ─────────────────────────────────────────────────────────────────

const StatCard = ({ card, index, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    className={`relative flex flex-col overflow-hidden group ${card.wide ? "md:col-span-2" : ""}`}
    style={{
      background: "rgba(255,185,55,0.03)",
      border: "1px solid rgba(255,190,60,0.12)",
      padding: "clamp(1.2rem,2.5vw,2rem)",
      minHeight: card.wide ? "clamp(160px,22vh,220px)" : "clamp(180px,24vh,240px)",
    }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,185,55,0.06) 0%, transparent 70%)" }} />
    <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: "linear-gradient(to right, transparent, rgba(255,190,60,0.4), transparent)" }} />

    {card.wide ? (
      <div className="flex items-center gap-8 h-full">
        <div className="flex flex-col gap-2 flex-1">
          <div className="font-main font-black leading-none"
            style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "rgba(255,185,55,0.8)" }}>
            {card.value}
          </div>
          <div className="font-main text-[0.58rem] tracking-[0.36em] uppercase font-medium"
            style={{ color: "rgba(255,190,60,0.35)" }}>
            {card.label}
          </div>
          <p className="font-abahaya mt-2 leading-relaxed"
            style={{ fontSize: "clamp(0.8rem,1.1vw,1rem)", color: "rgba(255,210,160,0.38)" }}>
            {card.sub}
          </p>
        </div>
        <div className="shrink-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300"
          style={{ width: "clamp(80px,14vw,140px)", height: "clamp(55px,9vw,95px)" }}>
          {card.svg}
        </div>
      </div>
    ) : (
      <div className="flex flex-col justify-between h-full gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-main font-black leading-none"
              style={{ fontSize: "clamp(2rem,4vw,3.4rem)", color: "rgba(255,185,55,0.8)" }}>
              {card.value}
            </div>
            <div className="font-main text-[0.56rem] tracking-[0.36em] uppercase font-medium mt-1.5"
              style={{ color: "rgba(255,190,60,0.32)" }}>
              {card.label}
            </div>
          </div>
          <div className="shrink-0 opacity-35 group-hover:opacity-55 transition-opacity duration-300"
            style={{ width: "clamp(44px,6vw,64px)", height: "clamp(44px,6vw,64px)" }}>
            {card.svg}
          </div>
        </div>
        <p className="font-abahaya leading-relaxed"
          style={{ fontSize: "clamp(0.8rem,1vw,0.95rem)", color: "rgba(255,210,160,0.38)" }}>
          {card.sub}
        </p>
      </div>
    )}
  </motion.div>
);

// ── Article Card ──────────────────────────────────────────────────────────────

const ArticleCard = ({ article, index, isInView, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.3 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    className="relative flex flex-col group cursor-pointer"
    style={{
      background: "rgba(255,185,55,0.025)",
      border: "1px solid rgba(255,190,60,0.1)",
      padding: "clamp(1.4rem,2.8vw,2.2rem)",
    }}
    onClick={() => onOpen(article)}
  >
    <div className="absolute left-0 top-0 bottom-0 w-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: "linear-gradient(to bottom, transparent, rgba(255,190,60,0.45), transparent)" }} />

    <div className="flex items-start justify-between gap-6">
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3">
          <span className="font-main text-[0.52rem] tracking-[0.4em] uppercase font-black"
            style={{ color: "rgba(255,185,55,0.25)" }}>
            {article.number}
          </span>
          <span className="w-4 h-px" style={{ background: "rgba(255,190,60,0.2)" }} />
          <span className="font-main text-[0.5rem] tracking-[0.36em] uppercase font-medium"
            style={{ color: "rgba(255,175,40,0.4)" }}>
            {article.tag}
          </span>
        </div>
        <h3 className="font-abahaya leading-snug group-hover:text-amber-200 transition-colors duration-300"
          style={{ fontSize: "clamp(1.05rem,1.6vw,1.35rem)", color: "rgba(255,230,185,0.72)" }}>
          <ArticleTitle article={article} />
        </h3>
        <p className="font-abahaya leading-relaxed"
          style={{ fontSize: "clamp(0.82rem,1.1vw,0.97rem)", color: "rgba(255,210,160,0.35)", maxWidth: "52ch" }}>
          {article.preview}
        </p>
      </div>
    </div>

    <div className="mt-5 flex items-center gap-2.5">
      <img src="/star.svg" alt="" className="h-3 opacity-40" />
      <span className="font-main text-[0.58rem] tracking-[0.3em] uppercase font-medium transition-colors duration-200 group-hover:text-amber-400"
        style={{ color: "rgba(255,185,55,0.45)" }}>
        Read Article
      </span>
      <motion.span
        animate={{ x: [0, 3, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="font-main text-[0.62rem]"
        style={{ color: "rgba(255,185,55,0.45)" }}
      >
        &#8594;
      </motion.span>
    </div>
  </motion.div>
);

// ── Modal ─────────────────────────────────────────────────────────────────────

const ArticleModal = ({ article, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ backdropFilter: "blur(12px)", background: "rgba(4,2,1,0.78)" }}
      onMouseDown={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl flex flex-col"
        style={{
          background: "rgba(10,6,3,0.97)",
          border: "1px solid rgba(255,190,60,0.15)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.75)",
          maxHeight: "88vh",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="w-full h-px" style={{
          background: "linear-gradient(to right, rgba(255,190,60,0.55), rgba(255,190,60,0.08), transparent)",
        }} />

        <div className="flex items-start justify-between px-8 pt-7 pb-5 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-4 h-px" style={{ background: "rgba(255,190,60,0.45)" }} />
              <span className="font-main text-[0.52rem] tracking-[0.4em] uppercase font-medium"
                style={{ color: "rgba(255,175,40,0.45)" }}>
                {article.tag} &middot; Article {article.number}
              </span>
            </div>
            <h2 className="font-abahaya leading-snug"
              style={{ fontSize: "clamp(1rem,1.7vw,1.28rem)", color: "rgba(255,235,195,0.82)" }}>
              <ArticleTitle article={article} />
            </h2>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="text-xl leading-none cursor-pointer shrink-0 mt-1"
            style={{ color: "rgba(255,190,60,0.3)" }}
          >
            &#x2715;
          </motion.button>
        </div>

        <div className="mx-8 h-px" style={{ background: "rgba(255,190,60,0.08)" }} />

        <div className="px-8 py-6 space-y-4 overflow-y-auto" style={{ maxHeight: "58vh" }}>
          {article.fullText.map((item, i) => renderPara(item, i))}
        </div>

        <div className="px-8 py-4 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,190,60,0.07)" }}>
          <span className="font-main text-[0.5rem] tracking-[0.35em] uppercase"
            style={{ color: "rgba(255,190,60,0.2)" }}>
            CONCORD 2026 &middot; Est. 1877
          </span>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="font-main text-[0.56rem] tracking-[0.28em] uppercase transition-colors cursor-pointer"
            style={{ color: "rgba(255,185,55,0.4)" }}
          >
            Close &#8594;
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────

const Articles = () => {
  const [openArticle, setOpenArticle] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── Desktop ── */}
      <div
        ref={ref}
        className="hidden md:block relative w-screen overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,190,60,0.1)", minHeight: "100vh" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 50% 40% at 80% 40%, rgba(140,60,5,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 35% 45% at 15% 65%, rgba(100,40,5,0.07) 0%, transparent 65%)
          `,
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }} />

        <div className="relative z-10 w-full px-[10vh] py-[10vh]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="w-8 h-px" style={{ background: "rgba(255,190,60,0.4)" }} />
            <span className="font-main text-[0.62rem] tracking-[0.42em] uppercase font-medium"
              style={{ color: "rgba(255,175,40,0.55)" }}>
              Concord 2026
            </span>
          </motion.div>

          <div className="flex items-end justify-between mb-14 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-abahaya mb-3 leading-relaxed"
                style={{ fontSize: "clamp(1.5rem,2.4vw,2.3rem)", color: "rgba(255,235,195,0.8)" }}>
                Experience the{" "}
                <span style={{
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundImage: "linear-gradient(125deg, rgba(255,175,40,1), rgba(255,210,90,1))",
                }}>
                  Oldest Fest
                </span>
              </p>
              <p className="font-abahaya leading-relaxed"
                style={{ fontSize: "clamp(0.92rem,1.3vw,1.18rem)", color: "rgba(255,210,160,0.38)", maxWidth: "48ch" }}>
                Every year, CONCORD brings together the energy, passion, and creativity of students from all over the city &#8212; a vibrant celebration of talent, innovation, and culture.
              </p>
            </motion.div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4 mb-16">
            {statCards.map((card, i) => (
              <StatCard key={card.label} card={card} index={i} isInView={isInView} />
            ))}
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center gap-4 mb-14"
          >
            <div className="flex-1 h-px" style={{ background: "rgba(255,190,60,0.08)" }} />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <rect x="5" y="0.5" width="6.5" height="6.5" transform="rotate(45 5 5)" fill="none" stroke="rgba(255,190,60,0.3)" strokeWidth="0.8" />
              <rect x="5" y="3" width="3" height="3" transform="rotate(45 5 5)" fill="rgba(255,190,60,0.25)" />
            </svg>
            <div className="flex-1 h-px" style={{ background: "rgba(255,190,60,0.08)" }} />
          </motion.div>

          {/* Articles label */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="w-6 h-px" style={{ background: "rgba(255,190,60,0.3)" }} />
            <span className="font-main text-[0.56rem] tracking-[0.4em] uppercase font-medium"
              style={{ color: "rgba(255,175,40,0.4)" }}>
              Articles
            </span>
          </motion.div>

          {/* Article cards */}
          <div className="flex flex-col gap-4">
            {articles.map((article, i) => (
              <ArticleCard
                key={article.number}
                article={article}
                index={i}
                isInView={isInView}
                onOpen={setOpenArticle}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div
        className="md:hidden relative w-screen overflow-hidden px-5 py-16"
        style={{ borderTop: "1px solid rgba(255,190,60,0.1)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(140,60,5,0.09) 0%, transparent 70%)",
        }} />

        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px" style={{ background: "rgba(255,190,60,0.4)" }} />
            <span className="font-main text-[0.56rem] tracking-[0.4em] uppercase font-medium"
              style={{ color: "rgba(255,175,40,0.5)" }}>
              Concord 2026
            </span>
          </div>

          <div>
            <p className="font-abahaya leading-relaxed mb-2"
              style={{ fontSize: "clamp(1.3rem,5vw,1.6rem)", color: "rgba(255,235,195,0.8)" }}>
              Experience the{" "}
              <span style={{
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage: "linear-gradient(125deg, rgba(255,175,40,1), rgba(255,210,90,1))",
              }}>
                Oldest Fest
              </span>
            </p>
            <p className="font-abahaya leading-relaxed"
              style={{ fontSize: "clamp(0.85rem,3.2vw,1rem)", color: "rgba(255,210,160,0.35)" }}>
              A vibrant celebration of talent, innovation, and culture &#8212; every year.
            </p>
          </div>

          {/* Mobile stat cards */}
          <div className="grid grid-cols-2 gap-3">
            {statCards.map((card) => (
              <div
                key={card.label}
                className={`relative flex flex-col gap-2 p-4 ${card.wide ? "col-span-2" : ""}`}
                style={{ background: "rgba(255,185,55,0.03)", border: "1px solid rgba(255,190,60,0.11)" }}
              >
                {card.wide ? (
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-main font-black" style={{ fontSize: "1.9rem", color: "rgba(255,185,55,0.8)" }}>{card.value}</div>
                      <div className="font-main text-[0.5rem] tracking-[0.3em] uppercase font-medium" style={{ color: "rgba(255,190,60,0.3)" }}>{card.label}</div>
                      <p className="font-abahaya mt-1 leading-relaxed text-[0.78rem]" style={{ color: "rgba(255,210,160,0.32)" }}>{card.sub}</p>
                    </div>
                    <div className="shrink-0 opacity-35" style={{ width: 56, height: 38 }}>{card.svg}</div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-main font-black" style={{ fontSize: "1.6rem", color: "rgba(255,185,55,0.8)" }}>{card.value}</div>
                        <div className="font-main text-[0.48rem] tracking-[0.3em] uppercase font-medium mt-0.5" style={{ color: "rgba(255,190,60,0.28)" }}>{card.label}</div>
                      </div>
                      <div className="opacity-30 shrink-0" style={{ width: 34, height: 34 }}>{card.svg}</div>
                    </div>
                    <p className="font-abahaya leading-relaxed text-[0.76rem]" style={{ color: "rgba(255,210,160,0.32)" }}>{card.sub}</p>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "rgba(255,190,60,0.08)" }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,190,60,0.25)" }} />
            <div className="flex-1 h-px" style={{ background: "rgba(255,190,60,0.08)" }} />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-5 h-px" style={{ background: "rgba(255,190,60,0.3)" }} />
            <span className="font-main text-[0.54rem] tracking-[0.38em] uppercase font-medium"
              style={{ color: "rgba(255,175,40,0.4)" }}>
              Articles
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {articles.map((article) => (
              <div
                key={article.number}
                className="flex flex-col gap-3 p-4 cursor-pointer"
                style={{ background: "rgba(255,185,55,0.025)", border: "1px solid rgba(255,190,60,0.1)" }}
                onClick={() => setOpenArticle(article)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-main text-[0.48rem] tracking-[0.38em] uppercase font-black"
                    style={{ color: "rgba(255,185,55,0.22)" }}>{article.number}</span>
                  <span className="w-3 h-px" style={{ background: "rgba(255,190,60,0.18)" }} />
                  <span className="font-main text-[0.46rem] tracking-[0.34em] uppercase font-medium"
                    style={{ color: "rgba(255,175,40,0.35)" }}>{article.tag}</span>
                </div>
                <h3 className="font-abahaya leading-snug"
                  style={{ fontSize: "clamp(0.95rem,3.8vw,1.15rem)", color: "rgba(255,230,185,0.7)" }}>
                  <ArticleTitle article={article} />
                </h3>
                <div className="flex items-center gap-2">
                  <img src="/star.svg" alt="" className="h-2.5 opacity-35" />
                  <span className="font-main text-[0.52rem] tracking-[0.28em] uppercase font-medium"
                    style={{ color: "rgba(255,185,55,0.4)" }}>
                    Read Article &#8594;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {openArticle && (
          <ArticleModal article={openArticle} onClose={() => setOpenArticle(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Articles;