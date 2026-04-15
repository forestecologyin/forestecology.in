# 🌲 Forest Ecology Lab - Maintenance Mode Setup

## ✅ What's Been Created

Your complete maintenance mode system is ready! Here's what you got:

### Components
- ✨ `MaintenancePage.jsx` - Beautiful full-screen maintenance UI
- 🎭 `MaintenanceWrapper.jsx` - Conditional renderer (shows maintenance or normal content)
- 🎛️ `MaintenanceModeToggle.jsx` - Admin dashboard control button

### Hooks & Utilities
- ⚙️ `useMaintenanceMode.js` - Real-time hook to fetch maintenance status
- 📝 `siteSettingKeys.js` - Updated with maintenance_mode default

### Modifications
- 🔄 `SiteChrome.jsx` - Updated to wrap with MaintenanceWrapper

### Documentation & Setup
- 🚀 `MAINTENANCE_MODE_GUIDE.md` - Complete implementation guide
- 📋 `MAINTENANCE_INTEGRATION_EXAMPLE.jsx` - How to add toggle to dashboard
- 💾 `supabase-migration-maintenance-mode.sql` - Database setup script

---

## 🎯 3-Step Setup

### Step 1️⃣: Database Migration
Run this SQL in your Supabase console:

```sql
-- Copy script from: supabase-migration-maintenance-mode.sql

INSERT INTO site_settings (key, value)
VALUES ('maintenance_mode', 'false')
ON CONFLICT (key) DO NOTHING;
```

### Step 2️⃣: Add Toggle to Dashboard

Open `src/app/admin/(protected)/dashboard/page.jsx` and add:

```jsx
import { MaintenanceModeToggle } from "@/components/admin/MaintenanceModeToggle";

// Inside your DashboardPage JSX, add:
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
  <h3 className="text-lg font-semibold text-yellow-900 mb-4">
    Site Maintenance
  </h3>
  <MaintenanceModeToggle />
</div>
```

See `MAINTENANCE_INTEGRATION_EXAMPLE.jsx` for more placement options.

### Step 3️⃣: Test It!

1. Go to your admin dashboard
2. Look for the "Site Maintenance" section
3. Click "Enable" to turn on maintenance mode
4. Visit your website - you should see the maintenance page
5. Click "Disable" to restore the site

---

## 🎨 Design Features

The maintenance page includes:

✅ **Professional Design**
- Forest-themed soft green gradient (`emerald → teal → green`)
- Premium university-style typography
- Clean white card with subtle shadow

✅ **Layout**
- Full-screen centered
- Responsive (mobile + desktop)
- Animated blobs in background
- Fade-in animation on load

✅ **Content**
- 🌿 Animated leaf icon
- Heading: "Forest Ecology Lab Website is Under Maintenance"
- Description of maintenance work
- Estimated downtime: 30–60 minutes
- Contact email for urgent inquiries
- Footer copyright

---

## 🚀 How It Works

```
User visits website
        ↓
SiteChrome renders
        ↓
MaintenanceWrapper checks: is maintenance ON?
        ↓
  YES → Show MaintenancePage
  NO  → Show normal website content
        ↓
Real-time sync: Admin toggles → All users see change instantly
```

---

## 🎛️ Admin Controls

When you add `<MaintenanceModeToggle />` to your dashboard, admins get:

- **Enable/Disable button** - One-click toggle
- **Status indicator** - Shows current state
- **Warning message** - When maintenance is ON
- **Loading state** - While updating
- **Toast notifications** - Success/error feedback

---

## 🔧 Customization

### Change Colors
Edit `MaintenancePage.jsx`:
```jsx
// from-emerald-50 via-green-50 to-teal-50  ← Change these
// from-emerald-400 to-green-400             ← And these
```

### Change Text
Edit strings in `MaintenancePage.jsx`:
- Main heading
- Description
- Downtime estimate
- Contact email
- Footer copyright

### Change Icon
In `MaintenancePage.jsx`, replace:
```jsx
import { FiLeaf } from "react-icons/fi";
// Try: FiTree, FiTreepine, FiActivity, etc.
```

---

## 🔐 Security

✅ Only admins can toggle (protected route)  
✅ Database-driven (no hardcoding)  
✅ Real-time (instant across all clients)  
✅ Error handling (defaults to OFF)  
✅ Graceful fallback (works if DB is down)  

---

## 📊 File Reference

| File | Purpose |
|------|---------|
| `MaintenancePage.jsx` | The UI shown during maintenance |
| `MaintenanceWrapper.jsx` | Logic to show/hide maintenance page |
| `useMaintenanceMode.js` | Hook for checking maintenance status |
| `MaintenanceModeToggle.jsx` | Admin dashboard button |
| `SiteChrome.jsx` | **[MODIFIED]** Integrated maintenance wrapper |
| `siteSettingKeys.js` | **[MODIFIED]** Added maintenance_mode |
| `MAINTENANCE_MODE_GUIDE.md` | Full documentation |
| `MAINTENANCE_INTEGRATION_EXAMPLE.jsx` | Integration code example |
| `supabase-migration-maintenance-mode.sql` | Database setup |

---

## 💡 Tips & Tricks

### Before Going Live
```javascript
// Test in your admin dashboard first
// Toggle maintenance ON
// Visit a public page
// Verify maintenance page appears
// Toggle maintenance OFF
// Verify public page loads
```

### Styling with Tailwind
The component uses standard Tailwind classes. To change:
- Gradient: `from-emerald-50 via-green-50 to-teal-50`
- Buttons: `bg-emerald, bg-teal, bg-green`
- Text: `text-emerald-600, text-gray-900`
- Shadows: `shadow-2xl, shadow-lg`

### Real-time Behavior
- Changes appear within ~1 second
- Users see automation (no refresh needed)
- Admin dashboard reflects changes instantly
- Works even with service workers/offline

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Toggle not showing | Added to dashboard? Import correct? Logged in as admin? |
| Maintenance page not showing | DB migration run? `maintenance_mode = "true"`? Hard refresh? |
| Changes not instant | Reload page (Shift+Ctrl+R). Supabase realtime enabled? |
| Toggle button errors | Check Supabase credentials. site_settings table exists? |

---

## 🎯 Next Steps

1. ✅ **Deploy the components** - They're ready to use
2. ✅ **Run the SQL migration** - Set up maintenance_mode in DB
3. ✅ **Add toggle to dashboard** - See MAINTENANCE_INTEGRATION_EXAMPLE.jsx
4. ✅ **Test it** - Enable/disable and verify
5. ✅ **Use it** - When you need scheduled maintenance!

---

## 📚 More Info

- Full guide: [MAINTENANCE_MODE_GUIDE.md](./MAINTENANCE_MODE_GUIDE.md)
- Integration example: [MAINTENANCE_INTEGRATION_EXAMPLE.jsx](./MAINTENANCE_INTEGRATION_EXAMPLE.jsx)
- Database setup: [supabase-migration-maintenance-mode.sql](./supabase-migration-maintenance-mode.sql)

---

**Ready to go!** Your Forest Ecology Lab website now has professional maintenance mode capability. 🌲✨
