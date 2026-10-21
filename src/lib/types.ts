export type Tone = "business" | "friendly" | "bold";

export interface GenerateRequestBody {
  name: string;
  niche: string;
  skills: string;
  experience: string;
  audience?: string;
  uniqueness?: string;
  tone: Tone;
}

export interface GenerateResponseBody {
  presentation: string;
}

export interface ApiErrorBody {
  error: string;
}
