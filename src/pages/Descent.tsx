import { Fragment, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp, ChevronDown, Fish, Gauge, Sparkles, Thermometer } from "lucide-react";
import { zones, DEEPEST, type Zone } from "../data/zones";
import DepthGauge from "../components/DepthGauge";
import Reveal from "../components/Reveal";
import Particles from "../components/Particles";
import Footer from "../components/Footer";
import { useCountUp } from "../hooks/useCountUp";
import { scrollToTarget, lenisStore } from "../lib/lenis";

/* ---------- hero ---------- */

function HeroDescent() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="The sunlit surface of the open ocean seen from below"
          className="h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss-950/55 via-abyss-950/25 to-abyss-950" />
      </motion.div>
      <Particles count={18} />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-40 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-glow">
            <span className="h-px w-12 bg-glow/70" />
            Page two — 0 m to 10,935 m
          </p>
        </Reveal>

        <h1 className="mt-8 font-display text-[clamp(3.8rem,12vw,10rem)] font-light leading-[0.95] tracking-tight text-foam">
          <Reveal delay={0.05}>
            <span className="block">The</span>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="block italic text-glow">Descent.</span>
          </Reveal>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.25}>
            <p className="max-w-md text-base leading-relaxed text-mist sm:text-lg">
              Scroll to fall from the surface to the deepest point on Earth. Watch the gauge — the pressure climbs, the
              temperature falls, and the light goes out.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="font-mono text-[10px] uppercase leading-loose tracking-[0.25em] text-mist">
              Surface conditions
              <br />
              <span className="text-foam">1 atm · 20°C · 100% light</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.45}>
          <div className="mt-16 flex items-center justify-between border-t border-foam/15 pt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-mist sm:text-[11px]">
            <span className="hidden sm:block">Mariana Trench — Pacific Ocean</span>
            <span className="flex items-center gap-2">
              Scroll to descend
              <ChevronDown className="h-3.5 w-3.5 animate-bounce text-glow" />
            </span>
            <span className="hidden lg:block">Gauge active →</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- zone section ---------- */

