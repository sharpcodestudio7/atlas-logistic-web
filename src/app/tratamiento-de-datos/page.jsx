'use client';
import { useState } from 'react';

function BackBtn() {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <a
      href="/"
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: hov ? "rgba(27,111,234,0.18)" : "rgba(255,255,255,0.08)",
        color: hov ? "#fff" : "rgba(255,255,255,0.85)",
        padding: "10px 22px", borderRadius: 50,
        fontSize: 14, fontWeight: 700, fontFamily: "'Fira Sans',sans-serif",
        textDecoration: "none", border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        boxShadow: hov ? "0 8px 24px rgba(27,111,234,0.25)" : "0 2px 10px rgba(0,0,0,0.15)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: pressed ? "scale(0.96)" : hov ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Inicio
    </a>
  );
}

function PdfBtn() {
  const [hov, setHov] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={() => window.print()}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: hov
          ? "linear-gradient(135deg, #1558d6, #0096e8)"
          : "linear-gradient(135deg, #1b6fea, #00a6ff)",
        color: "#fff", border: "none", borderRadius: 50,
        padding: "10px 22px", fontSize: 14, fontWeight: 700,
        fontFamily: "'Fira Sans',sans-serif", cursor: "pointer",
        boxShadow: hov ? "0 10px 28px rgba(27,111,234,0.45)" : "0 4px 16px rgba(27,111,234,0.3)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: pressed ? "scale(0.96)" : hov ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Descargar PDF
    </button>
  );
}

