import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SERVICES = [
  {
    id: "1",
    number: "01",
    name: "Custom furniture builds",
    description:
      "Chairs, dining tables, banquettes and casegoods, designed and built to spec. Solid hardwood frames, joinery done by hand. We work from your drawings, your reference photos, or a brief on the back of a napkin.",
  },
  {
    id: "2",
    number: "02",
    name: "Frame restoration",
    description:
      "If the bones are good, we'll save it. Joint repair, re-gluing, re-doweling, new springs and webbing on traditional pieces. We work on chairs, sofas, antiques and the occasional unicorn. Honest assessment first.",
  },
  {
    id: "3",
    number: "03",
    name: "Reupholstery",
    description:
      "Strip-to-frame reupholstery on chairs, sofas, dining seats and headboards. Hand-cut fabric, hidden tacking, hand-stitched detail where it matters. The job takes as long as it takes — usually three to five weeks.",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      className="py-32 bg-card border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left label */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-bold tracking-widest uppercase text-primary mb-4">
                What we do
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                Three ways<br />
                we work.
              </h2>
              <p className="mt-6 text-muted-foreground text-sm leading-relaxed max-w-xs">
                Every project starts with an honest conversation about what
                you need, what's possible, and what it's going to cost.
              </p>
            </motion.div>
          </div>

          {/* Right service list */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-border">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group py-10 flex gap-8 items-start hover:bg-background/50 transition-colors duration-300 -mx-6 px-6"
                >
                  <span className="text-xs font-mono text-primary mt-1.5 shrink-0 w-8">
                    {service.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors"
                data-testid="link-services-contact"
              >
                Discuss your project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
