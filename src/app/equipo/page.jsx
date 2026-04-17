'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { WF } from '@/components/Atlas';

const AccessibilityWidget = dynamic(
  () => import('@/components/Atlas').then(mod => ({ default: mod.AccessibilityWidget })),
  { ssr: false }
);

const WA = "https://wa.me/573226055431?text=Hola%2C%20quiero%20cotizar%20un%20env%C3%ADo";
const PH = "tel:+573226055431";

const getInitials = (nombre) =>
  nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

const equipo = [
  { nombre: "Alejandro Martínez", cargo: "CEO & Fundador", especialidad: "Estrategia logística internacional y desarrollo de negocios globales", experiencia: "12 años", pais: "Colombia", img: "/images/team/Test.png" },
  { nombre: "Valentina Rodríguez", cargo: "Directora de Operaciones", especialidad: "Gestión de operaciones aduaneras y optimización de procesos", experiencia: "9 años", pais: "Colombia" },
  { nombre: "Carlos Herrera", cargo: "Jefe de Importaciones", especialidad: "Trámites aduaneros y liberación de mercancías internacionales", experiencia: "8 años", pais: "Colombia" },
  { nombre: "María José López", cargo: "Jefa de Exportaciones", especialidad: "Exportaciones por courier y coordinación con operadores globales", experiencia: "7 años", pais: "Colombia" },
  { nombre: "Sebastián Torres", cargo: "Especialista en Courier", especialidad: "Gestión de envíos express y seguimiento en tiempo real", experiencia: "6 años", pais: "Colombia" },
  { nombre: "Daniela Gómez", cargo: "Asesora Comercial Senior", especialidad: "Atención al cliente corporativo y cotizaciones internacionales", experiencia: "5 años", pais: "Colombia" },
  { nombre: "Andrés Vargas", cargo: "Especialista Terrestre Venezuela", especialidad: "Logística terrestre y transporte de mercancías a Venezuela", experiencia: "6 años", pais: "Colombia" },
  { nombre: "Camila Ospina", cargo: "Coordinadora de Casilleros", especialidad: "Gestión de casilleros internacionales en EE.UU., España y China", experiencia: "4 años", pais: "Colombia" },
  { nombre: "Felipe Moreno", cargo: "Analista Aduanero", especialidad: "Cumplimiento normativo y agenciamiento aduanero", experiencia: "5 años", pais: "Colombia" },
  { nombre: "Laura Jiménez", cargo: "Asesora de Servicio al Cliente", especialidad: "Soporte integral y seguimiento de envíos para clientes", experiencia: "3 años", pais: "Colombia" },
  { nombre: "Miguel Ángel Castro", cargo: "Coordinador de Operaciones Especiales", especialidad: "Manejo de mercancías peligrosas y operaciones de alto valor", experiencia: "7 años", pais: "Colombia" },
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
function TeamCard({ persona, visible, delay, index, onHover, onLeave }) {
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
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: visible ? `springUp 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both` : "none",
        opacity: visible ? undefined : 0,
        cursor: "default",
      }}
      onMouseEnter={() => { setHov(true); onHover && onHover(index); }}
      onMouseLeave={() => { setHov(false); onLeave && onLeave(); }}
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
                objectFit: "cover", objectPosition: "top center",
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
  const [ref, visible] = useInView();
  return (
    <section style={{ position: "relative", background: "#ffffff", overflow: "hidden" }}>
      <div
        ref={ref}
        style={{
          position: "relative",
          width: "100%",
          minHeight: 480,
          height: "55vh",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.9s ease",
        }}
      >
        <img
          src="/images/team/Grupal.png"
          alt="Equipo Atlas Logistic"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center center",
            display: "block",
          }}
        />
        {/* Overlay superior */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "25%",
          background: "linear-gradient(to bottom, rgba(12,35,64,0.55) 0%, transparent 100%)",
          pointerEvents: "none", zIndex: 1,
        }} />
        {/* Overlay inferior sutil */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
          background: "linear-gradient(to bottom, rgba(12,35,64,0) 60%, rgba(12,35,64,0.6) 100%)",
          pointerEvents: "none",
        }} />
        {/* Overlay lateral */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(12,35,64,0.28), transparent 55%)",
          pointerEvents: "none",
        }} />
        {/* Ola SVG — transición a StatsStrip (#f9fafb) */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4 }}>
          <svg viewBox="0 0 1440 50" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
            <path d="M0 50V25C360 0 1080 0 1440 25V50H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ─── StatsStrip ─── */
