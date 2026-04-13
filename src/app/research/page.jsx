import ResearchAreas from "@/components/ResearchAreas/ResearchAreas";

export const metadata = {
  title: "Forest Ecology Lab | Research",
  description:
    "Research areas in invasion ecology, forest dynamics, biodiversity, and geospatial ecology.",
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-[#081C15] text-[#E8F8EE]">
      <main className="pt-20">
        <ResearchAreas />
      </main>
    </div>
  );
}
