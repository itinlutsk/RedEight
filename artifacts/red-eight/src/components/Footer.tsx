import logoSrc from "@assets/logo_1780934052141.jpg";

const NAV_LINKS = [
  { name: "Products", href: "#products" },
  { name: "Services", href: "#services" },
  { name: "Journal", href: "#journal" },
  { name: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-card border-t border-border pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 pb-16 border-b border-border">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-6">
              <img
                src={logoSrc}
                alt="Red Eight Workshop"
                className="h-12 w-12 object-cover"
              />
              <span className="font-bold tracking-widest uppercase text-sm text-foreground">
                Red Eight Workshop
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Bespoke hardwood furniture for residential, hospitality, and
              commercial interiors. Built in Toronto, Canada.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 md:col-start-6">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-6">
              Contact
            </p>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>Red Eight Workshop Inc.</p>
              <p>Toronto, Ontario, Canada</p>
            </address>
            <a
              href="mailto:hello@redeightworkshop.ca"
              className="inline-block mt-6 text-sm font-bold tracking-wider uppercase text-primary border-b border-primary pb-0.5 hover:text-primary/80 transition-colors"
              data-testid="link-footer-email"
            >
              hello@redeightworkshop.ca
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Red Eight Workshop Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="block w-4 h-0.5 bg-primary" />
            <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase pl-2">
              Toronto, Canada
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
