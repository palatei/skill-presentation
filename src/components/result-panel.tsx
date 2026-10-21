"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ResultPanelProps {
  presentation: string;
  onClear: () => void;
}

export function ResultPanel({ presentation, onClear }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(presentation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-emerald-500/20 bg-white/80 p-6 shadow-lg shadow-emerald-500/5 backdrop-blur dark:border-emerald-400/15 dark:bg-zinc-950/80">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Ваша презентация
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Скопировано
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Копировать
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Очистить
          </button>
        </div>
      </div>
      <div className="max-h-[min(70vh,640px)] overflow-y-auto rounded-xl border border-zinc-100 bg-zinc-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">
          {presentation}
        </pre>
      </div>
    </section>
  );
}
