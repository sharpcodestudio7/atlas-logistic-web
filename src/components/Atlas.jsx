'use client';
import { useState, useEffect, useRef, useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import { useInView } from '@/hooks/useInView';
import { useWindowWidth as useWW } from '@/hooks/useWindowWidth';
import { WA_LINK as WA, PHONE_LINK as PH, IMAGES } from '@/lib/constants';

function R({ children, className = "", delay = 0, dir = "up" }) {
  const [ref, v] = useInView();
  const b = dir === "left" ? "translate-x-16" : dir === "right" ? "-translate-x-16" : "translate-y-16";
  return <div ref={ref} className={`transition-all ease-out ${v ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${b}`} ${className}`} style={{ transitionDuration: "800ms", transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Stg({ children, className = "", ms = 100, dirs }) {
  const [ref, v] = useInView();
  const arr = Array.isArray(children) ? children : [children];
  const count = arr.length;
  return (
    <div ref={ref} className={className}>
      {arr.map((c, i) => {
        const dir = dirs ? dirs(i, count) : "up";
        const anim = dir === "left" ? "springLeft" : dir === "right" ? "springRight" : "springUp";
        return (
          <div key={i} style={{ animation: v ? `${anim} 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * ms}ms both` : "none", opacity: v ? undefined : 0, height: "100%" }}>
            {c}
          </div>
        );
      })}
    </div>
  );
}

function Logo({ h = 52, style = {}, variant = "light" }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);
  return (
    <img
      src={IMAGES.logo}
      alt="Atlas Logistic"
      style={{
        height: h, width: "auto", objectFit: "contain",
        filter: variant === "light" ? "brightness(1.3) contrast(1.1) saturate(1.2)" : "none",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-10px)",
        transition: "opacity 800ms ease, transform 800ms ease",
        ...style,
      }}
    />
  );
}

function AnimBtn({ href, children, bg, hoverBg, shadow, hoverShadow, external = false, style = {}, onClick }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: hov ? (hoverBg || bg) : bg,
        color: "#fff", padding: style?.padding || "12px 24px", borderRadius: 50,
        fontSize: 15, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif",
        textTransform: "none", letterSpacing: 0, textDecoration: "none",
        boxShadow: hov ? (hoverShadow || shadow || "0 12px 32px rgba(0,0,0,0.2)") : (shadow || "0 6px 20px rgba(0,0,0,0.15)"),
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: pressed ? "scale(0.96)" : hov ? "translateY(-2px)" : "translateY(0)",
        filter: hov ? "brightness(1.08)" : "brightness(1)",
        ...style,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {children}
    </a>
  );
}

function NavLink({ href, label }) {
  const [hov, setHov] = useState(false);
  const scrollTo = (e) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      window.location.href = `/${href}`;
    }
  };
  return (
    <a href={href} onClick={scrollTo} style={{
      color: hov ? "#fff" : "rgba(255,255,255,0.7)", fontSize: 17, fontWeight: 500,
      fontFamily: "'Fira Sans',sans-serif", textDecoration: "none",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative", paddingBottom: 8, display: "inline-block",
      textShadow: hov ? "0 0 12px rgba(0,166,255,0.4)" : "none",
      letterSpacing: hov ? "0.3px" : "0px",
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
    >
      {label}
      {/* Shimmer line - grows from center */}
      <span style={{
        position: "absolute", bottom: 0, left: "50%",
        width: hov ? "100%" : "0%", height: 2, borderRadius: 2,
        background: "linear-gradient(90deg, transparent, #00a6ff, #1b6fea, transparent)",
        transform: "translateX(-50%)",
        transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: hov ? "0 0 8px rgba(0,166,255,0.4)" : "none",
      }} />
      {/* Subtle glow behind on hover */}
      <span style={{
        position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
        width: hov ? "120%" : "0%", height: 16,
        background: "radial-gradient(ellipse, rgba(0,166,255,0.12) 0%, transparent 70%)",
        transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: "none",
      }} />
    </a>
  );
}

function LangBtn({ toggleLang, lang, mobile = false }) {
  const [pressed, setPressed] = useState(false);
  if (mobile) return (
    <button onClick={() => toggleLang()} style={{
      display: "flex", alignItems: "center", gap: 8, padding: "12px 0",
      background: "none", border: "none", cursor: "pointer",
      color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: 600,
      fontFamily: "'Fira Sans',sans-serif", width: "100%",
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" style={{ animation: "globeSpin 8s linear infinite", transformOrigin: "center", flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4" ry="10" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="2" y1="15" x2="22" y2="15" />
      </svg>
      {lang === "es" ? "Switch to English" : "Cambiar a Español"}
    </button>
  );
  return (
    <button
      onClick={() => { setPressed(true); toggleLang(); setTimeout(() => setPressed(false), 200); }}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "6px 12px", borderRadius: 20,
        border: "1px solid rgba(27,111,234,0.3)",
        background: pressed ? "rgba(27,111,234,0.18)" : "rgba(27,111,234,0.06)",
        cursor: "pointer",
        transform: pressed ? "scale(0.92)" : "scale(1)",
        transition: "transform 0.2s, background 0.2s, border-color 0.2s",
        outline: "none",
      }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(27,111,234,0.12)"; e.currentTarget.style.borderColor = "#1b6fea"; }}
      onMouseLeave={e => { e.currentTarget.style.background = pressed ? "rgba(27,111,234,0.18)" : "rgba(27,111,234,0.06)"; e.currentTarget.style.borderColor = "rgba(27,111,234,0.3)"; }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.5" strokeLinecap="round" style={{ animation: "globeSpin 8s linear infinite", transformOrigin: "center" }}>
        <circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4" ry="10" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="2" y1="15" x2="22" y2="15" />
      </svg>
      <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
        {lang.toUpperCase()}
      </span>
    </button>
  );
}

function Nav() {
  const { t, lang, toggleLang } = useContext(LanguageContext);
  const lnk = [
    { l: t("nav.inicio"),    h: "#inicio" },
    { l: t("nav.servicios"), h: "#servicios" },
    { l: t("nav.nosotros"),  h: "#nosotros" },
    { l: t("nav.contacto"),  h: "#contacto" },
  ];
  const [mo, setMo] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let teardown = null;
    const t = setTimeout(() => {
      const hero = document.getElementById("inicio");
      if (!hero) {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll);
        teardown = () => window.removeEventListener('scroll', onScroll);
      } else {
        const obs = new IntersectionObserver(([e]) => {
          setScrolled(e.intersectionRatio < 0.3);
        }, { threshold: [0, 0.1, 0.2, 0.3, 0.5, 1] });
        obs.observe(hero);
        teardown = () => obs.disconnect();
      }
    }, 100);
    return () => { clearTimeout(t); if (teardown) teardown(); };
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(12,35,64,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.05)" : "none",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 75 : 120, transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        <a href="#inicio" onClick={(e) => { e.preventDefault(); const el = document.getElementById('inicio'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); else window.location.href = '/'; }}>
          <div style={scrolled
            ? { animation: "none", filter: "none", transform: "scale(1)", transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }
            : { animation: "logoGlow 3s ease-in-out infinite", transform: "scale(1.05)", transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }
          }>
            <Logo h={scrolled ? 80 : 108} variant={scrolled ? "dark" : "light"} style={{ transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} />
          </div>
        </a>
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 36 }}>
          {lnk.map(l => <NavLink key={l.h} href={l.h} label={l.l} />)}
          <LangBtn toggleLang={toggleLang} lang={lang} />
        </div>
        <button onClick={() => setMo(!mo)} className="md:hidden" style={{ padding: 8, background: "none", border: "none", cursor: "pointer" }} aria-label="Menú">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">{mo ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}</svg>
        </button>
      </div>
      {mo && <div style={{ background: scrolled ? "rgba(12,35,64,0.95)" : "rgba(12,35,64,0.97)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 24px" }}>
        {lnk.map(l => <a key={l.h} href={l.h} onClick={(e) => { e.preventDefault(); setMo(false); const el = document.getElementById(l.h.replace('#','')); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 140; window.scrollTo({ top, behavior: 'smooth' }); } }} style={{ display: "block", padding: "12px 0", color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500, fontFamily: "'Fira Sans',sans-serif", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{l.l}</a>)}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <LangBtn toggleLang={() => { toggleLang(); setMo(false); }} lang={lang} mobile />
        </div>
        <div style={{ paddingTop: 16, paddingBottom: 8, display: "flex", gap: 10 }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => setMo(false)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 16px", borderRadius: 50, background: "#25D366", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            WhatsApp
          </a>
          <a href={PH} onClick={() => setMo(false)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 16px", borderRadius: 50, background: "linear-gradient(135deg, #1b6fea, #00a6ff)", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif", textDecoration: "none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
            {t("nav.llamar")}
          </a>
        </div>
      </div>}
    </nav>
  );
}

function TypeWriter() {
  const { t } = useContext(LanguageContext);
  const words = t("hero.words").split("|");
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing");
  const wordsKey = words.join(",");
  useEffect(() => { setDisplayed(""); setWordIndex(0); setPhase("typing"); }, [wordsKey]);
  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timeout;
    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setPhase("waiting"), 1500);
      }
    } else if (phase === "waiting") {
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
      } else {
        setWordIndex(i => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex]);
  return (
    <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <span style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>{t("hero.subtitulo")}</span>
      <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "#ffffff" }}>{displayed}<span style={{ animation: "blink 0.5s step-end infinite", marginLeft: 1 }}>|</span></span>
    </div>
  );
}

function Hero() {
  const { t } = useContext(LanguageContext);
  return (
    <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <video autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}>
        <source src="/videos/video.mp4" type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,35,64,0.9) 0%, rgba(12,35,64,0.72) 40%, rgba(12,35,64,0.55) 100%)" }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "110px 24px 60px", width: "100%" }}>
        <div style={{ maxWidth: 800 }}>
          <R delay={200}><h1 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, color: "#fff", fontSize: "clamp(2.2rem, 5.5vw, 4.4rem)", lineHeight: 1.08, letterSpacing: "-0.02em", marginTop: -80 }}>{t("hero.titulo.l1")}<br />{t("hero.titulo.l2")}</h1></R>
          <R delay={300}><TypeWriter /></R>

          <R delay={600}><div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 14 }}>
            <AnimBtn href={WA} external bg="#00a6ff" hoverBg="#1b6fea" shadow="0 8px 24px rgba(0,166,255,0.35)" hoverShadow="0 14px 32px rgba(27,111,234,0.4)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              {t("hero.cta1")}
            </AnimBtn>
            <AnimBtn href="#contacto" onClick={(e) => { e.preventDefault(); const el = document.getElementById('contacto'); if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 140; window.scrollTo({ top, behavior: 'smooth' }); } }} bg="linear-gradient(135deg, #1b6fea, #00a6ff)" hoverBg="linear-gradient(135deg, #00a6ff, #1b6fea)" shadow="0 8px 24px rgba(27,111,234,0.3)" hoverShadow="0 14px 32px rgba(0,166,255,0.4)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
              {t("hero.cta2")}
            </AnimBtn>
          </div></R>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}><svg viewBox="0 0 1440 50" style={{ width: "100%", display: "block" }} preserveAspectRatio="none"><path d="M0 50V25C360 0 1080 0 1440 25V50H0Z" fill="#f0f4f8" /></svg></div>
    </section>
  );
}

function AnimIcon({ children, size = 56, hov = false, color = "#1b6fea", hoverAnim = "whyusPulse" }) {
  const [drawn, setDrawn] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setDrawn(true); obs.unobserve(el); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!hov) return;
    const interval = setInterval(() => setAnimKey(k => k + 1), 3000);
    return () => clearInterval(interval);
  }, [hov]);
  return (
    <div ref={ref} style={{
      color: hov ? "#00a6ff" : color,
      transform: hov ? "scale(1.12)" : "scale(1)",
      transition: "all 0.4s ease",
      filter: hov ? `drop-shadow(0 0 12px ${color}44)` : "none",
      display: "flex", justifyContent: "center",
      animation: hov ? `${hoverAnim} 1.2s ease infinite` : "none",
    }}>
      <svg key={animKey} width={size} height={size} viewBox="0 0 32 32" fill="none" className={drawn ? "anim-icon-drawn" : "anim-icon-hidden"}>{children}</svg>
    </div>
  );
}

const svcIcons = {
  importacion: { hoverAnim: "whyusSpin", icon: <><circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" className="ai-s1" style={{ strokeDasharray: 76, strokeDashoffset: 76 }} /><ellipse cx="16" cy="16" rx="6" ry="12" stroke="currentColor" strokeWidth="1.2" className="ai-s2" style={{ strokeDasharray: 60, strokeDashoffset: 60 }} /><line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="1" className="ai-s3" style={{ strokeDasharray: 24, strokeDashoffset: 24 }} /><line x1="4" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1" className="ai-s3" style={{ strokeDasharray: 24, strokeDashoffset: 24 }} /><path d="M16 8v16M13 21l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="ai-s2" style={{ strokeDasharray: 30, strokeDashoffset: 30 }} /></> },
  exportacion: { hoverAnim: "whyusPulse", icon: <><path d="M8 6h16a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" className="ai-s1" style={{ strokeDasharray: 72, strokeDashoffset: 72 }} /><path d="M12 20l8-8M14 12h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="ai-s2" style={{ strokeDasharray: 30, strokeDashoffset: 30 }} /></> },
  maritimo: { hoverAnim: "whyusBounce", icon: <><path d="M4 22c2-4 6-6 12-6s10 2 12 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="ai-s1" style={{ strokeDasharray: 40, strokeDashoffset: 40 }} /><path d="M10 16V8h4v4h4V8h4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="ai-s2" style={{ strokeDasharray: 50, strokeDashoffset: 50 }} /><line x1="16" y1="4" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="ai-s3" style={{ strokeDasharray: 4, strokeDashoffset: 4 }} /><path d="M4 25c4 3 8 3 12 0s8-3 12 0" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" className="ai-s3" style={{ strokeDasharray: 40, strokeDashoffset: 40 }} /></> },
  aereo: { hoverAnim: "whyusPulse", icon: <><path d="M26 12l-10 4-10-4 10-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="ai-s1" style={{ strokeDasharray: 50, strokeDashoffset: 50 }} /><path d="M6 12v6l10 6 10-6v-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="ai-s2" style={{ strokeDasharray: 60, strokeDashoffset: 60 }} /><path d="M16 16v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="ai-s3" style={{ strokeDasharray: 8, strokeDashoffset: 8 }} /></> },
  casillero: { hoverAnim: "whyusBounce", icon: <><path d="M4 14l12-8 12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="ai-s1" style={{ strokeDasharray: 40, strokeDashoffset: 40 }} /><path d="M7 16v10a1 1 0 001 1h16a1 1 0 001-1V16" stroke="currentColor" strokeWidth="1.5" fill="none" className="ai-s2" style={{ strokeDasharray: 40, strokeDashoffset: 40 }} /><rect x="13" y="19" width="6" height="8" rx="0.5" stroke="currentColor" strokeWidth="1.3" className="ai-s3" style={{ strokeDasharray: 28, strokeDashoffset: 28 }} /><line x1="16" y1="22" x2="16" y2="24" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" className="ai-s3" style={{ strokeDasharray: 2, strokeDashoffset: 2 }} /></> },
  terrestre: { hoverAnim: "whyusBounce", icon: <><rect x="3" y="10" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" className="ai-s1" style={{ strokeDasharray: 60, strokeDashoffset: 60 }} /><path d="M21 14h5l3 4v4h-7V14z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="ai-s2" style={{ strokeDasharray: 30, strokeDashoffset: 30 }} /><circle cx="10" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.5" className="ai-s3" style={{ strokeDasharray: 16, strokeDashoffset: 16 }} /><circle cx="25" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.5" className="ai-s3" style={{ strokeDasharray: 16, strokeDashoffset: 16 }} /></> },
  especiales: { hoverAnim: "whyusPulse", icon: <><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" className="ai-s1" style={{ strokeDasharray: 80, strokeDashoffset: 80 }} /></> },
};

/* ─── serviceData ─── */
const serviceData = {
  importacion: {
    title: "Importación por Courier",
    subtitle: "Ingreso ágil de mercancías a Colombia",
    queEs: "La importación es un servicio de envío internacional diseñado para el ingreso ágil de mercancías a Colombia bajo la modalidad courier. Es ideal para compras en el exterior, envíos urgentes y paquetes de menor volumen, ofreciendo rapidez, trazabilidad y procesos simplificados.",
    pasos: [
      { title: "Recepción de documentación", desc: "Validamos la factura comercial y los datos completos del envío." },
      { title: "Generación de guía internacional", desc: "Emitimos el número de seguimiento (tracking) para control del envío." },
      { title: "Transporte aéreo", desc: "Movilizamos la mercancía bajo modalidad courier con tiempos optimizados." },
      { title: "Clasificación aduanera en Colombia", desc: "Realizamos el proceso aduanero conforme a la normativa vigente." },
      { title: "Gestión de impuestos y tributos", desc: "Calculamos y gestionamos el pago anticipado cuando aplica. Envíos menores a USD $200 desde EE.UU. generalmente exentos por TLC. Envíos superiores: 10% arancel + 19% IVA sobre valor CIF." },
      { title: "Liberación y entrega final", desc: "Nacionalizamos la mercancía y coordinamos la entrega en destino." },
    ],
    idealPara: [
      "Empresas que requieren reposición rápida de inventario",
      "Negocios de e-commerce",
      "Importadores frecuentes de mercancía liviana",
      "Emprendedores que compran en el exterior",
      "Envíos urgentes que requieren rapidez y control",
    ],
  },
  exportacion: {
    title: "Exportación por Courier",
    subtitle: "Envíos desde Colombia hacia más de 220 países",
    queEs: "La exportación por courier es un servicio de envío internacional ágil y seguro que permite enviar documentos y paquetes desde Colombia hacia más de 220 países. Este proceso se caracteriza por su gestión simplificada, cumplimiento normativo y tiempos de tránsito optimizados, garantizando que tu mercancía llegue a destino de forma eficiente.",
    pasos: [
      { title: "Recolección de la mercancía", desc: "Recibimos tu paquete en nuestras instalaciones o lo recogemos directamente en tu ubicación." },
      { title: "Embalaje y verificación", desc: "Realizamos el embalaje adecuado, asegurando la protección del contenido y confirmando peso y dimensiones." },
      { title: "Generación de guía aérea", desc: "Emitimos la documentación necesaria para el transporte internacional." },
      { title: "Confirmación y pago del envío", desc: "Se valida la información del envío y se procesa el pago correspondiente." },
      { title: "Despacho internacional", desc: "Tu paquete es enviado hacia el país de destino a través de nuestra red logística." },
      { title: "Seguimiento en tiempo real", desc: "Monitoreo 24/7 hasta la entrega final, con visibilidad completa del estado del envío." },
    ],
    idealPara: "Empresas, e-commerce y emprendedores que necesitan envíos rápidos y seguros al exterior.",
  },
  terrestre: {
    title: "Envíos Terrestres a Venezuela",
    subtitle: "Transporte terrestre optimizando costos sin sacrificar seguridad",
    queEs: "Un servicio de transporte terrestre diseñado para envíos hacia Venezuela, optimizando costos sin sacrificar seguridad. La carga se consolida durante la semana y el tránsito hacia Venezuela inicia los días sábado.",
    pasos: [
      { title: "Consolidación de carga", desc: "La carga se consolida durante la semana y el tránsito hacia Venezuela inicia los días sábado." },
      { title: "Tránsito internacional", desc: "El tiempo estimado de entrega es de 10 a 15 días hábiles, contados a partir de la salida del transporte." },
      { title: "Trazabilidad del envío", desc: "La trazabilidad del envío será enviada por su asesor cada dos días durante el tránsito." },
      { title: "Entrega puerta a puerta", desc: "Servicio puerta a puerta: recogemos y entregamos en la dirección indicada." },
    ],
    idealPara: [
      "Clientes que buscan una alternativa más económica para envíos internacionales",
    ],
  },
  casillero: {
    title: "Casillero Internacional",
    subtitle: "Direcciones en EE.UU., España y China para tus compras",
    queEs: "El casillero internacional es un servicio que te permite realizar compras en tiendas del exterior utilizando direcciones físicas en países como Estados Unidos, España y China. Nosotros recibimos tus paquetes y los gestionamos para su envío seguro hasta Colombia.",
    pasos: [
      { title: "Asignación de dirección internacional", desc: "Te proporcionamos una dirección física en Estados Unidos, España o China." },
      { title: "Compra en tiendas online", desc: "Realiza tus compras en cualquier tienda internacional utilizando tu casillero." },
      { title: "Recepción de paquetes en el exterior", desc: "Recibimos tus productos en nuestras bodegas internacionales." },
      { title: "Consolidación de envíos", desc: "Agrupamos varios paquetes en un solo envío para optimizar costos (opcional)." },
      { title: "Importación a Colombia", desc: "Gestionamos el envío bajo modalidad courier, cumpliendo con todos los procesos." },
      { title: "Entrega final", desc: "Recibes tus productos directamente en la puerta de tu casa u oficina." },
    ],
    idealPara: [
      "Personas y empresas que compran en el exterior y quieren ahorrar en envíos",
    ],
  },
  aereo: {
    title: "Triangulación de Envíos",
    subtitle: "Envíos entre países sin pasar por Colombia",
    queEs: "Un servicio que permite enviar mercancía entre países sin que pase por Colombia, optimizando tiempos y costos.",
    pasos: [
      { title: "Recepción de información", desc: "Recibimos la información de origen y destino del envío." },
      { title: "Coordinación logística", desc: "Coordinamos la logística internacional directa entre los países involucrados." },
      { title: "Gestión documental", desc: "Gestionamos la documentación y la operación requerida para el tránsito." },
      { title: "Supervisión del tránsito", desc: "Supervisamos el tránsito del envío en todo momento." },
      { title: "Confirmación de entrega", desc: "Confirmamos la entrega en destino y cerramos la operación." },
    ],
    idealPara: "Empresas que manejan proveedores y clientes en distintos países.",
  },
  especiales: {
    title: "Operaciones Especiales",
    subtitle: "Soluciones logísticas adaptadas a necesidades técnicas o normativas",
    queEs: "Soluciones logísticas adaptadas para necesidades específicas que requieren manejo técnico o normativo especial.",
    queIncluye: [
      "Exportaciones temporales",
      "Reembarques",
      "Mercancías peligrosas",
      "Equipos para reparación o calibración",
    ],
    pasos: [
      { title: "Análisis del requerimiento", desc: "Analizamos tu necesidad y definimos el enfoque más adecuado." },
      { title: "Definición de estrategia", desc: "Definimos la mejor estrategia logística para tu operación." },
      { title: "Gestión de permisos", desc: "Gestionamos permisos y documentación específica requerida." },
      { title: "Ejecución de la operación", desc: "Ejecutamos la operación con los estándares técnicos y normativos exigidos." },
      { title: "Acompañamiento integral", desc: "Acompañamos todo el proceso hasta la entrega y cierre de la operación." },
    ],
    idealPara: "Empresas con necesidades logísticas más complejas o técnicas.",
  },
};

/* ─── StepItem ─── */
function StepItem({ paso, index, total }) {
  const [visible, setVisible] = useState(false);
  const delay = index * 150;
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const isLast = index === total - 1;
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: isLast ? 0 : 8 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "linear-gradient(135deg, #1b6fea, #00a6ff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: visible ? "0 0 12px rgba(27,111,234,0.4)" : "none",
          transform: visible ? "scale(1)" : "scale(0)",
          transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, box-shadow 0.4s ease ${delay}ms`,
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 13, color: "#fff" }}>{index + 1}</span>
        </div>
        {!isLast && (
          <div style={{
            width: 1, minHeight: 32, marginTop: 4, flex: 1,
            background: "repeating-linear-gradient(to bottom, rgba(27,111,234,0.3) 0px, rgba(27,111,234,0.3) 4px, transparent 4px, transparent 8px)",
            transformOrigin: "top",
            transform: visible ? "scaleY(1)" : "scaleY(0)",
            transition: `transform 0.5s ease ${delay + 200}ms`,
          }} />
        )}
      </div>
      <div style={{
        paddingTop: 4, paddingBottom: isLast ? 0 : 28, flex: 1,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
        transition: `opacity 0.4s ease ${delay + 80}ms, transform 0.4s ease ${delay + 80}ms`,
      }}>
        <h4 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 600, fontSize: 15, color: "#1d1d1b", margin: "0 0 4px" }}>{paso.title}</h4>
        <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>{paso.desc}</p>
      </div>
    </div>
  );
}

