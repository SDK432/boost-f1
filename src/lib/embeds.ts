import type { ArticleEmbed } from "./types";

const X_STATUS =
  /^https:\/\/(?:x\.com|twitter\.com)\/([A-Za-z0-9_]{1,15})\/status\/(\d{1,25})\/?$/;

const INSTAGRAM_MEDIA =
  /^https:\/\/(?:www\.)?instagram\.com\/(p|reel)\/([A-Za-z0-9_-]{1,64})\/?$/;

export interface ValidEmbed {
  platform: "x" | "twitter" | "instagram";
  /** Canonical https URL safe to place in an href or permalink attribute. */
  url: string;
  caption?: string;
  afterParagraph?: number;
}

function captionOf(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const caption = value.trim();
  return caption.length > 0 ? caption : undefined;
}

function afterParagraphOf(value: unknown): number | undefined {
  if (value == null) return undefined;
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    return undefined;
  }
  return value;
}

/**
 * Accept only x/twitter status URLs and Instagram post or reel URLs.
 * Anything else, including raw HTML, is dropped.
 */
export function normalizeEmbed(input: unknown): ValidEmbed | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;
  const platform =
    typeof raw.platform === "string" ? raw.platform.trim().toLowerCase() : "";
  const url = typeof raw.url === "string" ? raw.url.trim() : "";
  if (
    raw.afterParagraph != null &&
    (typeof raw.afterParagraph !== "number" ||
      !Number.isInteger(raw.afterParagraph) ||
      raw.afterParagraph < 0)
  ) {
    return null;
  }

  if (platform === "x" || platform === "twitter") {
    const match = X_STATUS.exec(url);
    if (!match) return null;
    return {
      platform,
      url: `https://twitter.com/${match[1]}/status/${match[2]}`,
      caption: captionOf(raw.caption),
      afterParagraph: afterParagraphOf(raw.afterParagraph),
    };
  }

  if (platform === "instagram") {
    const match = INSTAGRAM_MEDIA.exec(url);
    if (!match) return null;
    return {
      platform: "instagram",
      url: `https://www.instagram.com/${match[1]}/${match[2]}/`,
      caption: captionOf(raw.caption),
      afterParagraph: afterParagraphOf(raw.afterParagraph),
    };
  }

  return null;
}

/** Missing embeds stay missing so older articles are unchanged. Invalid entries are skipped. */
export function sanitizeEmbeds(input: unknown): ArticleEmbed[] | undefined {
  if (input == null) return undefined;
  if (!Array.isArray(input)) return undefined;
  return input.flatMap((item) => {
    const embed = normalizeEmbed(item);
    return embed ? [embed] : [];
  });
}
