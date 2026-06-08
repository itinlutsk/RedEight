import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
  { id: "b8c2d1e4", name: "The Geary", description: "A solid-oak lounge chair with a curved arm-rail and webbed seat platform. Eight finish options. Mortise & tenon joinery, hand-finished.", color: ["#C4A882", "#2C2520", "#8B6F47", "#1F1D1B"], category: "Seating", type: "Residential", imageUrl: "/images/products/chair-geary.png", sku: "No. R8-101 · Armchair", badge: "Bestseller", badgeType: "red" },
  { id: "d3e4f5a6", name: "The Holloway", description: "A traditional wingback with hand-tied springs. Available restored from existing frames or built new. Solid hardwood frame.", color: ["#7B4F35", "#3C342D", "#A8907A"], category: "Seating", type: "Residential", imageUrl: "/images/products/chair-holloway.png", sku: "No. R8-102 · Wingback", badge: "Restoration line", badgeType: "" },
  { id: "e7f8a9b1", name: "The Bellwoods", description: "Designed for high-volume hospitality. Ash frame, full-grain leather seat, contract-grade. Stamped and serialised.", color: ["#7B4F35", "#2C2520", "#5F4E3A"], category: "Seating", type: "Restaurant", imageUrl: "/images/products/chair-bellwoods.png", sku: "No. R8-103 · Dining chair", badge: "", badgeType: "" },
  { id: "f1a2b3c4", name: "The Annex Club", description: "A reading chair. Down-and-feather seat, hand-stitched edge roll. Built to be sat in for hours. White oak frame.", color: [], category: "Seating", type: "Residential", imageUrl: "/images/products/chair-annex.png", sku: "No. R8-104 · Club chair", badge: "", badgeType: "" },
  { id: "a2b3c4d5", name: "The Geary Table", description: "Solid walnut or oak top, trestle base. Custom lengths from 180–360 cm. Hand-finished with oil or lacquer.", color: [], category: "Tables", type: "Residential", imageUrl: "/images/products/table-geary.png", sku: "No. R8-201 · Dining table", badge: "", badgeType: "" },
  { id: "b3c4d5e6", name: "The Bistro", description: "Cast-iron base, solid oak top. 60, 70 or 80 cm round. Stackable in storage. Ideal for hospitality settings.", color: [], category: "Tables", type: "Restaurant", imageUrl: "/images/products/table-bistro.png", sku: "No. R8-202 · Bistro table", badge: "", badgeType: "" },
  { id: "c4d5e6f7", name: "The Geary Sideboard", description: "Solid hardwood, hand-cut dovetails, soft-close hardware. Three lengths available. Brass detail hardware.", color: [], category: "Casegoods", type: "Residential", imageUrl: "/images/products/sideboard-geary.png", sku: "No. R8-301 · Sideboard", badge: "", badgeType: "" },
];

export default function ProductsSection() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      '(min-width: 768px)': { active: false }
    }
  });

  return (
    <section id="products" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-sm font-bold tracking-widest uppercase text-primary mb-4">Collection</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Standard Issue</h3>
        </div>
        <a href="#" className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-muted-foreground hover:text-primary transition-colors group">
          View full catalog
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="md:hidden overflow-hidden -mx-6 px-6" ref={emblaRef}>
        <div className="flex gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="flex-[0_0_85%] min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-secondary border border-border">
        {product.badge && (
          <div className={`absolute top-4 left-4 z-10 px-3 py-1 text-xs font-bold uppercase tracking-wider ${
            product.badgeType === "red" ? "bg-primary text-white" : "bg-background text-foreground"
          }`}>
            {product.badge}
          </div>
        )}
        <div className="absolute inset-0 bg-background/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxYjFiMWIiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2NjYiIGR5PSIuM2VtIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Qcm9kdWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';
          }}
        />
      </div>
      <div>
        <p className="text-xs font-mono text-muted-foreground mb-2">{product.sku}</p>
        <h4 className="text-2xl font-serif font-bold text-foreground mb-2">{product.name}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>
    </div>
  );
}
