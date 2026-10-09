import { Sparkles } from "lucide-react";

interface MarqueeProps {
  items: string[];
}

/** Seamless scrolling fact band. */
export default function Marquee({ items }: MarqueeProps) {
  return (
    <div className="relative overflow-hidden border-y border-foam/10 bg-abyss-900/60 py-4">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1} className="flex items-center">
            {items.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-8 pr-8 font-mono text-[11px] uppercase tracking-[0.28em] text-mist"
              >
                {item}
                <Sparkles className="h-3 w-3 shrink-0 text-glow/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
