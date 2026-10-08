"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Layers, FileText, Info, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const [lang, setLang] = useState<"EN" | "NP">("EN");
  const { theme, toggleTheme } = useTheme();

  const navs = [
    { name: "Services", href: "/services", icon: Layers },
    { name: "AI Agent", href: "/", icon: Bot },
    { name: "Form Explainer", href: "/form-example", icon: FileText },
    { name: "About Us", href: "/about", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Title */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center font-bold text-white shadow-lg shadow-red-600/30 text-lg">
            🇳🇵
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 dark:text-white block">Nagarik Sathi AI</span>
            <span className="text-[10px] text-red-600 dark:text-red-400 block font-medium">Civic Services Assistant</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto max-w-full">
          {navs.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  active
                    ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 ml-1.5 mr-1" />
            <button
              onClick={() => setLang("EN")}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                lang === "EN" ? "bg-red-600 text-white" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("NP")}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                lang === "NP" ? "bg-red-600 text-white" : "text-slate-600 dark:text-slate-400"
              }`}
            >
              NP
            </button>
          </div>

          {/* Clean Theme Toggle using Hook */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-700 dark:text-slate-300 transition"
            title="Toggle Light/Dark Mode"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

      </div>
    </header>
  );
}