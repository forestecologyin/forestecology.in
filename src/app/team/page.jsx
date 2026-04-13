import Team from "@/components/Team/Team";

export const metadata = {
  title: "Forest Ecology Lab | Team",
  description:
    "Meet the Forest Ecology Lab team and global collaborators across ecology and geospatial research.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#081C15] text-[#E8F8EE]">
      <main className="pt-20">
        <Team />
      </main>
    </div>
  );
}
