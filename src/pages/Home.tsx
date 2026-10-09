import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Fish, Ruler, Sparkles } from "lucide-react";
import { zones, timeline } from "../data/zones";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import Particles from "../components/Particles";
import Footer from "../components/Footer";
import { useCountUp } from "../hooks/useCountUp";
import { scrollToTarget } from "../lib/lenis";

/* ---------- shared bits ---------- */

function SectionHeading({
  index,
  label,
  title,
  sub,
}: {
  index: string;
  label: string;
  title: ReactNode;
  sub?: string;
}) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em]">
          <span className="text-glow">{index}</span>
          <span className="h-px w-10 bg-glow/50" />
          <span className="text-mist">{label}</span>
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight text-foam sm:text-6xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-mist">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1]);

  return (
    <section ref={ref} className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Sunlight piercing the deep blue ocean"
          className="h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss-950/70 via-abyss-950/25 to-abyss-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss-950/55 to-transparent" />
      </motion.div>
      <Particles count={26} />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-40 sm:px-8">
        <Reveal>
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-glow/70" />
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-glow">
              An illustrated field guide to the deep ocean
            </p>
          </div>
        </Reveal>

        <h1 className="font-display text-[clamp(3.4rem,11.5vw,10rem)] font-light leading-[0.92] tracking-tight text-foam">
          <Reveal delay={0.05}>
            <span className="block">The last</span>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="block italic text-glow">great</span>
          </Reveal>
          <Reveal delay={0.25}>
            <span className="block">wilderness.</span>
          </Reveal>
        </h1>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.35}>
            <p className="max-w-md text-base leading-relaxed text-mist sm:text-lg">
              Five zones. Ten thousand metres. The ocean is the largest habitat on Earth — and we have mapped only a
              fraction of it.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/descent"
                className="group flex items-center gap-2.5 rounded-full bg-foam px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-abyss-950 transition-colors duration-300 hover:bg-glow"
              >
                Begin the descent
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </Link>
              <button
                onClick={() => scrollToTarget("#zones", -72)}
                className="group flex items-center gap-2.5 rounded-full border border-foam/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foam transition-colors duration-300 hover:border-glow/60 hover:text-glow"
              >
                Meet the five zones
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.55}>
          <div className="mt-16 flex items-center justify-between border-t border-foam/15 pt-5 font-mono text-[9px] uppercase tracking-[0.25em] text-mist sm:text-[11px]">
            <span className="hidden sm:block">11°22′ N · 142°36′ E — Challenger Deep</span>
            <span className="flex items-center gap-2">
              Scroll to descend
              <ChevronDown className="h-3.5 w-3.5 animate-bounce text-glow" />
            </span>
            <span>Sea level · 0 m</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- overview + stats ---------- */

const stats = [
  { value: 71, suffix: "%", label: "of Earth's surface is ocean" },
  { value: 3688, suffix: " m", label: "average depth of the global ocean" },
  { value: 10935, suffix: " m", label: "deepest surveyed point — Challenger Deep" },
  { value: 80, suffix: "%+", label: "of the ocean unmapped & unexplored" },
];

