"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, RefreshCw, Cpu } from "lucide-react";
import { Message } from "../lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "agent",
      text: "Namaste! I am Nagarik Sathi AI (नागरिक साथी). I run completely on self-hosted open-weight models. How can I help you with Nepali passport, NID, or tax procedures today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || isStreaming) return;

    const userMsg: Message = { sender: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg, { sender: "agent", text: "" }]);
    if (!customPrompt) setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.body) throw new Error("No response body received");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        setMessages((prev) => {
          const clone = [...prev];
          clone[clone.length - 1] = { sender: "agent", text: accumulated };
          return clone;
        });
      }
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "agent", text: "Error connecting to local Ollama server. Please check backend status." },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 border border-red-500/20 rounded-2xl p-6 text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
          <Cpu className="w-3 h-3" /> Powered by Open-Weight LLMs (Ollama)
        </span>
        <h1 className="text-2xl font-extrabold text-white">Nagarik Sathi Open AI Agent</h1>
        <p className="text-xs text-slate-400">Zero Proprietary APIs — 100% Privacy & Local Inference</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[520px] overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold text-white">Interactive Civic Chat</span>
          </div>
          <button
            onClick={() => setMessages([{ sender: "agent", text: "Chat history cleared." }])}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-blue-600" : "bg-red-600"}`}>
                {msg.sender === "user" ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className={`p-3.5 rounded-xl text-xs leading-relaxed max-w-[80%] whitespace-pre-wrap ${msg.sender === "user" ? "bg-blue-600 text-white" : "bg-slate-950 border border-slate-800 text-slate-200"}`}>
                {msg.text || "Generating response..."}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="px-5 py-2 bg-slate-950/40 border-t border-slate-800/50 flex gap-2 overflow-x-auto">
          {["Passport renewal procedure", "राष्ट्रिय परिचयपत्र pre-enrollment", "Personal PAN requirement"].map((prompt, idx) => (
            <button key={idx} onClick={() => handleSend(prompt)} className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-full text-[10px] text-slate-300 shrink-0 transition">
              {prompt}
            </button>
          ))}
        </div>

        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask in English, Nepali, or Roman Nepali..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
          />
          <button onClick={() => handleSend()} disabled={isStreaming} className="px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:bg-slate-800 text-white rounded-xl text-xs font-semibold transition">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}