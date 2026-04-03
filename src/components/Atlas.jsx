'use client';
import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { useWindowWidth as useWW } from '@/hooks/useWindowWidth';
import { WA_LINK as WA, PHONE_LINK as PH, IMAGES } from '@/lib/constants';

function R({ children, className = "", delay = 0, dir = "up" }) {
  const [ref, v] = useInView();
  const b = dir === "left" ? "translate-x-8" : dir === "right" ? "-translate-x-8" : "translate-y-8";
  return <div ref={ref} className={`transition-all ease-out ${v ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${b}`} ${className}`} style={{ transitionDuration: "800ms", transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Stg({ children, className = "", ms = 100 }) {
  const [ref, v] = useInView();
  return <div ref={ref} className={className}>{Array.isArray(children) ? children.map((c, i) => <div key={i} className={`transition-all ease-out ${v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDuration: "700ms", transitionDelay: `${i * ms}ms`, height: "100%" }}>{c}</div>) : children}</div>;
}

function Logo({ h = 52, style = {} }) {
  return <img src={IMAGES.logo} alt="Atlas Logistic" style={{ height: h, width: "auto", objectFit: "contain", ...style }} />;
}

function AnimBtn({ href, children, bg, hoverBg, shadow, hoverShadow, external = false, style = {} }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: hov ? (hoverBg || bg) : bg,
        color: "#fff", padding: style?.padding || "12px 24px", borderRadius: 50,
        fontSize: 15, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif",
        textTransform: "uppercase", letterSpacing: 0.5, textDecoration: "none",
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
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
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

function Nav() {
  const lnk = [{ l: "Inicio", h: "#inicio" }, { l: "Sobre nosotros", h: "#nosotros" }, { l: "Servicios", h: "#servicios" }, { l: "Contacto", h: "#contacto" }];
  const [mo, setMo] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const check = () => {
      const hero = document.getElementById("inicio");
      if (!hero) return;
      const obs = new IntersectionObserver(([e]) => {
        setScrolled(e.intersectionRatio < 0.3);
      }, { threshold: [0, 0.1, 0.2, 0.3, 0.5, 1] });
      obs.observe(hero);
      return obs;
    };
    // Small delay to ensure DOM is ready
    const t = setTimeout(() => { check(); }, 100);
    return () => clearTimeout(t);
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
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 95 : 80, transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}>
        <a href="#inicio" onClick={(e) => { e.preventDefault(); const el = document.getElementById('inicio'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}><Logo h={scrolled ? 90 : 60} style={{ transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }} /></a>
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 36 }}>
          {lnk.map(l => <NavLink key={l.h} href={l.h} label={l.l} />)}
        </div>
        <button onClick={() => setMo(!mo)} className="md:hidden" style={{ padding: 8, background: "none", border: "none", cursor: "pointer" }} aria-label="Menú">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">{mo ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}</svg>
        </button>
      </div>
      {mo && <div style={{ background: scrolled ? "rgba(12,35,64,0.95)" : "rgba(12,35,64,0.97)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "12px 24px" }}>
        {lnk.map(l => <a key={l.h} href={l.h} onClick={(e) => { e.preventDefault(); setMo(false); const el = document.getElementById(l.h.replace('#','')); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} style={{ display: "block", padding: "12px 0", color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500, fontFamily: "'Fira Sans',sans-serif", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{l.l}</a>)}
        <div style={{ paddingTop: 16, paddingBottom: 8, display: "flex", gap: 10 }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => setMo(false)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 16px", borderRadius: 50, background: "#25D366", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            WhatsApp
          </a>
          <a href={PH} onClick={() => setMo(false)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 16px", borderRadius: 50, background: "linear-gradient(135deg, #1b6fea, #00a6ff)", color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif", textDecoration: "none" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
            Llamar
          </a>
        </div>
      </div>}
    </nav>
  );
}

function TypeWriter() {
  const words = ["Importaciones", "Exportaciones", "Courier", "Agenciamiento Aduanero", "Logística Internacional"];
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // "typing" | "waiting" | "deleting"
  useEffect(() => {
    const word = words[wordIndex];
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
      <span style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>Especialistas en</span>
      <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: "#ffffff" }}>{displayed}<span style={{ animation: "blink 0.5s step-end infinite", marginLeft: 1 }}>|</span></span>
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" style={{ position: "relative", minHeight: "75vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMAGES.banner})`, backgroundSize: "cover", backgroundPosition: "center 30%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(12,35,64,0.9) 0%, rgba(12,35,64,0.72) 40%, rgba(12,35,64,0.55) 100%)" }} />
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "120px 24px 60px", width: "100%" }}>
        <div style={{ maxWidth: 800 }}>
          <R delay={200}><h1 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, color: "#fff", fontSize: "clamp(2.2rem, 5.5vw, 4.4rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}>¡Desde donde estés<br />hasta donde lo necesites!</h1></R>
          <R delay={300}><TypeWriter /></R>

          <R delay={600}><div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", gap: 14 }}>
            <AnimBtn href={WA} external bg="#00a6ff" hoverBg="#1b6fea" shadow="0 8px 24px rgba(0,166,255,0.35)" hoverShadow="0 14px 32px rgba(27,111,234,0.4)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Cotizar mi envío
            </AnimBtn>
            <AnimBtn href="#contacto" bg="linear-gradient(135deg, #1b6fea, #00a6ff)" hoverBg="linear-gradient(135deg, #00a6ff, #1b6fea)" shadow="0 8px 24px rgba(27,111,234,0.3)" hoverShadow="0 14px 32px rgba(0,166,255,0.4)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
              Contáctanos
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
};

function SvcCard({ icon, title, desc, color, hoverAnim }) {
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
      <span style={{
        fontFamily: "'Fira Sans',sans-serif", fontSize: 14, fontWeight: 600,
        color: hov ? "#1b6fea" : "#00a6ff",
        transition: "color 0.3s", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 14,
      }}>
        Ver más
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.3s", transform: hov ? "translateX(3px)" : "translateX(0)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </span>
    </div>
  );
}

function Services() {
  const [pos, setPos] = useState(0);
  const ww = useWW();
  const visible = ww < 640 ? 1 : ww < 1024 ? 2 : 4;
  const data = [
    { k: "importacion", t: "Importación por Courier", d: "Recepción de envíos desde el exterior hacia Colombia con liberación rápida puerta a puerta.", color: "#1b6fea" },
    { k: "exportacion", t: "Exportación por Courier", d: "Envíos desde Colombia hacia más de 220 países con trámites simplificados y tránsito express.", color: "#00a6ff" },
    { k: "terrestre", t: "Envíos Terrestres a Venezuela", d: "Transporte terrestre eficiente y de menor costo con cobertura en distintas ciudades.", color: "#0c2340" },
    { k: "casillero", t: "Casillero Internacional", d: "Direcciones en EE.UU., España y China para consolidar compras y optimizar costos.", color: "#1b6fea" },
    { k: "aereo", t: "Triangulación de Envíos", d: "Envíos directos entre países, reduciendo tiempos de tránsito y evitando procesos intermedios.", color: "#00a6ff" },
    { k: "importacion", t: "Operaciones Especiales", d: "Exportaciones temporales, reembarques, mercancías peligrosas, calibraciones y reparaciones.", color: "#0c2340" },
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
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#1d1d1b" }}>Servicios Logísticos</h2>
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
            <div style={{
              display: "flex", gap: gap,
              transform: `translateX(calc(${-pos} * (100% + ${gap}px) / ${visible}))`,
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              {data.map((s, i) => (
                <div key={i} style={{ width: `calc((100% - ${gap * (visible - 1)}px) / ${visible})`, flexShrink: 0 }}>
                  <SvcCard icon={svcIcons[s.k].icon} title={s.t} desc={s.d} color={s.color} hoverAnim={svcIcons[s.k].hoverAnim} />
                </div>
              ))}
            </div>
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
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
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

function VideoCard() {
  const [hov, setHov] = useState(false);
  const ww = useWW();
  return (
    <div
      style={{ position: "relative", borderRadius: 20, overflow: "hidden", height: ww < 768 ? 260 : 380 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Animated border trace SVG */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3, pointerEvents: "none", overflow: "visible" }}>
        <rect
          x="1" y="1" rx="20" ry="20"
          width="99.5%" height="99.5%"
          fill="none"
          stroke="url(#borderGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className={hov ? "border-trace-active" : "border-trace-idle"}
        />
        <defs>
          <linearGradient id="borderGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="380">
            <stop offset="0%" stopColor="#00a6ff" stopOpacity="0.5" />
            <stop offset="25%" stopColor="#1b6fea" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#00a6ff" />
            <stop offset="75%" stopColor="#1b6fea" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00a6ff" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
      {/* Card background */}
      <div style={{
        width: "100%", height: "100%",
        background: hov ? "rgba(27,111,234,0.07)" : "rgba(27,111,234,0.03)",
        border: "1px solid " + (hov ? "transparent" : "rgba(27,111,234,0.08)"),
        borderRadius: 20,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        boxShadow: hov
          ? "0 16px 40px rgba(27,111,234,0.12), inset 0 1px 0 rgba(27,111,234,0.06)"
          : "0 4px 20px rgba(27,111,234,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
        transform: hov ? "scale(1.01)" : "scale(1)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Play button */}
        <div style={{
          width: 72, height: 72, borderRadius: 36,
          background: hov ? "linear-gradient(135deg, #1b6fea, #00a6ff)" : "rgba(27,111,234,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: hov ? "0 8px 30px rgba(27,111,234,0.3)" : "none",
          transform: hov ? "scale(1.1)" : "scale(1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          cursor: "pointer", marginBottom: 18,
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill={hov ? "white" : "#1b6fea"} style={{ marginLeft: 3 }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p style={{
          fontFamily: "'Fira Sans',sans-serif", fontSize: 15, fontWeight: 600,
          color: hov ? "#1b6fea" : "#9ca3af",
          transition: "color 0.3s",
        }}>Video institucional</p>
      </div>
    </div>
  );
}

function About() {
  const stats = [
    { v: "220+", numEnd: 220, numSuffix: "+", l: "Países de cobertura global", icon: statIcons.globe.icon, hoverAnim: statIcons.globe.hoverAnim, color: "#1b6fea" },
    { v: "5,000+", numEnd: 5000, numSuffix: "+", l: "Envíos gestionados exitosamente", icon: statIcons.box.icon, hoverAnim: statIcons.box.hoverAnim, color: "#00a6ff" },
    { v: "98%", numEnd: 98, numSuffix: "%", l: "Satisfacción del cliente", icon: statIcons.star.icon, hoverAnim: statIcons.star.hoverAnim, color: "#1b6fea" },
    { v: "3-5 días", numEnd: null, numSuffix: "", l: "Tiempo promedio entrega aérea", icon: statIcons.bolt.icon, hoverAnim: statIcons.bolt.hoverAnim, color: "#00a6ff" },
  ];
  return (
    <section id="nosotros" style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Top: text left + image right */}
        <div className="grid lg:grid-cols-2 gap-12" style={{ alignItems: "center", marginBottom: 56 }}>
          <R dir="left"><div>
            <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#1d1d1b", marginBottom: 8 }}>Sobre Nosotros</h2>
            <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
              <span style={{ width: 44, height: 3, background: "#1b6fea", borderRadius: 4, display: "inline-block" }} />
              <span style={{ width: 18, height: 3, background: "#00a6ff", borderRadius: 4, display: "inline-block" }} />
            </div>
            <div style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#4b5563", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>En <strong style={{ color: "#1d1d1b" }}>ATLAS LOGISTIC</strong> somos especialistas en logística internacional aérea, brindando soluciones integrales en importaciones y exportaciones, garantizando rapidez, seguridad y confiabilidad en cada operación.</p>
              <p style={{ marginBottom: 16 }}>Gestionamos cada envío con altos estándares de precisión y control, respaldados por un equipo comprometido en ofrecer un servicio personalizado en todas las etapas del proceso logístico.</p>
              <p>Más que transportar mercancías, facilitamos el comercio internacional y generamos oportunidades que impulsan el crecimiento de nuestros clientes a nivel global.</p>
            </div>
            <AnimBtn href={WA} external bg="linear-gradient(135deg, #1b6fea, #00a6ff)" hoverBg="linear-gradient(135deg, #00a6ff, #1b6fea)" shadow="0 6px 20px rgba(27,111,234,0.25)" hoverShadow="0 12px 28px rgba(0,166,255,0.35)" style={{ marginTop: 28, padding: "12px 24px" }}>Conoce a nuestro equipo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg></AnimBtn>
          </div></R>
          <R dir="right" delay={200}>
            <VideoCard />
          </R>
        </div>
        {/* Stats row - 4 columns */}
        <R delay={300}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <StatCard key={i} icon={s.icon} value={s.v} numEnd={s.numEnd} numSuffix={s.numSuffix} label={s.l} color={s.color} hoverAnim={s.hoverAnim} />
            ))}
          </div>
        </R>
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
    { t: "Experiencia", d: "Amplia experiencia en logística internacional, gestionando envíos de forma segura, eficiente y sin contratiempos.", color: "#1b6fea", hoverAnim: "whyusPulse",
      icon: <><path d="M16 28s10-5 10-13V7l-10-4L6 7v8c0 8 10 13 10 13z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="ai-s1" style={{ strokeDasharray: 120, strokeDashoffset: 120 }} /><path d="M11 16l3 3 6-6" stroke="#00a6ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="ai-s2" style={{ strokeDasharray: 20, strokeDashoffset: 20 }} /></>
    },
    { t: "Red Global", d: "Aliados estratégicos en más de 220 países, garantizando cobertura global y soluciones confiables.", color: "#00a6ff", hoverAnim: "whyusSpin",
      icon: <><circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.3" className="ai-s1" style={{ strokeDasharray: 76, strokeDashoffset: 76 }} /><ellipse cx="16" cy="16" rx="6" ry="12" stroke="currentColor" strokeWidth="1" className="ai-s2" style={{ strokeDasharray: 60, strokeDashoffset: 60 }} /><line x1="4" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="0.8" className="ai-s3" style={{ strokeDasharray: 24, strokeDashoffset: 24 }} /><line x1="4" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="0.8" className="ai-s3" style={{ strokeDasharray: 24, strokeDashoffset: 24 }} /></>
    },
    { t: "Atención Personalizada", d: "Acompañamiento en todo el proceso con soluciones adaptadas a las necesidades de tu negocio.", color: "#1b6fea", hoverAnim: "whyusBounce",
      icon: <><path d="M26 27v-2.5a5 5 0 00-5-5H11a5 5 0 00-5 5V27" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="ai-s1" style={{ strokeDasharray: 50, strokeDashoffset: 50 }} /><circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth="1.3" className="ai-s2" style={{ strokeDasharray: 32, strokeDashoffset: 32 }} /><path d="M21 5.16a5 5 0 010 9.68" stroke="#00a6ff" strokeWidth="1.3" strokeLinecap="round" className="ai-s3" style={{ strokeDasharray: 16, strokeDashoffset: 16 }} /></>
    },
    { t: "Innovación", d: "Tecnología avanzada para el seguimiento y gestión de envíos, brindando transparencia y control total.", color: "#00a6ff", hoverAnim: "whyusGlow",
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
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#ffffff" }}>¿Por qué elegirnos?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <span style={{ width: 28, height: 2, background: "rgba(0,166,255,0.3)", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 48, height: 2, background: "#00a6ff", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 28, height: 2, background: "rgba(0,166,255,0.3)", borderRadius: 4, display: "inline-block" }} />
          </div>
        </div></R>
        <Stg className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" ms={120}>
          {items.map((a, i) => (
            <WhyUsCard key={i} icon={a.icon} title={a.t} desc={a.d} color={a.color} hoverAnim={a.hoverAnim} />
          ))}
        </Stg>
      </div>
    </section>
  );
}

function Process() {
  const [active, setActive] = useState(0);
  const [hovCard, setHovCard] = useState(false);
  const ww = useWW();
  const isMobile = ww < 768;
  const steps = [
    { n: 1, t: "Cotiza con nuestro equipo", d: "¿Necesitas mover tu carga? ¡Estamos aquí para ayudarte! Habla con nuestro equipo, recibe asesoría personalizada y cotiza fácil y rápido por WhatsApp o llamada.", img: IMAGES.process.cotiza, icon: <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /><path d="M8 10h8M8 14h4" stroke="#00a6ff" strokeWidth="1.5" /></svg> },
    { n: 2, t: "Infórmanos tus datos de recolección", d: "Compártenos la información de recolección y nuestro equipo se encargará de coordinar toda la logística de forma rápida, segura y eficiente. ¡Nosotros nos ocupamos del resto!", img: IMAGES.process.datos, icon: <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h2v2H8z" fill="#00a6ff" stroke="#00a6ff" /></svg> },
    { n: 3, t: "Paga tu envío de manera ágil", d: "Te ofrecemos varios métodos de pago para tu comodidad: transferencia bancaria, tarjeta de crédito o billeteras virtuales. ¡Rápido, seguro y sin complicaciones!", img: IMAGES.process.paga, icon: <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /><path d="M6 16h4" stroke="#00a6ff" strokeWidth="1.5" /></svg> },
    { n: 4, t: "Recibe seguimiento en tiempo real", d: "Te mantenemos informado en todo momento. Recibe actualizaciones de tu envío, desde la recolección hasta la entrega, directamente en tu correo o WhatsApp.", img: IMAGES.process.seguimiento, icon: <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" stroke="#00a6ff" strokeWidth="1.8" /></svg> },
  ];
  return (
    <section style={{ padding: "80px 0", background: "#fff" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <R><div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#1d1d1b" }}>Nuestro Proceso</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 48, height: 2, background: "#1b6fea", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
          </div>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#6b7280", marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>Un proceso optimizado para garantizar tu satisfacción en cada etapa del envío.</p>
        </div></R>
        {/* Timeline nodes */}
        <R delay={200}>
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: isMobile ? 28 : 48, padding: isMobile ? "0 12px" : "0 40px" }}>
            {/* Background line */}
            <div style={{ position: "absolute", top: "50%", left: isMobile ? "calc(12px + 20px)" : "calc(40px + 30px)", right: isMobile ? "calc(12px + 20px)" : "calc(40px + 30px)", height: 3, background: "rgba(27,111,234,0.08)", borderRadius: 4, transform: "translateY(-50%)" }} />
            {/* Progress line */}
            <div style={{ position: "absolute", top: "50%", left: isMobile ? "calc(12px + 20px)" : "calc(40px + 30px)", height: 3, borderRadius: 4, background: "linear-gradient(90deg, #00a6ff, #1b6fea)", transform: "translateY(-50%)", width: active === 0 ? "0%" : `calc(${(active / (steps.length - 1)) * 100}% * (1 - 120px / 100%))`, maxWidth: "calc(100% - 140px)", transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }} />
            {steps.map((s, i) => (
              <div key={i} onMouseEnter={() => !isMobile && setActive(i)} onClick={() => setActive(i)} style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
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
        </R>
        {/* Active step content card */}
        <R delay={300}>
          <div
            style={{
              background: hovCard ? "rgba(27,111,234,0.07)" : "rgba(27,111,234,0.03)",
              borderRadius: 16,
              border: "1px solid " + (hovCard ? "rgba(27,111,234,0.18)" : "rgba(27,111,234,0.08)"),
              padding: isMobile ? "28px 20px" : "44px 40px", position: "relative", overflow: "hidden",
              minHeight: isMobile ? "auto" : 360,
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
                <img src={s.img} alt={s.t} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
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
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3.5vw, 2.2rem)", color: "#1d1d1b" }}>¿Listo para enviar tu mercancía?</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 48, height: 2, background: "#1b6fea", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 28, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
          </div>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#6b7280", marginTop: 16, maxWidth: 520, margin: "16px auto 0" }}>Calcula el peso volumétrico de tu envío y cotiza en minutos.</p>
        </div></R>
        <div className="grid lg:grid-cols-2 gap-10" style={{ alignItems: "center" }}>
          {/* Calculator card */}
          <R dir="left">
            <div
              style={{
                background: calcHov ? "rgba(27,111,234,0.07)" : "rgba(27,111,234,0.03)",
                borderRadius: 16, padding: "32px 28px",
                border: "1px solid " + (calcHov ? "rgba(27,111,234,0.18)" : "rgba(27,111,234,0.06)"),
                position: "relative", overflow: "hidden",
                boxShadow: calcHov
                  ? "0 16px 40px rgba(27,111,234,0.1), 0 0 30px rgba(27,111,234,0.05), inset 0 1px 0 rgba(27,111,234,0.06)"
                  : "0 4px 20px rgba(27,111,234,0.04), inset 0 1px 0 rgba(255,255,255,0.8)",
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
              }}>Calculadora de peso volumétrico</h3>
              <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "#6b7280", marginBottom: 20, lineHeight: 1.5 }}>Tu paquete se factura por el peso mayor entre el físico y el volumétrico.</p>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
                {[["largo", "Largo (cm)"], ["ancho", "Ancho (cm)"], ["alto", "Alto (cm)"]].map(([k, label]) => (
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
                <label style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Peso físico (kg) — opcional</label>
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
                <p style={{ fontFamily: "'Fira Sans',sans-serif", fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>Peso volumétrico</p>
                <span style={{
                  fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: vol !== null ? 36 : 24,
                  background: vol !== null ? "linear-gradient(135deg, #00a6ff, #1b6fea)" : "none",
                  WebkitBackgroundClip: vol !== null ? "text" : "unset", backgroundClip: vol !== null ? "text" : "unset",
                  color: vol !== null ? "transparent" : "#d1d5db", transition: "all 0.4s",
                }}>{vol !== null ? vol.toFixed(2) + " kg" : "— kg"}</span>
                {pesoFisico !== null && vol !== null && (
                  <div style={{ marginTop: 10, padding: "8px 14px", borderRadius: 8, background: "rgba(27,111,234,0.06)" }}>
                    <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Peso facturable (el mayor):</p>
                    <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: 22, color: "#1b6fea" }}>{pesoFacturable.toFixed(2)} kg</span>
                    <span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 11, color: "#9ca3af", marginLeft: 8 }}>({pesoFacturable === vol ? "volumétrico" : "físico"})</span>
                  </div>
                )}
              </div>
            </div>
          </R>
          {/* CTA side */}
          <R dir="right" delay={200}>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <h3 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 22, color: "#1d1d1b", marginBottom: 12 }}>¿Necesitas una cotización?</h3>
              <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#6b7280", maxWidth: 400, margin: "0 auto 28px", lineHeight: 1.7 }}>Nuestro equipo te asesora sin compromiso. Escríbenos por WhatsApp o llámanos directamente.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
                <AnimBtn href={WA} external bg="#25D366" hoverBg="#1ea855" shadow="0 6px 20px rgba(37,211,102,0.25)" hoverShadow="0 14px 32px rgba(37,211,102,0.35)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Cotizar por WhatsApp
                </AnimBtn>
              </div>
            </div>
          </R>
        </div>
      </div>
    </section>
  );
}

function PaymentMarquee() {
  const logos = [
    { n: "PayU", img: IMAGES.payments.payu },
    { n: "Visa", svg: true },
    { n: "Mastercard", img: IMAGES.payments.mastercard },
    { n: "PSE", img: IMAGES.payments.pse },
    { n: "Nequi", img: IMAGES.payments.nequi },
    { n: "Daviplata", img: IMAGES.payments.daviplata },
    { n: "Bancolombia", img: IMAGES.payments.bancolombia },
    { n: "American Express", img: IMAGES.payments.amex },
    { n: "Banco de Bogotá", img: IMAGES.payments.bancoBogota },
    { n: "Efecty", txt: true, c: "#FFD100" },
    { n: "Diners Club", txt: true, c: "#0079C1" },
    { n: "Davivienda", txt: true, c: "#ED1C24" },
    { n: "Gana", txt: true, c: "#E30613" },
  ];
  const doubled = [...logos, ...logos];
  return (
    <section style={{ padding: "40px 0", background: "#fff", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <R><div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 16, color: "#1d1d1b" }}>Medios de pago</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 10 }}>
            <span style={{ width: 20, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 36, height: 2, background: "#1b6fea", borderRadius: 4, display: "inline-block" }} />
            <span style={{ width: 20, height: 2, background: "rgba(27,111,234,0.3)", borderRadius: 4, display: "inline-block" }} />
          </div>
        </div></R>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, #fff, transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg, #fff, transparent)", zIndex: 2 }} />
        <div className="marquee-track">
          {doubled.map((l, i) => (
            <div key={i} className="marquee-item" style={{
              flexShrink: 0, padding: "10px 20px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                background: "rgba(27,111,234,0.03)", border: "1px solid rgba(27,111,234,0.06)",
                borderRadius: 10, padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.3s", minWidth: 130, height: 60,
              }}>
                {l.img ? (
                  <img src={l.img} alt={l.n} style={{ height: 32, maxWidth: 120, objectFit: "contain", filter: "grayscale(100%) opacity(0.6)", transition: "filter 0.3s" }} className="marquee-logo" />
                ) : l.svg ? (
                  <svg viewBox="0 0 1000 324" style={{ height: 26, filter: "grayscale(100%) opacity(0.6)", transition: "filter 0.3s" }} className="marquee-logo"><path d="M651.2 0.5L426.4 323.1h145.7l224.8-322.6z" fill="#1434CB"/><path d="M0 323.1h152.3L376.1 0.5H223.8z" fill="#1434CB"/><path d="M568.3 0.5L467.7 143.2l-49.2-73.5L325.8 0.5z" fill="#1434CB"/><path d="M325.8 323.1l92.7-139.2 49.2 73.5L568.3 323.1z" fill="#1434CB"/></svg>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: l.c, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 600, fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{l.n}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuccessTypeWriter() {
  const full = "¡Gracias por contactarte con Atlas!";
  const blueStart = full.indexOf("Atlas!");
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (displayed.length >= full.length) return;
    const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 70);
    return () => clearTimeout(t);
  }, [displayed]);
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
  const words = ["¿Listo para tu próximo envío internacional?", "¿Necesitas importar o exportar?", "¿Buscas un aliado logístico confiable?"];
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing");
  useEffect(() => {
    const word = words[wordIndex];
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
    <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#1d1d1b", lineHeight: 1.15, margin: 0, minHeight: "4.5em" }}>
      {displayed}<span style={{ animation: "blink 0.5s step-end infinite" }}>|</span>
    </h2>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ nombre: "", celular: "", correo: "", servicio: "", mensaje: "", datosCheck: false, novedadesCheck: false });
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
      servicio: form.servicio || "",
      mensaje: form.mensaje || "",
      newsletter: form.novedadesCheck ? "Sí" : "No",
    };
    try {
      await fetch("https://script.google.com/macros/s/AKfycbzBO8LNUloveix7d9vDkrw0DGYRIReHxEsLW0HVpF03Tae-dkyMkgcoRJOPdU-W-8Sp/exec", {
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
    if (el) { const top = el.getBoundingClientRect().top + window.scrollY - 100; window.scrollTo({ top, behavior: "smooth" }); }
  };

  const focusBorder = name => focused === name ? { borderBottomColor: "#1b6fea" } : {};
  const checkLabelStyle = { display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "#1d1d1b", lineHeight: 1.5, cursor: "pointer" };

  if (sent) return (
    <section id="contacto" style={{ background: "#ffffff", padding: "80px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0, alignItems: "start" }}>
        <div style={{ paddingRight: 56 }}>
          <SuccessTypeWriter />
        </div>
        <div style={{ background: "#e5e7eb", width: 1, alignSelf: "stretch" }} />
        <div style={{ paddingLeft: 56 }}>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#6b7280", lineHeight: 1.75, marginBottom: 20 }}>
            Tu mensaje ha sido enviado correctamente. Agradecemos tu interés en nuestros servicios. Muy pronto uno de nuestros asesores se comunicará contigo para brindarte la información que necesitas.
          </p>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#6b7280", lineHeight: 1.75, marginBottom: 24 }}>
            Mientras tanto, te invitamos a conocer todos nuestros servicios logísticos.
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => scrollTo("servicios")} style={{ background: "none", border: "none", padding: 0, color: "#1b6fea", fontSize: 15, fontWeight: 600, fontFamily: "'Fira Sans',sans-serif", cursor: "pointer" }}>Ver servicios</button>
            <span style={{ color: "#d1d5db" }}>|</span>
            <button onClick={() => scrollTo("inicio")} style={{ background: "none", border: "none", padding: 0, color: "#1b6fea", fontSize: 15, fontWeight: 600, fontFamily: "'Fira Sans',sans-serif", cursor: "pointer" }}>Volver al inicio</button>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section id="contacto" style={{ background: "#ffffff", padding: "80px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0, alignItems: "start" }}>
        {/* Columna izquierda */}
        <div style={{ paddingRight: 56 }}>
          <ContactTypeWriter />
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#6b7280", marginTop: 20, maxWidth: 380, lineHeight: 1.75 }}>Nos alegra que estés aquí. Cuéntanos tu necesidad y un asesor de Atlas Logistic te contactará muy pronto.</p>
        </div>
        {/* Línea divisora */}
        <div style={{ background: "#e5e7eb", width: 1, alignSelf: "stretch" }} />
        {/* Columna derecha - formulario */}
        <form onSubmit={handleSubmit} style={{ paddingLeft: 56, display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px", marginBottom: 8 }}>
            <input name="nombre" placeholder="Nombre completo" required value={form.nombre} onChange={handleChange}
              style={{ ...lineInput(), ...focusBorder("nombre") }}
              onFocus={() => setFocused("nombre")} onBlur={() => setFocused(null)} />
            <input name="celular" placeholder="Celular" required value={form.celular} onChange={handleChange}
              style={{ ...lineInput(), ...focusBorder("celular") }}
              onFocus={() => setFocused("celular")} onBlur={() => setFocused(null)} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px", marginBottom: 8 }}>
            <input name="correo" type="email" placeholder="Correo electrónico" required value={form.correo} onChange={handleChange}
              style={{ ...lineInput(), ...focusBorder("correo") }}
              onFocus={() => setFocused("correo")} onBlur={() => setFocused(null)} />
            <select name="servicio" required value={form.servicio} onChange={handleChange}
              style={{ ...lineInput(), color: form.servicio ? "#1d1d1b" : "#9ca3af", ...focusBorder("servicio") }}
              onFocus={() => setFocused("servicio")} onBlur={() => setFocused(null)}>
              <option value="" disabled>Servicio de interés</option>
              <option value="Importación por Courier">Importación por Courier</option>
              <option value="Exportación por Courier">Exportación por Courier</option>
              <option value="Envíos Terrestres a Venezuela">Envíos Terrestres a Venezuela</option>
              <option value="Casillero Internacional">Casillero Internacional</option>
              <option value="Triangulación de Envíos">Triangulación de Envíos</option>
              <option value="Operaciones Especiales">Operaciones Especiales</option>
            </select>
          </div>
          <textarea name="mensaje" placeholder="Mensaje" value={form.mensaje} onChange={handleChange}
            style={{ ...lineInput({ minHeight: 80, resize: "vertical" }), ...focusBorder("mensaje"), marginBottom: 20 }}
            onFocus={() => setFocused("mensaje")} onBlur={() => setFocused(null)} />
          <div style={{ marginBottom: 10 }}>
            <label style={checkLabelStyle}>
              <input type="checkbox" name="datosCheck" checked={form.datosCheck} onChange={handleChange} style={{ marginTop: 3, accentColor: "#1b6fea", flexShrink: 0 }} />
              <span>Acepto la <a href="/tratamiento-de-datos" style={{ color: "#1b6fea", textDecoration: "underline", cursor: "pointer" }}>política de tratamiento de datos</a></span>
            </label>
            {datosError && <p style={{ color: "#ef4444", fontSize: 12, marginTop: 4, marginLeft: 24 }}>* Debes aceptar la política de tratamiento de datos para continuar</p>}
          </div>
          <label style={checkLabelStyle}>
            <input type="checkbox" name="novedadesCheck" checked={form.novedadesCheck} onChange={handleChange} style={{ marginTop: 3, accentColor: "#1b6fea", flexShrink: 0 }} />
            <span>Acepto recibir información sobre servicios y novedades</span>
          </label>
          <div>
            <button type="submit" disabled={sending}
              onMouseEnter={() => setBtnHov(true)} onMouseLeave={() => setBtnHov(false)}
              style={{ marginTop: 24, padding: "14px 40px", borderRadius: 50, border: "none", cursor: sending ? "not-allowed" : "pointer", color: "#fff", fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 15, transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", background: sending ? "#9ca3af" : btnHov ? "linear-gradient(135deg, #00a6ff, #1b6fea)" : "#1b6fea", transform: btnHov && !sending ? "translateY(-2px)" : "translateY(0)", boxShadow: btnHov && !sending ? "0 8px 24px rgba(27,111,234,0.35)" : "none" }}>
              {sending ? "Enviando..." : "Enviar mensaje"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const soc = [
    { n: "Instagram", h: "https://www.instagram.com/atlaslogisticaglobal", img: "/images/insta sin fondo.png", size: 40 },
    { n: "TikTok", h: "https://www.tiktok.com/@atlas.logistic", img: "/images/tiktok (1).png", size: 36 },
    { n: "Facebook", h: "https://www.facebook.com/people/Atlas-Logistic/61584724776185/?rdid=vyjOiEPX9GyLlMXR&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ApsfDGCmG%2F", img: "/images/facebook.png", size: 29 },
    { n: "LinkedIn", h: "https://www.linkedin.com/company/atlas-logistic", img: "/images/linkdn.png", size: 34 },
  ];
  return (
    <footer style={{ background: "#0c2340", color: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Footer flight routes */}
      <svg className="footer-routes" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <radialGradient id="fng"><stop offset="0%" stopColor="rgba(0,166,255,0.13)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
          <radialGradient id="fwg"><stop offset="0%" stopColor="rgba(255,255,255,0.16)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
        </defs>
        {/* Nodes */}
        <circle cx="80" cy="320" r="3.5" fill="rgba(0,166,255,0.2)" /><circle cx="80" cy="320" r="8" stroke="rgba(0,166,255,0.07)" strokeWidth="1" fill="none" /><circle cx="80" cy="320" r="25" fill="url(#fng)" />
        <circle cx="350" cy="120" r="3" fill="rgba(255,255,255,0.16)" /><circle cx="350" cy="120" r="7" stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" />
        <circle cx="600" cy="60" r="3" fill="rgba(0,166,255,0.18)" /><circle cx="600" cy="60" r="7" stroke="rgba(0,166,255,0.06)" strokeWidth="1" fill="none" /><circle cx="600" cy="60" r="22" fill="url(#fng)" />
        <circle cx="900" cy="100" r="3.5" fill="rgba(255,255,255,0.11)" /><circle cx="900" cy="100" r="8" stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" />
        <circle cx="1150" cy="180" r="3" fill="rgba(0,166,255,0.16)" /><circle cx="1150" cy="180" r="7" stroke="rgba(0,166,255,0.05)" strokeWidth="1" fill="none" />
        <circle cx="1380" cy="80" r="3.5" fill="rgba(255,255,255,0.18)" /><circle cx="1380" cy="80" r="8" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" /><circle cx="1380" cy="80" r="25" fill="url(#fwg)" />
        <circle cx="200" cy="220" r="2.5" fill="rgba(255,255,255,0.14)" />
        <circle cx="480" cy="280" r="2.5" fill="rgba(0,166,255,0.13)" />
        <circle cx="750" cy="340" r="2.5" fill="rgba(255,255,255,0.12)" />
        <circle cx="1050" cy="300" r="2.5" fill="rgba(0,166,255,0.13)" />
        <circle cx="1300" cy="350" r="2.5" fill="rgba(255,255,255,0.12)" />
        {/* Routes */}
        <path d="M80 320 C150 250, 260 160, 350 120" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="7 5" className="ft-route route-main" />
        <path d="M80 320 C200 280, 350 200, 600 60" stroke="rgba(0,166,255,0.13)" strokeWidth="1.4" strokeDasharray="9 5" className="ft-route route-main" />
        <path d="M350 120 C420 80, 520 60, 600 60" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="6 4" className="ft-route route-mid" />
        <path d="M600 60 C700 70, 800 85, 900 100" stroke="rgba(0,166,255,0.13)" strokeWidth="1" strokeDasharray="7 5" className="ft-route route-main" />
        <path d="M600 60 C800 30, 1100 40, 1380 80" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="9 6" className="ft-route route-mid" />
        <path d="M900 100 C980 130, 1080 165, 1150 180" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="6 4" className="ft-route route-sub" />
        <path d="M900 100 C1050 80, 1200 75, 1380 80" stroke="rgba(0,166,255,0.07)" strokeWidth="0.9" strokeDasharray="7 5" className="ft-route route-mid" />
        <path d="M1150 180 C1230 140, 1300 100, 1380 80" stroke="rgba(0,166,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="ft-route route-sub" />
        <path d="M80 320 C160 300, 250 260, 200 220" stroke="rgba(0,166,255,0.06)" strokeWidth="0.7" strokeDasharray="4 3" className="ft-route route-sub" />
        <path d="M200 220 C280 180, 320 140, 350 120" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" strokeDasharray="4 3" className="ft-route route-sub" />
        <path d="M80 320 C200 340, 380 310, 480 280" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="ft-route route-mid" />
        <path d="M480 280 C580 260, 680 350, 750 340" stroke="rgba(0,166,255,0.05)" strokeWidth="0.6" strokeDasharray="4 3" className="ft-route route-sub" />
        <path d="M750 340 C850 330, 950 310, 1050 300" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" strokeDasharray="4 3" className="ft-route route-sub" />
        <path d="M1050 300 C1150 290, 1230 360, 1300 350" stroke="rgba(0,166,255,0.05)" strokeWidth="0.6" strokeDasharray="4 3" className="ft-route route-sub" />
        <path d="M1050 300 C1100 240, 1130 200, 1150 180" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" strokeDasharray="5 4" className="ft-route route-sub" />
      </svg>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px", position: "relative", zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12" style={{ alignItems: "stretch" }}>
          <R dir="left"><div>
            <Logo h={70} style={{ marginBottom: 20 }} />
            <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 16, color: "#ffffff", lineHeight: 1.75, maxWidth: 420, marginBottom: 28 }}>Operador Logístico Integral en Colombia. Especialistas en logística internacional aérea, importaciones y exportaciones por courier. ¡Desde donde estés, hasta donde lo necesites!</p>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, filter: "drop-shadow(0 0 8px rgba(0,166,255,0.3))" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "url(#gradFoot)" }}>
                    <defs><linearGradient id="gradFoot" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#00a6ff"/></linearGradient></defs>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div><span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#d1d5db" }}>+57 322 605 5431</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, filter: "drop-shadow(0 0 8px rgba(0,166,255,0.3))" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "url(#gradFoot2)" }}>
                    <defs><linearGradient id="gradFoot2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ffffff"/><stop offset="100%" stopColor="#00a6ff"/></linearGradient></defs>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div><span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 15, color: "#d1d5db" }}>Carrera 31b # 4A-11, Bogotá, Colombia — Barrio Veraguas</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {soc.map(s => <a key={s.n} href={s.h} target="_blank" rel="noopener noreferrer" aria-label={s.n} style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", transition: "opacity 0.3s", textDecoration: "none", opacity: 1 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.75"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              ><img src={s.img} alt={s.n} style={{ width: s.size, height: s.size, objectFit: "contain" }} /></a>)}
            </div>
          </div></R>
          <R dir="right" delay={200}><div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", height: "100%", minHeight: 420 }}>
            <iframe title="Ubicación" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.937!2d-74.094!3d4.601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzYnMDMuNiJOIDc0wrAwNSczNi4wIlc!5e0!3m2!1ses!2sco!4v1" width="100%" height="100%" style={{ border: 0, minHeight: 420, display: "block" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div></R>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 13, color: "#6b7280" }}>© {new Date().getFullYear()} Atlas Logistic SAS — Todos los derechos reservados.</p>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 13, color: "#4b5563" }}>Bogotá, Colombia</p>
        </div>
      </div>
    </footer>
  );
}

function WF() {
  const [s, setS] = useState(false);
  useEffect(() => { const t = setTimeout(() => setS(true), 1500); return () => clearTimeout(t); }, []);
  return <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50, background: "#25D366", padding: 14, borderRadius: 50, color: "#fff", boxShadow: "0 6px 20px rgba(37,211,102,0.35)", textDecoration: "none", transition: "all 0.5s", transform: s ? "translateY(0)" : "translateY(80px)", opacity: s ? 1 : 0 }}>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
  </a>;
}
export { Nav, Hero, Services, About, WhyUs, Process, CTA, PaymentMarquee, ContactForm, Footer, WF, VideoCard };
