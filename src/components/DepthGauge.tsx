import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Gauge, Thermometer, Sun } from "lucide-react";
import { DEEPEST } from "../data/zones";

const zoneAt = (d: number): string => {
  if (d < 200) return "SUNLIGHT ZONE";
  if (d < 1000) return "TWILIGHT ZONE";
  if (d < 4000) return "MIDNIGHT ZONE";
  if (d < 6000) return "ABYSSAL ZONE";
  return "HADAL ZONE";
};

const tempAt = (d: number): number => {
  const pts: Array<[number, number]> = [
    [0, 20],
    [200, 12],
    [1000, 4],
    [4000, 2],
    [DEEPEST, 1],
  ];
  if (d <= 0) return 20;
  for (let i = 1; i < pts.length; i++) {
    if (d <= pts[i][0]) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      return y0 + ((d - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return 1;
};

const lightAt = (d: number): string => {
  if (d < 5) return "100%";
  if (d < 200) return `${Math.max(1, Math.round(100 - d * 0.495))}%`;
  if (d < 1000) return "TRACE";
  return "0%";
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Fixed side-HUD: live depth, zone, pressure, temperature and light. */
export default function DepthGauge({ progress }: { progress: MotionValue<number> }) {
  const smooth = useSpring(progress, { stiffness: 60, damping: 20, mass: 0.6 });
  const depth = useTransform(smooth, (v) => clamp01(v) * DEEPEST);
  const depthText = useTransform(depth, (v) => Math.round(v).toLocaleString("en-US"));
  const zoneText = useTransform(depth, zoneAt);
  const pressureText = useTransform(depth, (d) => `${Math.round(1 + d / 10).toLocaleString("en-US")} ATM`);
  const tempText = useTransform(depth, (d) => `${tempAt(d).toFixed(1)}°C`);
  const lightText = useTransform(depth, lightAt);
  const dotTop = useTransform(smooth, (v) => `${clamp01(v) * 100}%`);

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <div className="flex flex-col items-end gap-4 rounded-2xl border border-foam/10 bg-abyss-950/60 px-5 py-6 backdrop-blur-md">
        <div className="text-right">
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist">Depth</p>
          <p className="mt-1 font-mono text-3xl leading-none text-glow">
            <motion.span>{depthText}</motion.span>
          </p>
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-mist">metres</p>
        </div>

        <div className="relative my-1 h-44 w-px bg-foam/15">
          <motion.div
            className="absolute left-0 top-0 h-full w-px origin-top bg-glow"
            style={{ scaleY: smooth }}
          />
          <motion.div
            className="absolute -left-[3px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-glow shadow-[0_0_10px_2px_rgba(110,231,255,0.7)]"
            style={{ top: dotTop }}
          />
        </div>

        <motion.p className="text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em] text-foam">
          {zoneText}
        </motion.p>

        <div className="space-y-2.5 border-t border-foam/10 pt-4 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-mist">
          <p className="flex items-center justify-end gap-2">
            <Gauge className="h-3 w-3 text-glow/70" />
            <motion.span className="text-foam">{pressureText}</motion.span>
          </p>
          <p className="flex items-center justify-end gap-2">
            <Thermometer className="h-3 w-3 text-glow/70" />
            <motion.span className="text-foam">{tempText}</motion.span>
          </p>
          <p className="flex items-center justify-end gap-2">
            <Sun className="h-3 w-3 text-glow/70" />
            <motion.span className="text-foam">{lightText}</motion.span>
          </p>
        </div>
      </div>
    </div>
  );
}