function ZoneSection({ zone, index }: { zone: Zone; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const flip = index % 2 === 1;
  const LightIcon = zone.LightIcon;

  return (
    <section ref={ref} id={`zone-${zone.id}`} className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className={`text-outline pointer-events-none absolute top-6 select-none font-display text-[38vw] font-light leading-none lg:text-[23vw] ${
          flip ? "-left-[3vw]" : "-right-[3vw]"
        }`}
      >
        {zone.to.toLocaleString("en-US")}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* copy */}
          <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
            <Reveal>
              <p
                className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em]"
                style={{ color: zone.accent }}
              >
                Zone {zone.zone}
                <span className="h-px w-8" style={{ backgroundColor: `${zone.accent}80` }} />
                {zone.alias}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-5xl font-light leading-[1.02] tracking-tight text-foam sm:text-7xl">
                The {zone.name} <span style={{ color: zone.accent }}>Zone</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 font-display text-xl italic text-mist sm:text-2xl">{zone.tagline}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foam/75">{zone.description}</p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-foam/10 bg-abyss-950/40 p-4">
                  <Thermometer className="mb-3 h-4 w-4" style={{ color: zone.accent }} />
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">Temperature</p>
                  <p className="mt-1 font-mono text-sm text-foam">{zone.temp}</p>
                </div>
                <div className="rounded-xl border border-foam/10 bg-abyss-950/40 p-4">
                  <Gauge className="mb-3 h-4 w-4" style={{ color: zone.accent }} />
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">Pressure</p>
                  <p className="mt-1 font-mono text-sm text-foam">{zone.pressure}</p>
                </div>
                <div className="rounded-xl border border-foam/10 bg-abyss-950/40 p-4">
                  <LightIcon className="mb-3 h-4 w-4" style={{ color: zone.accent }} />
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mist">Light</p>
                  <p className="mt-1 font-mono text-sm text-foam">{zone.light}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-6 flex flex-wrap gap-2">
                {zone.creatures.map((c) => (
                  <span
                    key={c}
                    className="flex items-center gap-2 rounded-full border border-foam/10 bg-abyss-950/40 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-mist"
                  >
                    <Fish className="h-3 w-3" style={{ color: zone.accent }} />
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.38}>
              <div className="mt-9 border-l-2 pl-5" style={{ borderColor: zone.accent }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: zone.accent }}>
                  Field note
                </p>
                <p className="mt-2 font-display text-lg italic leading-snug text-foam/90">{zone.fact}</p>
              </div>
            </Reveal>
          </div>

          {/* image */}
          <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
            <Reveal delay={0.15} y={48}>
              <figure className="relative overflow-hidden rounded-2xl border border-foam/10">
                <motion.img
                  src={zone.image}
                  alt={`The ${zone.name} zone — ${zone.alias}`}
                  loading="lazy"
                  style={{ y }}
                  className="aspect-[4/3] w-full scale-[1.18] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss-950/70 via-transparent to-abyss-950/20" />
                <span
                  className="absolute left-4 top-4 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm"
                  style={{ borderColor: `${zone.accent}66`, color: zone.accent }}
                >
                  {zone.light} light
                </span>
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-foam/80">
                  <span>Zone {zone.zone}</span>
                  <span style={{ color: zone.accent }}>{zone.rangeLabel}</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- bioluminescence interlude ---------- */

function Bioluminescence() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(55% 45% at 30% 55%, rgba(34,211,238,0.10), transparent 70%)" }}
      />
      <Particles count={36} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-glow">
              <Sparkles className="h-3.5 w-3.5" />
              Interlude — the living light
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight text-foam sm:text-5xl">
              Three-quarters of deep-sea life <span className="italic text-glow">makes its own light.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foam/75">
              Bioluminescence is the language of the deep: lures for prey, flashes to startle predators, smokescreens
              of glowing mucus, signals to mates. Nearly all of it is blue — the colour water carries farthest.
              Animals cloaked in red simply vanish, invisible in a world without sun.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 border-l-2 border-glow pl-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-glow">Field note</p>
              <p className="mt-2 font-display text-lg italic leading-snug text-foam/90">
                The glowing lure of an anglerfish is not her own — it is a colony of luminous bacteria she cultivates
                in a pouch beneath her fishing rod.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15} y={48}>
          <figure className="relative overflow-hidden rounded-2xl border border-glow/20 shadow-[0_0_90px_-25px_rgba(34,211,238,0.5)]">
            <motion.img
              src="/images/biolum.jpg"
              alt="Bioluminescent jellyfish glowing in complete darkness"
              loading="lazy"
              style={{ y }}
              className="aspect-[4/3] w-full scale-[1.15] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss-950/60 to-transparent" />
            <figcaption className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foam/80">
              A galaxy of living lights — ~4,000 m
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- finale: Challenger Deep ---------- */

function Finale() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const depth = useCountUp(DEEPEST, inView, 2600);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 py-28 text-center"
    >
      <div
        aria-hidden
        className="text-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[38vw] font-light leading-none lg:text-[26vw]"
      >
        10,935
      </div>

      <div className="relative">
        <Reveal>
          <p className="flex items-center justify-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-glow">
            <span className="h-px w-10 bg-glow/60" />
            Field note — final entry
            <span className="h-px w-10 bg-glow/60" />
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 font-display text-[clamp(3.5rem,12vw,10rem)] font-light leading-none text-foam">
            {depth.toLocaleString("en-US")}
            <span className="ml-3 font-mono text-lg tracking-[0.3em] text-glow sm:text-2xl">M</span>
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <h3 className="mt-6 font-display text-3xl font-light italic text-foam/90 sm:text-5xl">
            The bottom of the world.
          </h3>
        </Reveal>
        <Reveal delay={0.26}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-mist">
            The Challenger Deep lies 10,935 metres beneath the Pacific. Set Everest down here and its summit would
            still drown under two kilometres of water. We hold better maps of the Moon — and of Mars — than of our own
            sea floor.
          </p>
        </Reveal>
        <Reveal delay={0.34}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToTarget(0)}
              className="group flex items-center gap-2.5 rounded-full bg-foam px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-abyss-950 transition-colors duration-300 hover:bg-glow"
            >
              Return to the surface
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
            <Link
              to="/"
              className="flex items-center gap-2.5 rounded-full border border-foam/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foam transition-colors duration-300 hover:border-glow/60 hover:text-glow"
            >
              Back to page one
            </Link>
          </div>
        </Reveal>
      </div>

      <p className="absolute bottom-8 left-1/2 w-full -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
        End of the line — Challenger Deep
      </p>
    </section>
  );
}

/* ---------- page ---------- */

export default function Descent() {
  const mainRef = useRef<HTMLElement | null>(null);
  const [searchParams] = useSearchParams();

  const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start start", "end end"] });
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.62, 0.84, 1],
    ["#0c3d55", "#083044", "#051f31", "#031320", "#010a12", "#000000"]
  );
  const barScale = useSpring(scrollYProgress, { stiffness: 70, damping: 22 });

  /* Deep-linking: /descent?zone=midnight scrolls straight to that zone. */
  useEffect(() => {
    const zone = searchParams.get("zone");
    if (!zone) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(`zone-${zone}`);
      if (!el) return;
      const lenis = lenisStore.current;
      if (lenis) lenis.scrollTo(el, { offset: -64, duration: 1.6 });
      else el.scrollIntoView({ behavior: "smooth" });
    }, 300);
    return () => window.clearTimeout(t);
  }, [searchParams]);

  return (
    <motion.main
      ref={mainRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      {/* the ocean darkening beneath you */}
      <motion.div aria-hidden className="fixed inset-0 -z-10" style={{ backgroundColor }} />

      <DepthGauge progress={scrollYProgress} />
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-glow/80"
        style={{ scaleX: barScale }}
      />

      <HeroDescent />
      {zones.map((zone, i) => (
        <Fragment key={zone.id}>
          <ZoneSection zone={zone} index={i} />
          {i === 2 && <Bioluminescence />}
        </Fragment>
      ))}
      <Finale />
      <Footer />
    </motion.main>
  );
}
