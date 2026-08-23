import { motion } from "framer-motion";

const STARFIELD = [
  { top: 8, left: 12, size: 1.1, opacity: 0.35 },
  { top: 14, left: 78, size: 0.8, opacity: 0.25 },
  { top: 22, left: 44, size: 1.2, opacity: 0.3 },
  { top: 31, left: 88, size: 0.7, opacity: 0.4 },
  { top: 18, left: 6, size: 0.9, opacity: 0.2 },
  { top: 42, left: 22, size: 1, opacity: 0.35 },
  { top: 55, left: 65, size: 0.8, opacity: 0.28 },
  { top: 62, left: 38, size: 1.1, opacity: 0.32 },
  { top: 71, left: 92, size: 0.6, opacity: 0.22 },
  { top: 48, left: 52, size: 1, opacity: 0.38 },
  { top: 12, left: 56, size: 0.7, opacity: 0.2 },
  { top: 66, left: 14, size: 0.9, opacity: 0.26 },
  { top: 38, left: 72, size: 1.2, opacity: 0.3 },
  { top: 5, left: 34, size: 0.8, opacity: 0.24 },
  { top: 58, left: 48, size: 0.7, opacity: 0.33 },
];

const Hero = () => (
  <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#070b14]">
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% -30%, hsl(210 100% 56% / 0.14), transparent 58%), linear-gradient(180deg, #0a0f1a 0%, #070b14 45%, #0a101c 100%)",
      }}
      aria-hidden
    />

    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {STARFIELD.map((star, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-primary"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size * 2,
            height: star.size * 2,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 5}px hsl(210 100% 56% / 0.4)`,
          }}
        />
      ))}
    </div>

    <motion.div
      className="pointer-events-none absolute bottom-[-22%] left-1/2 h-[62vh] w-[115vw] -translate-x-1/2 rounded-[50%] opacity-60 blur-3xl"
      style={{
        background:
          "radial-gradient(ellipse at center, hsl(210 100% 56% / 0.42) 0%, hsl(224 72% 38% / 0.18) 38%, transparent 70%)",
      }}
      animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.68, 0.5] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />

    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] opacity-35"
      style={{
        backgroundImage:
          "linear-gradient(hsl(210 100% 68% / 0.16) 1px, transparent 1px), linear-gradient(90deg, hsl(210 100% 68% / 0.16) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "linear-gradient(to bottom, transparent, black)",
      }}
      aria-hidden
    />

    <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-6 py-28 text-center md:px-8">
      <div className="w-full max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Modern, fast websites for local businesses.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Skip the slow agency retainers. We ship polished, custom sites for Kennesaw, Roswell, and Metro Atlanta with{" "}
          <span className="font-medium text-foreground">no lock-in</span> and the keys in your hands.
        </motion.p>
      </div>
    </div>
  </section>
);

export default Hero;
