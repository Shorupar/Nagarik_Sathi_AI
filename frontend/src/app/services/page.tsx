"use client";

import React, { useState } from "react";
import { CheckCircle2, ExternalLink, Shield, DollarSign, Clock } from "lucide-react";

export default function ServicesPage() {
  const [selected, setSelected] = useState("passport");

  const catalog = {
    passport: {
      title: "Passport Application",
      dept: "Department of Passports",
      url: "https://nepalpassport.gov.np",
      fee: "NPR 5,000 (30-45 Working Days) / NPR 12,000 (Fast Track)",
      time: "3 to 15 Working Days",
      docs: [
        "Original Nepali Citizenship Certificate",
        "16-Digit National Identity Number (NIN)",
        "Pre-enrollment Slip from nepalpassport.gov.np",
        "Old Passport (For Renewal)",
      ],
    },
    nid: {
      title: "National Identity Card (Rastriya Parichayapatra)",
      dept: "Department of National ID & Civil Registration (DoNIDCR)",
      url: "https://enrollment.donidcr.gov.np",
      fee: "Free (First Time)",
      time: "Same-day biometric capture",
      docs: [
        "Original Citizenship Certificate",
        "Pre-enrollment Token Slip",
        "Marriage Certificate (If marital status changed)",
      ],
    },
    license: {
      title: "Driving License",
      dept: "Department of Transportation Management (DoTM)",
      url: "https://dotm.gov.np/",
      fee: [
        "Bike / Scooter (A/K): Rs. 3,000 licence fee",
        "Car / Jeep / Van (B): Rs. 4,000 licence fee",
        "New application fee: Rs. 1,000",
      ],
      time: "1 to 4 Working Days",
      docs: [
        "Citizenship Scan Copy",
        "Passport Size Digital Photo",
        "Nepali Mobile Number",
      ],
    },
  };

  const curr = catalog[selected as keyof typeof catalog];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-6 transition-colors">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            What Do I Need? — Portal Requirements
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Verified guidelines directly sourced from official government portals.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { id: "passport", label: "Passport Application" },
            { id: "nid", label: "National ID (NID)" },
            { id: "license", label: "Driving Licence" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                selected === item.id
                  ? "bg-red-50 dark:bg-red-950/40 border-red-500 text-red-800 dark:text-white"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Selected Service Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{curr.title}</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                <Shield className="w-3.5 h-3.5 text-red-500 dark:text-red-400" /> {curr.dept}
              </p>
            </div>
            <a
              href={curr.url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start md:self-auto transition"
            >
              Go to Portal <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Details Grid (Fee & Time) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-500 block">Official Fee</span>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">
                  {Array.isArray(curr.fee) ? (
                    curr.fee.map((feeItem) => (
                      <span key={feeItem} className="block">
                        {feeItem}
                      </span>
                    ))
                  ) : (
                    <span>{curr.fee}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-500 block">Processing Time</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white">
                  {curr.time}
                </span>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Required Checklist
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {curr.docs.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}