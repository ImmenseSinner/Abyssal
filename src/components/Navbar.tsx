import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Waves, Menu, X, ArrowDown } from "lucide-react";

const links = [
  { to: "/", label: "The Surface" },
  { to: "/descent", label: "The Descent" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-foam/10 bg-abyss-950/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Abyssal — home">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-glow/40 bg-glow/10 text-glow transition-colors duration-300 group-hover:bg-glow group-hover:text-abyss-950">
              <Waves className="h-4 w-4" />
            </span>
            <span className="font-mono text-sm tracking-[0.4em] text-foam">ABYSSAL</span>
          </Link>

          <div className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative font-mono text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                  pathname === l.to ? "text-glow" : "text-mist hover:text-foam"
                }`}
              >
                {l.label}
                {pathname === l.to && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-2 left-0 h-px w-full bg-glow" />
                )}
              </Link>
            ))}
            <Link
              to="/descent"
              className="group flex items-center gap-2 rounded-full bg-foam px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-abyss-950 transition-colors duration-300 hover:bg-glow"
            >
              Descend
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-foam/20 text-foam transition-colors hover:border-glow/50 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-abyss-950/95 px-8 backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={l.to}
                  className={`block border-b border-foam/10 py-6 font-display text-5xl font-light transition-colors ${
                    pathname === l.to ? "text-glow" : "text-foam"
                  }`}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-mist"
            >
              A field guide to the deep ocean
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
