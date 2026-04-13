import GovernmentHeader from "../../components/GovernmentHeader";
import Hero from "../../components/Hero/Hero";
import HomeAbout from "../../components/Home/HomeAbout";
import ResearchAreas from "../../components/ResearchAreas/ResearchAreas";
import Gallery from "../../components/Gallery/Gallery";
import Team from "../../components/Team/Team";
import Footer from "../../components/Footer/Footer";

export const metadata = {
  title: "Forest Ecology Lab | Home",
  description:
    "Forest Ecology and Management Research Lab: biodiversity, climate resilience, and ecosystem monitoring.",
};

export default function Page() {
  return (
    <div className="relative overflow-x-hidden bg-[#081C15] text-[#E8F8EE]">
      <GovernmentHeader />
      <Hero />
      <Footer />
    </div>
  );
}
