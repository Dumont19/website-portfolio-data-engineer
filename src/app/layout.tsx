import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Matheus Dumont | Data Engineer & Architect',
  description:
    'Data engineer specialized in Oracle to Snowflake migrations, Azure data platforms, and full-stack data tooling. SnowPro Core certified.',
  keywords: [
    'Data Engineer',
    'Snowflake',
    'Oracle',
    'Python',
    'FastAPI',
    'Azure',
    'Databricks',
    'DataStage',
    'Data Architecture',
    'Matheus Dumont',
  ],
  authors: [{ name: 'Matheus Dumont' }],
  openGraph: {
    title: 'Matheus Dumont | Data Engineer & Architect',
    description:
      'Data engineer specialized in Oracle to Snowflake migrations, Azure data platforms, and full-stack data tooling.',
    url: 'https://website-portfolio-data-engineer.vercel.app/',
    siteName: 'Matheus Dumont Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} bg-black text-white antialiased selection:bg-white/20 selection:text-white`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
