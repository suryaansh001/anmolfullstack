import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative py-20 px-6 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl grid md:grid-cols-3 gap-12 items-end">
        <div>
          <div className="font-display text-4xl" style={{ color: "var(--ink)" }}>
            अkshar
          </div>
          <p className="mt-4 font-serif-lit italic text-foreground/60 max-w-xs">
            A sanctuary for stories, in the languages of India.
          </p>
        </div>
        <div className="text-sm space-y-2 text-foreground/70">
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/40 mb-3">Read</div>
          <Link to="/poetry" className="ink-underline inline-block">
            Poetry
          </Link>
          <Link to="/lyrics" className="ink-underline block">
            Lyrics
          </Link>
          <Link to="/stories" className="ink-underline block">
            Stories
          </Link>
          <Link to="/screenplays" className="ink-underline block">
            Screenplays
          </Link>
        </div>
        <div className="text-sm space-y-2 text-foreground/70 md:text-right">
          <div className="text-xs uppercase tracking-[0.3em] text-foreground/40 mb-3">Write</div>
          <Link to="/editor" className="ink-underline inline-block">
            The Editor
          </Link>
          <br />
          <Link to="/version-history" className="ink-underline inline-block">
            Version History
          </Link>
          <br />
          <Link to="/dashboard" className="ink-underline inline-block">
            Publishing Guide
          </Link>
        </div>
      </div>
      <div
        className="mt-16 pt-8 border-t border-foreground/10 text-center font-hand text-xl"
        style={{ color: "var(--maroon)" }}
      >
        ~ where words are kept like saffron ~
      </div>
    </footer>
  );
}
