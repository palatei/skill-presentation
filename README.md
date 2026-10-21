# Skill Pitch

Next.js-приложение для генерации продающей текстовой презентации о ваших навыках (go-to-market pitch) на **русском языке** с помощью Google Gemini.

## Локальный запуск

```bash
npm install
cp .env.example .env.local
# Добавьте GEMINI_API_KEY в .env.local
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Переменные окружения

| Переменная        | Описание                          |
| ----------------- | --------------------------------- |
| `GEMINI_API_KEY`  | Ключ API Google Gemini (секрет)   |

Файл `.env.local` не коммитится в git. Для примера используйте `.env.example`.

## Деплой на Vercel

1. Импортируйте репозиторий в [Vercel](https://vercel.com/new).
2. Framework Preset: **Next.js** (определяется автоматически).
3. В **Project → Settings → Environment Variables** добавьте:
   - `GEMINI_API_KEY` — ваш ключ Gemini (Production, Preview, Development по необходимости).
4. Deploy.

Либо из CLI (без сохранения токена в файлах проекта):

```bash
npx vercel
```

Токен Vercel передавайте через интерактивный вход или переменную окружения в терминале, не добавляйте его в репозиторий.

## Скрипты

- `npm run dev` — dev-сервер
- `npm run build` — production-сборка
- `npm run start` — запуск после build
- `npm run lint` — ESLint

## Стек

- Next.js (App Router), TypeScript, Tailwind CSS v4
- `next-themes` — светлая / тёмная тема
- `@google/generative-ai` — API route `POST /api/generate`
