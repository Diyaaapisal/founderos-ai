import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FounderOS AI // Next-Gen Startup Validator & Collaborative Finance OS",
  description: "Scalable and developer-friendly systems built for creators, startups, and indie hackers. Validate product viability and deploy automated corporate frameworks instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="bg-darkBg text-neutral-300 min-h-full flex flex-col relative">
        {/* Global Noise Overlay */}
        <div className="noise-bg"></div>
        {children}
      </body>
    </html>
  );
}
