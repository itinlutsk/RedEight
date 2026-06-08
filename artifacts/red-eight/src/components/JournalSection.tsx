import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const BLOG_POSTS = [
  {
    id: "6f8b",
    name: "Why we only buy full-grain leather — and how to tell the difference",
    description:
      "There are four grades of leather sold to upholstery shops. Three of them shouldn't be in your living room. Here's how to read a hide before it ends up on a chair you'll regret in eighteen months.",
    author: "Mark Lockhart",
    tag: "Materials",
    readTime: "14 min",
    featured: true,
    imageUrl: "/images/blog/blog-leather.png",
    created: "March 14, 2025",
  },
  {
    id: "7c1d",
    name: "Eight-way hand-tied: what it is and why it costs what it costs",
    description:
      "The seat construction every upholsterer says they offer and few actually do. We break down the steps that make the price.",
    author: "Dave Reinhart",
    tag: "Technique",
    readTime: "9 min",
    featured: false,
    imageUrl: "/images/blog/blog-springs.png",
    created: "February 20, 2025",
  },
  {
    id: "8d2e",
    name: "When to restore, when to walk away: a frame-by-frame guide",
    description:
      "Not every old chair is worth saving. Here's what we look at first when a piece arrives for an assessment.",
    author: "Jamie Costa",
    tag: "Restoration",
    readTime: "6 min",
    featured: false,
    imageUrl: "/images/blog/blog-restoration.png",
    created: "January 15, 2025",
  },
];

export default function JournalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journal" ref={ref} className="py-32 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-4">
              Journal
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              From the bench.
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors group shrink-0"
            data-testid="link-journal-all"
          >
            All articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
              data-testid={`card-blog-${post.id}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden mb-6 bg-background border border-border">
                {post.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Featured
                  </div>
                )}
                <img
                  src={post.imageUrl}
                  alt={post.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-primary">
                    {post.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {post.readTime} read
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {post.name}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                  {post.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {post.author} · {post.created}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
