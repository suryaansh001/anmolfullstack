import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { FloatingWords } from "./FloatingWords";
import { Particles, PaperFragments } from "./Particles";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-cinematic"
    >
      <div className="absolute inset-0 bg-spotlight" />
      <PaperFragments />
      <FloatingWords />
      <Particles count={40} />

      <motion.div style={{ y: y1, opacity }} className="relative z-10 text-center px-6 max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-hand text-2xl md:text-3xl mb-6"
          style={{ color: "var(--maroon)" }}
        >
          ~ अक्षर ~
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.95] tracking-tight text-balance"
          style={{ color: "var(--ink)" }}
        >
          Where stories
          <br />
          <span className="italic font-light">stay </span>
          <span className="shimmer-text italic font-medium">alive.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-8 font-serif-lit text-2xl md:text-3xl text-foreground/70 tracking-wide"
        >
          Read. <span className="italic">Write.</span> Publish.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/sign-in"
            className="group relative inline-flex items-center px-8 h-12 rounded-full bg-gradient-ink text-primary-foreground text-sm tracking-wider uppercase shadow-ink overflow-hidden"
          >
            <span className="relative z-10">Start Writing</span>
            <span className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
          <a
            href="#discover"
            className="inline-flex items-center px-8 h-12 rounded-full border border-foreground/30 text-sm tracking-wider uppercase hover:border-foreground transition-colors"
          >
            Explore Stories
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] uppercase text-foreground/50"
      >
        scroll to enter the universe
        <div className="mt-3 mx-auto w-px h-12 bg-gradient-to-b from-foreground/40 to-transparent" />
      </motion.div>
    </section>
  );
}
