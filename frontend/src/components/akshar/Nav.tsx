import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";

export function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(
    scrollY,
    [0, 120],
    ["oklch(0.953 0.022 85 / 0)", "oklch(0.953 0.022 85 / 0.85)"],
  );
  const blur = useTransform(scrollY, [0, 120], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.header
      style={{ background: bg, backdropFilter: blur as unknown as string }}
      className="fixed top-0 inset-x-0 z-50 border-b border-transparent transition-colors"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span
            className="font-display text-2xl tracking-tight text-ink"
            style={{ color: "var(--ink)" }}
          >
            अ<span className="text-foreground">kshar</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#discover" className="ink-underline text-foreground/80 hover:text-foreground">
            Discover
          </a>
          <a href="#poetry" className="ink-underline text-foreground/80 hover:text-foreground">
            Poetry
          </a>
          <a href="#screenplay" className="ink-underline text-foreground/80 hover:text-foreground">
            Screenplay
          </a>
          <a href="#languages" className="ink-underline text-foreground/80 hover:text-foreground">
            Languages
          </a>
          <Link to="/dashboard" className="ink-underline text-foreground/80 hover:text-foreground">
            Write
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/sign-in"
            className="hidden sm:inline-flex items-center px-4 h-9 rounded-full border border-foreground/20 text-sm hover:bg-foreground hover:text-background transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
