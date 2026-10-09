import { Link } from "react-router-dom";
import { Waves, ArrowUpRight } from "lucide-react";

const sources = ["NOAA Ocean Exploration", "Schmidt Ocean Institute", "Woods Hole Oceanographic Institution"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-foam/10 bg-abyss-950">
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-glow/40 bg-glow/10 text-glow">
                <Waves className="h-4 w-4" />
              </span>
              <span className="font-mono text-sm tracking-[0.4em] text-foam">ABYSSAL</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
              An illustrated two-page field guide to the deep ocean — from the last ray of light to the bottom of the
              Challenger Deep. Made for the curious.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">Navigate</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/"
                  className="group inline-flex items-center gap-1 text-sm text-foam/80 transition-colors hover:text-glow"
                >
                  The Surface
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  to="/descent"
                  className="group inline-flex items-center gap-1 text-sm text-foam/80 transition-colors hover:text-glow"
                >
                  The Descent
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">Sources</p>
            <ul className="mt-4 space-y-3 text-sm text-foam/80">
              {sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">Colophon</p>
            <p className="mt-4 text-sm leading-relaxed text-foam/80">
              Set in Fraunces, Space Grotesk &amp; Space Mono. Depths and figures are approximate, drawn from public
              surveys — the ocean keeps its secrets.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-foam/10 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mist sm:flex-row sm:items-center">
          <span>© 2025 Abyssal — an educational field guide</span>
          <span>
            0 m <span className="text-glow">→</span> 10,935 m
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="text-outline pointer-events-none absolute -bottom-[7vw] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-light leading-none"
      >
        ABYSSAL
      </div>
    </footer>
  );
}
