'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { WF } from '@/components/Atlas';

const AccessibilityWidget = dynamic(
  () => import('@/components/Atlas').then(mod => ({ default: mod.AccessibilityWidget })),
  { ssr: false }
);

const WA = "https://wa.me/573226055431?text=Hola%2C%20quiero%20cotizar%20un%20env%C3%ADo";
const PH = "tel:+573226055431";

const getInitials = (nombre) => {
  const parts = nombre.split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return nombre.slice(0, 2).toUpperCase();
};

const equipo = [
  { nombre: "Hidally Soler", cargo: "Gerente Administrativa", especialidad: "Dirección administrativa, control financiero y gestión de procesos internos, asegurando la eficiencia operativa y el cumplimiento estratégico de la compañía.", experiencia: "12 años", img: "/images/team/DSC00358.JPG.jpeg", imgPos: "center 15%" },
  { nombre: "Brayan Delgado", cargo: "Coordinador de Operaciones", especialidad: "Gestión y coordinación de operaciones logísticas internacionales bajo modalidad courier, optimizando tiempos de tránsito, procesos aduaneros y trazabilidad de envíos.", experiencia: "4 años", img: "/images/team/Hombre1.png", imgPos: "center 20%" },
  { nombre: "Viviana Virviescas", cargo: "Directora Comercial Corporativa", especialidad: "Liderazgo estratégico del área comercial, desarrollo de clientes corporativos y estructuración de soluciones logísticas internacionales, con enfoque en importaciones y exportaciones por courier.", experiencia: "10 años", img: "/images/team/Mujer1.png", imgPos: "center 20%" },
  { nombre: "Ashlie Pulgarín", cargo: "Ejecutiva Comercial Senior", especialidad: "Desarrollo de clientes y asesoría en soluciones logísticas internacionales, especializada en exportación por courier, ofreciendo propuestas estratégicas adaptadas a cada operación.", experiencia: "2 años", img: "/images/team/Ashley.png", imgPos: "center 20%" },
];

/* ─── helpers ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Logo ─── */
function Logo({ h = 52, glow = false }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 50); return () => clearTimeout(t); }, []);
  return (
    <img
      src="/images/logo.svg"
      alt="Atlas Logistic"
      style={{
        height: h, width: "auto", objectFit: "contain",
        filter: "brightness(1.3) contrast(1.1) saturate(1.2)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-10px)",
        transition: "opacity 800ms ease, transform 800ms ease",
        animation: glow ? "logoGlow 3s ease-in-out infinite" : "none",
      }}
    />
  );
}

/* ─── Nav ─── */
function Nav() {
  const lnk = [
    { l: "Inicio", h: "/#inicio" },
    { l: "Servicios", h: "/#servicios" },
    { l: "Nosotros", h: "/#nosotros" },
    { l: "Contacto", h: "/#contacto" },
  ];
  const [mo, setMo] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(12,35,64,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.15)" : "none",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: scrolled ? 75 : 100,
        transition: "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <div style={{
            animation: scrolled ? "none" : "logoGlow 3s ease-in-out infinite",
            transform: scrolled ? "scale(1)" : "scale(1.05)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}>
            <Logo h={scrolled ? 72 : 96} />
          </div>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="hidden md:flex">
          {lnk.map(l => <NavLink key={l.h} href={l.h} label={l.l} />)}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMo(!mo)}
          className="md:hidden"
          style={{ padding: 8, background: "none", border: "none", cursor: "pointer" }}
          aria-label="Menú"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            {mo
              ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
          </svg>
        </button>
      </div>

      {mo && (
        <div style={{
          background: "rgba(12,35,64,0.97)", backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)", borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "12px 24px",
        }}>
          {lnk.map(l => (
            <a key={l.h} href={l.h} onClick={() => setMo(false)} style={{
              display: "block", padding: "12px 0",
              color: "rgba(255,255,255,0.8)", fontSize: 16, fontWeight: 500,
              fontFamily: "'Fira Sans',sans-serif", textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>{l.l}</a>
          ))}
          <div style={{ paddingTop: 16, paddingBottom: 8, display: "flex", gap: 10 }}>
            <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => setMo(false)} style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "12px 16px", borderRadius: 50, background: "#25D366",
              color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif", textDecoration: "none",
            }}>WhatsApp</a>
            <a href={PH} onClick={() => setMo(false)} style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              padding: "12px 16px", borderRadius: 50,
              background: "linear-gradient(135deg, #1b6fea, #00a6ff)",
              color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif", textDecoration: "none",
            }}>Llamar</a>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, label }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} style={{
      color: hov ? "#fff" : "rgba(255,255,255,0.7)",
      fontSize: 17, fontWeight: 500, fontFamily: "'Fira Sans',sans-serif",
      textDecoration: "none", transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative", paddingBottom: 8, display: "inline-block",
      textShadow: hov ? "0 0 12px rgba(0,166,255,0.4)" : "none",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {label}
      <span style={{
        position: "absolute", bottom: 0, left: "50%",
        width: hov ? "100%" : "0%", height: 2, borderRadius: 2,
        background: "linear-gradient(90deg, transparent, #00a6ff, #1b6fea, transparent)",
        transform: "translateX(-50%)",
        transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }} />
    </a>
  );
}

