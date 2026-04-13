import Gallery from "@/components/Gallery/Gallery";

export const metadata = {
  title: "Forest Ecology Lab | Gallery",
  description:
    "Explore field campaigns, biodiversity monitoring visuals, and forest ecology documentation.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#081C15] text-[#E8F8EE]">
      <main className="pt-20">
        <Gallery />
      </main>
    </div>
  );
}
