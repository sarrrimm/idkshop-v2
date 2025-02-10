import Hero from "@/components/Hero";
import HomePageSections from "@/components/HomePageSections";
// import { FeaturedPrompts } from "@/components/featured-prompts";
// import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex-1 min-h-screen flex flex-col">
      <HomePageSections />
    </main>
  );
}
