import { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { lenisStore } from "./lib/lenis";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Descent from "./pages/Descent";

/** Reset scroll on every route change. */
function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    lenisStore.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/descent" element={<Descent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisStore.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  return (
    <HashRouter>
      <ScrollManager />
      <div className="relative min-h-screen bg-abyss-950 font-sans text-foam">
        <Navbar />
        <AnimatedRoutes />
        {/* film grain */}
        <div
          aria-hidden
          className="noise pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-overlay"
        />
      </div>
    </HashRouter>
  );
}
