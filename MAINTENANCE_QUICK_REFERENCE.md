# 🌲 Maintenance Mode - Quick Reference Card

## 📁 Files Created/Modified

### NEW FILES (Copy-paste ready)
```
components/
  ├── MaintenancePage.jsx               ✨ Main UI (240 lines)
  ├── MaintenanceWrapper.jsx            🎭 Conditional renderer
  └── admin/
      └── MaintenanceModeToggle.jsx      🎛️ Admin toggle button

lib/
  └── useMaintenanceMode.js             ⚙️ Real-time hook

DOCS:
  ├── MAINTENANCE_MODE_SETUP.md         📖 Quick start
  ├── MAINTENANCE_MODE_GUIDE.md         📚 Full guide
  ├── MAINTENANCE_INTEGRATION_EXAMPLE.jsx 💡 Code example
  └── supabase-migration-maintenance-mode.sql 💾 DB setup
```

### MODIFIED FILES
```
src/app/SiteChrome.jsx                  🔄 Added MaintenanceWrapper
lib/siteSettingKeys.js                  🔄 Added maintenance_mode default
```

---

## 🚀 Ultra-Quick Setup (5 minutes)

### 1. Run Database Migration
Paste in Supabase SQL editor and run:

```sql
INSERT INTO site_settings (key, value)
VALUES ('maintenance_mode', 'false')
ON CONFLICT (key) DO NOTHING;
```

### 2. Add to Dashboard
Edit: `src/app/admin/(protected)/dashboard/page.jsx`

Add these 2 lines:

```jsx
import { MaintenanceModeToggle } from "@/components/admin/MaintenanceModeToggle";

// In your JSX, add:
<MaintenanceModeToggle />
```

### 3. Done! Test It
- Go to admin dashboard
- Find "Maintenance Mode" toggle
- Click **Enable**
- Visit public site → See maintenance page
- Click **Disable** → Back to normal

---

## 🎨 How It Looks

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ╔═══════════════════════════════════════════╗ │
│  ║                                           ║ │
│  ║          🍃  (Animated Leaf)              ║ │
│  ║                                           ║ │
│  ║  Forest Ecology Lab Website is            ║ │
│  ║  Under Maintenance                        ║ │
│  ║                                           ║ │
│  ║  Our website is currently undergoing      ║ │
│  ║  scheduled maintenance...                 ║ │
│  ║                                           ║ │
│  ║  Please check back shortly.               ║ │
│  ║  Thank you for your patience.             ║ │
│  ║                                           ║ │
│  ║  📋 Estimated downtime: 30–60 minutes     ║ │
│  ║                                           ║ │
│  ║  📧 forestecology.in@gmail.com            ║ │
│  ║                                           ║ │
│  ╠═══════════════════════════════════════════╣ │
│  ║  © Forest Ecology Lab                     ║ │
│  ╚═══════════════════════════════════════════╝ │
│                                                 │
└─────────────────────────────────────────────────┘
  (Green gradient background with animated blobs)
```

---

## ⚙️ System Architecture

```
VISITORS
    ↓
[SiteChrome] (Root layout wrapper)
    ↓
[MaintenanceWrapper] (Checks maintenance status)
    ↓ useMaintenanceMode() hook
    ↓ Subscribes to: site_settings.maintenance_mode
    ↓
Supabase postgres_changes (real-time)
    ↓
┌─────────────────────────────────┐
│ YES: maintenance_mode = "true"  │ → [MaintenancePage] (Beautiful UI)
│                                 │
│ NO: maintenance_mode = "false"  │ → [Normal Website]
└─────────────────────────────────┘

ADMIN DASHBOARD
    ↓
[MaintenanceModeToggle]
    ↓ Click Enable/Disable
    ↓ Updates: site_settings.maintenance_mode
    ↓
Supabase postgres_changes broadcasts to all clients
    ↓
All visitors see change within ~1 second ✨
  (No page refresh needed!)
```

---

## 🔑 Key Dependencies

```javascript
// Already installed (in package.json)
"react": "19.2.3"
"react-dom": "19.2.3"
"next": "16.1.6"
"@supabase/supabase-js": "^2.99.2"
"react-icons": "^5.6.0"  // For FiLeaf icon

