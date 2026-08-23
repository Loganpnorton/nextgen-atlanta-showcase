import { motion } from "framer-motion";
import { Check } from "lucide-react";

const items = [
  "Fully Custom Design",
  "Mobile Optimized",
  "SSL & Secure Hosting",
  "Simple Admin Dashboard",
  "Complete Asset Ownership",
];

const Pricing = () => (
  <section id="pricing" className="relative py-28">
    <div className="container mx-auto flex justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="glass w-full max-w-md rounded-3xl p-10 text-center"
      >
        <span className="inline-block rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          Founding Member Beta
        </span>

        <div className="mt-8">
          <span className="font-display text-5xl font-bold text-foreground">$400</span>
          <span className="ml-1 text-lg text-muted-foreground">Setup</span>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          + <span className="font-medium text-foreground">$49/mo</span> for premium hosting & admin access.
        </p>

        <ul className="mt-8 space-y-4 text-left">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-3 text-sm text-secondary-foreground">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>

        <a
          href="#mockup"
          className="mt-10 inline-block w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-shadow-sm"
        >
          Lock in Beta Pricing
        </a>
      </motion.div>
    </div>
  </section>
);

export default Pricing;
