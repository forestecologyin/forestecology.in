import Hero from "@/components/Hero/Hero";
import HomeAbout from "@/components/Home/HomeAbout";

export const metadata = {
  title: "Forest Ecology Lab | Home",
  description:
    "Forest Ecology and Management Research Lab: biodiversity, climate resilience, and ecosystem monitoring.",
};

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#081C15] text-[#E8F8EE]">
      <Hero />
      <main className="relative z-10">
        <HomeAbout />
      </main>
    </div>
  );
}
