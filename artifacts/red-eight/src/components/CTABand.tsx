import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

export default function CTABand() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-foreground overflow-hidden border-t border-border"
    >
      {/* Red radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-50%",
          left: "-10%",
          width: "60%",
          height: "200%",
          background:
            "radial-gradient(ellipse, rgba(220,38,38,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 text-xs font-bold tracking-widest uppercase text-primary mb-6"
        >
          <span className="block w-6 h-px bg-primary" />
          Start a project
          <span className="block w-6 h-px bg-primary" />
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight"
          style={{ color: "hsl(var(--background))" }}
        >
          Got a piece worth keeping?{" "}
          <em className="text-primary italic font-light block mt-1">
            Bring it in.
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-sm leading-relaxed max-w-xl mx-auto"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          Send us photos and dimensions and we'll come back with an honest
          assessment — what can be saved, what should be rebuilt, what it'll
          cost. No pressure either way.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors"
            data-testid="button-cta-quote"
          >
            Request a quote
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase border text-foreground hover:text-primary hover:border-primary transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "hsl(var(--background))" }}
            data-testid="button-cta-visit"
          >
            Visit the workshop
          </a>
        </motion.div>
      </div>
    </section>
  );
}
