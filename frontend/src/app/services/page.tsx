"use client";

import React, { useState } from "react";
import { CheckCircle2, ExternalLink, Shield, DollarSign, Clock } from "lucide-react";

export default function ServicesPage() {
  const [selected, setSelected] = useState("passport");

  const catalog = {
    passport: {
      title: "e-Passport Application",
      dept: "Department of Passports",
      url: "https://nepalpassport.gov.np",
      fee: "NPR 5,000 (34-Page Regular) / NPR 12,000 (Fast Track)",
      time: "3 to 15 Days",
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
    pan: {
      title: "Personal PAN (Permanent Account Number)",
      dept: "Inland Revenue Department (IRD)",
      url: "https://ird.gov.np",
      fee: "Free (NPR 0)",
      time: "1-2 Working Days",
      docs: [
        "Citizenship Scan Copy",
        "Passport Size Digital Photo",
        "Nepali Mobile Number",
      ],
    },
  };

  const curr = catalog[selected as keyof typeof catalog];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">What Do I Need? — Portal Requirements</h1>
          <p className="text-xs text-slate-400 mt-1">Verified guidelines directly sourced from government portals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { id: "passport", label: "🛂 e-Passport" },
            { id: "nid", label: "🪪 National ID (NID)" },
            { id: "pan", label: "💰 Personal PAN" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                selected === item.id
                  ? "bg-red-950/40 border-red-500 text-white"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">{curr.title}</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Shield className="w-3.5 h-3.5 text-red-400" /> {curr.dept}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-500 block">Official Fee</span>
                <span className="text-xs font-semibold text-white">{curr.fee}</span>
              </div>
            </div>
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-500 block">Processing Time</span>
                <span className="text-xs font-semibold text-white">{curr.time}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Required Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {curr.docs.map((doc, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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