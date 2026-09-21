import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FounderOS AI // Next-Gen Collaborative Finance OS",
  description: "Futuristic AI-powered group expense sharing, predictive budgeting, and debt optimization operating system for high-velocity startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="bg-dark-bg text-gray-250 min-h-full flex flex-col relative">
        {/* Shimmer Ambient Glow layer */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-40 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.02)_0%,transparent_60%)]" />
        <div className="relative z-10 flex-grow flex flex-col justify-between">
          {children}
        </div>
      </body>
    </html>
  );
}
