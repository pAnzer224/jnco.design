import Link from "next/link";

export const metadata = {
  title: "404: Page Not Found | Juneco Mirande",
  description: "The page you were looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-background text-dark text-center">
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent text-2xl font-bold select-none">
        !
      </div>
      <h1 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter mb-4 text-dark">
        Page Not Found
      </h1>
      <p className="font-mono text-sm uppercase tracking-widest text-dark/60 max-w-md mb-8 leading-relaxed">
        The link you followed might be broken, or the page may have been removed.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 rounded-full bg-dark text-primary hover:bg-accent transition-colors duration-300 font-mono text-xs uppercase tracking-widest font-bold"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
