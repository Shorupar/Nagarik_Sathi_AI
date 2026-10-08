import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata: Metadata = {
  title: "Nagarik Sathi AI — Open-Source Nepali Civic Assistant",
  description: "Self-hosted AI assistant for Nepal Government e-Services",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans antialiased transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
            {children}
          </main>
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 px-6 text-center transition-colors">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">Nagarik Sathi AI</span>
              <span>&copy; 2026 Nagarik Sathi AI. All rights reserved.</span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}