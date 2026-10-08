import React from "react";
import { Cpu, Database } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">100% Open & Self-Hosted Stack</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Built to comply strictly with open-weight AI guidelines.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <Cpu className="w-6 h-6 text-red-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ollama Local Engine</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Inference runs entirely offline using Qwen 2.5 / Llama 3.2 models.</p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2">
            <Database className="w-6 h-6 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">PostgreSQL + pgvector</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Stores 768-dim embeddings generated using open HuggingFace/Nomic models.</p>
          </div>
        </div>
      </div>
    </div>
  );
}