import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, user } = usePlatform();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [navigate, user]);

  const handleSignUp = async () => {
    if (!email || !name || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await signUp(email, password, name);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen grid place-items-center px-5 py-16 bg-gradient-cinematic overflow-hidden">
      <motion.div className="absolute inset-0 bg-spotlight opacity-55" />
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg paper-texture border border-foreground/15 rounded-2xl shadow-elevated p-7 md:p-9"
      >
        <p className="font-hand text-2xl text-center mb-1" style={{ color: "var(--maroon)" }}>
          ~ begin a new chapter ~
        </p>
        <h1 className="font-display text-5xl text-center" style={{ color: "var(--ink)" }}>
          Sign Up
        </h1>
        <p className="mt-3 text-center font-serif-lit italic text-foreground/70">
          Create your literary studio and publish across languages.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.22em] text-foreground/55 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-foreground/15 bg-background/70 px-4 py-3 outline-none focus:border-foreground/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.22em] text-foreground/55 mb-2">
              Display name
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nila Krishnan"
              className="w-full rounded-xl border border-foreground/15 bg-background/70 px-4 py-3 outline-none focus:border-foreground/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.22em] text-foreground/55 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-foreground/15 bg-background/70 px-4 py-3 outline-none focus:border-foreground/40"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full h-11 rounded-full bg-gradient-ink text-primary-foreground uppercase tracking-[0.2em] text-xs inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : "Create account"}
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-foreground/65">
          Already have an account?{" "}
          <Link to="/sign-in" className="ink-underline text-foreground">
            Sign in
          </Link>
        </p>
      </motion.section>
    </main>
  );
}
