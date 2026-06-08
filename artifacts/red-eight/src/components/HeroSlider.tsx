import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const slides = [
  { id: 1, src: "/images/hero/hero-1.png" },
  { id: 2, src: "/images/hero/hero-2.png" },
  { id: 3, src: "/images/hero/hero-3.png" },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {/* Slider */}
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative flex-[0_0_100%] h-full">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <img
                src={slide.src}
                alt={`Hero ${slide.id}`}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Canadian Precision.<br/>
            <span className="text-primary italic font-light">Enduring Craft.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light tracking-wide">
            Bespoke hardwood furniture for estates, restaurants, and commercial spaces. Built to last a lifetime.
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-6">
            <a href="#products" className="bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-primary/90 transition-colors">
              Explore the Collection
            </a>
          </div>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-12 h-1 transition-colors duration-300 ${
              index === selectedIndex ? "bg-primary" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
