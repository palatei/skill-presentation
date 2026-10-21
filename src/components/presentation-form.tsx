"use client";

import { Loader2, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

import { ResultPanel } from "@/components/result-panel";
import type { GenerateRequestBody, Tone } from "@/lib/types";

const initialForm: GenerateRequestBody = {
  name: "",
  niche: "",
  skills: "",
  experience: "",
  audience: "",
  uniqueness: "",
  tone: "business",
};

export function PresentationForm() {
  const [form, setForm] = useState<GenerateRequestBody>(initialForm);
  const [presentation, setPresentation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof GenerateRequestBody>(
    key: K,
    value: GenerateRequestBody[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setPresentation(null);

    const payload: GenerateRequestBody = {
      ...form,
      audience: form.audience?.trim() || undefined,
      uniqueness: form.uniqueness?.trim() || undefined,
    };

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        presentation?: string;
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Не удалось сгенерировать презентацию.");
        return;
      }

      if (!data.presentation) {
        setError("Пустой ответ от сервера.");
        return;
      }

      setPresentation(data.presentation);
    } catch {
      setError("Сетевая ошибка. Проверьте подключение и попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid w-full gap-8 lg:grid-cols-2 lg:items-start">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl border border-zinc-200/80 bg-white/80 p-6 shadow-xl shadow-violet-500/5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70"
      >
        <Field
          label="Имя / как представляться"
          required
          value={form.name}
          onChange={(v) => updateField("name", v)}
          placeholder="Например: Алексей, product-маркетолог"
        />
        <Field
          label="Ниша / сфера"
          required
          value={form.niche}
          onChange={(v) => updateField("niche", v)}
          placeholder="B2B SaaS, e-commerce, образование…"
        />
        <TextArea
          label="Навыки и умения"
          required
          value={form.skills}
          onChange={(v) => updateField("skills", v)}
          placeholder="Перечислите ключевые навыки, инструменты, сильные стороны"
          rows={4}
        />
        <TextArea
          label="Опыт / бэкграунд"
          required
          value={form.experience}
          onChange={(v) => updateField("experience", v)}
          placeholder="Проекты, роли, результаты, цифры"
          rows={4}
        />
        <TextArea
          label="Целевая аудитория (необязательно)"
          value={form.audience ?? ""}
          onChange={(v) => updateField("audience", v)}
          placeholder="Кому вы продаёте себя: стартапы, HR, агентства…"
          rows={2}
        />
        <TextArea
          label="Уникальность / отличие (необязательно)"
          value={form.uniqueness ?? ""}
          onChange={(v) => updateField("uniqueness", v)}
          placeholder="Чем вы отличаетесь от других в нише"
          rows={2}
        />
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Тон <span className="text-red-500">*</span>
          </label>
          <select
            value={form.tone}
            onChange={(e) => updateField("tone", e.target.value as Tone)}
            className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-violet-500/30 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <option value="business">Деловой</option>
            <option value="friendly">Дружелюбный</option>
            <option value="bold">Смелый</option>
          </select>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Генерируем…
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Сгенерировать презентацию
            </>
          )}
        </button>
      </form>

      <div className="lg:sticky lg:top-24">
        {presentation ? (
          <ResultPanel
            presentation={presentation}
            onClear={() => setPresentation(null)}
          />
        ) : (
          <aside className="rounded-2xl border border-dashed border-zinc-300/80 bg-zinc-50/50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
            <Sparkles className="mx-auto mb-4 h-10 w-10 text-violet-500/70" />
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              Здесь появится презентация
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Заполните форму слева — AI соберёт структурированный pitch на
              русском: заголовок, ценность, навыки, CTA и elevator pitch.
            </p>
          </aside>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-violet-500/30 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows: number;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <textarea
        required={required}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-violet-500/30 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      />
    </div>
  );
}
