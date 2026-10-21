import { PresentationForm } from "@/components/presentation-form";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="page-bg flex min-h-full flex-1 flex-col">
      <header className="border-b border-zinc-200/60 bg-white/40 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/40">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Skill Pitch
            </p>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 sm:text-xl">
              Презентация ваших навыков
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14">
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          Опишите себя как продукт — получите готовый go-to-market pitch на
          русском: структура, тон и призыв к действию под вашу нишу.
        </p>
        <PresentationForm />
      </main>

      <footer className="border-t border-zinc-200/60 py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        Данные отправляются только для генерации текста через Gemini API.
      </footer>
    </div>
  );
}
