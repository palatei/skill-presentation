import type { GenerateRequestBody, Tone } from "./types";

const TONES: Tone[] = ["business", "friendly", "bold"];
const MAX_FIELD = 4000;

function trimString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) return trimmed.slice(0, max);
  return trimmed;
}

function optionalString(value: unknown, max: number): string | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const s = trimString(value, max);
  return s ?? undefined;
}

export function parseGenerateBody(
  body: unknown,
): { ok: true; data: GenerateRequestBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Некорректное тело запроса." };
  }

  const raw = body as Record<string, unknown>;

  const name = trimString(raw.name, 200);
  const niche = trimString(raw.niche, 500);
  const skills = trimString(raw.skills, MAX_FIELD);
  const experience = trimString(raw.experience, MAX_FIELD);

  if (!name) {
    return { ok: false, error: "Укажите имя или как представляться." };
  }
  if (!niche) {
    return { ok: false, error: "Укажите нишу или сферу." };
  }
  if (!skills) {
    return { ok: false, error: "Опишите навыки и умения." };
  }
  if (!experience) {
    return { ok: false, error: "Опишите опыт и бэкграунд." };
  }

  const tone = raw.tone;
  if (typeof tone !== "string" || !TONES.includes(tone as Tone)) {
    return { ok: false, error: "Выберите тон презентации." };
  }

  return {
    ok: true,
    data: {
      name,
      niche,
      skills,
      experience,
      audience: optionalString(raw.audience, MAX_FIELD),
      uniqueness: optionalString(raw.uniqueness, MAX_FIELD),
      tone: tone as Tone,
    },
  };
}
