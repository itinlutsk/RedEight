import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    src: "/images/slider/slide-1.png",
    eyebrow: "Workshop · Est. 2014",
    headline: "Made by hand.",
    accent: "Built to outlast.",
    sub: "Custom furniture, frame restoration and reupholstery. Toronto, Canada.",
  },
  {
    id: 2,
    src: "/images/slider/slide-2.png",
    eyebrow: "Residential · Private commissions",
    headline: "Built for estates.",
    accent: "Designed to stay.",
    sub: "Bespoke hardwood pieces for private homes — from concept to delivery.",
  },
  {
    id: 3,
    src: "/images/slider/slide-3.png",
    eyebrow: "Hospitality · Contract grade",
    headline: "Restaurants trust us.",
    accent: "Repeatedly.",
    sub: "Contract-grade seating for high-volume hospitality. Stamped, serialised, guaranteed.",
  },
  {
    id: 4,
    src: "/images/slider/slide-4.png",
    eyebrow: "Craft · No shortcuts",
    headline: "Every joint.",
    accent: "Every surface.",
    sub: "Mortise & tenon. Full-grain leather. Hand-tied springs. The inside matches the outside.",
  },
];

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 50 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(id);
  }, [emblaApi]);

  const slide = SLIDES[selectedIndex];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
      {/* ── EMBLA TRACK ── */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {SLIDES.map((s) => (
            <div key={s.id} className="relative flex-[0_0_100%] h-full">
              <img
                src={s.src}
                alt={s.headline}
                className="w-full h-full object-cover"
              />
              {/* dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* ── TEXT OVERLAY ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center max-w-7xl mx-auto px-6 pt-20 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-primary mb-6">
              <span className="block w-6 h-px bg-primary" />
              {slide.eyebrow}
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.02] text-white max-w-3xl">
              {slide.headline}
              <br />
              <em className="text-primary font-light italic">{slide.accent}</em>
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/70 max-w-md leading-relaxed">
              {slide.sub}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
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
                className="inline-flex items-center gap-2 px-7 py-4 text-sm font-bold tracking-widest uppercase border border-white/30 text-white hover:border-primary hover:text-primary transition-colors"
                data-testid="button-hero-gallery"
              >
                See the work
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── SLIDE COUNTER + DOTS ── */}
      <div className="absolute bottom-8 left-0 right-0 z-10 max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* counter */}
        <span className="font-mono text-xs text-white/40 tracking-widest">
          {String(selectedIndex + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </span>

        {/* dot controls */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-400 rounded-none ${
                i === selectedIndex
                  ? "w-10 h-0.5 bg-primary"
                  : "w-4 h-0.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── META BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { label: "Founded", value: "Toronto · 2014" },
              { label: "Specialty", value: "Custom + restoration" },
              { label: "Lead time", value: "From 30 days" },
              { label: "Trade", value: "Welcome" },
            ].map((item) => (
              <div key={item.label} className="px-5 py-4">
                <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-0.5">
                  {item.label}
                </p>
                <p className="text-xs font-bold text-white/80 tracking-wide">
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
