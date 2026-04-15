# Maintenance Mode Implementation Guide

## 📋 Overview

This maintenance mode system allows you to temporarily take down your Forest Ecology Lab website for updates while showing visitors a professional, branded maintenance page. The system is:

- **Real-time**: Changes propagate instantly to all visitors
- **Zero-downtime toggling**: Toggle on/off without restarting the app
- **Database-driven**: Controlled through the `site_settings` table
- **Beautiful**: Professional green-themed design matching your branding

---

## 🎯 Files Created

### 1. **[components/MaintenancePage.jsx](../components/MaintenancePage.jsx)**
   - The actual maintenance page component
   - Full-screen centered layout with soft green gradient
   - Includes leaf icon, animations, contact info
   - Responsive on mobile and desktop
   - Fade-in animation on load

### 2. **[lib/useMaintenanceMode.js](../lib/useMaintenanceMode.js)**
   - Custom React hook for fetching and subscribing to maintenance mode
   - Real-time updates via Supabase Postgres Changes
   - Returns: `{ isMaintenanceMode, loading, error }`

### 3. **[components/MaintenanceWrapper.jsx](../components/MaintenanceWrapper.jsx)**
   - Wrapper component for conditional rendering
   - Shows maintenance page OR normal content based on setting
   - Handles loading states

### 4. **[components/admin/MaintenanceModeToggle.jsx](../components/admin/MaintenanceModeToggle.jsx)**
   - Admin dashboard toggle component
   - Add to your dashboard page to enable/disable maintenance mode
   - Includes confirmation toasts and loading states

### 5. **[lib/siteSettingKeys.js](../lib/siteSettingKeys.js)** (Updated)
   - Added `maintenance_mode: "false"` to defaults

---

## 🚀 Quick Start

### Step 1: Ensure Database Setup

Your `site_settings` table should have this structure:

```sql
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

If not already in your Supabase setup, run this migration.

### Step 2: Add Toggle to Dashboard

Edit `src/app/admin/(protected)/dashboard/page.jsx` and import the toggle:

```jsx
import { MaintenanceModeToggle } from "@/components/admin/MaintenanceModeToggle";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* ... existing dashboard content ... */}
      
      {/* Add this somewhere prominent, like at the top */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <MaintenanceModeToggle />
      </div>
    </div>
  );
}
```

### Step 3: Test It Out

1. Go to your admin dashboard
2. Click the **Enable** button on the Maintenance Mode toggle
3. Visit your website's public pages
4. You should see the maintenance page
5. Click **Disable** to restore normal access

---

## 🔧 Integration Details

### How It Works

1. **SiteChrome.jsx** wraps your entire website
2. When the app loads, **MaintenanceWrapper** checks Supabase
3. If `site_settings.maintenance_mode = "true"`, shows **MaintenancePage**
4. If `"false"`, renders normal content
5. Changes are reflected in **real-time** via Postgres Changes subscription

### Real-time Updates

The system uses Supabase Postgres Changes to listen for updates:

```javascript
// When an admin toggles maintenance mode in the dashboard,
// all connected users see the change instantly (within ~1 second)
```

No page refresh needed!

---

## 🎨 Customization

### Changing Colors

Edit [components/MaintenancePage.jsx](../components/MaintenancePage.jsx):

```jsx
// Change gradient colors
className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50"

// Change accent color
className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400"

// Change icon background
className="bg-gradient-to-br from-emerald-100 to-teal-100"
```

Available Tailwind colors: `emerald`, `teal`, `green`, `cyan`, `blue`, `indigo`, etc.

### Changing Text

Update these sections in MaintenancePage.jsx:

```jsx
// Main heading
"Forest Ecology Lab Website is Under Maintenance"

// Description
"Our website is currently undergoing scheduled maintenance..."

// Estimated downtime
"Estimated downtime: 30–60 minutes"

// Contact email
"forestecology.in@gmail.com"

// Footer
"© Forest Ecology Lab"
```

### Changing the Animation

The fade-in animation is controlled by the `isVisible` state:

```jsx
// Currently: 1000ms fade-in
duration-1000

// Change to faster (500ms)
duration-500

// Or slower (1500ms)
duration-1500
```

---

## 📊 Database Schema

### Required: `site_settings` Table

```sql
-- Your site_settings table should include:
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert the maintenance_mode setting:
INSERT INTO site_settings (key, value) 
VALUES ('maintenance_mode', 'false')
ON CONFLICT DO NOTHING;
```

---

## 🔐 Safety Features

✅ **Admin-only toggle**: Only accessible from the protected admin dashboard  
✅ **Error handling**: Defaults to OFF if database errors occur  
✅ **Loading state**: Shows loading while checking status  
✅ **Real-time sync**: Keeps all instances in sync  

---

## 📱 Responsive Design

The maintenance page is fully responsive:

- **Mobile**: Single column, appropriate padding
- **Tablet**: Optimized spacing and font sizes
- **Desktop**: Full width with max-width constraints

Test by resizing your browser or using mobile device emulation.

---

## 🐛 Troubleshooting

### Maintenance page not showing up

1. Check that `site_settings` table exists in Supabase
2. Verify `maintenance_mode` row has `value = "true"`
3. Check browser console for errors
4. Try refreshing the page (hard refresh: Ctrl+Shift+R)

### Changes not appearing instantly

1. The system caches for ~1 second
2. Try refreshing the page
3. Check Supabase real-time is enabled on the project

### Admin toggle not appearing

1. Make sure you added `<MaintenanceModeToggle />` to the dashboard
2. Check you imported it correctly
3. Verify you're in the admin dashboard (protected route)

---

## 🎯 Best Practices

1. **Notify users beforehand**: Update social media and announcement bar before enabling
2. **Set a time limit**: People will refresh - be back online soon!
3. **Test before enabling**: Make sure everything works while in test mode
4. **Monitor the admin dashboard**: Keep dashboard tab open while maintenance is running
5. **Add DNS/CDN cache bypass**: If using CDN, clear cache when enabling/disabling

---

## 🔗 File Structure Reference

```
forest2-main/
├── components/
│   ├── MaintenancePage.jsx          ← Main maintenance page UI
│   ├── MaintenanceWrapper.jsx       ← Conditional renderer
│   └── admin/
│       └── MaintenanceModeToggle.jsx ← Admin toggle
├── lib/
│   ├── useMaintenanceMode.js        ← React hook
│   └── siteSettingKeys.js           ← Settings defaults (updated)
└── src/app/
    ├── SiteChrome.jsx               ← Updated to use MaintenanceWrapper
    └── admin/(protected)/dashboard/page.jsx ← Add toggle here
```

---

## ✨ Features Summary

| Feature | Details |
|---------|---------|
| **Design** | Professional, forest-themed green gradient |
| **Animations** | Subtle fade-in on load, animated background blobs |
| **Responsiveness** | Full mobile & desktop support |
| **Real-time** | Instant updates across all users |
| **Admin Control** | Easy toggle in dashboard |
| **Contact Info** | Displays lab email for urgent inquiries |
| **Estimated Time** | Shows 30-60 minute downtime |
| **Icons** | Animated leaf icon, emoji indicators |
| **Accessibility** | Semantic HTML, clear text hierarchy |

---

## 🚀 Next Steps

1. Run database migrations to add `maintenance_mode` to `site_settings`
2. Add `<MaintenanceModeToggle />` to your dashboard
3. Test the toggle in development
4. Deploy to production
5. Use it when you need scheduled maintenance!

---

**Questions?** Check the component code - everything is well-commented and documented.
