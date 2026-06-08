import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    id: "1",
    number: "Service 01",
    tag: "No. 01",
    name: "Custom furniture builds",
    description:
      "Chairs, dining tables, banquettes and casegoods, designed and built to spec. Solid hardwood frames, joinery done by hand. We work from your drawings, your reference photos, or a brief on the back of a napkin.",
    imageUrl: "/images/services/custom-builds.png",
    linkLabel: "Custom builds",
  },
  {
    id: "2",
    number: "Service 02",
    tag: "No. 02",
    name: "Frame restoration",
    description:
      "If the bones are good, we'll save it. Re-springing, re-webbing, joint repair and structural rebuilds on chairs, sofas and antiques. Honest assessment first — we'll tell you if it isn't worth the cost.",
    imageUrl: "/images/services/restoration.png",
    linkLabel: "Restoration",
  },
  {
    id: "3",
    number: "Service 03",
    tag: "No. 03",
    name: "Reupholstery",
    description:
      "Hand-cut leather and fabric work, hand-stitched detailing, hidden tacking. Strip-to-frame reupholstery on chairs, sofas, dining seats and headboards. We finish the inside the way we finish the outside.",
    imageUrl: "/images/services/reupholstery.png",
    linkLabel: "Reupholstery",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={ref} className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-widest text-primary mb-3"
            >
              01 · What we make
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight"
            >
              Three things,{" "}
              <em className="text-primary italic font-light">done properly</em>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm text-muted-foreground leading-relaxed max-w-sm lg:text-right"
          >
            We focus on what we're good at. Every job goes through the same
            hands, from the first conversation to the day it leaves the shop.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
              data-testid={`card-service-${service.id}`}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-card border border-border mb-6">
                <div className="absolute top-4 left-4 z-10 font-mono text-xs tracking-widest text-white/80 border border-white/20 px-2 py-1">
                  {service.tag}
                </div>
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Body */}
              <div>
                <p className="text-xs font-mono tracking-widest text-primary mb-2">
                  {service.number}
                </p>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary group-hover:gap-3 transition-all duration-300">
                  {service.linkLabel}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 border border-border text-sm font-bold tracking-widest uppercase text-foreground hover:border-primary hover:text-primary transition-colors"
            data-testid="button-services-all"
          >
            All services
          </a>
        </div>
      </div>
    </section>
  );
}
