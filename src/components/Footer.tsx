const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <a
          href="#"
          className="flex h-9 shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-10"
          aria-label="NextGen Atlanta home"
        >
          <img
            src="/logo.png"
            alt=""
            width={280}
            height={65}
            className="h-full w-auto max-h-9 object-contain object-left invert contrast-[1.08] drop-shadow-[0_0_12px_rgba(255,255,255,0.45)] sm:max-h-10"
            decoding="async"
          />
        </a>

        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#how-it-works" className="transition-colors hover:text-foreground">How it Works</a>
          <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          <a href="#mockup" className="transition-colors hover:text-foreground">Free Mockup</a>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        NextGen Digital is a service of NextGen Vending LLC.
      </p>
    </div>
  </footer>
);

export default Footer;