function Stat({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const n = useCountUp(value, active);
  return (
    <div className="bg-abyss-950 p-6 sm:p-8">
      <p className="font-display text-4xl font-light text-foam sm:text-5xl">
        {n.toLocaleString("en-US")}
        <span className="text-glow">{suffix}</span>
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-mist">{label}</p>
    </div>
  );
}

function Overview() {
  const statsRef = useRef<HTMLDivElement | null>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] lg:sticky lg:top-28">
                <span className="text-glow">01</span>
                <span className="h-px w-10 bg-glow/50" />
                <span className="text-mist">The overview</span>
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="font-display text-3xl font-light leading-[1.25] tracking-tight text-foam sm:text-[2.6rem] sm:leading-[1.18]">
                Below the reach of sunlight lies the <em className="text-glow">largest habitat on Earth</em> — a cold,
                lightless world covering most of the planet, mapped in less detail than the surface of Mars.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-mist">
                Abyssal is a two-page field guide to that world. Page one maps the five zones of the open ocean; page
                two takes you down through all of them — from the last photon of light to the bottom of the Challenger
                Deep.
              </p>
            </Reveal>

            <div
              ref={statsRef}
              className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foam/10 bg-foam/10 lg:grid-cols-4"
            >
              {stats.map((s) => (
                <Stat key={s.label} {...s} active={statsInView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- zones index ---------- */

function ZonesIndex() {
  return (
    <section id="zones" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          label="The five zones"
          title={
            <>
              Five worlds, <span className="italic text-glow">one ocean.</span>
            </>
          }
          sub="The open ocean is layered by depth like a planet stacked inside a planet. Each zone has its own light, its own pressure, its own cast of creatures. Pick one — and fall in."
        />

        <div className="mt-14 border-t border-foam/10">
          {zones.map((z, i) => (
            <Reveal key={z.id} delay={i * 0.04} y={24}>
              <Link
                to={`/descent?zone=${z.id}`}
                className="group relative flex items-center gap-5 border-b border-foam/10 py-6 transition-colors duration-300 hover:bg-foam/[0.03] sm:gap-8 sm:py-8"
              >
                <span className="w-8 shrink-0 font-mono text-xs text-mist sm:w-10">{z.zone}</span>
                <div className="hidden w-32 shrink-0 overflow-hidden rounded-lg sm:block">
                  <img
                    src={z.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-3xl font-light text-foam transition-all duration-500 group-hover:translate-x-2 group-hover:text-glow sm:text-5xl">
                    {z.name}
                    <span className="ml-2 hidden text-2xl italic text-mist/50 sm:inline">zone</span>
                  </h3>
                  <p className="mt-1.5 truncate font-mono text-[10px] uppercase tracking-[0.22em] text-mist">
                    {z.alias} · {z.rangeLabel} · {z.tagline}
                  </p>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="font-mono text-xs text-glow">{z.rangeLabel}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-mist">
                    {z.creatures.length} residents
                  </p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-foam/20 text-foam transition-all duration-300 group-hover:border-glow group-hover:bg-glow group-hover:text-abyss-950">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- field notes: anglerfish ---------- */

function FieldNote() {
  const chips = [
    { icon: Fish, label: "Depth", value: "1,000 – 4,000 m" },
    { icon: Ruler, label: "Size", value: "up to ~1.2 m" },
    { icon: Sparkles, label: "Light source", value: "living bacteria" },
  ];

  return (
    <section className="border-t border-foam/10 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal y={48}>
          <figure className="relative overflow-hidden rounded-2xl border border-glow/20 shadow-[0_0_90px_-25px_rgba(34,211,238,0.45)]">
            <img
              src="/images/creature-anglerfish.jpg"
              alt="A deep-sea anglerfish with her glowing lure"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss-950/60 to-transparent" />
            <figcaption className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-foam/80">
              Melanocetus johnsonii — midnight zone
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <p className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em]">
              <span className="text-glow">03</span>
              <span className="h-px w-10 bg-glow/50" />
              <span className="text-mist">Field notes</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="mt-6 font-display text-4xl font-light tracking-tight text-foam sm:text-6xl">
              The anglerfish.
            </h3>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-4 font-display text-xl italic text-mist sm:text-2xl">A lure in the dark.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foam/75">
              In the midnight zone, the only light is the light you make. The female anglerfish carries a glowing
              lure — a colony of luminous bacteria — and dangles it before jaws full of daggers. Males are a fraction
              of her size, and fuse to her body for life. It is a world of absolutes: total darkness, crushing
              pressure, and meals measured in months.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {chips.map((c) => (
                <div key={c.label} className="rounded-xl border border-foam/10 bg-abyss-900/50 p-4">
                  <c.icon className="mb-3 h-4 w-4 text-glow" />
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-mist">{c.label}</p>
                  <p className="mt-1 font-mono text-xs text-foam sm:text-sm">{c.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- chronology ---------- */

function Chronology() {
  return (
    <section className="border-t border-foam/10 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              index="04"
              label="Chronology"
              title={
                <>
                  A short history of <span className="italic text-glow">going down.</span>
                </>
              }
              sub="For most of history, the deep sea was assumed to be a lifeless desert. It took a hundred and fifty years of stubborn machines to prove otherwise."
            />
          </div>
        </div>
        <div className="lg:col-span-8">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.05} y={24}>
              <div className="relative border-l border-foam/10 pb-12 pl-10 last:pb-0">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-glow shadow-[0_0_12px_2px_rgba(110,231,255,0.6)]" />
                <p className="font-mono text-sm tracking-[0.2em] text-glow">{t.year}</p>
                <h4 className="mt-2 font-display text-2xl font-light text-foam sm:text-3xl">{t.title}</h4>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA + depth check ---------- */

const landmarks = [
  { name: "Statue of Liberty", depth: 93, final: false },
  { name: "Eiffel Tower", depth: 330, final: false },
  { name: "Burj Khalifa", depth: 828, final: false },
  { name: "Everest, inverted", depth: 8849, final: false },
  { name: "Challenger Deep", depth: 10935, final: true },
];

function CallToDescend() {
  return (
    <section className="relative overflow-hidden border-t border-foam/10 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(55% 45% at 72% 35%, rgba(34,211,238,0.10), transparent 70%)" }}
      />
      <Particles count={22} />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            index="05"
            label="Begin"
            title={
              <>
                Start at the <span className="italic text-glow">surface.</span>
              </>
            }
            sub="The full descent — from the last photon of sunlight to the bottom of the Challenger Deep — lives on page two. A live depth gauge tracks every metre of the fall."
          />
          <Reveal delay={0.2}>
            <Link
              to="/descent"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-glow px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-abyss-950 transition-all duration-300 hover:bg-foam"
            >
              Begin the descent
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-mist">
              Full descent · live gauge · ~2 minutes of scrolling
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={48}>
          <div className="rounded-2xl border border-foam/10 bg-abyss-900/50 p-6 backdrop-blur-sm sm:p-8">
            <div className="flex items-center gap-3">
              <Ruler className="h-4 w-4 text-glow" />
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-foam">Depth check</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              If you dropped the world's landmarks into the Challenger Deep, they would settle like this.
            </p>
            <div className="mt-8 space-y-6">
              {landmarks.map((l, i) => {
                const pct = (l.depth / 10935) * 100;
                return (
                  <div key={l.name}>
                    <div className="mb-2 flex items-baseline justify-between gap-4">
                      <span className={`text-sm ${l.final ? "text-glow" : "text-foam/80"}`}>{l.name}</span>
                      <span className="font-mono text-xs text-mist">{l.depth.toLocaleString("en-US")} m</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-foam/10">
                      <motion.div
                        className={`h-full rounded-full ${l.final ? "bg-glow" : "bg-foam/40"}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.3, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- page ---------- */

const marqueeItems = [
  "The deep ocean is Earth's largest habitat",
  "More than 80% of the ocean is unmapped & unexplored",
  "Average depth — 3,688 metres",
  "Deepest point — 10,935 metres",
  "94% of Earth's living species live in the ocean",
  "Everest would drown in the Challenger Deep",
];

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      <Hero />
      <Marquee items={marqueeItems} />
      <Overview />
      <ZonesIndex />
      <FieldNote />
      <Chronology />
      <CallToDescend />
      <Footer />
    </motion.main>
  );
}