/* ─── AnimBtn ─── */
function AnimBtn({ href, children, bg, shadow, hoverShadow, external = false, style = {} }) {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: bg, color: "#fff", padding: "13px 28px", borderRadius: 50,
        fontSize: 15, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif",
        textDecoration: "none",
        boxShadow: hov ? (hoverShadow || "0 12px 32px rgba(0,0,0,0.2)") : (shadow || "0 6px 20px rgba(0,0,0,0.15)"),
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

/* ─── FloatingParticle ─── */
function FloatingParticle({ size, top, left, delay, duration, opacity }) {
  return (
    <div style={{
      position: "absolute", top, left,
      width: size, height: size, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(0,166,255,0.3) 0%, transparent 70%)",
      opacity,
      animation: `eqFloat ${duration}s ease-in-out ${delay}s infinite`,
      pointerEvents: "none",
    }} />
  );
}

/* ─── TeamCard ─── */
function TeamCard({ persona, visible, delay }) {
  const [hov, setHov] = useState(false);
  const initials = getInitials(persona.nombre);
  return (
    <div
      data-team-card
      style={{
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        height: 340,
        background: "linear-gradient(135deg, #0c2340 0%, #0a1e38 40%, #112e55 100%)",
        boxShadow: hov
          ? "0 20px 40px rgba(0,166,255,0.25), 0 0 0 1px rgba(0,166,255,0.2)"
          : "0 0 30px rgba(0,166,255,0.1), 0 4px 16px rgba(0,0,0,0.35)",
        transform: hov ? "translateY(-8px)" : "translateY(0)",
        transition: "box-shadow 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)",
        animation: visible ? `cardReveal 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both` : "none",
        opacity: visible ? undefined : 0,
        cursor: "default",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* SVG Background Routes */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 240 340" preserveAspectRatio="xMidYMid slice" fill="none"
      >
        <path d="M-20 280 C40 200, 80 150, 120 120 C160 90, 200 80, 260 60" stroke={hov ? "rgba(0,166,255,0.15)" : "rgba(0,166,255,0.08)"} strokeWidth="1" strokeDasharray="6 4" style={{ transition: "stroke 0.5s" }} />
        <path d="M-20 320 C60 260, 140 200, 260 160" stroke={hov ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"} strokeWidth="0.8" strokeDasharray="5 4" style={{ transition: "stroke 0.5s" }} />
        <path d="M0 80 C60 60, 160 50, 260 70" stroke={hov ? "rgba(0,166,255,0.12)" : "rgba(0,166,255,0.07)"} strokeWidth="1" strokeDasharray="8 5" style={{ transition: "stroke 0.5s" }} />
        <circle cx="120" cy="120" r="2.5" fill="rgba(0,166,255,0.22)" />
        <circle cx="120" cy="120" r="6" stroke="rgba(0,166,255,0.13)" strokeWidth="1" fill="none" />
        <circle cx="200" cy="72" r="2" fill="rgba(255,255,255,0.16)" />
        <circle cx="200" cy="72" r="5" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <circle cx="55" cy="276" r="2" fill="rgba(0,166,255,0.18)" />
        <circle cx="55" cy="276" r="5" stroke="rgba(0,166,255,0.1)" strokeWidth="1" fill="none" />
      </svg>

      {/* Main content — foto o avatar + name + cargo, shifts right on hover */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center",
        justifyContent: persona.img ? "flex-end" : "center",
        padding: persona.img ? "0 0 28px" : "24px 16px 32px",
        transform: hov ? "translateX(42%) scale(0.72)" : "translateX(0) scale(1)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 2,
      }}>
        {persona.img ? (
          <>
            <img
              src={persona.img}
              alt={persona.nombre}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: persona.imgPos || "center 20%",
              }}
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
              background: "linear-gradient(to top, #0a1e38 0%, rgba(10,30,56,0.85) 50%, transparent 100%)",
              zIndex: 1,
            }} />
            <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 16px" }}>
              <h3 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 20, color: "#ffffff", marginBottom: 4, lineHeight: 1.2 }}>{persona.nombre}</h3>
              <p style={{ color: "#00a6ff", fontSize: 14, fontFamily: "'Roboto',sans-serif", fontWeight: 500 }}>{persona.cargo}</p>
            </div>
          </>
        ) : (
          <>
            <div style={{
              width: 120, height: 120, borderRadius: "50%",
              background: "linear-gradient(135deg, #1b6fea, #00a6ff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 8px 30px rgba(27,111,234,0.4)",
              marginBottom: 20, flexShrink: 0,
            }}>
              <span style={{ color: "#fff", fontSize: 40, fontWeight: 800, fontFamily: "'Fira Sans',sans-serif", letterSpacing: "-1px" }}>{initials}</span>
            </div>
            <h3 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 20, color: "#ffffff", textAlign: "center", marginBottom: 6, lineHeight: 1.2 }}>{persona.nombre}</h3>
            <p style={{ color: "#00a6ff", fontSize: 14, fontFamily: "'Roboto',sans-serif", fontWeight: 500, textAlign: "center" }}>{persona.cargo}</p>
          </>
        )}
      </div>

      {/* Info panel — slides in from left on hover */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "24px 20px",
        transform: hov ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 3,
        background: "linear-gradient(135deg, rgba(10,28,54,0.97) 0%, rgba(8,24,48,0.93) 100%)",
      }}>
        <h3 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 17, color: "#ffffff", marginBottom: 3, lineHeight: 1.2 }}>{persona.nombre}</h3>
        <p style={{ color: "#00a6ff", fontSize: 13, fontFamily: "'Roboto',sans-serif", fontWeight: 500, marginBottom: 14 }}>{persona.cargo}</p>
        <div style={{ width: 40, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #1b6fea, #00a6ff)", marginBottom: 16 }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 15, color: "#9ca3af", flexShrink: 0, marginTop: 1 }}>☆</span>
          <div>
            <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Especialidad</p>
            <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 13, color: "#d1d5db", lineHeight: 1.55 }}>{persona.especialidad}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00a6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          <span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 13, color: "#00a6ff", fontWeight: 700 }}>{persona.experiencia} de experiencia</span>
        </div>
      </div>

      {/* Bottom gradient border */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg, #1b6fea, #00a6ff)",
        boxShadow: hov ? "0 0 14px rgba(0,166,255,0.7)" : "none",
        transition: "box-shadow 0.5s",
        zIndex: 5,
      }} />

      {/* Shimmer reveal flash */}
      {visible && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 20,
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
          transform: "translateX(-100%)",
          animation: `shimmerSlide 0.8s ease ${delay + 300}ms forwards`,
        }} />
      )}
    </div>
  );
}

