'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0c2340 0%, #0a1e38 40%, #112e55 100%)',
      color: '#fff',
      fontFamily: "'Fira Sans', sans-serif",
      padding: '24px',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #00a6ff, #1b6fea)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        lineHeight: 1,
        marginBottom: 16,
      }}>404</h1>
      <p style={{
        fontSize: 18,
        color: 'rgba(255,255,255,0.7)',
        fontFamily: "'Roboto', sans-serif",
        marginBottom: 32,
        maxWidth: 400,
      }}>
        La página que buscas no existe o fue movida.
      </p>
      <Link href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: 'linear-gradient(135deg, #1b6fea, #00a6ff)',
        color: '#fff',
        padding: '14px 30px',
        borderRadius: 50,
        fontSize: 14,
        fontWeight: 700,
        textDecoration: 'none',
        boxShadow: '0 6px 20px rgba(27,111,234,0.3)',
        transition: 'all 0.3s',
      }}>
        Volver al inicio
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
