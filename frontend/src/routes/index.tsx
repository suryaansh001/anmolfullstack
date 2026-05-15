import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/akshar/Nav";
import { Hero } from "@/components/akshar/Hero";
import { Discover } from "@/components/akshar/Discover";
import { Screenplay } from "@/components/akshar/Screenplay";
import { Poetry } from "@/components/akshar/Poetry";
import { Languages } from "@/components/akshar/Languages";
import { Search } from "@/components/akshar/Search";
import { Footer } from "@/components/akshar/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AKSHAR — Where stories stay alive" },
      { name: "description", content: "A multilingual home for Indian poets, lyricists, storytellers, and screenplay writers. Read, write, publish — in every language you dream in." },
      { property: "og:title", content: "AKSHAR — Where stories stay alive" },
      { property: "og:description", content: "A multilingual home for Indian poets, lyricists, storytellers, and screenplay writers." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Discover />
      <Screenplay />
      <Poetry />
      <Search />
      <Languages />
      <Footer />
    </main>
  );
}
