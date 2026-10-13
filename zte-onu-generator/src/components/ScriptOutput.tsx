"use client";

import { useState } from "react";
import { Copy, Check, FileCode, Layers, Monitor } from "lucide-react";
import { GeneratedScripts } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScriptOutputProps {
  scripts: GeneratedScripts;
}

const TABS = [
  {
    id: "onuConfig" as const,
    label: "1. ONU Config Script",
    icon: FileCode,
  },
  {
    id: "onuTypeAdd" as const,
    label: "2. ONU Type Add Script",
    icon: Layers,
  },
  {
    id: "remoteAccess" as const,
    label: "3. Remote Access Only Script",
    icon: Monitor,
  },
];

export default function ScriptOutput({ scripts }: ScriptOutputProps) {
  const [activeTab, setActiveTab] = useState<keyof GeneratedScripts>("onuConfig");
  const [copied, setCopied] = useState(false);

  const currentScript = scripts[activeTab];
  const lineCount = currentScript.split("\n").length;
  const charCount = currentScript.length;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 mb-0 border-b border-slate-200">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Code block */}
      <div className="bg-slate-900 rounded-b-xl rounded-tr-xl overflow-hidden shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
            <FileCode className="w-4 h-4 text-blue-400" />
            OUTPUT — {TABS.find((t) => t.id === activeTab)?.label.toUpperCase()}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>

        <pre className="dark-code p-4 overflow-x-auto text-sm leading-relaxed max-h-[480px] overflow-y-auto">
          <code className="text-emerald-400 font-mono whitespace-pre">
            {currentScript.split("\n").map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none text-slate-500 w-8 shrink-0 text-right pr-4">
                  {i + 1}
                </span>
                <span>{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>

        <div className="px-4 py-2 bg-slate-800 border-t border-slate-700 text-xs text-slate-400">
          {lineCount} lines · {charCount} characters
        </div>
      </div>
    </div>
  );
}
