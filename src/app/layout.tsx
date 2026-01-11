import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Usando Inter com configuração para display grande
const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Data Engineer Portfolio",
  description: "High-performance data architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-black text-white antialiased selection:bg-white selection:text-black`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}