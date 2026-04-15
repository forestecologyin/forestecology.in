import { useState, useEffect, useCallback } from "react";
import { supabase, cleanupChannel } from "@/lib/supabase";

/**
 * Custom hook to check maintenance mode status in real-time
 * Subscribe to changes in site_settings table
 * @returns {{ isMaintenanceMode: boolean, loading: boolean, error: string | null }}
 */
export function useMaintenanceMode() {
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMaintenanceMode = useCallback(async () => {
        try {
            setError(null);
            const { data, error: fetchError } = await supabase
                .from("site_settings")
                .select("key, value")
                .eq("key", "maintenance_mode")
                .single();

            if (fetchError && fetchError.code !== "PGRST116") {
                // PGRST116 is "no rows found" which is acceptable
                throw fetchError;
            }

            // If no row exists, maintenance mode is OFF
            const value = data?.value === "true" || data?.value === true;
            setIsMaintenanceMode(value);
        } catch (err) {
            console.error("Error fetching maintenance mode:", err);
            setError(err?.message || "Failed to fetch maintenance mode");
            setIsMaintenanceMode(false); // Default to OFF on error
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Fetch initial value
        fetchMaintenanceMode();

        // Subscribe to real-time changes
        const channel = supabase
            .channel("site-settings-channel")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "site_settings",
                    filter: "key=eq.maintenance_mode",
                },
                (payload) => {
                    const newValue = payload.new?.value === "true" || payload.new?.value === true;
                    setIsMaintenanceMode(newValue);
                }
            )
            .subscribe();

        return () => {
            cleanupChannel(channel);
        };
    }, [fetchMaintenanceMode]);

    return { isMaintenanceMode, loading, error };
}