/* ─── HoloStepItem ─── */
function HoloStepItem({ paso, index, total, trigger }) {
  const [vis, setVis] = useState(false);
  const delay = index * 100;
  useEffect(() => {
    if (!trigger) return;
    const t = setTimeout(() => setVis(true), delay + 80);
    return () => clearTimeout(t);
  }, [trigger, delay]);
  const isLast = index === total - 1;
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: isLast ? 0 : 4 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div style={{
          width: 24, height: 24, borderRadius: "50%",
          background: "linear-gradient(135deg, #1b6fea, #00a6ff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transform: vis ? "scale(1)" : "scale(0)",
          transition: `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 11, color: "#fff" }}>{index + 1}</span>
        </div>
        {!isLast && (
          <div style={{
            width: 1, minHeight: 24, marginTop: 3, flex: 1,
            background: "repeating-linear-gradient(to bottom, rgba(27,111,234,0.35) 0px, rgba(27,111,234,0.35) 4px, transparent 4px, transparent 8px)",
            transformOrigin: "top",
            transform: vis ? "scaleY(1)" : "scaleY(0)",
            transition: `transform 0.4s ease ${delay + 180}ms`,
          }} />
        )}
      </div>
      <div style={{
        paddingTop: 2, paddingBottom: isLast ? 0 : 20, flex: 1,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateX(0)" : "translateX(14px)",
        transition: `opacity 0.35s ease ${delay + 60}ms, transform 0.35s ease ${delay + 60}ms`,
      }}>
        <h4 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 600, fontSize: 14, color: "#1d1d1b", margin: "0 0 3px" }}>{paso.title}</h4>
        <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 13, color: "#6b7280", lineHeight: 1.55, margin: 0 }}>{paso.desc}</p>
      </div>
    </div>
  );
}

/* ─── ServiceModal ─── */
function ServiceModal({ serviceKey, onClose }) {
  const { t } = useContext(LanguageContext);
  const data = serviceData[serviceKey];
  const [activeTab, setActiveTab] = useState(0);
  const [displayTab, setDisplayTab] = useState(0);
  const [contentReady, setContentReady] = useState(true);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const ww = useWW();
  const isMobile = ww < 768;
  const tabs = [t("modal.tab0"), t("modal.tab1"), t("modal.tab2")];
  const rainbowRef = useRef(null);
  const holoRef = useRef(null);
  const [mouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => { setClosing(true); setTimeout(onClose, 300); };

  const handleMouseMove = (e) => {
    if (isMobile) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const ox = ((e.clientX - rect.left) / rect.width) * 100;
      const oy = ((e.clientY - rect.top) / rect.height) * 100;
      if (holoRef.current) {
        holoRef.current.style.backgroundPosition = `${ox}% ${oy}%`;
        holoRef.current.style.opacity = "0.9";
      }
      if (rainbowRef.current) rainbowRef.current.style.opacity = "0.6";
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (holoRef.current) holoRef.current.style.opacity = "0";
    if (rainbowRef.current) rainbowRef.current.style.opacity = "0";
    setMouseOver(false);
  };

  const switchTab = (i) => {
    if (i === activeTab) return;
    setActiveTab(i);
    setContentReady(false);
    setTimeout(() => {
      setDisplayTab(i);
      requestAnimationFrame(() => setContentReady(true));
    }, 170);
  };

  if (!data) return null;

  const waMsg = encodeURIComponent(`${t("modal.wamsg")} ${data.title}. ¿Me pueden dar más información?`);
  const waLink = `https://wa.me/573226055431?text=${waMsg}`;

  const particles = [
    { s: 80, top: "5%", left: "3%", delay: 0, dur: 7 },
    { s: 44, top: "50%", left: "80%", delay: 1.5, dur: 9 },
    { s: 56, top: "70%", left: "12%", delay: 0.8, dur: 6 },
    { s: 26, top: "18%", left: "70%", delay: 2.2, dur: 8 },
    { s: 18, top: "40%", left: "45%", delay: 1.1, dur: 10 },
  ];

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 60,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: (mounted && !closing) ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
        backdropFilter: (mounted && !closing) ? "blur(8px)" : "blur(0px)",
        WebkitBackdropFilter: (mounted && !closing) ? "blur(8px)" : "blur(0px)",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        padding: isMobile ? "12px" : "24px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Perspective wrapper */}
      <div style={{
        perspective: isMobile ? "800px" : "1200px",
        width: "100%",
        maxWidth: isMobile ? "92vw" : 520,
        opacity: (mounted && !closing) ? 1 : 0,
        transform: (mounted && !closing) ? "scale(1) translateY(0)" : "scale(0.9) translateY(32px)",
        transition: closing
          ? "opacity 0.28s ease, transform 0.28s ease"
          : "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* The holographic card */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setMouseOver(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            background: "#fff",
            border: `1px solid rgba(0,166,255,${mouseOver ? 0.38 : 0.14})`,
            boxShadow: "0 24px 60px rgba(12,35,64,0.32), 0 8px 24px rgba(12,35,64,0.12)",
            minHeight: 480,
            display: "flex",
            flexDirection: "column",
            transition: "border-color 0.35s ease",
          }}
        >
          {/* Holographic shine overlay */}
          <div ref={holoRef} style={{
            position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
            borderRadius: 20,
            background: "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.12) 44%, rgba(0,166,255,0.09) 50%, rgba(27,111,234,0.07) 56%, transparent 62%)",
            backgroundSize: "220% 220%",
            backgroundPosition: "50% 50%",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }} />

          {/* Rainbow iridescent overlay */}
          <div ref={rainbowRef} style={{
            position: "absolute", inset: 0, zIndex: 9, pointerEvents: "none",
            borderRadius: 20,
            background: "linear-gradient(125deg, rgba(255,0,0,0.025) 0%, rgba(255,165,0,0.03) 16%, rgba(255,255,0,0.03) 32%, rgba(0,180,0,0.025) 48%, rgba(0,166,255,0.03) 64%, rgba(75,0,130,0.025) 80%, rgba(238,130,238,0.03) 100%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }} />

          {/* ── Card Header ── */}
          <div style={{
            background: "linear-gradient(135deg, #0c2340 0%, #1b6fea 70%, #00a6ff 100%)",
            padding: "28px 24px 22px",
            position: "relative",
            overflow: "hidden",
            flexShrink: 0,
            minHeight: 140,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}>
            {/* Floating light particles */}
            {particles.map((p, i) => (
              <div key={i} style={{
                position: "absolute",
                width: p.s, height: p.s, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
                top: p.top, left: p.left,
                animation: `modalParticleFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
                pointerEvents: "none",
              }} />
            ))}

            {/* Close button */}
            <button onClick={handleClose} style={{
              position: "absolute", top: 14, right: 14, zIndex: 2,
              width: 30, height: 30, borderRadius: "50%",
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 17, lineHeight: 1, transition: "background 0.2s",
            }}>×</button>

            {/* Icon bubble */}
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(255,255,255,0.13)",
              backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
              border: "1.5px solid rgba(255,255,255,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "iconBounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.15s both, iconPulse 3s ease-in-out 0.8s infinite",
              color: "#fff", position: "relative", zIndex: 1, flexShrink: 0,
            }}>
              <svg className="modal-icon-static" width="34" height="34" viewBox="0 0 32 32" fill="none">
                {svcIcons[serviceKey]?.icon}
              </svg>
            </div>

            {/* Title & subtitle */}
            <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <h2 style={{
                fontFamily: "'Fira Sans',sans-serif", fontWeight: 700,
                fontSize: isMobile ? 18 : 22, color: "#fff", margin: 0, lineHeight: 1.2,
                animation: "headerTextSlide 0.4s ease 0.25s both",
              }}>{data.title}</h2>
              <p style={{
                color: "rgba(255,255,255,0.7)", fontSize: 13,
                fontFamily: "'Roboto',sans-serif", margin: "5px 0 0",
                animation: "headerTextSlide 0.4s ease 0.35s both",
              }}>{data.subtitle}</p>
            </div>
          </div>

          {/* ── Tab buttons ── */}
          <div style={{
            display: "flex", gap: 8, padding: "12px 16px",
            background: "#f9fafb", borderBottom: "1px solid #e5e7eb",
            flexShrink: 0,
          }}>
            {tabs.map((tab, i) => (
              <button key={i} onClick={() => switchTab(i)} style={{
                flex: 1,
                padding: isMobile ? "8px 4px" : "10px 10px",
                borderRadius: 10, cursor: "pointer",
                fontFamily: "'Fira Sans',sans-serif",
                fontSize: isMobile ? 11 : 12.5, fontWeight: 600,
                transition: "all 0.25s ease",
                background: activeTab === i ? "rgba(27,111,234,0.07)" : "transparent",
                border: `1.5px solid ${activeTab === i ? "#1b6fea" : "#e5e7eb"}`,
                color: activeTab === i ? "#1b6fea" : "#6b7280",
                whiteSpace: "nowrap",
              }}>{tab}</button>
            ))}
          </div>

          {/* ── Content zone ── */}
          <div style={{
            flex: 1, overflowY: "auto", padding: isMobile ? "20px 18px" : "24px 26px",
            background: "#fff",
          }}>
            <div style={{
              opacity: contentReady ? 1 : 0,
              transform: contentReady ? "translateY(0) scale(1)" : "translateY(14px) scale(0.98)",
              filter: contentReady ? "blur(0px)" : "blur(4px)",
              transition: contentReady
                ? "opacity 0.32s cubic-bezier(0.2,0,0,1), transform 0.35s cubic-bezier(0.2,0,0,1), filter 0.28s ease"
                : "opacity 0.16s ease, transform 0.16s ease, filter 0.16s ease",
            }}>
              {/* ¿Qué es? */}
              {displayTab === 0 && (
                <div>
                  <p style={{
                    fontFamily: "'Roboto',sans-serif", fontSize: 14.5,
                    color: "#4b5563", lineHeight: 1.8, margin: 0,
                  }}>{data.queEs}</p>
                  {data.queIncluye && (
                    <div style={{ marginTop: 18 }}>
                      <p style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 600, fontSize: 13, color: "#1b6fea", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{t("modal.queincluye")}</p>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {data.queIncluye.map((item, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < data.queIncluye.length - 1 ? 8 : 0 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg, #1b6fea, #00a6ff)", flexShrink: 0 }} />
                            <span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ¿Cómo funciona? */}
              {displayTab === 1 && (
                <div>
                  {data.pasos.length === 0
                    ? <p style={{ color: "#9ca3af", fontFamily: "'Roboto',sans-serif", fontSize: 14 }}>{t("modal.proximamente")}</p>
                    : data.pasos.map((paso, i) => (
                      <HoloStepItem key={i} paso={paso} index={i} total={data.pasos.length} trigger={contentReady} />
                    ))
                  }
                </div>
              )}

              {/* ¿Ideal para? */}
              {displayTab === 2 && (
                <div style={{
                  background: "rgba(27,111,234,0.04)", borderRadius: 12,
                  border: "1px solid rgba(27,111,234,0.1)", padding: "20px",
                  animation: contentReady ? "idealBlockIn 0.4s cubic-bezier(0.4,0,0.2,1) both" : "none",
                }}>
                  {Array.isArray(data.idealPara) ? (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {data.idealPara.map((item, i) => (
                        <li key={i} style={{
                          display: "flex", alignItems: "flex-start", gap: 12,
                          marginBottom: i < data.idealPara.length - 1 ? 10 : 0,
                        }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#1b6fea" strokeWidth="2.2" strokeLinecap="round"
                              strokeDasharray="40" strokeDashoffset="40"
                              style={{ animation: contentReady ? `drawCheck 0.5s ease ${i * 80 + 150}ms forwards` : "none" }} />
                            <polyline points="22 4 12 14.01 9 11.01" stroke="#1b6fea" strokeWidth="2.2"
                              strokeLinecap="round" strokeLinejoin="round" fill="none"
                              strokeDasharray="24" strokeDashoffset="24"
                              style={{ animation: contentReady ? `drawCheck 0.35s ease ${i * 80 + 360}ms forwards` : "none" }} />
                          </svg>
                          <span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "#4b5563", lineHeight: 1.65 }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="#1b6fea" strokeWidth="2.2" strokeLinecap="round"
                          strokeDasharray="40" strokeDashoffset="40"
                          style={{ animation: contentReady ? "drawCheck 0.6s ease 0.2s forwards" : "none" }} />
                        <polyline points="22 4 12 14.01 9 11.01" stroke="#1b6fea" strokeWidth="2.2"
                          strokeLinecap="round" strokeLinejoin="round" fill="none"
                          strokeDasharray="24" strokeDashoffset="24"
                          style={{ animation: contentReady ? "drawCheck 0.4s ease 0.55s forwards" : "none" }} />
                      </svg>
                      <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14.5, color: "#4b5563", lineHeight: 1.75, margin: 0 }}>{data.idealPara}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Footer inside card ── */}
            <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid #f3f4f6" }}>
              <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                width: "100%", padding: "13px 20px", borderRadius: 12,
                background: "linear-gradient(135deg, #1b6fea, #00a6ff)",
                color: "#fff", fontSize: 15, fontWeight: 700,
                fontFamily: "'Fira Sans',sans-serif", textDecoration: "none",
                boxShadow: "0 4px 20px rgba(27,111,234,0.35)",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t("modal.cotizar")}
              </a>
              <button onClick={handleClose} style={{
                display: "block", width: "100%", marginTop: 10,
                background: "none", border: "none",
                fontFamily: "'Fira Sans',sans-serif", fontSize: 13,
                color: "#9ca3af", cursor: "pointer", padding: "6px 0",
              }}>{t("modal.cerrar")}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SvcCard({ icon, title, desc, color, hoverAnim, serviceKey, onOpenModal }) {
  const { t } = useContext(LanguageContext);
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: hov ? "rgba(27,111,234,0.07)" : "rgba(27,111,234,0.03)",
        borderRadius: 14, padding: "24px 22px", textAlign: "center",
        border: "1px solid " + (hov ? "rgba(27,111,234,0.18)" : "rgba(27,111,234,0.06)"),
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default",
        display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center",
        boxShadow: hov
          ? `0 16px 40px rgba(27,111,234,0.1), 0 0 30px ${color}11, inset 0 1px 0 rgba(27,111,234,0.06)`
          : "0 1px 4px rgba(27,111,234,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
        transform: hov ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        position: "relative", overflow: "hidden",
        aspectRatio: "1 / 1", height: "100%",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Left accent shimmer line */}
      <div style={{
        position: "absolute", left: 0, bottom: 0,
        width: 4, borderRadius: "0 4px 4px 0",
        background: `linear-gradient(180deg, transparent, ${color}88, #00a6ff99, transparent)`,
        height: hov ? "100%" : "0%",
        transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ marginBottom: 14 }}>
          <AnimIcon hov={hov} color={color} hoverAnim={hoverAnim}>{icon}</AnimIcon>
        </div>
        <h3 style={{
          fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8, lineHeight: 1.35,
          color: hov ? "transparent" : "#1d1d1b",
          background: hov ? "linear-gradient(135deg, #00a6ff, #1b6fea)" : "none",
          WebkitBackgroundClip: hov ? "text" : "unset",
          backgroundClip: hov ? "text" : "unset",
          transition: "color 0.3s",
        }}>{title}</h3>
        <p style={{
          fontFamily: "'Roboto',sans-serif", fontSize: 15, lineHeight: 1.6,
          color: hov ? "#4b5563" : "#6b7280",
          transition: "color 0.3s",
        }}>{desc}</p>
      </div>
      <span
        onClick={() => onOpenModal && onOpenModal(serviceKey)}
        style={{
          fontFamily: "'Fira Sans',sans-serif", fontSize: 14, fontWeight: 600,
          color: hov ? "#1b6fea" : "#00a6ff",
          transition: "color 0.3s", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 14,
          cursor: "pointer",
        }}
      >
        {t("services.vermas")}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s", transform: hov ? "translateX(3px)" : "translateX(0)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </span>
    </div>
  );
}

function SvcCarousel({ data, gap, visible, pos, onOpenModal }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      display: "flex", gap,
      transform: `translateX(calc(${-pos} * (100% + ${gap}px) / ${visible}))`,
      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    }}>
      {data.map((s, i) => {
        const dir = i === 0 ? "left" : i === data.length - 1 ? "right" : "up";
        const anim = dir === "left" ? "springLeft" : dir === "right" ? "springRight" : "springUp";
        return (
          <div key={i} style={{
            width: `calc((100% - ${gap * (visible - 1)}px) / ${visible})`, flexShrink: 0,
            animation: v ? `${anim} 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 100}ms both` : "none",
            opacity: v ? undefined : 0,
          }}>
            <SvcCard
              icon={svcIcons[s.k].icon} title={s.title} desc={s.desc}
              color={s.color} hoverAnim={svcIcons[s.k].hoverAnim}
              serviceKey={s.k} onOpenModal={onOpenModal}
            />
          </div>
        );
      })}
    </div>
  );
}

function Services() {
  const { t } = useContext(LanguageContext);
  const [pos, setPos] = useState(0);
  const [modalKey, setModalKey] = useState(null);
  const ww = useWW();
  const visible = ww < 640 ? 1 : ww < 1024 ? 2 : 4;
  const data = [
    { k: "importacion", title: t("services.importacion"), desc: t("services.importacion.desc"), color: "#1b6fea" },
    { k: "exportacion", title: t("services.exportacion"), desc: t("services.exportacion.desc"), color: "#00a6ff" },
    { k: "terrestre", title: t("services.terrestre"), desc: t("services.terrestre.desc"), color: "#0c2340" },
    { k: "casillero", title: t("services.casillero"), desc: t("services.casillero.desc"), color: "#1b6fea" },
    { k: "aereo", title: t("services.triangulacion"), desc: t("services.triangulacion.desc"), color: "#00a6ff" },
    { k: "especiales", title: t("services.especiales"), desc: t("services.especiales.desc"), color: "#0c2340" },
  ];
  const maxPos = data.length - visible;
  const canLeft = pos > 0;
  const canRight = pos < maxPos;
  const go = (dir) => setPos(p => Math.max(0, Math.min(maxPos, p + dir)));
  const gap = 16;
  const ArrowBtn = ({ dir, active, ww }) => (
    <button onClick={() => active && go(dir)} style={{
      position: "absolute", top: "50%", transform: "translateY(-50%)",
      [dir === -1 ? "left" : "right"]: ww < 768 ? -20 : -56,
      width: ww < 768 ? 36 : 48, height: ww < 768 ? 36 : 48, borderRadius: ww < 768 ? 18 : 24,
      background: active ? "linear-gradient(135deg, #1b6fea, #00a6ff)" : "#e0e4e8",
      border: "none", cursor: active ? "pointer" : "default",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: active ? "0 4px 20px rgba(27,111,234,0.3)" : "none",
      opacity: active ? 1 : 0.4, transition: "all 0.3s", zIndex: 5,
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#aaa"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {dir === -1 ? <path d="M19 12H5M12 19l-7-7 7-7" /> : <path d="M5 12h14M12 5l7 7-7 7" />}
      </svg>
    </button>
  );
  return (
    <section id="servicios" style={{ padding: "70px 0", background: "#f0f4f8", position: "relative", overflow: "hidden" }}>
      {/* Curved flowing background */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
        {/* Filled curved shapes */}
        <path d="M0 100 C300 50, 600 200, 900 120 S1200 180, 1440 80 L1440 200 C1200 280, 900 220, 600 300 S300 150, 0 220Z" fill="rgba(27,111,234,0.025)" />
        <path d="M0 300 C240 250, 500 380, 750 300 S1100 350, 1440 280 L1440 400 C1100 460, 750 400, 500 480 S240 350, 0 420Z" fill="rgba(0,166,255,0.02)" />
        <path d="M0 480 C360 440, 720 540, 1080 460 S1320 520, 1440 470 L1440 600 L0 600Z" fill="rgba(27,111,234,0.02)" />
        {/* Flowing stroke lines */}
        <path d="M-50 80 C200 30, 500 180, 800 100 S1200 160, 1500 60" stroke="rgba(27,111,234,0.05)" strokeWidth="1.5" />
        <path d="M-50 160 C250 110, 550 250, 850 170 S1150 230, 1500 140" stroke="rgba(0,166,255,0.04)" strokeWidth="1" />
        <path d="M-50 320 C200 270, 480 400, 780 310 S1100 380, 1500 290" stroke="rgba(27,111,234,0.04)" strokeWidth="1.5" />
        <path d="M-50 400 C280 360, 560 470, 840 380 S1140 440, 1500 370" stroke="rgba(0,166,255,0.035)" strokeWidth="1" />
        <path d="M-50 500 C300 460, 650 550, 950 480 S1250 530, 1500 470" stroke="rgba(27,111,234,0.03)" strokeWidth="1" />
      </svg>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: ww < 768 ? "0 32px" : "0 64px", position: "relative", zIndex: 2 }}>
        <R><div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#1d1d1b" }}>{t("services.titulo")}</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 48, height: 2, background: "#1b6fea", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
          </div>
        </div></R>
        <div style={{ position: "relative" }}>
          <ArrowBtn dir={-1} active={canLeft} ww={ww} />
          <ArrowBtn dir={1} active={canRight} ww={ww} />
          <div style={{ overflow: "hidden" }}>
            <SvcCarousel data={data} gap={gap} visible={visible} pos={pos} onOpenModal={setModalKey} />
          </div>
          {/* Dots indicator */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            {Array.from({ length: maxPos + 1 }).map((_, i) => (
              <button key={i} onClick={() => setPos(i)} style={{
                width: pos === i ? 24 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer",
                background: pos === i ? "linear-gradient(90deg, #00a6ff, #1b6fea)" : "#d1d5db",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>
        </div>
      </div>
      {modalKey && <ServiceModal serviceKey={modalKey} onClose={() => setModalKey(null)} />}
    </section>
  );
}

function AnimCounter({ end, suffix = "", duration = 1200 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count.toLocaleString("es-CO")}{suffix}</span>;
}

function StatCard({ icon, value, numEnd, numSuffix, label, color, hoverAnim }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: hov ? "rgba(27,111,234,0.07)" : "rgba(27,111,234,0.03)",
        borderRadius: 14, textAlign: "center",
        border: "1px solid " + (hov ? "rgba(27,111,234,0.18)" : "rgba(27,111,234,0.06)"),
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        boxShadow: hov
          ? `0 16px 40px rgba(27,111,234,0.1), 0 0 30px ${color}11, inset 0 1px 0 rgba(27,111,234,0.06)`
          : "0 1px 4px rgba(27,111,234,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
        transform: hov ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        position: "relative", overflow: "hidden",
        padding: "24px 20px",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        position: "absolute", bottom: 0, left: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${color}88, #00a6ff99, transparent)`,
        width: hov ? "100%" : "0%",
        transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }} />
      <div style={{ marginBottom: 10 }}>
        <AnimIcon hov={hov} color={color} size={60} hoverAnim={hoverAnim || "whyusPulse"}>{icon}</AnimIcon>
      </div>
      <h3 style={{
        fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: 36, marginBottom: 4, lineHeight: 1.1,
        color: hov ? "transparent" : "#1d1d1b",
        background: hov ? "linear-gradient(135deg, #00a6ff, #1b6fea)" : "none",
        WebkitBackgroundClip: hov ? "text" : "unset",
        backgroundClip: hov ? "text" : "unset",
        transition: "color 0.3s",
        textShadow: hov ? "none" : "none",
      }}>{numEnd != null ? <AnimCounter end={numEnd} suffix={numSuffix} /> : value}</h3>
      <p style={{
        fontFamily: "'Roboto',sans-serif", fontSize: 13, lineHeight: 1.35,
        color: hov ? "#1b6fea" : "#6b7280",
        transition: "color 0.3s",
      }}>{label}</p>
    </div>
  );
}

const statIcons = {
  globe: { hoverAnim: "whyusSpin", icon: <><circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" className="ai-s1" style={{ strokeDasharray: 76, strokeDashoffset: 76 }} /><ellipse cx="16" cy="16" rx="6" ry="12" stroke="currentColor" strokeWidth="1.2" className="ai-s2" style={{ strokeDasharray: 60, strokeDashoffset: 60 }} /><line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="1" className="ai-s3" style={{ strokeDasharray: 24, strokeDashoffset: 24 }} /><line x1="4" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1" className="ai-s3" style={{ strokeDasharray: 24, strokeDashoffset: 24 }} /></> },
  box: { hoverAnim: "whyusPulse", icon: <><path d="M26 12l-10 4-10-4 10-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="ai-s1" style={{ strokeDasharray: 50, strokeDashoffset: 50 }} /><path d="M6 12v6l10 6 10-6v-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="ai-s2" style={{ strokeDasharray: 60, strokeDashoffset: 60 }} /><path d="M16 16v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="ai-s3" style={{ strokeDasharray: 8, strokeDashoffset: 8 }} /></> },
  star: { hoverAnim: "whyusGlow", icon: <><path d="M16 4l3.7 7.5 8.3 1.2-6 5.8 1.4 8.3L16 22.9l-7.4 3.9 1.4-8.3-6-5.8 8.3-1.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="ai-s1" style={{ strokeDasharray: 80, strokeDashoffset: 80 }} /></> },
  bolt: { hoverAnim: "whyusGlow", icon: <><path d="M18 4L8 18h7l-1 10 10-14h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" className="ai-s1" style={{ strokeDasharray: 60, strokeDashoffset: 60 }} /></> },
};

const teamPhotos = [
  "/images/team/DSC00358.JPG.jpeg",
  "/images/team/DSC00360.JPG.jpeg",
  "/images/team/DSC00362.JPG.jpeg",
  "/images/team/DSC00364.JPG.jpeg",
  "/images/team/DSC00371.JPG.jpeg",
  "/images/team/DSC00374.JPG.jpeg",
  "/images/team/DSC00376.JPG.jpeg",
  "/images/team/DSC00378.JPG.jpeg",
];

const kbOrigins = ["center center", "top left", "center right", "bottom center", "top right", "center left", "bottom right", "top center"];

function TeamCinematic() {
  const ww = useWW();
  const isMobile = ww < 768;
  const [hov, setHov] = useState(false);

  // Two img slots for ping-pong crossfade
  const [slots, setSlots] = useState([
    { src: teamPhotos[0], dir: 0 },
    { src: teamPhotos[1], dir: 1 },
  ]);
  const [ops, setOps] = useState([1, 0]);       // opacities per slot
  const [curIdx, setCurIdx] = useState(0);       // photo index currently shown
  const [phaseKey, setPhaseKey] = useState(0);  // forces progress bar restart

  const activeRef = useRef(0);   // which slot is currently visible
  const idxRef   = useRef(0);    // current photo index
  const transRef = useRef(false);
  const timerRef = useRef(null);
  const advRef   = useRef(null);

  const advance = () => {
    if (transRef.current) return;
    transRef.current = true;
    const nextIdx  = (idxRef.current + 1) % teamPhotos.length;
    const inactive = 1 - activeRef.current;

    // Load next photo into the hidden slot (invisible swap)
    setSlots(prev => {
      const n = [...prev];
      n[inactive] = { src: teamPhotos[nextIdx], dir: nextIdx };
      return n;
    });

    // Brief tick so the src commits, then crossfade
    setTimeout(() => {
      setOps(() => { const n = [0, 0]; n[inactive] = 1; return n; });
      setCurIdx(nextIdx);
      setPhaseKey(k => k + 1);
      setTimeout(() => {
        activeRef.current = inactive;
        idxRef.current    = nextIdx;
        transRef.current  = false;
      }, 1000);
    }, 50);
  };
  advRef.current = advance;

  useEffect(() => {
    timerRef.current = setInterval(() => advRef.current(), 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", height: isMobile ? 280 : 400,
        borderRadius: 16, overflow: "hidden",
        position: "relative", background: "#0c2340",
        border: "1px solid rgba(27,111,234,0.15)",
        boxShadow: hov ? "0 12px 40px rgba(27,111,234,0.15)" : "none",
        transition: "box-shadow 0.4s",
      }}
    >
      {/* Ping-pong photo layers */}
      {[0, 1].map(s => (
        <img
          key={`${slots[s].src}-${slots[s].dir}`}
          src={slots[s].src}
          alt=""
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
            opacity: ops[s],
            transition: "opacity 1s ease-in-out",
            transformOrigin: kbOrigins[slots[s].dir % 8],
            animation: `${slots[s].dir % 2 === 0 ? "kenBurns" : "kenBurnsReverse"} 6s linear forwards`,
          }}
        />
      ))}

      {/* Cinematic overlay — gradient + vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to top, rgba(12,35,64,0.5) 0%, transparent 40%)",
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.15)",
      }} />

      {/* Progress bar indicators */}
      <div style={{
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        zIndex: 3, display: "flex", gap: 6, alignItems: "center",
      }}>
        {teamPhotos.map((_, i) => (
          <div key={i} style={{
            width: isMobile ? 16 : 24, height: 3, borderRadius: 2, flexShrink: 0,
            background: i < curIdx ? "#00a6ff" : "rgba(255,255,255,0.3)",
            overflow: "hidden", position: "relative",
          }}>
            {i === curIdx && (
              <div key={phaseKey} style={{
                position: "absolute", top: 0, left: 0, height: "100%",
                background: "#00a6ff",
                animation: "progressFill 5s linear forwards",
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function About() {
  const { t } = useContext(LanguageContext);
  const stats = [
    { v: "160+", numEnd: 160, numSuffix: "+", l: t("stats.clientes"), icon: statIcons.star.icon, hoverAnim: statIcons.star.hoverAnim, color: "#1b6fea" },
    { v: "1.200+", numEnd: 1200, numSuffix: "+", l: t("stats.operaciones"), icon: statIcons.box.icon, hoverAnim: statIcons.box.hoverAnim, color: "#00a6ff" },
    { v: "23.100+ Kg", numEnd: 23100, numSuffix: "+ Kg", l: t("stats.kg"), icon: statIcons.globe.icon, hoverAnim: statIcons.globe.hoverAnim, color: "#1b6fea" },
    { v: "25.700+ Kg", numEnd: 25700, numSuffix: "+ Kg", l: t("stats.volumen"), icon: statIcons.bolt.icon, hoverAnim: statIcons.bolt.hoverAnim, color: "#00a6ff" },
  ];
  return (
    <section id="nosotros" style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Top: text left + image right */}
        <div className="grid lg:grid-cols-2 gap-12" style={{ alignItems: "center", marginBottom: 56 }}>
          <R dir="left"><div>
            <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#1d1d1b", marginBottom: 8 }}>{t("about.titulo")}</h2>
            <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
              <span style={{ width: 44, height: 3, background: "#1b6fea", borderRadius: 4, display: "inline-block" }} />
              <span style={{ width: 18, height: 3, background: "#00a6ff", borderRadius: 4, display: "inline-block" }} />
            </div>
            <div style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#4b5563", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>{t("about.p1a")}<strong style={{ color: "#1d1d1b" }}>ATLAS LOGISTIC</strong>{t("about.p1b")}</p>
              <p style={{ marginBottom: 16 }}>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
            <a
              href="/equipo"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "linear-gradient(135deg, #1b6fea, #00a6ff)",
                color: "#fff", padding: "12px 24px", borderRadius: 50,
                fontSize: 15, fontWeight: 700,
                fontFamily: "'Fira Sans',sans-serif",
                textTransform: "none", letterSpacing: 0,
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(27,111,234,0.25)",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                marginTop: 28,
              }}
            >
              {t("about.cta")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div></R>
          <R dir="right" delay={200}>
            <TeamCinematic />
          </R>
        </div>
        {/* Stats row - 4 columns */}
        <Stg className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" ms={150} dirs={(i, n) => i === 0 ? "left" : i === n - 1 ? "right" : "up"}>
          {stats.map((s, i) => (
            <StatCard key={i} icon={s.icon} value={s.v} numEnd={s.numEnd} numSuffix={s.numSuffix} label={s.l} color={s.color} hoverAnim={s.hoverAnim} />
          ))}
        </Stg>
      </div>
    </section>
  );
}

function WhyUsCard({ icon, title, desc, color, hoverAnim }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      style={{
        background: hov ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.09)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderRadius: 16, padding: "32px 24px", textAlign: "center",
        border: "1px solid " + (hov ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)"),
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "default",
        display: "flex", flexDirection: "column", alignItems: "center",
        boxShadow: hov
          ? `0 20px 50px rgba(0,0,0,0.25), 0 0 40px ${color}22, inset 0 1px 0 rgba(255,255,255,0.15)`
          : "0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
        transform: hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        position: "relative", overflow: "hidden",
        height: "100%",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${color}66, #00a6ff88, transparent)`,
        width: hov ? "100%" : "0%",
        transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      }} />
      <div style={{ marginBottom: 20 }}>
        <AnimIcon hov={hov} color={color} size={56} hoverAnim={hoverAnim}>{icon}</AnimIcon>
      </div>
      <h3 style={{
        fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 10, lineHeight: 1.35,
        color: "#ffffff", transition: "all 0.3s",
        textShadow: hov ? "0 0 20px rgba(0,166,255,0.3)" : "none",
      }}>{title}</h3>
      <p style={{
        fontFamily: "'Roboto',sans-serif", fontSize: 14, lineHeight: 1.65,
        color: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
        transition: "color 0.3s",
      }}>{desc}</p>
    </div>
  );
}

function WhyUs() {
  const { t } = useContext(LanguageContext);
  const [routePhase, setRoutePhase] = useState("hidden"); // hidden → drawing → flowing
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRoutePhase("drawing");
        setTimeout(() => setRoutePhase("flowing"), 3500);
        obs.unobserve(el);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const items = [
    { t: t("whyus.exp.t"), d: t("whyus.exp.d"), color: "#1b6fea", hoverAnim: "whyusPulse",
      icon: <><path d="M16 28s10-5 10-13V7l-10-4L6 7v8c0 8 10 13 10 13z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="ai-s1" style={{ strokeDasharray: 120, strokeDashoffset: 120 }} /><path d="M11 16l3 3 6-6" stroke="#00a6ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="ai-s2" style={{ strokeDasharray: 20, strokeDashoffset: 20 }} /></>
    },
    { t: t("whyus.red.t"), d: t("whyus.red.d"), color: "#00a6ff", hoverAnim: "whyusSpin",
      icon: <><circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.3" className="ai-s1" style={{ strokeDasharray: 76, strokeDashoffset: 76 }} /><ellipse cx="16" cy="16" rx="6" ry="12" stroke="currentColor" strokeWidth="1" className="ai-s2" style={{ strokeDasharray: 60, strokeDashoffset: 60 }} /><line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="0.8" className="ai-s3" style={{ strokeDasharray: 24, strokeDashoffset: 24 }} /><line x1="4" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="0.8" className="ai-s3" style={{ strokeDasharray: 24, strokeDashoffset: 24 }} /></>
    },
    { t: t("whyus.aten.t"), d: t("whyus.aten.d"), color: "#1b6fea", hoverAnim: "whyusBounce",
      icon: <><path d="M26 27v-2.5a5 5 0 00-5-5H11a5 5 0 00-5 5V27" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="ai-s1" style={{ strokeDasharray: 50, strokeDashoffset: 50 }} /><circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth="1.3" className="ai-s2" style={{ strokeDasharray: 32, strokeDashoffset: 32 }} /><path d="M21 5.16a5 5 0 010 9.68" stroke="#00a6ff" strokeWidth="1.3" strokeLinecap="round" className="ai-s3" style={{ strokeDasharray: 16, strokeDashoffset: 16 }} /></>
    },
    { t: t("whyus.inno.t"), d: t("whyus.inno.d"), color: "#00a6ff", hoverAnim: "whyusGlow",
      icon: <><path d="M12 27h8M13 27v-3a7 7 0 01-2.5-5.5C10.5 14.5 13 11 16 11s5.5 3.5 5.5 7.5A7 7 0 0119 24v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="ai-s1" style={{ strokeDasharray: 80, strokeDashoffset: 80 }} /><line x1="16" y1="5" x2="16" y2="8" stroke="#00a6ff" strokeWidth="1.3" strokeLinecap="round" className="ai-s2" style={{ strokeDasharray: 4, strokeDashoffset: 4 }} /><line x1="24" y1="10" x2="22" y2="12" stroke="#00a6ff" strokeWidth="1.3" strokeLinecap="round" className="ai-s2" style={{ strokeDasharray: 4, strokeDashoffset: 4 }} /><line x1="8" y1="10" x2="10" y2="12" stroke="#00a6ff" strokeWidth="1.3" strokeLinecap="round" className="ai-s2" style={{ strokeDasharray: 4, strokeDashoffset: 4 }} /><circle cx="16" cy="19" r="2" stroke="#00a6ff" strokeWidth="1" className="ai-s3" style={{ strokeDasharray: 13, strokeDashoffset: 13 }} /><path d="M16 17v-2" stroke="#00a6ff" strokeWidth="1" strokeLinecap="round" className="ai-s3" style={{ strokeDasharray: 4, strokeDashoffset: 4 }} /></>
    },
  ];
  return (
    <section ref={sectionRef} id="ventajas" style={{ padding: "80px 0", background: "linear-gradient(135deg, #0c2340 0%, #0a1e38 40%, #112e55 100%)", position: "relative", overflow: "hidden" }}>
      {/* Interconnected flight routes network */}
      <svg className={`routes-${routePhase}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <radialGradient id="ng"><stop offset="0%" stopColor="rgba(0,166,255,0.16)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
          <radialGradient id="wg"><stop offset="0%" stopColor="rgba(255,255,255,0.14)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
        </defs>
        {/* Hub nodes */}
        <circle cx="120" cy="420" r="4" fill="rgba(0,166,255,0.22)" className="nd nd1" /><circle cx="120" cy="420" r="9" stroke="rgba(0,166,255,0.13)" strokeWidth="1" fill="none" className="node-pulse nd nd1" /><circle cx="120" cy="420" r="30" fill="url(#ng)" className="nd nd1" />
        <circle cx="380" cy="180" r="3.5" fill="rgba(255,255,255,0.18)" className="nd nd2" /><circle cx="380" cy="180" r="8" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" className="node-pulse nd nd2" /><circle cx="380" cy="180" r="25" fill="url(#wg)" className="nd nd2" />
        <circle cx="720" cy="80" r="3.5" fill="rgba(0,166,255,0.2)" className="nd nd3" /><circle cx="720" cy="80" r="8" stroke="rgba(0,166,255,0.07)" strokeWidth="1" fill="none" className="node-pulse nd nd3" /><circle cx="720" cy="80" r="25" fill="url(#ng)" className="nd nd3" />
        <circle cx="1280" cy="120" r="4" fill="rgba(255,255,255,0.18)" className="nd nd5" /><circle cx="1280" cy="120" r="9" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" className="node-pulse nd nd5" /><circle cx="1280" cy="120" r="30" fill="url(#wg)" className="nd nd5" />
        <circle cx="280" cy="500" r="3" fill="rgba(0,166,255,0.18)" className="nd nd1" /><circle cx="280" cy="500" r="7" stroke="rgba(0,166,255,0.06)" strokeWidth="1" fill="none" className="nd nd1" /><circle cx="280" cy="500" r="22" fill="url(#ng)" className="nd nd1" />
        <circle cx="650" cy="50" r="3" fill="rgba(255,255,255,0.16)" className="nd nd3" /><circle cx="650" cy="50" r="7" stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" className="nd nd3" />
        <circle cx="980" cy="200" r="3.5" fill="rgba(0,166,255,0.19)" className="nd nd4" /><circle cx="980" cy="200" r="8" stroke="rgba(0,166,255,0.06)" strokeWidth="1" fill="none" className="node-pulse nd nd4" /><circle cx="980" cy="200" r="25" fill="url(#ng)" className="nd nd4" />
        <circle cx="200" cy="250" r="3" fill="rgba(255,255,255,0.16)" className="nd nd1" /><circle cx="200" cy="250" r="7" stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" className="nd nd1" />
        <circle cx="160" cy="380" r="2.5" fill="rgba(0,166,255,0.16)" className="nd nd1" /><circle cx="160" cy="380" r="6" stroke="rgba(0,166,255,0.05)" strokeWidth="1" fill="none" className="nd nd1" />
        <circle cx="240" cy="320" r="2.5" fill="rgba(255,255,255,0.14)" className="nd nd1" /><circle cx="240" cy="320" r="6" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" className="nd nd1" />
        <circle cx="1380" cy="160" r="3" fill="rgba(0,166,255,0.16)" className="nd nd5" /><circle cx="1380" cy="160" r="7" stroke="rgba(0,166,255,0.05)" strokeWidth="1" fill="none" className="nd nd5" />
        <circle cx="750" cy="60" r="2.5" fill="rgba(255,255,255,0.14)" className="nd nd3" />
        <circle cx="1180" cy="340" r="3" fill="rgba(0,166,255,0.16)" className="nd nd4" /><circle cx="1180" cy="340" r="7" stroke="rgba(0,166,255,0.05)" strokeWidth="1" fill="none" className="nd nd4" />
        <circle cx="1350" cy="480" r="3" fill="rgba(255,255,255,0.15)" className="nd nd5" /><circle cx="1350" cy="480" r="7" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" className="nd nd5" />
        <circle cx="500" cy="450" r="2.5" fill="rgba(0,166,255,0.13)" className="nd nd2" /><circle cx="500" cy="450" r="6" stroke="rgba(0,166,255,0.07)" strokeWidth="1" fill="none" className="nd nd2" />
        <circle cx="850" cy="350" r="2.5" fill="rgba(255,255,255,0.12)" className="nd nd3" /><circle cx="850" cy="350" r="6" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" className="nd nd3" />
        {/* Flight routes */}
        <path d="M120 420 C180 300, 300 200, 380 180" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" strokeDasharray="8 5" className="rt rt1 route-main" />
        <path d="M120 420 C300 280, 500 120, 720 80" stroke="rgba(0,166,255,0.09)" strokeWidth="1.5" strokeDasharray="10 6" className="rt rt1 route-main" />
        <path d="M120 420 C160 450, 220 480, 280 500" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="6 4" className="rt rt1 route-mid" />
        <path d="M380 180 C450 100, 580 60, 720 80" stroke="rgba(255,255,255,0.15)" strokeWidth="1.3" strokeDasharray="8 5" className="rt rt2 route-main" />
        <path d="M380 180 C430 100, 540 40, 650 50" stroke="rgba(0,166,255,0.07)" strokeWidth="0.8" strokeDasharray="6 4" className="rt rt2 route-sub" />
        <path d="M720 80 C800 100, 900 160, 980 200" stroke="rgba(0,166,255,0.09)" strokeWidth="1.4" strokeDasharray="8 5" className="rt rt3 route-main" />
        <path d="M720 80 C900 40, 1100 60, 1280 120" stroke="rgba(255,255,255,0.14)" strokeWidth="1.3" strokeDasharray="10 6" className="rt rt3 route-main" />
        <path d="M980 200 C1060 150, 1180 120, 1280 120" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="6 4" className="rt rt4 route-mid" />
        <path d="M980 200 C1020 250, 1100 310, 1180 340" stroke="rgba(0,166,255,0.07)" strokeWidth="0.8" strokeDasharray="6 4" className="rt rt4 route-sub" />
        <path d="M1280 120 C1310 130, 1350 145, 1380 160" stroke="rgba(0,166,255,0.13)" strokeWidth="0.8" strokeDasharray="5 4" className="rt rt5 route-sub" />
        <path d="M1280 120 C1320 250, 1350 380, 1350 480" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="8 5" className="rt rt5 route-mid" />
        <path d="M1180 340 C1220 390, 1300 440, 1350 480" stroke="rgba(0,166,255,0.06)" strokeWidth="0.8" strokeDasharray="6 4" className="rt rt5 route-sub" />
        <path d="M120 420 C140 340, 170 280, 200 250" stroke="rgba(0,166,255,0.13)" strokeWidth="0.8" strokeDasharray="5 4" className="rt rt1 route-mid" />
        <path d="M200 250 C260 220, 320 195, 380 180" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="5 4" className="rt rt1 route-sub" />
        <path d="M120 420 C150 380, 200 340, 240 320" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" strokeDasharray="4 3" className="rt rt1 route-sub" />
        <path d="M240 320 C280 260, 340 210, 380 180" stroke="rgba(0,166,255,0.06)" strokeWidth="0.7" strokeDasharray="4 3" className="rt rt2 route-sub" />
        <path d="M280 500 C400 400, 560 200, 720 80" stroke="rgba(0,166,255,0.07)" strokeWidth="0.9" strokeDasharray="8 6" className="rt rt2 route-mid" />
        <path d="M650 50 C680 50, 720 55, 750 60" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" strokeDasharray="4 3" className="rt rt3 route-sub" />
        <path d="M750 60 C740 65, 730 72, 720 80" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" strokeDasharray="4 3" className="rt rt3 route-sub" />
        <path d="M120 420 C130 400, 145 390, 160 380" stroke="rgba(0,166,255,0.06)" strokeWidth="0.7" strokeDasharray="4 3" className="rt rt1 route-sub" />
        <path d="M280 500 C360 480, 430 460, 500 450" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="rt rt2 route-mid" />
        <path d="M500 450 C600 430, 720 390, 850 350" stroke="rgba(0,166,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="rt rt3 route-mid" />
        <path d="M850 350 C920 320, 980 250, 980 200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="rt rt3 route-sub" />
        <path d="M850 350 C950 340, 1080 340, 1180 340" stroke="rgba(0,166,255,0.05)" strokeWidth="0.6" strokeDasharray="4 3" className="rt rt4 route-sub" />
        <path d="M500 450 C550 350, 620 200, 720 80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" strokeDasharray="6 5" className="rt rt2 route-mid" />
      </svg>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <R><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#ffffff" }}>{t("whyus.titulo")}</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <span style={{ width: 28, height: 2, background: "rgba(0,166,255,0.3)", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 48, height: 2, background: "#00a6ff", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 28, height: 2, background: "rgba(0,166,255,0.3)", borderRadius: 4, display: "inline-block" }} />
          </div>
        </div></R>
        <Stg className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" ms={120} dirs={(i, n) => i === 0 ? "left" : i === n - 1 ? "right" : "up"}>
          {items.map((a, i) => (
            <WhyUsCard key={i} icon={a.icon} title={a.t} desc={a.d} color={a.color} hoverAnim={a.hoverAnim} />
          ))}
        </Stg>
      </div>
    </section>
  );
}

function ShowcaseSlider() {
  const { t } = useContext(LanguageContext);
  const images = [
    { src: "/images/team/OPCION.jpg", fit: "cover", pos: "center center" },
    { src: "/images/exportaciones.png",  fit: "cover", pos: "center center" },
    { src: "/images/casillero.png",      fit: "cover", pos: "center center" },
    { src: "/images/redglobal.png",      fit: "cover", pos: "left top" },
  ];
  const slides = [
    { tag: t("showcase.s0.tag"), title: t("showcase.s0.title"), desc: t("showcase.s0.desc"), statLines: [t("showcase.s0.statLine1"), t("showcase.s0.statLine2")], statFontSize: 32, statLabel: t("showcase.s0.statlabel") },
    { tag: t("showcase.s1.tag"), title: t("showcase.s1.title"), desc: t("showcase.s1.desc"), statNum: "220+", statLabel: t("showcase.s1.statlabel") },
    { tag: t("showcase.s2.tag"), title: t("showcase.s2.title"), desc: t("showcase.s2.desc"), statNum: t("showcase.s2.statNum"), statLabel: t("showcase.s2.statlabel") },
    { tag: t("showcase.s3.tag"), title: t("showcase.s3.title"), desc: t("showcase.s3.desc"), statNum: "1.400+", statLabel: t("showcase.s3.statlabel") },
  ];

  const [current, setCurrent] = useState(0);
  const [outgoing, setOutgoing] = useState(null);
  const [entering, setEntering] = useState(false);
  const [textPhase, setTextPhase] = useState("visible");
  const [progressKey, setProgressKey] = useState(0);
  const [routePhase, setRoutePhase] = useState("hidden");
  const ww = useWW();
  const isMobile = ww < 768;
  const autoTimer = useRef(null);
  const transTimers = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRoutePhase("drawing");
        setTimeout(() => setRoutePhase("flowing"), 3500);
        obs.unobserve(el);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const goTo = (idx) => {
    if (idx === current || outgoing !== null) return;
    clearTimeout(autoTimer.current);
    transTimers.current.forEach(clearTimeout);
    transTimers.current = [];

    setOutgoing(current);
    setTextPhase("exiting");

    transTimers.current.push(setTimeout(() => {
      setCurrent(idx);
      setOutgoing(null);
      setEntering(true);
      setTextPhase("entering");
      setProgressKey(k => k + 1);
    }, 800));

    transTimers.current.push(setTimeout(() => {
      setEntering(false);
      setTextPhase("visible");
    }, 1800));
  };

  const goToRef = useRef(goTo);
  goToRef.current = goTo;

  useEffect(() => {
    autoTimer.current = setTimeout(() => {
      goToRef.current((current + 1) % slides.length);
    }, 7000);
    return () => clearTimeout(autoTimer.current);
  }, [current]);

  useEffect(() => () => { clearTimeout(autoTimer.current); transTimers.current.forEach(clearTimeout); }, []);

  const s = slides[current];

  return (
    <section ref={sectionRef} style={{ background: "linear-gradient(135deg, #0c2340 0%, #0a1e38 40%, #112e55 100%)", padding: isMobile ? "60px 0" : "80px 0", position: "relative", overflow: "hidden" }}>
      {/* Animated SVG routes */}
      <svg className={`routes-${routePhase}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <radialGradient id="ssng3"><stop offset="0%" stopColor="rgba(0,166,255,0.16)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
          <radialGradient id="sswg3"><stop offset="0%" stopColor="rgba(255,255,255,0.14)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
        </defs>
        <circle cx="120" cy="420" r="4" fill="rgba(0,166,255,0.22)" className="nd nd1" /><circle cx="120" cy="420" r="9" stroke="rgba(0,166,255,0.13)" strokeWidth="1" fill="none" className="node-pulse nd nd1" /><circle cx="120" cy="420" r="30" fill="url(#ssng3)" className="nd nd1" />
        <circle cx="380" cy="180" r="3.5" fill="rgba(255,255,255,0.18)" className="nd nd2" /><circle cx="380" cy="180" r="8" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" className="node-pulse nd nd2" /><circle cx="380" cy="180" r="25" fill="url(#sswg3)" className="nd nd2" />
        <circle cx="720" cy="80" r="3.5" fill="rgba(0,166,255,0.2)" className="nd nd3" /><circle cx="720" cy="80" r="8" stroke="rgba(0,166,255,0.07)" strokeWidth="1" fill="none" className="node-pulse nd nd3" /><circle cx="720" cy="80" r="25" fill="url(#ssng3)" className="nd nd3" />
        <circle cx="1280" cy="120" r="4" fill="rgba(255,255,255,0.18)" className="nd nd5" /><circle cx="1280" cy="120" r="9" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" className="node-pulse nd nd5" /><circle cx="1280" cy="120" r="30" fill="url(#sswg3)" className="nd nd5" />
        <circle cx="980" cy="200" r="3.5" fill="rgba(0,166,255,0.19)" className="nd nd4" /><circle cx="980" cy="200" r="8" stroke="rgba(0,166,255,0.06)" strokeWidth="1" fill="none" className="node-pulse nd nd4" /><circle cx="980" cy="200" r="25" fill="url(#ssng3)" className="nd nd4" />
        <circle cx="280" cy="500" r="3" fill="rgba(0,166,255,0.18)" className="nd nd1" /><circle cx="280" cy="500" r="7" stroke="rgba(0,166,255,0.06)" strokeWidth="1" fill="none" className="nd nd1" /><circle cx="280" cy="500" r="22" fill="url(#ssng3)" className="nd nd1" />
        <circle cx="1350" cy="480" r="3" fill="rgba(255,255,255,0.15)" className="nd nd5" /><circle cx="1350" cy="480" r="7" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" className="nd nd5" />
        <path d="M120 420 C180 300, 300 200, 380 180" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" strokeDasharray="8 5" className="rt rt1 route-main" />
        <path d="M120 420 C300 280, 500 120, 720 80" stroke="rgba(0,166,255,0.09)" strokeWidth="1.5" strokeDasharray="10 6" className="rt rt1 route-main" />
        <path d="M380 180 C450 100, 580 60, 720 80" stroke="rgba(255,255,255,0.15)" strokeWidth="1.3" strokeDasharray="8 5" className="rt rt2 route-main" />
        <path d="M720 80 C800 100, 900 160, 980 200" stroke="rgba(0,166,255,0.09)" strokeWidth="1.4" strokeDasharray="8 5" className="rt rt3 route-main" />
        <path d="M720 80 C900 40, 1100 60, 1280 120" stroke="rgba(255,255,255,0.14)" strokeWidth="1.3" strokeDasharray="10 6" className="rt rt3 route-main" />
        <path d="M980 200 C1060 150, 1180 120, 1280 120" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="6 4" className="rt rt4 route-mid" />
        <path d="M280 500 C400 400, 560 200, 720 80" stroke="rgba(0,166,255,0.07)" strokeWidth="0.9" strokeDasharray="8 6" className="rt rt2 route-mid" />
        <path d="M1280 120 C1320 250, 1350 380, 1350 480" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="8 5" className="rt rt5 route-mid" />
      </svg>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        {/* Section title */}
        <R><div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#ffffff" }}>{t("showcase.titulo")}</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <span style={{ width: 28, height: 2, background: "rgba(0,166,255,0.3)", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 48, height: 2, background: "#00a6ff", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 28, height: 2, background: "rgba(0,166,255,0.3)", borderRadius: 4, display: "inline-block" }} />
          </div>
        </div></R>

        {/* Slider row */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 0, alignItems: "center", minHeight: isMobile ? "auto" : 420 }}>

          {/* Left — Image */}
          <div style={{ width: isMobile ? "100%" : "48%", flexShrink: 0, position: "relative", minHeight: isMobile ? 260 : 420, borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt=""
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: img.fit, objectPosition: img.pos,
                  pointerEvents: "none",
                  zIndex: outgoing === i ? 3 : current === i ? 2 : 1,
                  opacity: i !== current && i !== outgoing ? 0 : i === current && !entering ? 1 : undefined,
                  animation: i === current && entering
                    ? "zoomIn 1000ms ease both"
                    : i === outgoing
                    ? "zoomOut 800ms ease forwards"
                    : "none",
                }}
              />
            ))}
          </div>

          {/* Separator */}
          {!isMobile && <div style={{ width: 1, background: "rgba(255,255,255,0.08)", height: "60%", alignSelf: "center", flexShrink: 0, margin: "0 40px" }} />}

          {/* Right — Text */}
          <div style={{ flex: 1, padding: isMobile ? "32px 0 0" : "0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{
              animation: textPhase === "exiting"
                ? "textSlideOut 400ms ease forwards"
                : textPhase === "entering"
                ? "textSlideIn 600ms ease 200ms both"
                : "none",
            }}>
              <p style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: 12, letterSpacing: 3, fontWeight: 700, color: "#00a6ff", marginBottom: 16, textTransform: "uppercase" }}>{s.tag}</p>
              <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#ffffff", lineHeight: 1.2, marginBottom: 20 }}>{s.title}</h2>
              <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 36, maxWidth: 440 }}>{s.desc}</p>
              <div>
                {s.statLines ? (
                  s.statLines.map((line, i) => (
                    <p key={i} style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: s.statFontSize || 32, fontWeight: 800, color: "#ffffff", lineHeight: 1.25 }}>{line}</p>
                  ))
                ) : (
                  <p style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: 48, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>{s.statNum}</p>
                )}
                <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{s.statLabel}</p>
              </div>
            </div>

            {/* Nav dots */}
            <div style={{ display: "flex", marginTop: 48, alignItems: "center" }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "none", border: "none", padding: 0, flexShrink: 0 }}>
                  <div style={{
                    width: i === current ? 32 : 8,
                    height: i === current ? 4 : 8,
                    borderRadius: i === current ? 2 : 4,
                    background: i === current ? "#00a6ff" : "rgba(255,255,255,0.3)",
                    transition: "width 0.4s ease, height 0.4s ease, border-radius 0.4s ease, background 0.4s ease",
                  }} />
                </button>
              ))}
            </div>

            {/* Progress bars */}
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              {slides.map((_, i) => (
                <div key={i} style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.15)", borderRadius: 2, overflow: "hidden" }}>
                  {i === current && <div key={progressKey} style={{ height: "100%", background: "#00a6ff", animation: "progressFill 7s linear forwards" }} />}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useContext(LanguageContext);
  const [active, setActive] = useState(0);
  const [hovCard, setHovCard] = useState(false);
  const ww = useWW();
  const isMobile = ww < 768;
  const [nodesRef, nodesV] = useInView();
  const steps = [
    { n: 1, t: t("process.s1.t"), d: t("process.s1.d"), img: IMAGES.process.cotiza, imgPos: "center center", icon: <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /><path d="M8 10h8M8 14h4" stroke="#00a6ff" strokeWidth="1.5" /></svg> },
    { n: 2, t: t("process.s2.t"), d: t("process.s2.d"), img: IMAGES.process.datos, imgPos: "center center", icon: <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h2v2H8z" fill="#00a6ff" stroke="#00a6ff" /></svg> },
    { n: 3, t: t("process.s3.t"), d: t("process.s3.d"), img: IMAGES.process.paga, imgPos: "center center", icon: <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /><path d="M6 16h4" stroke="#00a6ff" strokeWidth="1.5" /></svg> },
    { n: 4, t: t("process.s4.t"), d: t("process.s4.d"), img: IMAGES.process.seguimiento, imgPos: "center center", icon: <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" stroke="#00a6ff" strokeWidth="1.8" /></svg> },
  ];
  return (
    <section style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <R><div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#1d1d1b" }}>{t("process.titulo")}</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 48, height: 2, background: "#1b6fea", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
          </div>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#6b7280", marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>{t("process.subtitulo")}</p>
        </div></R>
        {/* Timeline nodes */}
        <div ref={nodesRef} style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? 28 : 48, padding: isMobile ? "0 12px" : "0 40px" }}>
          {/* Background line */}
          <div style={{ position: "absolute", top: "50%", left: isMobile ? "calc(12px + 20px)" : "calc(40px + 30px)", right: isMobile ? "calc(12px + 20px)" : "calc(40px + 30px)", height: 3, background: "rgba(27,111,234,0.08)", borderRadius: 4, transform: "translateY(-50%)" }} />
          {/* Progress line */}
          <div style={{ position: "absolute", top: "50%", left: isMobile ? "calc(12px + 20px)" : "calc(40px + 30px)", height: 3, borderRadius: 4, background: "linear-gradient(90deg, #00a6ff, #1b6fea)", transform: "translateY(-50%)", width: active === 0 ? "0%" : `calc(${(active / (steps.length - 1)) * 100}% * (1 - 120px / 100%))`, maxWidth: "calc(100% - 140px)", transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }} />
          {steps.map((s, i) => (
            <div key={i} onMouseEnter={() => !isMobile && setActive(i)} onClick={() => setActive(i)} style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", animation: nodesV ? `springScale 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 150}ms both` : "none", opacity: nodesV ? undefined : 0 }}>
              <div style={{
                width: isMobile ? 42 : 60, height: isMobile ? 42 : 60, borderRadius: isMobile ? 21 : 30,
                background: i <= active ? "linear-gradient(135deg, #1b6fea, #00a6ff)" : "#ffffff",
                border: i <= active ? "3px solid rgba(255,255,255,0.9)" : "3px solid rgba(27,111,234,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: i === active ? "0 0 28px rgba(0,166,255,0.4), 0 4px 16px rgba(27,111,234,0.2)" : i < active ? "0 2px 8px rgba(27,111,234,0.15)" : "0 1px 4px rgba(0,0,0,0.05)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: i === active ? "scale(1.18)" : "scale(1)",
              }}>
                <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: isMobile ? 16 : 20, color: i <= active ? "#fff" : "#1b6fea", transition: "color 0.3s" }}>{s.n}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Active step content card */}
        <R delay={300}>
          <div
            style={{
              background: hovCard ? "rgba(27,111,234,0.07)" : "rgba(27,111,234,0.03)",
              borderRadius: 16,
              border: "1px solid " + (hovCard ? "rgba(27,111,234,0.18)" : "rgba(27,111,234,0.08)"),
              padding: isMobile ? "28px 20px" : "44px 40px", position: "relative", overflow: "hidden",
              minHeight: isMobile ? "auto" : 460,
              boxShadow: hovCard
                ? "0 16px 40px rgba(27,111,234,0.1), inset 0 1px 0 rgba(27,111,234,0.06)"
                : "0 4px 20px rgba(27,111,234,0.05), inset 0 1px 0 rgba(255,255,255,0.8)",
              transform: hovCard ? "translateY(-4px)" : "translateY(0)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={() => setHovCard(true)}
            onMouseLeave={() => setHovCard(false)}
          >
            {/* Left accent shimmer line */}
            <div style={{
              position: "absolute", left: 0, bottom: 0,
              width: 4, borderRadius: "0 4px 4px 0",
              background: "linear-gradient(180deg, transparent, #00a6ff88, #1b6fea99, transparent)",
              height: hovCard ? "100%" : "0%",
              transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }} />
            {steps.map((s, i) => (
              <div key={i} style={{
                display: i === active ? "flex" : "none",
                gap: isMobile ? 16 : 32, alignItems: "flex-start",
                animation: "fadeSlideIn 0.5s ease forwards",
                maxWidth: isMobile ? "100%" : "50%",
              }}>
                <div style={{
                  width: isMobile ? 64 : 100, height: isMobile ? 64 : 100, borderRadius: isMobile ? 14 : 20, flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(27,111,234,0.08), rgba(0,166,255,0.06))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#1b6fea",
                  filter: hovCard ? "drop-shadow(0 0 10px rgba(27,111,234,0.2))" : "none",
                  transition: "filter 0.4s",
                }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, background: "linear-gradient(135deg, #00a6ff, #1b6fea)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", lineHeight: 1 }}>{s.n}</span>
                    <h3 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: isMobile ? 17 : 22, color: "#1d1d1b", lineHeight: 1.3 }}>{s.t}</h3>
                  </div>
                  <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#6b7280", lineHeight: 1.75 }}>{s.d}</p>
                </div>
              </div>
            ))}
            {/* Right side image - hidden on mobile */}
            {!isMobile && steps.map((s, i) => (
              <div key={"img"+i} style={{
                display: i === active ? "flex" : "none",
                position: "absolute", right: 0, top: 0, bottom: 0, width: "48%",
                borderRadius: "0 16px 16px 0", overflow: "hidden",
                animation: "fadeSlideIn 0.6s ease forwards",
              }}>
                <img src={s.img} alt={s.t} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: s.imgPos || "center center" }} />
              </div>
            ))}
          </div>
        </R>
        {/* Step indicators */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
          {steps.map((_, i) => (
            <button key={i} onMouseEnter={() => !isMobile && setActive(i)} onClick={() => setActive(i)} style={{
              width: active === i ? 28 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer",
              background: active === i ? "linear-gradient(90deg, #00a6ff, #1b6fea)" : "rgba(27,111,234,0.12)",
              transition: "all 0.4s ease",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { t } = useContext(LanguageContext);
  const [dims, setDims] = useState({ largo: "", ancho: "", alto: "" });
  const [peso, setPeso] = useState("");
  const [calcHov, setCalcHov] = useState(false);
  const ww = useWW();
  const isMobile = ww < 768;
  const vol = dims.largo && dims.ancho && dims.alto ? (parseFloat(dims.largo) * parseFloat(dims.ancho) * parseFloat(dims.alto)) / 5000 : null;
  const pesoFisico = peso ? parseFloat(peso) : null;
  const pesoFacturable = vol !== null && pesoFisico !== null ? Math.max(vol, pesoFisico) : vol;
  const handleDim = (k, v) => { if (v === "" || /^\d*\.?\d*$/.test(v)) setDims(d => ({ ...d, [k]: v })); };
  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(27,111,234,0.1)",
    background: "rgba(27,111,234,0.03)", fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#1d1d1b",
    outline: "none", transition: "all 0.3s",
  };
  return (
    <section style={{ padding: "60px 0", background: "#f0f4f8", position: "relative", overflow: "hidden" }}>
      {/* Curved flowing background */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" fill="none">
        <path d="M0 60 C300 20, 600 120, 900 70 S1200 100, 1440 40 L1440 140 C1200 180, 900 130, 600 180 S300 80, 0 150Z" fill="rgba(27,111,234,0.025)" />
        <path d="M0 200 C240 160, 500 260, 750 200 S1100 240, 1440 180 L1440 280 C1100 320, 750 270, 500 330 S240 220, 0 300Z" fill="rgba(0,166,255,0.02)" />
        <path d="M0 320 C360 290, 720 360, 1080 310 S1320 350, 1440 320 L1440 400 L0 400Z" fill="rgba(27,111,234,0.02)" />
        <path d="M-50 50 C200 10, 500 100, 800 60 S1200 90, 1500 30" stroke="rgba(27,111,234,0.045)" strokeWidth="1.2" />
        <path d="M-50 220 C200 180, 480 280, 780 210 S1100 260, 1500 190" stroke="rgba(0,166,255,0.035)" strokeWidth="1" />
        <path d="M-50 340 C300 310, 650 370, 950 330 S1250 360, 1500 320" stroke="rgba(27,111,234,0.03)" strokeWidth="0.8" />
      </svg>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <R><div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#1d1d1b" }}>{t("cta.titulo")}</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 48, height: 2, background: "#1b6fea", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
          </div>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#6b7280", marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>{t("cta.subtitulo")}</p>
        </div></R>
        <div className="grid lg:grid-cols-2 gap-10" style={{ alignItems: "center" }}>
          {/* Calculator card */}

          <R dir="left">
            <div
              style={{
                background: calcHov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)",
                borderRadius: 16, padding: "32px 28px",
                border: "1px solid " + (calcHov ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)"),
                position: "relative", overflow: "hidden",
                backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                boxShadow: calcHov ? "0 16px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)" : "0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)",
                transform: calcHov ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={() => setCalcHov(true)}
              onMouseLeave={() => setCalcHov(false)}
            >
              <div style={{
                position: "absolute", left: 0, bottom: 0,
                width: 4, borderRadius: "0 4px 4px 0",
                background: "linear-gradient(180deg, transparent, #00a6ff88, #1b6fea99, transparent)",
                height: calcHov ? "100%" : "0%",
                transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }} />
              <h3 style={{
                fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6,
                color: calcHov ? "transparent" : "#1d1d1b",
                background: calcHov ? "linear-gradient(135deg, #00a6ff, #1b6fea)" : "none",
                WebkitBackgroundClip: calcHov ? "text" : "unset",
                backgroundClip: calcHov ? "text" : "unset",
                transition: "color 0.3s",
              }}>{t("cta.calc.titulo")}</h3>
              <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>{t("cta.calc.desc")}</p>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
                {[["largo", t("cta.largo")], ["ancho", t("cta.ancho")], ["alto", t("cta.alto")]].map(([k, label]) => (
                  <div key={k}>
                    <label style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
                    <input type="text" inputMode="decimal" placeholder="0" value={dims[k]} onChange={e => handleDim(k, e.target.value)}
                      onFocus={e => { e.target.style.borderColor = "rgba(27,111,234,0.3)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,166,255,0.1)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(27,111,234,0.1)"; e.target.style.boxShadow = "none"; }}
                      style={inputStyle} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{t("cta.peso")}</label>
                <input type="text" inputMode="decimal" placeholder="0" value={peso} onChange={e => { if (e.target.value === "" || /^\d*\.?\d*$/.test(e.target.value)) setPeso(e.target.value); }}
                  onFocus={e => { e.target.style.borderColor = "rgba(27,111,234,0.3)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,166,255,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(27,111,234,0.1)"; e.target.style.boxShadow = "none"; }}
                  style={{ ...inputStyle, maxWidth: 200 }} />
              </div>
              <div style={{
                background: vol !== null ? "linear-gradient(135deg, rgba(27,111,234,0.08), rgba(0,166,255,0.06))" : "rgba(27,111,234,0.03)",
                borderRadius: 12, padding: "18px", textAlign: "center",
                border: vol !== null ? "1px solid rgba(27,111,234,0.15)" : "1px solid rgba(27,111,234,0.06)",
                transition: "all 0.4s",
              }}>
                <p style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{t("cta.vol.label")}</p>
                <span style={{
                  fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: vol !== null ? 36 : 24,
                  background: vol !== null ? "linear-gradient(135deg, #00a6ff, #1b6fea)" : "none",
                  WebkitBackgroundClip: vol !== null ? "text" : "unset", backgroundClip: vol !== null ? "text" : "unset",
                  color: vol !== null ? "transparent" : "#d1d5db", transition: "all 0.4s",
                }}>{vol !== null ? vol.toFixed(2) + " kg" : "— kg"}</span>
                {pesoFisico !== null && vol !== null && (
                  <div style={{ marginTop: 10, padding: "8px 14px", borderRadius: 8, background: "rgba(27,111,234,0.06)" }}>
                    <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{t("cta.facturable")}</p>
                    <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: 22, color: "#1b6fea" }}>{pesoFacturable.toFixed(2)} kg</span>
                    <span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 11, color: "#9ca3af", marginLeft: 8 }}>({pesoFacturable === vol ? t("cta.vol.unidad") : t("cta.fis.unidad")})</span>
                  </div>
                )}
              </div>
            </div>
          </R>
          {/* CTA side */}
          <R dir="right" delay={200}>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <h3 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 22, color: "#1d1d1b", marginBottom: 12 }}>{t("cta.cta.titulo")}</h3>
              <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#6b7280", maxWidth: 400, margin: "0 auto 28px", lineHeight: 1.7 }}>{t("cta.cta.desc")}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
                <AnimBtn href={WA} external bg="#25D366" hoverBg="#1ea855" shadow="0 6px 20px rgba(37,211,102,0.25)" hoverShadow="0 14px 32px rgba(37,211,102,0.35)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  {t("cta.wa")}
                </AnimBtn>
              </div>
            </div>
          </R>
        </div>

        {/* Medios de pago */}
        <div style={{ marginTop: 16, borderTop: "1px solid rgba(27,111,234,0.1)", paddingTop: 12 }}>
          <p style={{
            fontFamily: "'Fira Sans',sans-serif", fontSize: 13, fontWeight: 600,
            color: "#9ca3af", textAlign: "center", marginBottom: 4,
            textTransform: "uppercase", letterSpacing: 1,
          }}>
            {t("cta.pagos")}
          </p>
          <PaymentMarquee />
        </div>
      </div>
    </section>
  );
}

const PAYMENT_LOGOS = [
  { n: "American Express", img: "/images/payments/american.png" },
  { n: "Banco de Bogotá", img: "/images/payments/banco-bogota.png" },
  { n: "Bancolombia", img: "/images/payments/bancolombia.png" },
  { n: "Código QR", img: "/images/payments/code.png" },
  { n: "Daviplata", img: "/images/payments/daviplata.png" },
  { n: "Efecty", img: "/images/payments/efecty.png" },
  { n: "Mastercard", img: "/images/payments/mastercard.png" },
  { n: "Nequi", img: "/images/payments/nequi.png" },
  { n: "PayU", img: "/images/payments/payu.png" },
  { n: "PSE", img: "/images/payments/pse.png" },
  { n: "Visa", img: "/images/payments/visa.png" },
];

function PaymentMarquee() {
  const doubled = [...PAYMENT_LOGOS, ...PAYMENT_LOGOS];
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, #f0f4f8, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg, #f0f4f8, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div className="marquee-track">
        {doubled.map((l, i) => (
          <div key={i} className="marquee-item" style={{
            flexShrink: 0, padding: "0px 20px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src={l.img}
              alt={l.n}
              style={{ height: 120, maxWidth: 260, objectFit: "contain", filter: "none", transition: "none" }}
              className="marquee-logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function SuccessTypeWriter() {
  const { t } = useContext(LanguageContext);
  const part1 = t("contact.success.titulo1");
  const part2 = t("contact.success.titulo2");
  const full = part1 + part2;
  const blueStart = part1.length;
  const [displayed, setDisplayed] = useState("");
  useEffect(() => { setDisplayed(""); }, [full]);
  useEffect(() => {
    if (displayed.length >= full.length) return;
    const timer = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70);
    return () => clearTimeout(timer);
  }, [displayed, full]);
  const before = displayed.slice(0, Math.min(displayed.length, blueStart));
  const blue = displayed.length > blueStart ? displayed.slice(blueStart) : "";
  return (
    <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1d1d1b", lineHeight: 1.15 }}>
      {before}<span style={{ color: "#1b6fea" }}>{blue}</span>
      {displayed.length < full.length && <span style={{ animation: "blink 0.5s step-end infinite" }}>|</span>}
    </h2>
  );
}

function ContactTypeWriter() {
  const { t } = useContext(LanguageContext);
  const words = t("contact.words").split("|");
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing");
  const wordsKey = words.join(",");
  useEffect(() => { setDisplayed(""); setWordIndex(0); setPhase("typing"); }, [wordsKey]);
  useEffect(() => {
    const word = words[wordIndex % words.length];
    let timeout;
    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setPhase("waiting"), 1500);
      }
    } else if (phase === "waiting") {
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
      } else {
        setWordIndex(i => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex]);
  return (
    <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 3.8rem)", color: "#1d1d1b", lineHeight: 1.15, margin: 0, minHeight: "4.5em" }}>
      {displayed}<span style={{ animation: "blink 0.5s step-end infinite" }}>|</span>
    </h2>
  );
}

function ContactForm() {
  const { t } = useContext(LanguageContext);
  const ww = useWW();
  const isMobile = ww < 640;
  const [form, setForm] = useState({ nombre: "", celular: "", correo: "", ciudad: "", servicio: "", mensaje: "", datosCheck: false, novedadesCheck: false });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);
  const [datosError, setDatosError] = useState(false);
  const [btnHov, setBtnHov] = useState(false);

  const lineInput = (extra = {}) => ({
    width: "100%", boxSizing: "border-box",
    borderTop: "none", borderLeft: "none", borderRight: "none",
    borderBottom: "1px solid #d1d5db", borderRadius: 0,
    padding: "12px 4px", background: "transparent",
    fontSize: 15, color: "#1d1d1b", outline: "none",
    transition: "border-color 0.2s", fontFamily: "'Roboto',sans-serif",
    ...extra,
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name === "datosCheck" && checked) setDatosError(false);
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.datosCheck) { setDatosError(true); return; }
    setSending(true);
    const payload = {
      nombre: form.nombre || "",
      celular: form.celular || "",
      correo: form.correo || "",
      ciudad: form.ciudad || "",
      servicio: form.servicio || "",
      mensaje: form.mensaje || "",
      newsletter: form.novedadesCheck ? "Sí" : "No",
    };
    try {
      await fetch("https://script.google.com/a/macros/atlaslogistic.com.co/s/AKfycbw3i-8JSWVAz1c0bANxsot5nXaZ0OtKumtUUWt_Ab7W3FDzyyf-m4bB0eaIyv6pGXz_xQ/exec", {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) {}
    setSending(false);
    setSent(true);
  };

  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 140; window.scrollTo({ top, behavior: "smooth" }); }
  };

  const focusBorder = name => focused === name ? { borderBottomColor: "#1b6fea" } : {};
  const checkLabelStyle = { display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "#1d1d1b", lineHeight: 1.5, cursor: "pointer" };

  if (sent) return (
    <section id="contacto" style={{ background: "#ffffff", padding: isMobile ? "60px 0" : "130px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1px 1fr", gap: 0, alignItems: "start" }}>
        <div style={{ paddingRight: isMobile ? 0 : 56 }}>
          <SuccessTypeWriter />
        </div>
        {!isMobile && <div style={{ background: "#e5e7eb", width: 1, alignSelf: "stretch" }} />}
        <div style={{ paddingLeft: isMobile ? 0 : 56, marginTop: isMobile ? 32 : 0 }}>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#6b7280", lineHeight: 1.75, marginBottom: 20 }}>
            {t("contact.success.p1")}
          </p>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#6b7280", lineHeight: 1.75, marginBottom: 24 }}>
            {t("contact.success.p2")}
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => scrollTo("servicios")} style={{ background: "none", border: "none", padding: 0, color: "#1b6fea", fontSize: 15, fontWeight: 600, fontFamily: "'Fira Sans',sans-serif", cursor: "pointer" }}>{t("contact.success.ver")}</button>
            <span style={{ color: "#d1d5db" }}>|</span>
            <button onClick={() => scrollTo("inicio")} style={{ background: "none", border: "none", padding: 0, color: "#1b6fea", fontSize: 15, fontWeight: 600, fontFamily: "'Fira Sans',sans-serif", cursor: "pointer" }}>{t("contact.success.inicio")}</button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section id="contacto" style={{ background: "#ffffff", padding: isMobile ? "60px 0" : "130px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 20px" : "0 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1px 1fr", gap: 0, alignItems: "start" }}>
        {/* Columna izquierda */}
        <div style={{ paddingRight: isMobile ? 0 : 80 }}>
          <ContactTypeWriter />
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#6b7280", marginTop: 20, maxWidth: 380, lineHeight: 1.75 }}>{t("contact.subtitulo")}</p>
        </div>
        {/* Línea divisora */}
        {!isMobile && <div style={{ background: "#e5e7eb", width: 1, alignSelf: "stretch" }} />}
        {/* Columna derecha - formulario */}
        <form onSubmit={handleSubmit} style={{ paddingLeft: isMobile ? 0 : 80, marginTop: isMobile ? 40 : 0, display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 24px", marginBottom: 8 }}>
            <input name="nombre" placeholder={t("contact.nombre")} required value={form.nombre} onChange={handleChange}
              style={{ ...lineInput(), ...focusBorder("nombre") }}
              onFocus={() => setFocused("nombre")} onBlur={() => setFocused(null)} />
            <input name="celular" placeholder={t("contact.celular")} required value={form.celular} onChange={handleChange}
              style={{ ...lineInput(), ...focusBorder("celular") }}
              onFocus={() => setFocused("celular")} onBlur={() => setFocused(null)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 24px", marginBottom: 8 }}>
            <input name="correo" type="email" placeholder={t("contact.correo")} required value={form.correo} onChange={handleChange}
              style={{ ...lineInput(), ...focusBorder("correo") }}
              onFocus={() => setFocused("correo")} onBlur={() => setFocused(null)} />
            <input name="ciudad" placeholder={t("contact.ciudad")} required value={form.ciudad} onChange={handleChange}
              style={{ ...lineInput(), ...focusBorder("ciudad") }}
              onFocus={() => setFocused("ciudad")} onBlur={() => setFocused(null)} />
          </div>
          <div style={{ marginBottom: 8 }}>
            <select name="servicio" required value={form.servicio} onChange={handleChange}
              style={{ ...lineInput(), color: form.servicio ? "#1d1d1b" : "#9ca3af", ...focusBorder("servicio") }}
              onFocus={() => setFocused("servicio")} onBlur={() => setFocused(null)}>
              <option value="" disabled>{t("contact.servicio")}</option>
              <option value="Importación por Courier">{t("contact.svc1")}</option>
              <option value="Exportación por Courier">{t("contact.svc2")}</option>
              <option value="Envíos Terrestres a Venezuela">{t("contact.svc3")}</option>
              <option value="Casillero Internacional">{t("contact.svc4")}</option>
              <option value="Triangulación de Envíos">{t("contact.svc5")}</option>
              <option value="Operaciones Especiales">{t("contact.svc6")}</option>
            </select>
          </div>
          <textarea name="mensaje" placeholder={t("contact.mensaje")} value={form.mensaje} onChange={handleChange}
            style={{ ...lineInput({ minHeight: 80, resize: "vertical" }), ...focusBorder("mensaje"), marginBottom: 20 }}
            onFocus={() => setFocused("mensaje")} onBlur={() => setFocused(null)} />
          <div style={{ marginBottom: 10 }}>
            <label style={checkLabelStyle}>
              <input type="checkbox" name="datosCheck" checked={form.datosCheck} onChange={handleChange} style={{ marginTop: 3, accentColor: "#1b6fea", flexShrink: 0 }} />
              <span>{t("contact.datos")} <a href="/tratamiento-de-datos" style={{ color: "#1b6fea", textDecoration: "underline", cursor: "pointer" }}>{t("contact.datos.politica")}</a> {t("contact.datos.y")} <a href="/aviso-de-privacidad" style={{ color: "#1b6fea", textDecoration: "underline", cursor: "pointer" }}>{t("contact.datos.aviso")}</a></span>
            </label>
            {datosError && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, marginLeft: 24 }}>{t("contact.datos.error")}</p>}
          </div>
          <label style={checkLabelStyle}>
            <input type="checkbox" name="novedadesCheck" checked={form.novedadesCheck} onChange={handleChange} style={{ marginTop: 3, accentColor: "#1b6fea", flexShrink: 0 }} />
            <span>{t("contact.newsletter")}</span>
          </label>
          <div>
            <button type="submit" disabled={sending}
              onMouseEnter={() => setBtnHov(true)} onMouseLeave={() => setBtnHov(false)}
              style={{ marginTop: 24, padding: "14px 40px", borderRadius: 50, border: "none", cursor: sending ? "not-allowed" : "pointer", color: "#fff", fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 15, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", background: sending ? "#9ca3af" : btnHov ? "linear-gradient(135deg, #00a6ff, #1b6fea)" : "#1b6fea", transform: btnHov && !sending ? "translateY(-2px)" : "translateY(0)", boxShadow: btnHov && !sending ? "0 8px 24px rgba(27,111,234,0.35)" : "none" }}>
              {sending ? t("contact.enviando") : t("contact.enviar")}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useContext(LanguageContext);
  const [routePhase, setRoutePhase] = useState("hidden");
  const sectionRef = useRef(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setRoutePhase("drawing");
        setTimeout(() => setRoutePhase("flowing"), 3500);
        obs.unobserve(el);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const soc = [
    { n: "Instagram", h: "https://www.instagram.com/atlaslogisticaglobal", img: "/images/insta sin fondo.png", size: 40 },
    { n: "TikTok", h: "https://www.tiktok.com/@atlas.logistic", img: "/images/tiktok (1).png", size: 36 },
    { n: "Facebook", h: "https://www.facebook.com/people/Atlas-Logistic/61584724776185/?rdid=vyjOiEPX9GyLlMXR&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ApsfDGCmG%2F", img: "/images/facebook.png", size: 29 },
    { n: "LinkedIn", h: "https://www.linkedin.com/company/atlas-logistic", img: "/images/linkdn.png", size: 34 },
  ];
  return (
    <footer ref={sectionRef} style={{ background: "linear-gradient(135deg, #0c2340 0%, #0a1e38 40%, #112e55 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <svg className={`routes-${routePhase}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <radialGradient id="fng2"><stop offset="0%" stopColor="rgba(0,166,255,0.16)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
          <radialGradient id="fwg2"><stop offset="0%" stopColor="rgba(255,255,255,0.14)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
        </defs>
        <circle cx="120" cy="420" r="4" fill="rgba(0,166,255,0.22)" className="nd nd1" /><circle cx="120" cy="420" r="9" stroke="rgba(0,166,255,0.13)" strokeWidth="1" fill="none" className="node-pulse nd nd1" /><circle cx="120" cy="420" r="30" fill="url(#fng2)" className="nd nd1" />
        <circle cx="380" cy="180" r="3.5" fill="rgba(255,255,255,0.18)" className="nd nd2" /><circle cx="380" cy="180" r="8" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" className="node-pulse nd nd2" /><circle cx="380" cy="180" r="25" fill="url(#fwg2)" className="nd nd2" />
        <circle cx="720" cy="80" r="3.5" fill="rgba(0,166,255,0.2)" className="nd nd3" /><circle cx="720" cy="80" r="8" stroke="rgba(0,166,255,0.07)" strokeWidth="1" fill="none" className="node-pulse nd nd3" /><circle cx="720" cy="80" r="25" fill="url(#fng2)" className="nd nd3" />
        <circle cx="1280" cy="120" r="4" fill="rgba(255,255,255,0.18)" className="nd nd5" /><circle cx="1280" cy="120" r="9" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" className="node-pulse nd nd5" /><circle cx="1280" cy="120" r="30" fill="url(#fwg2)" className="nd nd5" />
        <circle cx="280" cy="500" r="3" fill="rgba(0,166,255,0.18)" className="nd nd1" /><circle cx="280" cy="500" r="7" stroke="rgba(0,166,255,0.06)" strokeWidth="1" fill="none" className="nd nd1" /><circle cx="280" cy="500" r="22" fill="url(#fng2)" className="nd nd1" />
        <circle cx="650" cy="50" r="3" fill="rgba(255,255,255,0.16)" className="nd nd3" /><circle cx="650" cy="50" r="7" stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" className="nd nd3" />
        <circle cx="980" cy="200" r="3.5" fill="rgba(0,166,255,0.19)" className="nd nd4" /><circle cx="980" cy="200" r="8" stroke="rgba(0,166,255,0.06)" strokeWidth="1" fill="none" className="node-pulse nd nd4" /><circle cx="980" cy="200" r="25" fill="url(#fng2)" className="nd nd4" />
        <circle cx="200" cy="250" r="3" fill="rgba(255,255,255,0.16)" className="nd nd1" /><circle cx="200" cy="250" r="7" stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" className="nd nd1" />
        <circle cx="160" cy="380" r="2.5" fill="rgba(0,166,255,0.16)" className="nd nd1" /><circle cx="160" cy="380" r="6" stroke="rgba(0,166,255,0.05)" strokeWidth="1" fill="none" className="nd nd1" />
        <circle cx="240" cy="320" r="2.5" fill="rgba(255,255,255,0.14)" className="nd nd1" /><circle cx="240" cy="320" r="6" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" className="nd nd1" />
        <circle cx="1380" cy="160" r="3" fill="rgba(0,166,255,0.16)" className="nd nd5" /><circle cx="1380" cy="160" r="7" stroke="rgba(0,166,255,0.05)" strokeWidth="1" fill="none" className="nd nd5" />
        <circle cx="750" cy="60" r="2.5" fill="rgba(255,255,255,0.14)" className="nd nd3" />
        <circle cx="1180" cy="340" r="3" fill="rgba(0,166,255,0.16)" className="nd nd4" /><circle cx="1180" cy="340" r="7" stroke="rgba(0,166,255,0.05)" strokeWidth="1" fill="none" className="nd nd4" />
        <circle cx="1350" cy="480" r="3" fill="rgba(255,255,255,0.15)" className="nd nd5" /><circle cx="1350" cy="480" r="7" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" className="nd nd5" />
        <circle cx="500" cy="450" r="2.5" fill="rgba(0,166,255,0.13)" className="nd nd2" /><circle cx="500" cy="450" r="6" stroke="rgba(0,166,255,0.07)" strokeWidth="1" fill="none" className="nd nd2" />
        <circle cx="850" cy="350" r="2.5" fill="rgba(255,255,255,0.12)" className="nd nd3" /><circle cx="850" cy="350" r="6" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" className="nd nd3" />
        <path d="M120 420 C180 300, 300 200, 380 180" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" strokeDasharray="8 5" className="rt rt1 route-main" />
        <path d="M120 420 C300 280, 500 120, 720 80" stroke="rgba(0,166,255,0.09)" strokeWidth="1.5" strokeDasharray="10 6" className="rt rt1 route-main" />
        <path d="M120 420 C160 450, 220 480, 280 500" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="6 4" className="rt rt1 route-mid" />
        <path d="M380 180 C450 100, 580 60, 720 80" stroke="rgba(255,255,255,0.15)" strokeWidth="1.3" strokeDasharray="8 5" className="rt rt2 route-main" />
        <path d="M380 180 C430 100, 540 40, 650 50" stroke="rgba(0,166,255,0.07)" strokeWidth="0.8" strokeDasharray="6 4" className="rt rt2 route-sub" />
        <path d="M720 80 C800 100, 900 160, 980 200" stroke="rgba(0,166,255,0.09)" strokeWidth="1.4" strokeDasharray="8 5" className="rt rt3 route-main" />
        <path d="M720 80 C900 40, 1100 60, 1280 120" stroke="rgba(255,255,255,0.14)" strokeWidth="1.3" strokeDasharray="10 6" className="rt rt3 route-main" />
        <path d="M980 200 C1060 150, 1180 120, 1280 120" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="6 4" className="rt rt4 route-mid" />
        <path d="M980 200 C1020 250, 1100 310, 1180 340" stroke="rgba(0,166,255,0.07)" strokeWidth="0.8" strokeDasharray="6 4" className="rt rt4 route-sub" />
        <path d="M1280 120 C1310 130, 1350 145, 1380 160" stroke="rgba(0,166,255,0.13)" strokeWidth="0.8" strokeDasharray="5 4" className="rt rt5 route-sub" />
        <path d="M1280 120 C1320 250, 1350 380, 1350 480" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="8 5" className="rt rt5 route-mid" />
        <path d="M1180 340 C1220 390, 1300 440, 1350 480" stroke="rgba(0,166,255,0.06)" strokeWidth="0.8" strokeDasharray="6 4" className="rt rt5 route-sub" />
        <path d="M120 420 C140 340, 170 280, 200 250" stroke="rgba(0,166,255,0.13)" strokeWidth="0.8" strokeDasharray="5 4" className="rt rt1 route-mid" />
        <path d="M200 250 C260 220, 320 195, 380 180" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="5 4" className="rt rt1 route-sub" />
        <path d="M120 420 C150 380, 200 340, 240 320" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" strokeDasharray="4 3" className="rt rt1 route-sub" />
        <path d="M240 320 C280 260, 340 210, 380 180" stroke="rgba(0,166,255,0.06)" strokeWidth="0.7" strokeDasharray="4 3" className="rt rt2 route-sub" />
        <path d="M280 500 C400 400, 560 200, 720 80" stroke="rgba(0,166,255,0.07)" strokeWidth="0.9" strokeDasharray="8 6" className="rt rt2 route-mid" />
        <path d="M650 50 C680 50, 720 55, 750 60" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" strokeDasharray="4 3" className="rt rt3 route-sub" />
        <path d="M750 60 C740 65, 730 72, 720 80" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" strokeDasharray="4 3" className="rt rt3 route-sub" />
        <path d="M120 420 C130 400, 145 390, 160 380" stroke="rgba(0,166,255,0.06)" strokeWidth="0.7" strokeDasharray="4 3" className="rt rt1 route-sub" />
        <path d="M280 500 C360 480, 430 460, 500 450" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="rt rt2 route-mid" />
        <path d="M500 450 C600 430, 720 390, 850 350" stroke="rgba(0,166,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="rt rt3 route-mid" />
        <path d="M850 350 C920 320, 980 250, 980 200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="rt rt3 route-sub" />
        <path d="M850 350 C950 340, 1080 340, 1180 340" stroke="rgba(0,166,255,0.05)" strokeWidth="0.6" strokeDasharray="4 3" className="rt rt4 route-sub" />
        <path d="M500 450 C550 350, 620 200, 720 80" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" strokeDasharray="6 5" className="rt rt2 route-mid" />
      </svg>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px", position: "relative", zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12" style={{ alignItems: "stretch" }}>
          <R dir="left"><div style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "32px 28px" }}>
            <Logo h={70} style={{ marginBottom: 10 }} />
            <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "#ffffff", lineHeight: 1.75, maxWidth: 420, marginBottom: 20 }}>{t("footer.desc")}</p>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, filter: "drop-shadow(0 0 8px rgba(0,166,255,0.3))" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "url(#gradFoot)" }}>
                    <defs><linearGradient id="gradFoot" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#00a6ff"/></linearGradient></defs>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div><span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#d1d5db" }}>+57 322 605 5431</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, filter: "drop-shadow(0 0 8px rgba(0,166,255,0.3))" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "url(#gradFoot2)" }}>
                    <defs><linearGradient id="gradFoot2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#00a6ff"/></linearGradient></defs>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div><span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#d1d5db" }}>Carrera 31b # 4A-11, Bogotá, Colombia — Barrio Veraguas</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              {soc.map(s => <a key={s.n} href={s.h} target="_blank" rel="noopener noreferrer" aria-label={s.n} style={{ width: 32, height: 32, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s", textDecoration: "none", opacity: 1 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.75"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              ><img src={s.img} alt={s.n} style={{ width: s.size, height: s.size, objectFit: "contain" }} /></a>)}
            </div>
          </div></R>
          <R dir="right" delay={200}><div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", height: "100%", minHeight: 200 }}>
            <iframe title="Ubicación" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.937!2d-74.094!3d4.601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzYnMDMuNiJOIDc0wrAwNSczNi4wIlc!5e0!3m2!1ses!2sco!4v1" width="100%" height="100%" style={{ border: 0, minHeight: 200, display: "block" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div></R>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 13, color: "#6b7280" }}>© {new Date().getFullYear()} Atlas Logistic SAS — {t("footer.rights")}</p>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 13, color: "#4b5563" }}>{t("footer.city")}</p>
        </div>
      </div>
    </footer>
  );
}

function WF() {
  const [s, setS] = useState(false);
  const [hov, setHov] = useState(false);
  useEffect(() => { const t = setTimeout(() => setS(true), 1500); return () => clearTimeout(t); }, []);
  return <>
    <style>{`
      @keyframes waFabPulse {
        0%, 100% { box-shadow: 0 6px 20px rgba(37,211,102,0.35), 0 0 0 0 rgba(37,211,102,0.45); }
        50% { box-shadow: 0 6px 20px rgba(37,211,102,0.35), 0 0 0 14px rgba(37,211,102,0); }
      }
    `}</style>
    <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 50,
        background: "#25D366", padding: 14, borderRadius: 50, color: "#fff",
        textDecoration: "none",
        transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.5s",
        transform: s ? (hov ? "scale(1.08) translateY(-3px)" : "translateY(0)") : "translateY(80px)",
        opacity: s ? 1 : 0,
        animation: s && !hov ? "waFabPulse 2.8s ease-in-out infinite" : "none",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    </a>
  </>;
}

function AccessibilityWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState({});
  const [maskY, setMaskY] = useState(-9999);
  const maskH = 60;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    const all = [
      "a11y-big-text", "a11y-bigger-text", "a11y-biggest-text",
      "a11y-dyslexia", "a11y-high-contrast", "a11y-invert",
      "a11y-grayscale", "a11y-highlight-links", "a11y-reading-mask",
      "a11y-hide-images", "a11y-focus-outline", "a11y-line-height"
    ];
    all.forEach(c => el.classList.remove(c));
    Object.keys(active).forEach(k => { if (active[k]) el.classList.add(k); });
  }, [active]);

  useEffect(() => {
    if (!active["a11y-reading-mask"]) return;
    const handler = e => setMaskY(e.clientY);
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [active]);

  const toggle = key => setActive(p => ({ ...p, [key]: !p[key] }));
  const reset = () => setActive({});

  const groups = [
    {
      label: "TEXTO",
      items: [
        { key: "a11y-big-text", label: "Texto grande", icon: "A", bars: 1 },
        { key: "a11y-bigger-text", label: "Texto mayor", icon: "A", bars: 2 },
        { key: "a11y-biggest-text", label: "Texto máximo", icon: "A", bars: 3 },
        { key: "a11y-dyslexia", label: "Fuente dislexia", icon: "Aa" },
      ]
    },
    {
      label: "VISUAL",
      items: [
        { key: "a11y-high-contrast", label: "Alto contraste", icon: "◑" },
        { key: "a11y-invert", label: "Invertir colores", icon: "⊙" },
        { key: "a11y-grayscale", label: "Escala de grises", icon: "▨" },
        { key: "a11y-highlight-links", label: "Resaltar links", icon: "↗" },
      ]
    },
    {
      label: "ORIENTACIÓN",
      items: [
        { key: "a11y-reading-mask", label: "Máscara lectura", icon: "▬" },
        { key: "a11y-hide-images", label: "Ocultar imágenes", icon: "⊘" },
        { key: "a11y-focus-outline", label: "Foco visible", icon: "⬚" },
        { key: "a11y-line-height", label: "Interlineado", icon: "≡" },
      ]
    }
  ];

  return (
    <>
      <style>{`
        @keyframes a11yFabPulse {
          0% { box-shadow: 0 0 0 0 rgba(27,111,234,0.4); }
          70% { box-shadow: 0 0 0 14px rgba(27,111,234,0); }
          100% { box-shadow: 0 0 0 0 rgba(27,111,234,0); }
        }
        @keyframes a11yPanelIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .a11y-big-text body { zoom: 1.12; }
        .a11y-bigger-text body { zoom: 1.25; }
        .a11y-biggest-text body { zoom: 1.45; }
        .a11y-dyslexia * { font-family: Arial, sans-serif !important; letter-spacing: 0.08em !important; word-spacing: 0.12em !important; }
        .a11y-high-contrast { filter: contrast(1.6) brightness(1.1); }
        .a11y-invert { filter: invert(1) hue-rotate(180deg); }
        .a11y-grayscale { filter: grayscale(1); }
        .a11y-highlight-links a { background: #ffff00 !important; color: #000 !important; padding: 1px 3px !important; border-radius: 3px !important; }
        .a11y-hide-images img { visibility: hidden !important; }
        .a11y-focus-outline a,
        .a11y-focus-outline button,
        .a11y-focus-outline input,
        .a11y-focus-outline textarea,
        .a11y-focus-outline select,
        .a11y-focus-outline [role=button] {
          outline: 3px solid #00a6ff !important;
          outline-offset: 3px !important;
          border-radius: 4px;
        }
        .a11y-focus-outline *:focus {
          outline: 4px solid #1b6fea !important;
          outline-offset: 4px !important;
        }
        .a11y-line-height * { line-height: 2 !important; }
      `}</style>

      {/* Reading mask */}
      {active["a11y-reading-mask"] && <>
        <div style={{ position: "fixed", left: 0, right: 0, top: 0, height: Math.max(0, maskY - maskH / 2), background: "rgba(0,0,0,0.5)", zIndex: 9998, pointerEvents: "none" }} />
        <div style={{ position: "fixed", left: 0, right: 0, top: maskY + maskH / 2, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 9998, pointerEvents: "none" }} />
      </>}

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Widget de accesibilidad"
        aria-expanded={open}
        style={{
          position: "fixed", bottom: 24, left: 24, zIndex: 9999,
          width: 56, height: 56, borderRadius: 50, border: "none", cursor: "pointer",
          background: open ? "linear-gradient(135deg, #00a6ff, #1b6fea)" : "linear-gradient(135deg, #1b6fea, #00a6ff)",
          boxShadow: open ? "0 6px 24px rgba(27,111,234,0.45)" : "0 6px 20px rgba(27,111,234,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          transform: visible ? `translateY(0) scale(${open ? 1.05 : 1})` : "translateY(80px)",
          opacity: visible ? 1 : 0,
          animation: visible && !open ? "a11yFabPulse 2.5s ease-out 2s infinite" : "none",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8h.01M11 12h1v4h1" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Opciones de accesibilidad"
          style={{
            position: "fixed", bottom: 92, left: 24, zIndex: 9999,
            width: "min(360px, calc(100vw - 48px))", background: "#fff", borderRadius: 20,
            boxShadow: "0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(27,111,234,0.12)",
            animation: "a11yPanelIn 0.25s cubic-bezier(0.4,0,0.2,1) forwards",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{ background: "linear-gradient(135deg, #0c2340, #1b4080)", padding: "16px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M12 8h.01M11 12h1v4h1" />
              </svg>
            </div>
            <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", flex: 1 }}>Accesibilidad</span>
            <button onClick={reset} title="Restablecer" style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, padding: "4px 10px", color: "#93c5fd", fontFamily: "'Roboto',sans-serif", fontSize: 12, cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >Restablecer</button>
            <button onClick={() => setOpen(false)} aria-label="Cerrar" style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", transition: "background 0.2s", marginLeft: 4 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: "14px 16px 12px", maxHeight: "65vh", overflowY: "auto" }}>
            {groups.map(g => (
              <div key={g.label} style={{ marginBottom: 14 }}>
                <p style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8 }}>{g.label}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {g.items.map(item => {
                    const on = !!active[item.key];
                    return (
                      <button
                        key={item.key}
                        onClick={() => toggle(item.key)}
                        aria-pressed={on}
                        style={{
                          background: on ? "linear-gradient(135deg, rgba(27,111,234,0.12), rgba(0,166,255,0.08))" : "#f9fafb",
                          border: on ? "1.5px solid rgba(27,111,234,0.4)" : "1.5px solid #e5e7eb",
                          borderRadius: 12, padding: "10px 12px", cursor: "pointer",
                          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6,
                          transition: "all 0.2s",
                          textAlign: "left",
                        }}
                        onMouseEnter={e => { if (!on) e.currentTarget.style.background = "#f0f4f8"; }}
                        onMouseLeave={e => { if (!on) e.currentTarget.style.background = "#f9fafb"; }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                          <span style={{ fontSize: item.bars ? 16 : 18, fontWeight: 700, color: on ? "#1b6fea" : "#374151", lineHeight: 1 }}>{item.icon}</span>
                          {item.bars && (
                            <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
                              {[1,2,3].map(b => <div key={b} style={{ width: 4, height: 4 + b * 3, borderRadius: 2, background: b <= item.bars ? (on ? "#1b6fea" : "#9ca3af") : "#e5e7eb" }} />)}
                            </div>
                          )}
                          {on && !item.bars && <div style={{ width: 8, height: 8, borderRadius: 4, background: "#1b6fea", flexShrink: 0 }} />}
                        </div>
                        <span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 11, fontWeight: 500, color: on ? "#1b6fea" : "#6b7280", lineHeight: 1.2 }}>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding: "10px 16px 14px", borderTop: "1px solid #f3f4f6" }}>
            <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 11, color: "#9ca3af", textAlign: "center" }}>
              Atlas Logistic — Herramienta de accesibilidad web
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export { Nav, Hero, Services, About, WhyUs, ShowcaseSlider, Process, CTA, PaymentMarquee, ContactForm, Footer, WF, TeamCinematic, AccessibilityWidget, ServiceModal };
