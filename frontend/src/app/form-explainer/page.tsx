import React from "react";
import DateConverter from "../../components/DateConverter";
import { FileText } from "lucide-react";

export default function FormExamplePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Form Field Mapping & Tools</h1>
          <p className="text-xs text-slate-400 mt-1">Convert BS dates and map citizenship certificate fields accurately.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateConverter />

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <FileText className="w-5 h-5 text-red-500" />
              <h2 className="text-sm font-bold text-white">Citizenship Field Map</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-red-400 font-semibold block">Citizenship No. (नागरिकता नं.)</span>
                <p className="text-slate-300">Copy numbers and slashes verbatim (e.g. 27-01-78-12345).</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-red-400 font-semibold block">District of Issue (जारी जिल्ला)</span>
                <p className="text-slate-300">Select the district office that physically stamped the certificate.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}