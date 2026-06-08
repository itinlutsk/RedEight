import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const STATS = [
  { value: 420, suffix: "+", label: "Pieces built" },
  { value: 11, suffix: "", label: "Years in the trade" },
  { value: 8, suffix: "", label: "Craftspeople" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1400;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT — image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[5/6] overflow-hidden">
              <img
                src="/images/about/workshop-team.png"
                alt="Two craftsmen at work in the Red Eight workshop"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            {/* Red frame accent */}
            <div
              className="absolute pointer-events-none border border-primary"
              style={{
                bottom: "-18px",
                right: "-18px",
                width: "60%",
                height: "60%",
                zIndex: -1,
              }}
            />
          </motion.div>

          {/* RIGHT — text */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="text-xs font-mono tracking-widest text-primary mb-4">
              03 · The workshop
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
              A small shop.{" "}
              <em className="text-primary italic font-light">By design.</em>
            </h2>

            <div className="w-12 h-px bg-primary mb-6" />

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Red Eight was started in 2014 by two upholsterers who'd spent
              fifteen years working other people's brands. We wanted a shop
              where every piece was touched by the same hands from the day the
              lumber arrived to the day it was loaded on the truck.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              That's still how we work. Eight craftspeople. One floor. No
              middlemen, no sub-contracted production, no shortcuts we
              wouldn't put our names on.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 border border-border text-sm font-bold tracking-widest uppercase text-foreground hover:border-primary hover:text-primary transition-colors"
              data-testid="link-about-story"
            >
              The full story
            </a>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-1">
                    <CountUp
                      target={stat.value}
                      suffix={stat.suffix}
                      active={isInView}
                    />
                  </div>
                  <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
