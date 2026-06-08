import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const STANDARDS = [
  {
    num: "01",
    title: "Solid frames",
    desc: "No MDF in load-bearing parts. Mortise & tenon, doweled or pegged. Kiln-dried hardwood only.",
  },
  {
    num: "02",
    title: "Eight-way ties",
    desc: "Hand-tied springs on traditional pieces. Sinuous wire only where it makes sense. Webbing tested under load.",
  },
  {
    num: "03",
    title: "Honest materials",
    desc: "Full-grain leather, natural-fibre fabric, oil finishes. We tell you what's underneath before you sign.",
  },
  {
    num: "04",
    title: "Finished out of sight",
    desc: "The bottom of the frame matters too. Sanded, stained, stamped with our shop mark and serial number.",
  },
];

export default function CraftStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 bg-card border-t border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-widest text-primary mb-3"
          >
            02 · The four standards
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-bold text-foreground max-w-sm mx-auto leading-tight"
          >
            How every piece{" "}
            <em className="text-primary italic font-light">
              leaves the workshop
            </em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border border border-border">
          {STANDARDS.map((item, index) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="p-8 flex flex-col gap-3 group hover:bg-background/60 transition-colors duration-300"
            >
              <p className="text-xs font-mono tracking-widest text-primary">
                {item.num}
              </p>
              <h4 className="text-xl font-serif font-bold text-foreground mt-1 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
