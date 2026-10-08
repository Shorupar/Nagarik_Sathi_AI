"use client";

import React, { useState } from "react";
import { Calendar, ArrowRightLeft } from "lucide-react";
import { convertBsToAd } from "../lib/api";

export default function DateConverter() {
  const [bsYear, setBsYear] = useState(2080);
  const [bsMonth, setBsMonth] = useState(1);
  const [bsDay, setBsDay] = useState(1);
  const [adResult, setAdResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    try {
      const converted = await convertBsToAd(bsYear, bsMonth, bsDay);
      setAdResult(converted);
    } catch {
      setAdResult("Error converting date.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <Calendar className="w-5 h-5 text-red-500" />
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">BS to AD Date Converter</h2>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="text-[10px] text-slate-600 dark:text-slate-400 block mb-1">BS Year</label>
          <input
            type="number"
            value={bsYear}
            onChange={(e) => setBsYear(Number(e.target.value))}
            className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label className="text-[10px] text-slate-600 dark:text-slate-400 block mb-1">BS Month</label>
          <input
            type="number"
            value={bsMonth}
            onChange={(e) => setBsMonth(Number(e.target.value))}
            className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label className="text-[10px] text-slate-600 dark:text-slate-400 block mb-1">BS Day</label>
          <input
            type="number"
            value={bsDay}
            onChange={(e) => setBsDay(Number(e.target.value))}
            className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg p-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-red-500"
          />
        </div>
      </div>

      <button
        onClick={handleConvert}
        disabled={loading}
        className="w-full py-2 bg-red-600 hover:bg-red-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition"
      >
        <ArrowRightLeft className="w-3.5 h-3.5" /> {loading ? "Converting..." : "Convert to AD"}
      </button>

      {adResult && (
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-center">
          <span className="text-[10px] text-slate-600 dark:text-slate-400 block">Converted Gregorian (AD) Date</span>
          <span className="text-sm font-bold text-emerald-400">{adResult}</span>
        </div>
      )}
    </div>
  );
}