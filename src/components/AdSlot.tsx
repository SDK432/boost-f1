type AdSize = "banner" | "leaderboard" | "rectangle" | "in-article";

const sizeClasses: Record<AdSize, string> = {
  banner: "h-16 md:h-20",
  leaderboard: "h-20 md:h-24",
  rectangle: "h-64 min-h-[250px]",
  "in-article": "h-48 md:h-56",
};

interface AdSlotProps {
  size?: AdSize;
  className?: string;
  label?: string;
}

/**
 * Placeholder listo para sustituir por el código real de AdSense.
 * No incluye IDs inventados — solo un marco visual etiquetado.
 */
export default function AdSlot({
  size = "banner",
  className = "",
  label = "Espacio publicitario",
}: AdSlotProps) {
  return (
    <aside
      className={`ad-slot flex items-center justify-center ${sizeClasses[size]} ${className}`}
      aria-label={label}
      data-ad-placeholder="true"
    >
      <div className="text-center px-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-1">
          Publicidad
        </p>
        <p className="text-xs md:text-sm font-medium text-zinc-400">{label}</p>
        <p className="text-[10px] text-zinc-600 mt-1 hidden sm:block">
          Placeholder · sustituir por AdSense
        </p>
      </div>
    </aside>
  );
}
