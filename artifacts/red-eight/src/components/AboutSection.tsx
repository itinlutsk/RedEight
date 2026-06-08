import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "2009", label: "Founded in Toronto" },
  { value: "100%", label: "Solid hardwood" },
  { value: "8", label: "People on the bench" },
  { value: "3–5 wks", label: "Typical lead time" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-6">
              The workshop
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-8">
              Built by hand.<br />
              Built to last.
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Red Eight Workshop is a Toronto-based furniture studio. We
                design and build bespoke hardwood furniture for residential
                interiors, hospitality projects, and commercial spaces across
                Canada.
              </p>
              <p>
                Every piece that leaves this shop is built the same way —
                mortise and tenon joints, hand-tied springs, full-grain
                materials, hand-finished surfaces. We don't cut corners and we
                don't use shortcuts that save time today and fail in three
                years.
              </p>
              <p>
                If you're looking for cheap and fast, we're not your shop. If
                you're building something worth keeping, we'd like to talk.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-block mt-10 text-sm font-bold tracking-widest uppercase text-primary border-b border-primary pb-1 hover:pb-0 transition-all"
              data-testid="link-about-contact"
            >
              Get in touch
            </a>
          </motion.div>

          {/* Right — stats + accent */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary opacity-10" />
              <div className="grid grid-cols-2 gap-px bg-border">
                {STATS.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-card p-8"
                  >
                    <div className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold tracking-widest uppercase text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-1 bg-primary" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
