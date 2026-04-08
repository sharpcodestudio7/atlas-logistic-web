'use client';
import { useState, useEffect, useRef } from 'react';

const WA = "https://wa.me/573226055431?text=Hola%2C%20quiero%20cotizar%20un%20env%C3%ADo";
const PH = "tel:+573226055431";

const getInitials = (nombre) =>
  nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

const equipo = [
  { nombre: "Alejandro Martínez", cargo: "CEO & Fundador", especialidad: "Estrategia logística internacional y desarrollo de negocios globales", experiencia: "12 años", pais: "Colombia" },
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
function TeamCard({ persona, visible, delay }) {
  const [hov, setHov] = useState(false);
  const initials = getInitials(persona.nombre);
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${hov ? "rgba(27,111,234,0.2)" : "rgba(27,111,234,0.08)"}`,
        boxShadow: hov ? "0 20px 48px rgba(27,111,234,0.15)" : "0 2px 12px rgba(27,111,234,0.05)",
        padding: "28px 24px",
        display: "flex", flexDirection: "column", gap: 0,
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        animation: visible ? `springUp 0.7s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms both` : "none",
        opacity: visible ? undefined : 0,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {/* Avatar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: hov
            ? "linear-gradient(135deg, #00a6ff, #1b6fea)"
            : "linear-gradient(135deg, #1b6fea, #00a6ff)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: hov ? "0 8px 24px rgba(27,111,234,0.35)" : "0 4px 14px rgba(27,111,234,0.2)",
          transition: "all 0.4s ease",
        }}>
          <span style={{
            color: "#fff", fontSize: 32, fontWeight: 800,
            fontFamily: "'Fira Sans',sans-serif", letterSpacing: "-1px",
          }}>{initials}</span>
        </div>
      </div>

      {/* Name */}
      <h3 style={{
        fontFamily: "'Fira Sans',sans-serif",
        fontWeight: 700, fontSize: 17,
        textAlign: "center", marginBottom: 4,
        background: hov ? "linear-gradient(135deg, #00a6ff, #1b6fea)" : "none",
        WebkitBackgroundClip: hov ? "text" : "unset",
        WebkitTextFillColor: hov ? "transparent" : "#0c2340",
        color: hov ? "transparent" : "#0c2340",
        transition: "all 0.3s ease",
      }}>{persona.nombre}</h3>

      {/* Cargo */}
      <p style={{
        color: "#1b6fea", fontSize: 13, fontWeight: 600,
        fontFamily: "'Fira Sans',sans-serif",
        textAlign: "center", marginBottom: 16,
      }}>{persona.cargo}</p>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(27,111,234,0.1)", marginBottom: 14 }} />

      {/* Especialidad */}
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 4 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1b6fea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span style={{ color: "#374151", fontSize: 12, fontWeight: 600, fontFamily: "'Fira Sans',sans-serif" }}>Especialidad</span>
      </div>
      <p style={{
        color: "#6b7280", fontSize: 13.5, lineHeight: 1.6,
        marginBottom: 18, flex: 1,
      }}>{persona.especialidad}</p>

      {/* Experiencia */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "rgba(27,111,234,0.05)", borderRadius: 50,
        padding: "6px 12px", alignSelf: "flex-start",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1b6fea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
        <span style={{ fontSize: 12.5, color: "#1b6fea", fontWeight: 700, fontFamily: "'Fira Sans',sans-serif" }}>
          {persona.experiencia} de experiencia
        </span>
      </div>
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
      position: "relative", minHeight: "70vh",
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
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "140px 24px 80px", textAlign: "center" }}>
        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}>
          <h1 style={{
            fontFamily: "'Fira Sans',sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
            color: "#ffffff",
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            marginBottom: 20,
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

      {/* Wave */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
        <svg viewBox="0 0 1440 50" style={{ width: "100%", display: "block" }} preserveAspectRatio="none">
          <path d="M0 50V25C360 0 1080 0 1440 25V50H0Z" fill="#f0f4f8" />
        </svg>
      </div>
    </section>
  );
}

/* ─── GroupPhoto ─── */
function GroupPhoto() {
  const [ref, visible] = useInView();
  return (
    <section style={{ background: "#f0f4f8", padding: "60px 0 80px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
        <div
          ref={ref}
          style={{
            height: "clamp(220px, 30vw, 400px)",
            borderRadius: 20,
            background: "linear-gradient(135deg, rgba(27,111,234,0.08), rgba(0,166,255,0.06))",
            border: "2px dashed rgba(27,111,234,0.2)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 14,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(27,111,234,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <p style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 700, fontSize: 16, color: "rgba(27,111,234,0.6)", margin: 0 }}>
            Foto grupal del equipo — Próximamente
          </p>
          <p style={{ fontFamily: "'Roboto',sans-serif", fontSize: 14, color: "rgba(27,111,234,0.4)", margin: 0 }}>
            Aquí irá nuestra foto oficial de equipo
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── TeamGrid ─── */
function TeamGrid() {
  const [ref, visible] = useInView(0.05);
  return (
    <section style={{ background: "#ffffff", padding: "80px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Section title */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ color: "#1b6fea", fontSize: 13, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
            Quiénes somos
          </p>
          <h2 style={{ fontFamily: "'Fira Sans',sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: "#0c2340", marginBottom: 14 }}>
            Las personas detrás de cada envío
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, alignItems: "center" }}>
            <div style={{ height: 3, width: 32, background: "#1b6fea", borderRadius: 2 }} />
            <div style={{ height: 3, width: 8, background: "#00a6ff", borderRadius: 2 }} />
            <div style={{ height: 3, width: 3, background: "rgba(0,166,255,0.4)", borderRadius: 2 }} />
          </div>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {equipo.map((persona, i) => (
            <TeamCard key={i} persona={persona} visible={visible} delay={i * 80} />
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
      <style>{`
        @keyframes eqFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.04); }
        }
        @keyframes springUp {
          0% { opacity: 0; transform: translateY(60px) scale(0.95); }
          60% { transform: translateY(-8px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes logoGlow {
          0%   { filter: drop-shadow(0 0 6px rgba(0,166,255,0.4)) drop-shadow(0 0 14px rgba(0,166,255,0.2)) brightness(1.3) contrast(1.1) saturate(1.2); }
          50%  { filter: drop-shadow(0 0 10px rgba(27,111,234,0.5)) drop-shadow(0 0 20px rgba(27,111,234,0.25)) brightness(1.3) contrast(1.1) saturate(1.2); }
          100% { filter: drop-shadow(0 0 6px rgba(0,166,255,0.4)) drop-shadow(0 0 14px rgba(0,166,255,0.2)) brightness(1.3) contrast(1.1) saturate(1.2); }
        }
      `}</style>
      <div style={{ fontFamily: "'Roboto',sans-serif", overflowX: "hidden" }}>
        <Nav />
        <Hero />
        <GroupPhoto />
        <TeamGrid />
        <CTA />
      </div>
    </>
  );
}
