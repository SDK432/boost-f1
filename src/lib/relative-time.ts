const longAuto = new Intl.RelativeTimeFormat("es-ES", { numeric: "auto" });
const shortAlways = new Intl.RelativeTimeFormat("es-ES", {
  numeric: "always",
  style: "short",
});

const PUBLISH_DATE =
  /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?)?/;

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

interface ParsedPublishDate {
  year: number;
  month: number;
  day: number;
  /** Set only when the source string includes a clock time. */
  instant: Date | null;
}

function parsePublishDate(isoDate: string): ParsedPublishDate | null {
  const match = PUBLISH_DATE.exec(isoDate.trim());
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const probe = new Date(year, month - 1, day);
  if (
    probe.getFullYear() !== year ||
    probe.getMonth() !== month - 1 ||
    probe.getDate() !== day
  ) {
    return null;
  }

  if (match[4] === undefined) {
    return { year, month, day, instant: null };
  }

  const hours = Number(match[4]);
  const minutes = Number(match[5]);
  const seconds = match[6] === undefined ? 0 : Number(match[6]);
  if (hours > 23 || minutes > 59 || seconds > 59) return null;

  return {
    year,
    month,
    day,
    instant: new Date(year, month - 1, day, hours, minutes, seconds),
  };
}

function calendarDayDiff(
  year: number,
  month: number,
  day: number,
  now: Date
): number {
  const publish = Date.UTC(year, month - 1, day);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((today - publish) / DAY_MS);
}

function formatDayDistance(dayDiff: number): string {
  const abs = Math.abs(dayDiff);
  const sign = dayDiff > 0 ? -1 : 1;

  if (abs < 30) return longAuto.format(sign * abs, "day");

  if (abs < 365) {
    const months = Math.max(1, Math.floor(abs / 30));
    return longAuto.format(sign * months, "month");
  }

  const years = Math.max(1, Math.floor(abs / 365));
  return longAuto.format(sign * years, "year");
}

function formatFromInstant(instant: Date, now: Date): string {
  const diffMs = now.getTime() - instant.getTime();
  const abs = Math.abs(diffMs);
  const sign = diffMs < 0 ? 1 : -1;

  if (abs < MINUTE_MS) return diffMs < 0 ? "dentro de un momento" : "ahora";

  if (abs < HOUR_MS) {
    const minutes = Math.max(1, Math.floor(abs / MINUTE_MS));
    return shortAlways.format(sign * minutes, "minute");
  }

  if (abs < DAY_MS) {
    const hours = Math.max(1, Math.floor(abs / HOUR_MS));
    return shortAlways.format(sign * hours, "hour");
  }

  const dayDiff = calendarDayDiff(
    instant.getFullYear(),
    instant.getMonth() + 1,
    instant.getDate(),
    now
  );
  if (dayDiff === 0) return longAuto.format(0, "day");
  return formatDayDistance(dayDiff);
}

/**
 * Spanish relative age for the publish date already shown on the card.
 * Date-only values stay on that calendar day: the same day is hours since
 * local midnight (never minutes), and older days use "ayer" / "hace N días".
 * A clock time in the source is used as-is and is not invented here.
 */
export function formatRelativePublishDate(isoDate: string, now: Date): string {
  const parsed = parsePublishDate(isoDate);
  if (!parsed) return "—";

  if (parsed.instant) return formatFromInstant(parsed.instant, now);

  const dayDiff = calendarDayDiff(parsed.year, parsed.month, parsed.day, now);
  if (dayDiff === 0) {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const hours = Math.max(
      1,
      Math.floor((now.getTime() - start.getTime()) / HOUR_MS)
    );
    return shortAlways.format(-hours, "hour");
  }

  return formatDayDistance(dayDiff);
}