// Already configured
tailwindcss: "^4"         // For styling
framer-motion: "^12..."   // Optional, not used here but available
```

---

## 🎯 Usage in Admin Dashboard

```jsx
import { MaintenanceModeToggle } from "@/components/admin/MaintenanceModeToggle";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Option A: Prominent alert box */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
        <h3 className="font-semibold">Site Maintenance</h3>
        <MaintenanceModeToggle />
      </div>

      {/* Option B: In a grid */}
      <div className="grid grid-cols-2 gap-6">
        <MaintenanceModeToggle />
      </div>

      {/* Option C: Standalone */}
      <MaintenanceModeToggle />

      {/* ...rest of dashboard... */}
    </div>
  );
}
```

---

## 🎨 Customization Snippets

### Change Status Text
In `MaintenancePage.jsx`, find and edit:
```jsx
// Line ~45: Main heading
"Forest Ecology Lab Website is Under Maintenance"

// Line ~50: Description
"Our website is currently undergoing scheduled maintenance..."

// Line ~56: Downtime
"Estimated downtime: 30–60 minutes"
```

### Change Colors
In `MaintenancePage.jsx`:
```jsx
// Gradient background
from-emerald-50 via-green-50 to-teal-50

// Header line
from-emerald-400 via-teal-400 to-green-400

// Icon circle
from-emerald-100 to-teal-100

// Divider
from-emerald-400 to-teal-400

// Alert box
bg-emerald-50 border-emerald-200
```

Try other Tailwind colors:
- `blue`, `indigo`, `cyan`, `green`, `lime`, `yellow`, `orange`, `red`, etc.

### Change Animation Speed
```jsx
// In the fade-in effect (line ~21):
duration-1000  // Change to: duration-500 (fast) or duration-1500 (slow)

// Background blob animation (style jsx):
animation: blob 7s infinite;  // Change 7s to 5s or 10s
```

---

## 🔍 Debugging

### Check if maintenance mode is ON
In browser dev tools console:
```javascript
// Visit your website and open console
// If you see MaintenancePage.jsx → maintenance is ON ✓
// If you don't see it → maintenance is OFF ✓
```

### Check database value
```sql
-- In Supabase SQL Editor:
SELECT * FROM site_settings WHERE key = 'maintenance_mode';

-- Should return:
-- key: "maintenance_mode"
-- value: "true" or "false"
```

### Check Supabase Real-time
1. Open Supabase Dashboard
2. Go to your project
3. Realtime section → Ensure it's enabled
4. Check tables → site_settings table has real-time enabled

---

## ✅ Checklist

- [ ] Run SQL migration (insert maintenance_mode into site_settings)
- [ ] Import MaintenanceModeToggle in dashboard
- [ ] Add `<MaintenanceModeToggle />` to dashboard JSX
- [ ] Test Enable button → maintenance page appears
- [ ] Test Disable button → normal site appears
- [ ] Verify changes are instant (no refresh needed)
- [ ] Customize text if desired
- [ ] Customize colors if desired
- [ ] Go live!

---

## 🎓 Learning Path

Want to understand how it works?

1. **Start here**: [MAINTENANCE_MODE_SETUP.md](./MAINTENANCE_MODE_SETUP.md)
2. **Deep dive**: [MAINTENANCE_MODE_GUIDE.md](./MAINTENANCE_MODE_GUIDE.md)
3. **Integration**: [MAINTENANCE_INTEGRATION_EXAMPLE.jsx](./MAINTENANCE_INTEGRATION_EXAMPLE.jsx)
4. **Read code**:
   - `MaintenancePage.jsx` (UI design)
   - `useMaintenanceMode.js` (Real-time logic)
   - `MaintenanceWrapper.jsx` (Conditional rendering)

---

## 💬 Common Questions

**Q: Will it affect SEO?**  
A: The maintenance page is temporary. Google respects `503 Service Unavailable` header and caches the old info. Keep downtime short.

**Q: Can users still access the site?**  
A: No. When maintenance is ON, all visitors see the maintenance page instead.

**Q: Does it require a page refresh?**  
A: No! Real-time Postgres Changes push updates instantly to all users.

**Q: What if database goes down?**  
A: The maintenance mode defaults to OFF (safe fallback).

**Q: Can I customize the page?**  
A: Yes! Edit MaintenancePage.jsx - all text, colors, icons, animations are customizable.

---

## 🚀 Production Checklist

Before using maintenance mode in production:

- [ ] Test in development first
- [ ] Verify Supabase real-time is enabled
- [ ] Confirm site_settings table has maintenance_mode row
- [ ] Test toggle multiple times
- [ ] Set specific maintenance window (don't leave it on forever 😅)
- [ ] Notify users beforehand (social media, email)
- [ ] Monitor admin dashboard while maintenance is live
- [ ] Have disable button ready
- [ ] Test disabling and confirming site is back

---

**Status**: ✅ Ready to use!  
**Deploy**: ✅ All files created  
**Next Step**: Add to dashboard and test!

🌲 Happy maintaining!
