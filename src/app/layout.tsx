import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Matheus Dumont | Data Engineer & Architect",
  description: "Building the invisible infrastructure that powers modern business. Specialized in Snowflake, Spark, and Cloud Data Architecture.",
  keywords: ["Data Engineer", "Snowflake", "Python", "Big Data", "Data Architecture", "Matheus Dumont"],
  authors: [{ name: "Matheus Dumont" }],
  openGraph: {
    title: "Matheus Dumont | Data Engineer",
    description: "Building the invisible infrastructure that powers modern business.",
    url: "https://website-portfolio-data-engineer.vercel.app/", 
    siteName: "Matheus Dumont Portfolio",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} bg-black text-white antialiased selection:bg-white/20 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}