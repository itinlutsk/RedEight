import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const REVIEWS = [
  {
    id: "r1",
    quote:
      "They saved a chair my grandmother had reupholstered fifty years ago. Down to the original spring system. I have it in my living room and it will outlive me.",
    name: "Sarah W.",
    role: "Private client · Toronto",
  },
  {
    id: "r2",
    quote:
      "We ordered forty-two chairs and a banquette. They arrived on the day they said they would, finished the way they said they'd be. That's harder to find than it should be.",
    name: "Marco D.",
    role: "Operations · Bellwoods Group",
  },
  {
    id: "r3",
    quote:
      "I send all my restoration clients to Red Eight. They tell people the truth about what can and can't be saved, and they price it fairly.",
    name: "Helen K.",
    role: "Interior designer · Studio HKD",
  },
];

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-widest text-primary mb-3"
          >
            05 · Word of mouth
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight"
          >
            What clients say{" "}
            <em className="text-primary italic font-light">after delivery</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-card border-t-[3px] border-t-primary border border-b-border border-l-border border-r-border p-8 flex flex-col gap-6"
              data-testid={`card-review-${review.id}`}
            >
              <p className="font-serif text-lg text-foreground leading-relaxed font-normal flex-1">
                <span className="text-primary text-2xl leading-none mr-0.5">"</span>
                {review.quote}
              </p>
              <div className="pt-5 border-t border-border">
                <p className="text-sm font-bold text-foreground">{review.name}</p>
                <p className="text-xs font-mono tracking-widest uppercase text-muted-foreground mt-0.5">
                  {review.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
