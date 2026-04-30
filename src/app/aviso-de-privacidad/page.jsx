export default function AvisoPrivacidad() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f4f8",
      fontFamily: "'Roboto', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0c2340 0%, #1b4080 100%)",
        padding: "100px 24px 60px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontFamily: "'Fira Sans', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          color: "#ffffff",
          marginBottom: 12
        }}>
          Aviso de Privacidad
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
          ATLAS LOGISTIC SAS — 2025
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px" }}>

        {/* Intro */}
        <div style={{
          padding: "28px 32px",
          background: "rgba(27,111,234,0.04)",
          borderRadius: 16,
          border: "1px solid rgba(27,111,234,0.1)",
          marginBottom: 40
        }}>
          <p style={{ color: "#4b5563", fontSize: 16, lineHeight: 1.85 }}>
            En <strong style={{ color: "#0c2340" }}>ATLAS LOGISTIC SAS</strong>,
            valoramos y respetamos su privacidad. El presente Aviso de Privacidad
            describe cómo recopilamos, usamos y protegemos su información personal,
            en cumplimiento de la Ley 1581 de 2012 y el Decreto 1074 de 2015 de
            la República de Colombia.
          </p>
        </div>

        {[
          {
            icon: "🏢",
            title: "¿Quién es el responsable de sus datos?",
            content: `ATLAS LOGISTIC SAS
Dirección: Carrera 31b # 4A-11, Bogotá, Colombia — Barrio Veraguas
Teléfono: +57 322 605 5431`
          },
          {
            icon: "📋",
            title: "¿Qué datos recopilamos?",
            content: `A través de nuestro formulario de contacto recopilamos únicamente:
- Nombre completo
- Número de celular
- Correo electrónico
- Servicio de interés
- Mensaje o consulta`
          },
          {
            icon: "🎯",
            title: "¿Para qué usamos sus datos?",
            content: `Sus datos serán utilizados exclusivamente para:
- Responder su solicitud de cotización o consulta
- Brindarle información sobre nuestros servicios logísticos
- Gestionar la relación comercial
- Enviarle información relevante (solo si nos autorizó)

ATLAS LOGISTIC SAS NO vende, arrienda ni cede sus datos a terceros con fines comerciales.`
          },
          {
            icon: "🔒",
            title: "¿Cómo protegemos sus datos?",
            content: `Implementamos medidas técnicas y administrativas de seguridad para
proteger su información contra acceso no autorizado, pérdida o uso indebido.
Su información es tratada con absoluta confidencialidad por nuestro equipo.`
          },
          {
            icon: "⚖️",
            title: "¿Cuáles son sus derechos?",
            content: `Como titular de sus datos personales, usted tiene derecho a:
- Conocer, actualizar y rectificar sus datos
- Solicitar la supresión de sus datos
- Revocar la autorización otorgada
- Acceder gratuitamente a su información
- Presentar quejas ante la Superintendencia de Industria y Comercio (SIC)`
          },
          {
            icon: "📞",
            title: "¿Cómo ejercer sus derechos?",
            content: `Puede contactarnos directamente para ejercer sus derechos:
Teléfono: +57 322 605 5431
Dirección: Carrera 31b # 4A-11, Bogotá — Barrio Veraguas

Atenderemos su solicitud en máximo 10 días hábiles para consultas
y 15 días hábiles para reclamos.`
          }
        ].map((item, i) => (
          <div key={i} style={{
            marginBottom: 32,
            padding: "24px 28px",
            background: "#ffffff",
            borderRadius: 14,
            border: "1px solid rgba(27,111,234,0.08)",
            boxShadow: "0 2px 12px rgba(27,111,234,0.04)"
          }}>
            <h2 style={{
              fontFamily: "'Fira Sans', sans-serif",
              fontWeight: 700,
              fontSize: "1.05rem",
              color: "#0c2340",
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              gap: 10
            }}>
              {item.title}
            </h2>
            <p style={{
              color: "#4b5563",
              lineHeight: 1.85,
              fontSize: 15,
              whiteSpace: "pre-line"
            }}>
              {item.content}
            </p>
          </div>
        ))}

        {/* Links */}
        <div style={{
          marginTop: 40,
          padding: "20px 28px",
          background: "rgba(27,111,234,0.04)",
          borderRadius: 12,
          border: "1px solid rgba(27,111,234,0.1)",
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          alignItems: "center"
        }}>
          <span style={{ color: "#6b7280", fontSize: 14 }}>
            Para más información consulta nuestra:
          </span>
          <a href="/tratamiento-de-datos" style={{
            color: "#1b6fea", fontSize: 14, fontWeight: 600,
            textDecoration: "underline"
          }}>
            Política de Tratamiento de Datos Personales →
          </a>
        </div>

        <a href="/#contacto" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          marginTop: 40, color: "#1b6fea", fontSize: 14,
          fontWeight: 600, textDecoration: "none"
        }}>
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}