export default function TratamientoDatos() {
  const sections = [
    {
      title: "Capítulo Primero - Disposiciones Generales",
      subsections: [
        {
          subtitle: "1.1 Identificación del Responsable del Tratamiento",
          content: `ATLAS LOGISTIC SAS, constituida y existente bajo las leyes
          de la República de Colombia, identificada con NIT 902035763-4,
          con domicilio en Carrera 31b # 4A-11, Bogotá, Colombia,
          Barrio Veraguas, actúa como responsable del tratamiento de información
          personal y se identifica así:
          Razón social: ATLAS LOGISTIC SAS
          NIT: 902035763-4
          Dirección: Carrera 31b # 4A-11, Bogotá, Colombia — Barrio Veraguas
          Teléfono: +57 322 605 5431
          Correo electrónico: atlas.facturacol@gmail.com
          Sitio web: www.atlaslogistic.com.co`
        },
        {
          subtitle: "1.2 Objetivo de la Política",
          content: `La presente Política de Tratamiento de Datos Personales tiene
          como propósito establecer los criterios bajo los cuales ATLAS LOGISTIC SAS
          realiza el tratamiento de la información personal, dando cumplimiento al
          artículo 15 de la Constitución Nacional, la Ley 1581 de 2012, el Decreto
          1074 de 2015 y demás normas concordantes sobre protección de datos
          personales en Colombia.`
        },
        {
          subtitle: "1.3 Definiciones",
          content: `
          • Autorización: consentimiento previo, expreso e informado del Titular para el tratamiento de sus datos personales.
          • Base de Datos: conjunto organizado de datos personales objeto de tratamiento.
          • Dato personal: cualquier información vinculada a una persona natural determinada o determinable.
          • Encargado del Tratamiento: persona que realiza el tratamiento de datos por cuenta del responsable.
          • Responsable del Tratamiento: persona que decide sobre la base de datos y su tratamiento.
          • Titular: persona natural cuyos datos son objeto de tratamiento.
          • Tratamiento: operación sobre datos personales como recolección, almacenamiento, uso o supresión.`
        }
      ]
    },
    {
      title: "Capítulo Segundo - Tratamiento de Datos",
      subsections: [
        {
          subtitle: "2.1 Datos Recolectados",
          content: `ATLAS LOGISTIC SAS recolecta únicamente los datos estrictamente
          necesarios para la prestación de sus servicios logísticos y de atención al cliente:
          • Nombre completo
          • Número de teléfono celular
          • Correo electrónico
          • Servicio de interés
          • Mensaje o consulta`
        },
        {
          subtitle: "2.2 Finalidades del Tratamiento",
          content: `Los datos personales recolectados serán utilizados para:
          • Responder solicitudes de cotización y consultas sobre servicios logísticos.
          • Gestionar la relación comercial con clientes y prospectos.
          • Enviar información sobre servicios, novedades y ofertas comerciales (solo con autorización expresa).
          • Mejorar la calidad de nuestros servicios.
          • Cumplir obligaciones legales y contractuales.
          • Adelantar comunicaciones vía correo electrónico, teléfono o WhatsApp.`
        },
        {
          subtitle: "2.3 Autorización para el Tratamiento",
          content: `ATLAS LOGISTIC SAS solicitará de manera libre, previa, expresa e
          informada la autorización de los titulares para el tratamiento de sus datos
          personales. Dicha autorización se obtiene a través del formulario de contacto
          disponible en nuestro sitio web, mediante el marcado del checkbox de aceptación
          de la presente política.`
        },
        {
          subtitle: "2.4 Circulación y Transferencia de Datos",
          content: `Por regla general, ATLAS LOGISTIC SAS no comparte los datos
          personales con terceros. Sin embargo, podrá transferirlos cuando sea necesario
          para la ejecución del servicio contratado, siempre con autorización del titular
          o bajo los supuestos permitidos por la Ley 1581 de 2012.`
        },
        {
          subtitle: "2.5 Medidas de Seguridad",
          content: `ATLAS LOGISTIC SAS adopta las medidas técnicas y administrativas
          necesarias para garantizar la seguridad de los datos personales, protegiendo
          su confidencialidad, integridad y disponibilidad, evitando acceso no autorizado,
          pérdida o uso indebido.`
        }
      ]
    },
    {
      title: "Capítulo Tercero - Derechos de los Titulares",
      subsections: [
        {
          subtitle: "3.1 Derechos",
          content: `De conformidad con la Ley 1581 de 2012, los titulares tienen derecho a:
          a. Conocer, actualizar y rectificar sus datos personales.
          b. Solicitar prueba de la autorización otorgada.
          c. Ser informados sobre el uso de sus datos.
          d. Presentar quejas ante la Superintendencia de Industria y Comercio.
          e. Revocar la autorización y solicitar la supresión de sus datos.
          f. Acceder gratuitamente a sus datos que hayan sido objeto de tratamiento.`
        },
        {
          subtitle: "3.2 Procedimiento para Ejercer los Derechos",
          content: `Para ejercer sus derechos, el titular puede comunicarse con
          ATLAS LOGISTIC SAS a través de los siguientes canales:
          • Correo electrónico: atlas.facturacol@gmail.com
          • Teléfono: +57 322 605 5431
          • Dirección: Carrera 31b # 4A-11, Bogotá, Colombia — Barrio Veraguas

          Las consultas serán atendidas en un término máximo de 10 días hábiles
          y los reclamos en un término máximo de 15 días hábiles, contados a
          partir de la fecha de recibo de la solicitud.`
        }
      ]
    },
    {
      title: "Capítulo Cuarto - Disposiciones Finales",
      subsections: [
        {
          subtitle: "4.1 Vigencia",
          content: `Los datos personales serán conservados durante el tiempo necesario
          para cumplir con la finalidad de su recolección y las obligaciones legales
          aplicables. Una vez cumplida la finalidad, los datos serán eliminados de
          nuestras bases de datos.`
        },
        {
          subtitle: "4.2 Principios",
          content: `ATLAS LOGISTIC SAS garantiza los principios de legalidad, finalidad,
          libertad, veracidad, transparencia, acceso restringido, seguridad y
          confidencialidad sobre los datos personales que reposan en sus bases de datos.`
        },
        {
          subtitle: "4.3 Entrada en Vigor",
          content: `La presente política entra en vigor a partir del año 2025
          y podrá ser modificada en cualquier momento, informando a los titulares
          a través del sitio web de ATLAS LOGISTIC SAS.`
        }
      ]
    }
  ];

  return (
    <>
      <style>{`
        @page {
          size: A4;
          margin: 18mm 20mm;
        }
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          .print-header {
            background: #0c2340 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .print-contact {
            page-break-inside: avoid;
            break-inside: avoid;
            page-break-before: auto;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Roboto', sans-serif" }}>

        {/* Header */}
        <div className="print-header" style={{
          background: "linear-gradient(135deg, #0c2340 0%, #1b4080 100%)",
          padding: "80px 24px 50px",
          textAlign: "center"
        }}>
          {/* Logo */}
          <div style={{ marginBottom: 28, display: "flex", justifyContent: "center" }}>
            <img
              src="/images/logo.svg"
              alt="Atlas Logistic"
              style={{ height: 140, width: "auto", objectFit: "contain" }}
            />
          </div>
          <h1 style={{
            fontFamily: "'Fira Sans', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
            color: "#ffffff",
            marginBottom: 10
          }}>
            Política de Tratamiento de Datos Personales
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 6 }}>
            ATLAS LOGISTIC SAS
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
            Última actualización: 2025
          </p>
          <div style={{
            display: "inline-block",
            marginTop: 18,
            padding: "7px 18px",
            borderRadius: 50,
            background: "rgba(0,166,255,0.15)",
            border: "1px solid rgba(0,166,255,0.3)",
            color: "#00a6ff",
            fontSize: 13,
            fontWeight: 600
          }}>
            Ley 1581 de 2012 — Colombia
          </div>
        </div>

        {/* Toolbar */}
        <div className="no-print" style={{
          background: "linear-gradient(135deg, #0c2340 0%, #1b4080 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}>
          <BackBtn />
          <PdfBtn />
        </div>

        {/* Content */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px 60px" }}>
          {sections.map((section, i) => (
            <div key={i} className="print-section" style={{ marginBottom: 48 }}>
              <h2 style={{
                fontFamily: "'Fira Sans', sans-serif",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "#0c2340",
                marginBottom: 24,
                paddingBottom: 12,
                borderBottom: "2px solid #1b6fea"
              }}>
                {section.title}
              </h2>
              {section.subsections.map((sub, j) => (
                <div key={j} style={{ marginBottom: 28 }}>
                  <h3 style={{
                    fontFamily: "'Fira Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "#1b6fea",
                    marginBottom: 10
                  }}>
                    {sub.subtitle}
                  </h3>
                  <p style={{
                    color: "#4b5563",
                    lineHeight: 1.85,
                    fontSize: 15,
                    whiteSpace: "pre-line"
                  }}>
                    {sub.content}
                  </p>
                </div>
              ))}
            </div>
          ))}

          {/* Contact box */}
          <div className="print-contact" style={{
            marginTop: 40,
            padding: "28px 32px",
            background: "linear-gradient(135deg, rgba(27,111,234,0.06), rgba(0,166,255,0.04))",
            borderRadius: 16,
            border: "1px solid rgba(27,111,234,0.12)"
          }}>
            <h3 style={{
              fontFamily: "'Fira Sans', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#0c2340",
              marginBottom: 12
            }}>
              ¿Preguntas sobre el tratamiento de tus datos?
            </h3>
            <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              Si tienes dudas o deseas ejercer tus derechos como titular, contáctanos directamente.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
              <a href="tel:+573226055431" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "#1b6fea", fontSize: 14, fontWeight: 600, textDecoration: "none"
              }}>
                📞 +57 322 605 5431
              </a>
              <span style={{ color: "#d1d5db" }}>|</span>
              <a href="mailto:atlas.facturacol@gmail.com" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "#1b6fea", fontSize: 14, fontWeight: 600, textDecoration: "none"
              }}>
                ✉️ atlas.facturacol@gmail.com
              </a>
              <span style={{ color: "#d1d5db" }}>|</span>
              <span style={{ color: "#4b5563", fontSize: 14 }}>
                📍 Carrera 31b # 4A-11, Bogotá — Barrio Veraguas
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
