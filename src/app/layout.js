import './globals.css';

export const metadata = {
  title: 'Atlas Logistic SAS — Soluciones Logísticas Internacionales | Courier, Importación y Exportación',
  description: 'Operador logístico integral en Colombia. Importación y exportación por courier, transporte marítimo, aéreo y agenciamiento aduanero. Envíos a más de 220 países. Cotiza ahora.',
  keywords: [
    'logística internacional', 'courier Colombia', 'importación por courier',
    'exportación Colombia', 'envíos internacionales', 'agenciamiento aduanero',
    'transporte aéreo de carga', 'transporte marítimo', 'casillero internacional',
    'envíos a Venezuela', 'Atlas Logistic', 'operador logístico Bogotá',
  ],
  authors: [{ name: 'Atlas Logistic SAS' }],
  creator: 'Atlas Logistic SAS',
  publisher: 'Atlas Logistic SAS',
  metadataBase: new URL('https://atlaslogistic.com.co'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Atlas Logistic SAS — Tu carga internacional, a tiempo y sin fronteras',
    description: 'Especialistas en logística internacional aérea. Importaciones, exportaciones y courier a más de 220 países. Cotiza tu envío por WhatsApp.',
    url: 'https://atlaslogistic.com.co',
    siteName: 'Atlas Logistic',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/images/banner.webp',
        width: 1200,
        height: 630,
        alt: 'Atlas Logistic - Soluciones logísticas internacionales',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas Logistic SAS — Courier Internacional',
    description: 'Importación y exportación por courier. Envíos a más de 220 países desde Colombia.',
    images: ['/images/banner.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'tu-codigo-de-verificacion',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Atlas Logistic SAS',
              url: 'https://atlaslogistic.com.co',
              logo: 'https://atlaslogistic.com.co/images/logo.svg',
              description: 'Operador logístico integral en Colombia. Importación y exportación por courier, transporte marítimo, aéreo y agenciamiento aduanero.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Carrera 31b # 4A-11',
                addressLocality: 'Bogotá',
                addressRegion: 'Bogotá D.C.',
                addressCountry: 'CO',
                postalCode: '111611',
              },
              telephone: '+573226055431',
              sameAs: [
                'https://www.instagram.com/atlaslogisticaglobal',
                'https://www.tiktok.com/@atlas.logistic',
                'https://www.facebook.com/atlaslogistic',
                'https://www.linkedin.com/company/atlas-logistic',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+573226055431',
                contactType: 'customer service',
                availableLanguage: 'Spanish',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
