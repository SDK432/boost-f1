"use client";

import { useEffect, useState } from "react";
import { formatRelativePublishDate } from "@/lib/relative-time";

interface RelativeTimeProps {
  date: string;
}

export default function RelativeTime({ date }: RelativeTimeProps) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setLabel(formatRelativePublishDate(date, new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [date]);

  return <time dateTime={date}>{label ?? "—"}</time>;
}
