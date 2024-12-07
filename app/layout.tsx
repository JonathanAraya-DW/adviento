import '@/styles/globals.css';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Providers } from './providers';

import { fontSans } from '@/config/fonts';

export const metadata = {
  metadataBase: new URL('https://adviento.cl'),
  title: {
    default: 'Adviento - Sorteos de Amigos Secretos',
    template: `%s - Adviento`,
  },
  description:
    'Adviento es una aplicación para realizar sorteos de amigos secretos y apoyar a Aldeas Infantiles con donaciones. Comparte el espíritu de la Navidad con quienes más lo necesitan.',
  keywords: [
    'Amigo Secreto',
    'Navidad',
    'Sorteos',
    'Sorteo de Amigos Secretos',
    'Sorteo',
    'Donaciones',
    'Aldeas Infantiles',
    'Hogar de niños',
    'Digital Wave',
    'Adviento',
  ],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Adviento - Sorteos de Amigos Secretos',
    description:
      'Una herramienta para organizar sorteos de amigos secretos y donar a Aldeas Infantiles. Comparte la magia de la Navidad.',
    url: 'https://adviento.cl',
    siteName: 'Adviento',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Adviento - Sorteos de Amigos Secretos',
      },
    ],
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adviento - Sorteos de Amigos Secretos',
    description:
      'Organiza sorteos de amigos secretos y dona a Aldeas Infantiles para compartir el espíritu navideño.',
    images: ['/og-image.png'],
    site: '@digitalwave_cl',
  },
};

export const viewport = {
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col h-screen">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://aldeasinfantiles.cl"
                title="Visita Aldeas Infantiles para donar"
              >
                <span className="text-default-600">
                  ¡Felices fiestas de parte del equipo de Digital Wave! 🎄🎅
                </span>
              </Link>
            </footer>
          </div>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
