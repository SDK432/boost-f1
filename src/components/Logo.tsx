import Image from "next/image";

type LogoProps = {
  /** Header mark should paint with the first frame. The footer can wait. */
  eager?: boolean;
};

/**
 * Neon "B" mark. public/logo.png is transparent so the glow sits on the
 * dark header and footer without a square tile.
 */
export default function Logo({ eager = false }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Boost F1"
      width={433}
      height={480}
      sizes="40px"
      loading={eager ? "eager" : "lazy"}
      className="h-10 w-auto shrink-0"
      style={{ height: 40, width: "auto" }}
    />
  );
}