/* ─── Hero ─── */
function Hero() {
  const [routePhase, setRoutePhase] = useState("flowing");
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const particles = [
    { size: 180, top: "10%", left: "5%", delay: 0, duration: 7, opacity: 0.5 },
    { size: 120, top: "60%", left: "88%", delay: 2, duration: 9, opacity: 0.4 },
    { size: 80, top: "80%", left: "15%", delay: 1, duration: 6, opacity: 0.35 },
    { size: 60, top: "25%", left: "75%", delay: 3, duration: 8, opacity: 0.3 },
  ];

  return (
    <section style={{
      position: "relative", minHeight: 320, maxHeight: 400,
      display: "flex", alignItems: "center", overflow: "hidden",
      background: "linear-gradient(135deg, #0c2340 0%, #0a1e38 40%, #112e55 100%)",
    }}>
      {/* Particles */}
      {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}

      {/* SVG routes */}
      <svg
        className={`routes-${routePhase}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" fill="none"
      >
        <defs>
          <radialGradient id="eqng1"><stop offset="0%" stopColor="rgba(0,166,255,0.16)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
          <radialGradient id="eqwg1"><stop offset="0%" stopColor="rgba(255,255,255,0.14)" /><stop offset="100%" stopColor="transparent" /></radialGradient>
        </defs>
        <circle cx="120" cy="420" r="4" fill="rgba(0,166,255,0.22)" className="nd nd1" /><circle cx="120" cy="420" r="9" stroke="rgba(0,166,255,0.13)" strokeWidth="1" fill="none" className="node-pulse nd nd1" /><circle cx="120" cy="420" r="30" fill="url(#eqng1)" className="nd nd1" />
        <circle cx="380" cy="180" r="3.5" fill="rgba(255,255,255,0.18)" className="nd nd2" /><circle cx="380" cy="180" r="8" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" className="node-pulse nd nd2" /><circle cx="380" cy="180" r="25" fill="url(#eqwg1)" className="nd nd2" />
        <circle cx="720" cy="80" r="3.5" fill="rgba(0,166,255,0.2)" className="nd nd3" /><circle cx="720" cy="80" r="8" stroke="rgba(0,166,255,0.07)" strokeWidth="1" fill="none" className="node-pulse nd nd3" /><circle cx="720" cy="80" r="25" fill="url(#eqng1)" className="nd nd3" />
        <circle cx="1280" cy="120" r="4" fill="rgba(255,255,255,0.18)" className="nd nd5" /><circle cx="1280" cy="120" r="9" stroke="rgba(255,255,255,0.16)" strokeWidth="1" fill="none" className="node-pulse nd nd5" /><circle cx="1280" cy="120" r="30" fill="url(#eqwg1)" className="nd nd5" />
        <circle cx="980" cy="200" r="3.5" fill="rgba(0,166,255,0.19)" className="nd nd4" /><circle cx="980" cy="200" r="8" stroke="rgba(0,166,255,0.06)" strokeWidth="1" fill="none" className="node-pulse nd nd4" /><circle cx="980" cy="200" r="25" fill="url(#eqng1)" className="nd nd4" />
        <circle cx="280" cy="500" r="3" fill="rgba(0,166,255,0.18)" className="nd nd1" /><circle cx="280" cy="500" r="7" stroke="rgba(0,166,255,0.06)" strokeWidth="1" fill="none" className="nd nd1" /><circle cx="280" cy="500" r="22" fill="url(#eqng1)" className="nd nd1" />
        <circle cx="850" cy="350" r="2.5" fill="rgba(255,255,255,0.12)" className="nd nd3" /><circle cx="850" cy="350" r="6" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" className="nd nd3" />
        <path d="M120 420 C180 300, 300 200, 380 180" stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" strokeDasharray="8 5" className="rt rt1 route-main" />
        <path d="M120 420 C300 280, 500 120, 720 80" stroke="rgba(0,166,255,0.09)" strokeWidth="1.5" strokeDasharray="10 6" className="rt rt1 route-main" />
        <path d="M380 180 C450 100, 580 60, 720 80" stroke="rgba(255,255,255,0.15)" strokeWidth="1.3" strokeDasharray="8 5" className="rt rt2 route-main" />
        <path d="M720 80 C800 100, 900 160, 980 200" stroke="rgba(0,166,255,0.09)" strokeWidth="1.4" strokeDasharray="8 5" className="rt rt3 route-main" />
        <path d="M720 80 C900 40, 1100 60, 1280 120" stroke="rgba(255,255,255,0.14)" strokeWidth="1.3" strokeDasharray="10 6" className="rt rt3 route-main" />
        <path d="M980 200 C1060 150, 1180 120, 1280 120" stroke="rgba(255,255,255,0.14)" strokeWidth="1" strokeDasharray="6 4" className="rt rt4 route-mid" />
        <path d="M280 500 C400 400, 560 200, 720 80" stroke="rgba(0,166,255,0.07)" strokeWidth="0.9" strokeDasharray="8 6" className="rt rt2 route-mid" />
        <path d="M280 500 C360 480, 430 460, 500 450" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="rt rt2 route-mid" />
        <path d="M850 350 C920 320, 980 250, 980 200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" strokeDasharray="5 4" className="rt rt3 route-sub" />
      </svg>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}>
          <h1 style={{
            fontFamily: "'Fira Sans',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
            color: "#ffffff",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}>
            Nuestro{" "}
            <span style={{
              background: "linear-gradient(135deg, #00a6ff, #1b6fea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Equipo
            </span>
          </h1>

          <p style={{
            fontFamily: "'Roboto',sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(255,255,255,0.7)",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            Profesionales apasionados por mover el mundo
          </p>
        </div>
      </div>

    </section>
  );
}

/* ─── GroupPhoto ─── */
function GroupPhoto() {
  const [sectionRef, visible] = useInView(0.1);
  const [phase, setPhase] = useState("hidden");

  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setPhase("drawing"), 300);
    const t2 = setTimeout(() => setPhase("flowing"), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visible]);

  const glows = [
    { w: 260, l: "4%",  t: "8%",  c: "rgba(0,166,255,0.07)",  d: 0,   dur: 7  },
    { w: 200, l: "84%", t: "52%", c: "rgba(27,111,234,0.07)", d: 2,   dur: 9  },
    { w: 170, l: "42%", t: "4%",  c: "rgba(0,166,255,0.05)",  d: 1,   dur: 8  },
    { w: 220, l: "66%", t: "68%", c: "rgba(27,111,234,0.06)", d: 3,   dur: 6  },
    { w: 140, l: "18%", t: "70%", c: "rgba(0,166,255,0.05)",  d: 1.5, dur: 10 },
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg, #0c2340 0%, #0a1e38 40%, #112e55 100%)",
      }}
    >
      {/* Ambient glow orbs */}
      {glows.map((g, i) => (
        <div key={i} style={{
          position: "absolute", left: g.l, top: g.t,
          width: g.w, height: g.w, borderRadius: "50%",
          background: `radial-gradient(circle, ${g.c} 0%, transparent 70%)`,
          animation: `eqFloat ${g.dur}s ease-in-out ${g.d}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Corner radial ambiance */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(circle at 10% 20%, rgba(0,166,255,0.07), transparent 50%), radial-gradient(circle at 90% 80%, rgba(27,111,234,0.07), transparent 50%)",
      }} />

      {/* Dense animated routes SVG — zIndex 1, behind photo */}
      <svg
        className={`routes-${phase}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}
        viewBox="0 0 1440 650" preserveAspectRatio="xMidYMid slice" fill="none"
      >
        <defs>
          <radialGradient id="gpBlue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,166,255,0.32)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="gpWhite" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* ── Nodes ── */}
        <circle cx="720" cy="80"  r="5"  fill="rgba(0,166,255,0.42)"  className="nd nd1" />
        <circle cx="720" cy="80"  r="14" fill="rgba(0,166,255,0.11)"  className="node-pulse nd nd1" />
        <circle cx="720" cy="80"  r="32" fill="url(#gpBlue)"          className="nd nd1" />

        <circle cx="720" cy="210" r="5"  fill="rgba(0,166,255,0.40)"  className="nd nd2" />
        <circle cx="720" cy="210" r="14" fill="rgba(0,166,255,0.10)"  className="node-pulse nd nd2" />
        <circle cx="720" cy="210" r="30" fill="url(#gpBlue)"          className="nd nd2" />

        <circle cx="0"    cy="200" r="4"  fill="rgba(0,166,255,0.36)"  className="nd nd1" />
        <circle cx="0"    cy="200" r="12" fill="rgba(0,166,255,0.09)"  className="node-pulse nd nd1" />

        <circle cx="1440" cy="220" r="4"  fill="rgba(0,166,255,0.36)"  className="nd nd3" />
        <circle cx="1440" cy="220" r="12" fill="rgba(0,166,255,0.09)"  className="node-pulse nd nd3" />

        <circle cx="0"    cy="400" r="4"  fill="rgba(255,255,255,0.26)" className="nd nd2" />
        <circle cx="0"    cy="400" r="12" fill="rgba(255,255,255,0.07)" className="node-pulse nd nd2" />

        <circle cx="1440" cy="100" r="4"  fill="rgba(0,166,255,0.36)"  className="nd nd4" />
        <circle cx="1440" cy="100" r="12" fill="rgba(0,166,255,0.09)"  className="node-pulse nd nd4" />

        <circle cx="0"    cy="580" r="3.5" fill="rgba(0,166,255,0.32)"  className="nd nd3" />
        <circle cx="0"    cy="580" r="10"  fill="rgba(0,166,255,0.08)"  className="node-pulse nd nd3" />

        <circle cx="1440" cy="380" r="4"  fill="rgba(0,166,255,0.36)"  className="nd nd5" />
        <circle cx="1440" cy="380" r="12" fill="rgba(0,166,255,0.09)"  className="node-pulse nd nd5" />

        <circle cx="0"    cy="100" r="3.5" fill="rgba(255,255,255,0.22)" className="nd nd4" />
        <circle cx="0"    cy="100" r="10"  fill="rgba(255,255,255,0.06)" className="node-pulse nd nd4" />

        <circle cx="1440" cy="500" r="3.5" fill="rgba(0,166,255,0.30)"  className="nd nd2" />
        <circle cx="1440" cy="500" r="10"  fill="rgba(0,166,255,0.08)"  className="node-pulse nd nd2" />

        <circle cx="380"  cy="138" r="3"  fill="rgba(0,166,255,0.32)"  className="nd nd1" />
        <circle cx="380"  cy="138" r="9"  fill="rgba(0,166,255,0.08)"  className="node-pulse nd nd1" />

        <circle cx="1060" cy="118" r="3"  fill="rgba(0,166,255,0.30)"  className="nd nd3" />
        <circle cx="1060" cy="118" r="9"  fill="rgba(0,166,255,0.08)"  className="node-pulse nd nd3" />

        <circle cx="280"  cy="478" r="3"  fill="rgba(255,255,255,0.20)" className="nd nd5" />
        <circle cx="280"  cy="478" r="9"  fill="rgba(255,255,255,0.06)" className="node-pulse nd nd5" />

        <circle cx="1100" cy="338" r="3"  fill="rgba(0,166,255,0.30)"  className="nd nd4" />
        <circle cx="1100" cy="338" r="9"  fill="rgba(0,166,255,0.08)"  className="node-pulse nd nd4" />

        <circle cx="855"  cy="148" r="3"  fill="rgba(0,166,255,0.28)"  className="nd nd2" />
        <circle cx="855"  cy="148" r="9"  fill="rgba(0,166,255,0.07)"  className="node-pulse nd nd2" />

        {/* ── Main routes (blue, más visibles que el footer) ── */}
        <path d="M0,200 C240,120 480,80 720,80"        stroke="rgba(0,166,255,0.24)" strokeWidth="1.5" strokeDasharray="8 6"  className="rt rt1 route-main" />
        <path d="M720,80 C960,80 1200,160 1440,220"    stroke="rgba(0,166,255,0.22)" strokeWidth="1.5" strokeDasharray="8 6"  className="rt rt2 route-main" />
        <path d="M0,400 C200,300 460,160 720,80"       stroke="rgba(0,166,255,0.21)" strokeWidth="1.4" strokeDasharray="8 6"  className="rt rt2 route-mid"  />
        <path d="M720,80 C900,60 1100,80 1440,100"     stroke="rgba(0,166,255,0.23)" strokeWidth="1.5" strokeDasharray="8 6"  className="rt rt3 route-main" />
        <path d="M0,580 C300,450 520,300 720,210"      stroke="rgba(0,166,255,0.20)" strokeWidth="1.4" strokeDasharray="8 6"  className="rt rt3 route-mid"  />
        <path d="M720,210 C900,155 1100,280 1440,380"  stroke="rgba(0,166,255,0.22)" strokeWidth="1.5" strokeDasharray="8 6"  className="rt rt4 route-main" />
        <path d="M0,100 C200,60 500,80 720,80"         stroke="rgba(0,166,255,0.18)" strokeWidth="1.3" strokeDasharray="9 7"  className="rt rt4 route-sub"  />
        <path d="M720,210 C1000,225 1200,355 1440,500" stroke="rgba(0,166,255,0.20)" strokeWidth="1.4" strokeDasharray="8 6"  className="rt rt5 route-mid"  />

        {/* ── Depth routes (white, profundidad) ── */}
        <path d="M100,650 C400,500 600,400 720,310"   stroke="rgba(255,255,255,0.09)" strokeWidth="1"   strokeDasharray="6 5" className="rt rt5 route-mid" />
        <path d="M720,310 C900,255 1100,405 1440,610" stroke="rgba(255,255,255,0.08)" strokeWidth="1"   strokeDasharray="6 5" className="rt rt5 route-sub" />
        <path d="M0,310 C150,210 355,155 505,185"     stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" strokeDasharray="5 4" className="rt rt4 route-sub" />
        <path d="M990,0 C1100,125 1255,205 1440,305"  stroke="rgba(255,255,255,0.08)" strokeWidth="0.9" strokeDasharray="5 4" className="rt rt5 route-sub" />

        {/* ── Moving planes (animateMotion) ── */}
        <circle r="3" fill="#00a6ff" style={{ filter: "drop-shadow(0 0 6px rgba(0,166,255,0.9))", opacity: visible ? 1 : 0, transition: "opacity 1s 1s ease" }}>
          <animateMotion dur="8s" repeatCount="indefinite" path="M0,200 C240,120 480,80 720,80" />
        </circle>
        <circle r="3" fill="rgba(255,255,255,0.88)" style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.7))", opacity: visible ? 1 : 0, transition: "opacity 1s 1.8s ease" }}>
          <animateMotion dur="11s" repeatCount="indefinite" path="M1440,220 C1200,160 960,80 720,80" />
        </circle>
        <circle r="2.5" fill="#00a6ff" style={{ filter: "drop-shadow(0 0 5px rgba(0,166,255,0.8))", opacity: visible ? 1 : 0, transition: "opacity 1s 2.5s ease" }}>
          <animateMotion dur="14s" repeatCount="indefinite" path="M0,580 C300,450 520,300 720,210" />
        </circle>
        <circle r="3" fill="#1b6fea" style={{ filter: "drop-shadow(0 0 7px rgba(27,111,234,0.95))", opacity: visible ? 1 : 0, transition: "opacity 1s 3.2s ease" }}>
          <animateMotion dur="9.5s" repeatCount="indefinite" path="M720,210 C900,155 1100,280 1440,380" />
        </circle>
      </svg>

      {/* Group photo — zIndex 2, above routes, colores originales */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", minHeight: 650, height: "70vh" }}>
        <img
          src="/images/team/Grupal.png"
          alt="Equipo Atlas Logistic"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "contain", objectPosition: "center center",
            display: "block",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s 0.4s ease",
          }}
        />
        {/* Soft left / right edge fades — solo en los márgenes */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(12,35,64,0.75) 0%, transparent 10%, transparent 90%, rgba(12,35,64,0.75) 100%)",
        }} />
        {/* Soft top / bottom edge fades */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(12,35,64,0.65) 0%, transparent 12%, transparent 88%, rgba(12,35,64,0.65) 100%)",
        }} />
      </div>
    </section>
  );
}

/* ─── StatsStrip ─── */
function StatsStrip() {
  const [ref, visible] = useInView(0.3);
  const stats = [
    { prefix: "", end: 8,   suffix: "",  label: "Profesionales" },
    { prefix: "+", end: 28,  suffix: "",  label: "Años de experiencia combinada" },
    { prefix: "", end: 5,   suffix: "",  label: "Áreas especializadas" },
  ];
  return (
    <section style={{ background: "#f9fafb" }}>
      <div
        ref={ref}
        className="stats-strip-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "40px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(15px)",
          transition: "opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className={i > 0 ? "strip-item" : undefined}
            style={{ textAlign: "center", padding: "0 16px" }}
          >
            <div style={{
              fontFamily: "'Fira Sans',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              lineHeight: 1,
            }}>
              <span style={{
                background: "linear-gradient(135deg, #00a6ff, #1b6fea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {s.prefix}<AnimCounter end={s.end} duration={1200} />{s.suffix}
              </span>
            </div>
            <p style={{
              fontFamily: "'Roboto',sans-serif",
              fontSize: 14,
              color: "#6b7280",
              marginTop: 6,
              lineHeight: 1.3,
            }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── AnimCounter (local) ─── */
function AnimCounter({ end, duration = 1200, prefix = "" }) {
  const [count, setCount] = useState(0);
  const elRef = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = elRef.current;
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
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={elRef}>{prefix}{count}</span>;
}

/* ─── StatsBanner ─── */
function StatsBanner() {
  const [ref, visible] = useInView(0.5);
  const stats = [
    { prefix: "", end: 8, duration: 800, label: "profesionales" },
    { prefix: "+", end: 28, duration: 1200, label: "años de experiencia combinada" },
    { prefix: "", end: 5, duration: 600, label: "áreas especializadas" },
  ];
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        marginBottom: 32,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="stats-banner"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          flexWrap: "wrap",
          background: "rgba(27,111,234,0.04)",
          border: "1px solid rgba(27,111,234,0.1)",
          borderRadius: 50,
          padding: "14px 36px",
        }}
      >
        {stats.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span className="stats-num" style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 28, color: "#1b6fea", lineHeight: 1 }}>
                <AnimCounter end={s.end} duration={s.duration} prefix={s.prefix} />
              </span>
              <span style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "#6b7280" }}>{s.label}</span>
            </div>
            {i < stats.length - 1 && (
              <span className="stats-sep" style={{ color: "#d1d5db", fontSize: 18, lineHeight: 1, userSelect: "none" }}>·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


/* ─── TeamGrid ─── */
function TeamGrid() {
  const [ref, visible] = useInView(0.05);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section style={{ background: "#0a1628", padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Section title */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#ffffff", marginBottom: 14 }}>
            Conoce a nuestros líderes de área
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "center" }}>
            <div style={{ height: 3, width: 32, background: "#1b6fea", borderRadius: 2 }} />
            <div style={{ height: 3, width: 8, background: "#00a6ff", borderRadius: 2 }} />
            <div style={{ height: 3, width: 3, background: "rgba(0,166,255,0.4)", borderRadius: 2 }} />
          </div>
        </div>

        <div ref={ref} className="team-grid">
          {equipo.map((persona, i) => (
            <TeamCard
              key={i}
              persona={persona}
              visible={visible}
              delay={i * (isMobile ? 100 : 150)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  const [ref, visible] = useInView();
  return (
    <section style={{
      background: "linear-gradient(135deg, #0c2340, #1b4080)",
      padding: "80px 0",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <h2 style={{
            fontFamily: "'Fira Sans',sans-serif", fontWeight: 800,
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#ffffff", marginBottom: 16,
          }}>
            ¿Quieres hacer parte de nuestro equipo?
          </h2>
          <p style={{
            fontFamily: "'Roboto',sans-serif", color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)", lineHeight: 1.7, marginBottom: 36,
          }}>
            Buscamos profesionales apasionados por la logística internacional
          </p>
          <AnimBtn
            href="/#contacto"
            bg="linear-gradient(135deg, #1b6fea, #00a6ff)"
            shadow="0 8px 24px rgba(27,111,234,0.4)"
            hoverShadow="0 14px 32px rgba(0,166,255,0.5)"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            Contáctanos
          </AnimBtn>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function EquipoPage() {
  return (
    <>
      <div style={{ fontFamily: "'Roboto',sans-serif", overflowX: "hidden" }}>
        <Nav />
        <Hero />
        <GroupPhoto />
        <StatsStrip />
        <TeamGrid />
        <CTA />
      </div>
      <WF />
      <AccessibilityWidget />
    </>
  );
}
