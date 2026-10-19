import Image from "next/image";

type BrandLockupProps = {
  /** Preload the mark in the header. */
  priority?: boolean;
  /** Header hover shifts BOOST to the brand red. */
  interactive?: boolean;
};

export default function BrandLockup({
  priority = false,
  interactive = false,
}: BrandLockupProps) {
  return (
    <span className="flex items-center gap-1.5 sm:gap-2">
      <Image
        src="/logo-b.svg"
        alt=""
        width={428}
        height={304}
        priority={priority}
        style={{ width: "auto" }}
        className="h-8 w-auto shrink-0 md:h-7 lg:h-10"
      />
      <span
        className={`font-brand whitespace-nowrap text-[1.9rem] font-extrabold italic uppercase leading-none tracking-[-0.04em] [font-synthesis:none] md:text-[1.7rem] lg:text-[2.25rem] ${
          interactive
            ? "text-white transition-colors group-hover:text-[#e10600]"
            : "text-white"
        }`}
      >
        BOOST
        <span className="text-[#e10600]">F1</span>
      </span>
    </span>
  );
}
