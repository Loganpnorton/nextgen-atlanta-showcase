import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        scrolled
          ? "top-0 flex justify-center px-3 pt-4 sm:px-4 sm:pt-5"
          : "top-0 bg-transparent px-0 pt-0"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between transition-all duration-500 ease-in-out",
          scrolled
            ? "glass-pill w-full max-w-4xl px-4 py-2 sm:px-6 sm:py-2 md:px-7"
            : "container mx-auto w-full px-6 py-3 sm:py-3.5"
        )}
      >
        <a
          href="#"
          className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background h-10 sm:h-11 md:h-12"
          aria-label="NextGen Atlanta home"
        >
          <img
            src="/logo.png"
            alt="NextGen Atlanta"
            width={280}
            height={65}
            className={cn(
              "h-full w-auto object-contain object-left invert contrast-[1.08] drop-shadow-[0_0_12px_rgba(255,255,255,0.45)] transition-transform duration-500 ease-in-out origin-left",
              scrolled ? "scale-90" : "scale-100"
            )}
            decoding="async"
          />
        </a>

        <div className="hidden items-center gap-6 md:flex md:gap-8">
          <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How it Works
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </a>
          <a
            href="#mockup"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-shadow-sm"
          >
            Get a Free Mockup
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
