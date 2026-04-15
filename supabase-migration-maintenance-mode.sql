-- Migration to add maintenance_mode to site_settings
-- Run this in Supabase SQL editor to initialize the maintenance_mode setting

-- Ensure the site_settings table exists
CREATE TABLE
IF NOT EXISTS site_settings
(
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW
() ON
UPDATE NOW()
);

-- Add maintenance_mode setting if it doesn't exist
INSERT INTO site_settings
    (key, value)
VALUES
    ('maintenance_mode', 'false')
ON CONFLICT
(key) DO NOTHING;

-- Optional: Create index for faster queries
CREATE INDEX
IF NOT EXISTS idx_site_settings_key ON site_settings
(key);
