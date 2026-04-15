/**
 * INTEGRATION EXAMPLE: How to add MaintenanceModeToggle to your dashboard
 * 
 * Location: src/app/admin/(protected)/dashboard/page.jsx
 * 
 * This shows the exact changes needed to integrate the maintenance mode toggle
 * into your admin dashboard.
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cleanupChannel, supabase } from "@/lib/supabase";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary";
import StatCard from "@/components/admin/StatCard";
import { MaintenanceModeToggle } from "@/components/admin/MaintenanceModeToggle"; // ← ADD THIS LINE
import Link from "next/link";
import {
    HiOutlinePhotograph,
    HiOutlineBeaker,
    HiOutlineUserGroup,
    HiOutlineUserAdd,
    HiOutlineClock,
    HiOutlineMail,
    HiOutlineDocumentText,
} from "react-icons/hi";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        gallery: null,
        research: null,
        team: null,
        hero: null,
        collaborators: null,
        messages: null,
        unreadMessages: null,
    });
    const [recentItems, setRecentItems] = useState([]);
    const [recentMessages, setRecentMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // ... keep all your existing code ...

    return (
        <div className="space-y-6">
            {/* 
        OPTION 1: Add as a prominent alert box at the top
        This is recommended for visibility.
      */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                    Site Maintenance
                </h3>
                <MaintenanceModeToggle />
            </div>

            {/* Existing dashboard header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Overview updates live as the public site and forms change.
                </p>
            </div>

            {/* 
        OPTION 2: Add as part of a "Quick Actions" section
        Alternative placement if you prefer.
      */}
            {/* 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MaintenanceModeToggle />
        {/* Other quick action cards */}
            {/* </div> */}

            {/* ... rest of your dashboard content ... */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                    icon={HiOutlineDocumentText}
                    label="Hero slides"
                    count={stats.hero}
                    color="forest"
                />
                {/* ... rest of stats ... */}
            </div>
        </div>
    );
}

/**
 * STYLING TIPS:
 * 
 * The MaintenanceModeToggle component is self-contained and styled.
 * You can wrap it in different containers:
 *
 * Option A: Alert box (recommended for visibility)
 *   <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
 *     <h3 className="text-lg font-semibold text-yellow-900 mb-4">
 *       Site Maintenance
 *     </h3>
 *     <MaintenanceModeToggle />
 *   </div>
 *
 * Option B: Card grid
 *   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 *     <MaintenanceModeToggle />
 *   </div>
 *
 * Option C: Standalone
 *   <MaintenanceModeToggle />
 */
