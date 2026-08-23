import { motion } from "framer-motion";
import { KeyRound, Zap, MapPin } from "lucide-react";

const cards = [
  {
    icon: KeyRound,
    title: "The Keys to the Castle.",
    desc: "We build your site and give you a simple, hidden dashboard to update your own hours and photos. No waiting on a developer.",
  },
  {
    icon: Zap,
    title: "Built for Speed.",
    desc: "We use modern web architecture so your site loads instantly on mobile, keeping your customers from bouncing.",
  },
  {
    icon: MapPin,
    title: "Local Synergy.",
    desc: "We are a local business supporting local businesses. No offshore call centers.",
  },
];

const Features = () => (
  <section id="how-it-works" className="relative py-28">
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center font-display text-3xl font-bold text-foreground sm:text-4xl"
      >
        The <span className="gradient-text">"No-Headache"</span> Pitch
      </motion.h2>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="glass group rounded-2xl p-8 transition-all hover:glow-shadow-sm"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <c.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
