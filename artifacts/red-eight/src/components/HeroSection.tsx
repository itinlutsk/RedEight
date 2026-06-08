import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-background pt-24 pb-0 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
          {/* LEFT — text */}
          <div className="py-12 lg:py-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-primary mb-6"
            >
              <span className="block w-6 h-px bg-primary" />
              Workshop · Est. 2014
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-[1.05] text-foreground"
            >
              Made by hand.{" "}
              <em className="text-primary font-light italic not-italic block">
                Built to outlast.
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-7 text-base text-muted-foreground leading-relaxed max-w-md"
            >
              Red Eight is a small Toronto workshop building custom furniture,
              restoring frames and reupholstering pieces worth keeping. We
              don't do trend cycles. We do work that gets passed down.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#services"
                className="inline-flex items-center gap-3 bg-primary text-white px-7 py-4 text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors"
                data-testid="button-hero-start"
              >
                Start a project
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-bold tracking-widest uppercase border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                data-testid="button-hero-gallery"
              >
                See the work
              </a>
            </motion.div>
          </div>

          {/* RIGHT — image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative h-[60vh] lg:h-[85vh] overflow-hidden"
          >
            <img
              src="/images/hero/hero-1.png"
              alt="Craftsman shaping a solid oak chair frame in the Red Eight workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            <div className="absolute bottom-5 left-5 font-mono text-xs tracking-widest uppercase text-white/70 border border-white/20 px-3 py-1.5">
              In the workshop · No. 042
            </div>
            {/* Red corner accent */}
            <div className="absolute top-0 right-0 w-16 h-1 bg-primary" />
            <div className="absolute top-0 right-0 w-1 h-16 bg-primary" />
          </motion.div>
        </div>
      </div>

      {/* META BAR */}
      <div className="border-t border-border mt-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { label: "Founded", value: "Toronto · 2014" },
              { label: "Specialty", value: "Custom + restoration" },
              { label: "Lead time", value: "From 30 days" },
              { label: "Trade", value: "Welcome" },
            ].map((item) => (
              <div key={item.label} className="px-6 py-5">
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  {item.label}
                </p>
                <p className="text-sm font-bold text-foreground tracking-wide">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
