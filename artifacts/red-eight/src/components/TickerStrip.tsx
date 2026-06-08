const ITEMS = [
  "Custom builds",
  "Solid oak · ash · walnut",
  "Frame restoration",
  "Full-grain leather",
  "Reupholstery",
  "Hand-finished",
  "Trade welcome",
  "Toronto, Canada",
];

export default function TickerStrip() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div
      className="overflow-hidden border-y border-border bg-primary py-3"
      aria-hidden="true"
    >
      <div className="ticker-track flex gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-bold tracking-widest uppercase text-white shrink-0 flex items-center gap-12"
          >
            {item}
            <span className="block w-1 h-1 rounded-full bg-white/40" />
          </span>
        ))}
      </div>

      <style>{`
        .ticker-track {
          animation: ticker 28s linear infinite;
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
