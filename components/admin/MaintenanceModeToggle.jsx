/**
 * Example: Maintenance Mode Toggle for Admin Dashboard
 * Add this component to your admin dashboard page to allow toggling maintenance mode
 */

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { HiWrench } from "react-icons/hi";

export function MaintenanceModeToggle() {
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchMaintenanceStatus();
    }, []);

    async function fetchMaintenanceStatus() {
        try {
            const { data, error } = await supabase
                .from("site_settings")
                .select("value")
                .eq("key", "maintenance_mode")
                .single();

            if (error && error.code !== "PGRST116") {
                throw error;
            }

            setIsEnabled(data?.value === "true" || data?.value === true);
        } catch (err) {
            console.error("Error fetching maintenance status:", err);
            toast.error("Failed to load maintenance status");
        } finally {
            setLoading(false);
        }
    }

    async function toggleMaintenance() {
        setSaving(true);
        try {
            const newValue = !isEnabled;

            // Update or insert the maintenance_mode setting
            const { error } = await supabase
                .from("site_settings")
                .upsert(
                    { key: "maintenance_mode", value: newValue ? "true" : "false" },
                    { onConflict: "key" }
                );

            if (error) throw error;

            setIsEnabled(newValue);
            const action = newValue ? "enabled" : "disabled";
            toast.success(`Maintenance mode ${action}`);
        } catch (err) {
            console.error("Error toggling maintenance mode:", err);
            toast.error("Failed to update maintenance mode");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-yellow-50">
                        <HiWrench className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Maintenance Mode</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            When enabled, visitors see the maintenance page instead of the website
                        </p>
                    </div>
                </div>
                <button
                    onClick={toggleMaintenance}
                    disabled={saving}
                    className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isEnabled
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                        }`}
                >
                    {saving ? "Updating..." : isEnabled ? "Disable" : "Enable"}
                </button>
            </div>

            {isEnabled && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                        ⚠️ <strong>Maintenance mode is currently ON.</strong> The website is not accessible
                        to regular visitors.
                    </p>
                </div>
            )}
        </div>
    );
}
