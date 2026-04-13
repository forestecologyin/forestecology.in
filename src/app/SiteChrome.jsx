"use client";

import { usePathname } from "next/navigation";
import GovernmentHeader from "@/components/GovernmentHeader";
import Footer from "@/components/Footer/Footer";

export default function SiteChrome({ children }) {
  const pathname = usePathname() || "";
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="min-w-0 w-full max-w-[100vw] overflow-x-hidden">{children}</div>;
  }

  return (
    <div className="min-w-0 w-full max-w-[100vw] overflow-x-hidden">
      <GovernmentHeader />
      {children}
      <Footer />
    </div>
  );
}
