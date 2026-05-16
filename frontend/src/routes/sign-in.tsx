import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlatform } from "@/context/platform-context";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const { signIn, continueAsGuest, user } = usePlatform();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<"signin" | "guest" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate({ to: "/dashboard" });
  }, [navigate, user]);

  const handleSignIn = async () => {
    console.log('[SignIn] handleSignIn called', email);
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    try {
      setLoading("signin");
      setError("");
      console.log('[SignIn] Calling signIn...');
      await signIn(email, password);
      console.log('[SignIn] signIn returned, navigating...');
      navigate({ to: "/dashboard" });
    } catch (err) {
      console.error('[SignIn] Error:', err);
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(null); // Always reset loading state
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoading("guest");
      setError("");
      await continueAsGuest();
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Guest login failed");
      setLoading(null);
    }
  };

  return (
    <main className="relative min-h-screen grid place-items-center overflow-hidden px-5 py-16 bg-gradient-cinematic">
      <motion.div className="absolute inset-0 bg-spotlight opacity-65" />
      <motion.div
        animate={{ y: [0, -12, 0], opacity: [0.22, 0.32, 0.22] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-16 w-56 h-56 rounded-full blur-3xl"
        style={{ background: "var(--gold)" }}
      />
      <motion.div
        animate={{ y: [0, 16, 0], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-8 bottom-10 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "var(--maroon)" }}
      />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg paper-texture border border-foreground/15 rounded-2xl shadow-elevated p-7 md:p-9"
      >
        <p className="font-hand text-2xl text-center mb-1" style={{ color: "var(--maroon)" }}>
          ~ welcome back ~
        </p>
        <h1 className="font-display text-5xl text-center" style={{ color: "var(--ink)" }}>
          Sign In
        </h1>
        <p className="mt-3 text-center font-serif-lit italic text-foreground/70">
          Return to your writing desk and continue the manuscript.
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
              placeholder="aarav@example.com"
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
            onClick={handleSignIn}
            disabled={loading !== null}
            className="w-full h-11 rounded-full bg-gradient-ink text-primary-foreground uppercase tracking-[0.2em] text-xs inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading === "signin" ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              "Enter Studio"
            )}
          </button>
          <button
            onClick={handleGuestLogin}
            disabled={loading !== null}
            className="w-full h-11 rounded-full border border-foreground/20 uppercase tracking-[0.2em] text-xs hover:bg-foreground hover:text-background transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading === "guest" ? (
              <LoaderCircle className="w-4 h-4 animate-spin" />
            ) : (
              "Continue as Guest"
            )}
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-foreground/65">
          New here?{" "}
          <Link to="/sign-up" className="ink-underline text-foreground">
            Create your account
          </Link>
        </p>
      </motion.section>
    </main>
  );
}
