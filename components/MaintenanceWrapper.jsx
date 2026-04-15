"use client";

import { useMaintenanceMode } from "@/lib/useMaintenanceMode";
import MaintenancePage from "@/components/MaintenancePage";

/**
 * MaintenanceWrapper - Conditionally show maintenance page or normal content
 * Usage:
 *   <MaintenanceWrapper>
 *     <YourNormalPageContent />
 *   </MaintenanceWrapper>
 */
export function MaintenanceWrapper({ children }) {
    const { isMaintenanceMode, loading } = useMaintenanceMode();

    // Show loading state while checking maintenance status
    if (loading) {
        return <div className="w-full min-h-screen bg-white flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
        </div>;
    }

    // Show maintenance page if maintenance mode is ON
    if (isMaintenanceMode) {
        return <MaintenancePage />;
    }

    // Show normal content if maintenance mode is OFF
    return children;
}
