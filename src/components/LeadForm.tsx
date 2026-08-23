import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const LeadForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [frustration, setFrustration] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit button clicked!", { businessName, websiteUrl, frustration });
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName,
          websiteUrl: websiteUrl.trim() || undefined,
          frustration: frustration.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="mockup" className="relative py-28">
      <div className="absolute inset-0 bg-secondary/40" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Want to see it <span className="text-foreground">before you buy?</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Drop your details below and we'll build a live, functional mockup of your new homepage in 48 hours,
            completely free.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="glass mx-auto mt-12 max-w-lg rounded-2xl p-8"
        >
          {submitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                <Send className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">We're on it!</h3>
              <p className="mt-2 text-sm text-muted-foreground">Expect your mockup within 48 hours.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {error ? (
                <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              ) : null}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Business Name</label>
                <input
                  required
                  type="text"
                  name="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
                  placeholder="e.g. Roswell Coffee Co."
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Current Website Link (if applicable)
                </label>
                <input
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  name="websiteUrl"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
                  placeholder="yoursite.com or https://yoursite.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">
                  Biggest Frustration With Current Site
                </label>
                <textarea
                  rows={3}
                  name="frustration"
                  value={frustration}
                  onChange={(e) => setFrustration(e.target.value)}
                  disabled={loading}
                  className="w-full resize-none rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
                  placeholder="It's slow, outdated, I can't update it myself…"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-shadow-sm disabled:pointer-events-none disabled:opacity-60"
              >
                {loading ? "Sending…" : "Build My Mockup"}
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default LeadForm;
