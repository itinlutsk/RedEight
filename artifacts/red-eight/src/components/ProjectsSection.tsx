import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    id: "p1",
    imageUrl: "/images/products/chair-holloway.png",
    mediaTag: "Restoration",
    tag: "Private commission",
    tagRed: true,
    title: "The Holloway wingback",
    desc: "A 1940s wingback rebuilt from the frame up — new eight-way ties, full horsehair pad, hand-stitched edges. Three generations in one chair.",
  },
  {
    id: "p2",
    imageUrl: "/images/products/chair-bellwoods.png",
    mediaTag: "Hospitality",
    tag: "Restaurant",
    tagRed: false,
    title: "Bellwoods Tavern",
    desc: "42 dining chairs and a 14-metre banquette run in full-grain saddle leather.",
  },
  {
    id: "p3",
    imageUrl: "/images/products/chair-annex.png",
    mediaTag: "Studio",
    tag: "Commercial",
    tagRed: false,
    title: "The Annex Library",
    desc: "Bespoke reading-room seating designed in-house. Solid white oak, mohair upholstery.",
  },
];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-widest text-primary mb-3"
            >
              04 · Recent projects
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight"
            >
              From the{" "}
              <em className="text-primary italic font-light">bench</em>
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#"
            className="text-sm font-bold tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors shrink-0"
            data-testid="link-projects-all"
          >
            All projects →
          </motion.a>
        </div>

        {/* Grid — first item spans 2 rows on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6">
          {/* Big card */}
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="group cursor-pointer md:row-span-2"
            data-testid={`card-project-${PROJECTS[0].id}`}
          >
            <div className="relative overflow-hidden bg-background border border-border mb-5 h-[55vw] md:h-full min-h-[340px]">
              <div className="absolute top-4 left-4 z-10 font-mono text-xs tracking-widest text-white/80 border border-white/20 px-2 py-1">
                {PROJECTS[0].mediaTag}
              </div>
              <img
                src={PROJECTS[0].imageUrl}
                alt={PROJECTS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="px-1">
              <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 ${
                PROJECTS[0].tagRed ? "bg-primary text-white" : "border border-border text-muted-foreground"
              }`}>
                {PROJECTS[0].tag}
              </span>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {PROJECTS[0].title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {PROJECTS[0].desc}
              </p>
            </div>
          </motion.article>

          {/* Two smaller cards */}
          {PROJECTS.slice(1).map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: (index + 1) * 0.12 }}
              className="group cursor-pointer"
              data-testid={`card-project-${project.id}`}
            >
              <div className="relative overflow-hidden bg-background border border-border mb-4 aspect-[4/3]">
                <div className="absolute top-4 left-4 z-10 font-mono text-xs tracking-widest text-white/80 border border-white/20 px-2 py-1">
                  {project.mediaTag}
                </div>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>
              <div className="px-1">
                <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider border border-border text-muted-foreground mb-2">
                  {project.tag}
                </span>
                <h3 className="text-xl font-serif font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
