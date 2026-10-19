"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { normalizeEmbed, type ValidEmbed } from "@/lib/embeds";

type WidgetWindow = Window & {
  twttr?: { widgets?: { load: (element?: HTMLElement) => void } };
  instgrm?: { Embeds?: { process: () => void } };
};

function loadWidgets(platform: ValidEmbed["platform"], element?: HTMLElement | null) {
  const win = window as WidgetWindow;
  if (platform === "instagram") {
    win.instgrm?.Embeds?.process();
    return;
  }
  win.twttr?.widgets?.load(element ?? undefined);
}

export function EmbedScripts({
  platforms,
}: {
  platforms: Array<"x" | "instagram">;
}) {
  const needsX = platforms.includes("x");
  const needsInstagram = platforms.includes("instagram");
  if (!needsX && !needsInstagram) return null;

  return (
    <>
      {needsX ? (
        <Script
          id="twitter-widgets"
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
          onLoad={() => loadWidgets("x")}
        />
      ) : null}
      {needsInstagram ? (
        <Script
          id="instagram-embed"
          src="https://www.instagram.com/embed.js"
          strategy="lazyOnload"
          onLoad={() => loadWidgets("instagram")}
        />
      ) : null}
    </>
  );
}

export default function SocialEmbed({ embed }: { embed: ValidEmbed }) {
  const rootRef = useRef<HTMLElement>(null);
  const safe = normalizeEmbed(embed);
  const platform = safe?.platform;
  const url = safe?.url;

  useEffect(() => {
    if (!platform) return;
    loadWidgets(platform, rootRef.current);
  }, [platform, url]);

  if (!safe) return null;

  const isX = safe.platform === "x" || safe.platform === "twitter";

  return (
    <figure ref={rootRef} className="mx-auto my-8 w-full max-w-[550px]">
      {isX ? (
        <blockquote className="twitter-tweet" data-dnt="true" data-theme="dark">
          <a href={safe.url}>Ver la publicación oficial en X</a>
        </blockquote>
      ) : (
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={safe.url}
          data-instgrm-version="14"
        >
          <a href={safe.url}>Ver la publicación en Instagram</a>
        </blockquote>
      )}
      {safe.caption ? (
        <figcaption className="mt-2 text-center text-xs leading-relaxed text-zinc-500">
          {safe.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