function StatsStrip() {
  const [ref, visible] = useInView(0.3);
  const stats = [
    { prefix: "", end: 8,   suffix: "",  label: "Profesionales" },
    { prefix: "+", end: 56,  suffix: "",  label: "Años de experiencia combinada" },
    { prefix: "", end: 220, suffix: "+", label: "Países con cobertura" },
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
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
              background: "linear-gradient(135deg, #00a6ff, #1b6fea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {s.prefix}<AnimCounter end={s.end} duration={1200} />{s.suffix}
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
    { prefix: "+", end: 56, duration: 1200, label: "años de experiencia combinada" },
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

/* ─── ConnectionNetwork ─── */
function ConnectionNetwork({ gridRef, visible, hoveredIndex }) {
  const [lines, setLines] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [drawn, setDrawn] = useState(false);

  const computePositions = useCallback(() => {
    if (!gridRef.current) return;
    const gridRect = gridRef.current.getBoundingClientRect();
    const cardEls = Array.from(gridRef.current.querySelectorAll('[data-team-card]'));
    if (cardEls.length === 0) return;

    const positions = cardEls.map(el => {
      const r = el.getBoundingClientRect();
      return { cx: r.left - gridRect.left + r.width / 2, cy: r.top - gridRect.top + r.height / 2 };
    });

    // Group into rows by cy proximity
    const rows = [];
    positions.forEach((pos, i) => {
      const row = rows.find(r => Math.abs(positions[r[0]].cy - pos.cy) < 60);
      if (row) row.push(i);
      else rows.push([i]);
    });
    rows.sort((a, b) => positions[a[0]].cy - positions[b[0]].cy);
    rows.forEach(row => row.sort((a, b) => positions[a].cx - positions[b].cx));

    // Connections: horizontal within rows + vertical between rows
    const conns = [];
    rows.forEach((row, ri) => {
      for (let i = 0; i < row.length - 1; i++) conns.push([row[i], row[i + 1]]);
      if (ri < rows.length - 1) {
        const next = rows[ri + 1];
        for (let i = 0; i < Math.min(row.length, next.length); i++) conns.push([row[i], next[i]]);
      }
    });

    const newLines = conns.map(([a, b]) => {
      const p1 = positions[a], p2 = positions[b];
      return { a, b, x1: p1.cx, y1: p1.cy, x2: p2.cx, y2: p2.cy, len: Math.sqrt((p2.cx - p1.cx) ** 2 + (p2.cy - p1.cy) ** 2) };
    });

    setDrawn(false);
    setNodes(positions);
    setLines(newLines);
  }, [gridRef]);

  // Trigger draw animation after lines are set (double RAF ensures initial state renders first)
  useEffect(() => {
    if (lines.length === 0) return;
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(() => setDrawn(true));
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, [lines]);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(computePositions, 150);
    let debounce;
    const onResize = () => { clearTimeout(debounce); debounce = setTimeout(computePositions, 200); };
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    if (gridRef.current) ro.observe(gridRef.current);
    return () => {
      clearTimeout(t);
      clearTimeout(debounce);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [visible, computePositions, gridRef]);

  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'visible' }}>
      {/* Lines */}
      {lines.map((l, i) => {
        const connected = hoveredIndex !== null && (l.a === hoveredIndex || l.b === hoveredIndex);
        const drawDelay = (i * 0.18).toFixed(2);
        const pulseDelay = (i * 0.18 + 1.6).toFixed(2);
        const pulseDur = (2.4 + (i % 4) * 0.6).toFixed(1);
        return (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="rgba(0,166,255,1)"
            strokeWidth={connected ? 1.5 : 1}
            strokeDasharray="6 4"
            strokeLinecap="round"
            style={{
              strokeOpacity: connected ? 0.5 : 0.18,
              strokeDashoffset: drawn ? 0 : l.len,
              transition: drawn
                ? `stroke-dashoffset 1.5s ease-in-out ${drawDelay}s, stroke-opacity 0.35s, stroke-width 0.35s`
                : 'none',
              animationName: drawn && !connected ? 'netLinePulse' : 'none',
              animationDuration: `${pulseDur}s`,
              animationDelay: `${pulseDelay}s`,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isActive = hoveredIndex === i || (hoveredIndex !== null && lines.some(l => (l.a === hoveredIndex || l.b === hoveredIndex) && (l.a === i || l.b === i)));
        const minLineIdx = lines.reduce((min, l, idx) => (l.a === i || l.b === i) ? Math.min(min, idx) : min, Infinity);
        const nodeDelay = ((minLineIdx === Infinity ? 0 : minLineIdx) * 0.18 + 1.6).toFixed(2);
        const scaleStyle = { transform: drawn ? 'scale(1)' : 'scale(0)', transition: `transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${nodeDelay}s, fill 0.35s` };
        return (
          <g key={i}>
            <circle cx={node.cx} cy={node.cy} r={8} fill={isActive ? "rgba(0,166,255,0.28)" : "rgba(0,166,255,0.07)"}
              style={{ ...scaleStyle, transformOrigin: `${node.cx}px ${node.cy}px` }} />
            <circle cx={node.cx} cy={node.cy} r={3.5} fill={isActive ? "rgba(0,166,255,0.75)" : "rgba(0,166,255,0.3)"}
              style={{ ...scaleStyle, transformOrigin: `${node.cx}px ${node.cy}px` }} />
          </g>
        );
      })}
    </svg>
  );
}

/* ─── TeamGrid ─── */
function TeamGrid() {
  const [ref, visible] = useInView(0.05);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const gridWrapperRef = useRef(null);

  return (
    <section style={{ background: "#0a1628", padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Section title */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#1b6fea", fontSize: 13, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            Quiénes somos
          </p>
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#ffffff", marginBottom: 14 }}>
            Las personas detrás de cada envío
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "center" }}>
            <div style={{ height: 3, width: 32, background: "#1b6fea", borderRadius: 2 }} />
            <div style={{ height: 3, width: 8, background: "#00a6ff", borderRadius: 2 }} />
            <div style={{ height: 3, width: 3, background: "rgba(0,166,255,0.4)", borderRadius: 2 }} />
          </div>
        </div>

        {/* Stats banner */}
        <StatsBanner />

        {/* Grid wrapper — SVG behind + cards in front */}
        <div ref={gridWrapperRef} style={{ position: "relative" }}>
          <ConnectionNetwork gridRef={gridWrapperRef} visible={visible} hoveredIndex={hoveredIndex} />
          <div ref={ref} className="team-grid" style={{ position: "relative", zIndex: 1 }}>
            {equipo.map((persona, i) => (
              <TeamCard
                key={i}
                persona={persona}
                visible={visible}
                delay={i * 80}
                index={i}
                onHover={setHoveredIndex}
                onLeave={() => setHoveredIndex(null)}
              />
            ))}
          </div>
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
        <TeamGrid />
        <CTA />
      </div>
      <WF />
      <AccessibilityWidget />
    </>
  );
}
