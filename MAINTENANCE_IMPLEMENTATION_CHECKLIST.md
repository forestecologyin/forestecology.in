# ✅ Maintenance Mode Implementation Checklist

Use this checklist to track your implementation progress.

---

## 📋 Pre-Implementation (Review)

- [ ] Read MAINTENANCE_MODE_SETUP.md (quick start)
- [ ] Understand how it works (review MAINTENANCE_MODE_GUIDE.md)
- [ ] Check that components were all created (see file list below)
- [ ] Ensure SiteChrome.jsx was updated

---

## 🗄️ Step 1: Database Setup (2 minutes)

**Location**: Supabase SQL Editor

- [ ] Open your Supabase project
- [ ] Go to SQL Editor
- [ ] Copy the script from `supabase-migration-maintenance-mode.sql`
- [ ] Run the migration

**SQL to Run**:
```sql
INSERT INTO site_settings (key, value)
VALUES ('maintenance_mode', 'false')
ON CONFLICT (key) DO NOTHING;
```

- [ ] Verify: Check that the row was created
  ```sql
  SELECT * FROM site_settings WHERE key = 'maintenance_mode';
  ```
- [ ] Should show: `key: "maintenance_mode", value: "false"`

---

## 🎛️ Step 2: Add Toggle to Admin Dashboard (5 minutes)

**Location**: `src/app/admin/(protected)/dashboard/page.jsx`

### 2a. Add Import
- [ ] Add this import at the top of the file:
```jsx
import { MaintenanceModeToggle } from "@/components/admin/MaintenanceModeToggle";
```

### 2b. Add Component to JSX
- [ ] Add this inside the JSX (recommended: near the top for visibility):
```jsx
<div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg">
  <h3 className="text-lg font-semibold text-yellow-900 mb-4">
    Site Maintenance
  </h3>
  <MaintenanceModeToggle />
</div>
```

- [ ] Save the file

---

## 🧪 Step 3: Test Implementation (5 minutes)

### 3a. Test in Development
- [ ] Start dev server: `npm run dev`
- [ ] Go to admin dashboard: `http://localhost:3000/admin/dashboard`
- [ ] You should see "Site Maintenance" section with toggle button
- [ ] Button should show "Enable" (green)

### 3b. Test Enable
- [ ] Click **Enable** button
- [ ] Button should change to "Disable" (red)
- [ ] Warning message should appear: "⚠️ Maintenance mode is currently ON"
- [ ] Toast notification: "Maintenance mode enabled"
- [ ] Visit public page: `http://localhost:3000`
- [ ] You should see the **Maintenance Page**:
  - Green gradient background
  - Animated leaf icon
  - "Forest Ecology Lab Website is Under Maintenance" heading
  - Contact section with email
  - Fade-in animation

### 3c. Test Disable
- [ ] Go back to admin dashboard
- [ ] Click **Disable** button
- [ ] Button should change to "Enable" (green)
- [ ] Warning message should disappear
- [ ] Toast notification: "Maintenance mode disabled"
- [ ] Visit public page: `http://localhost:3000`
- [ ] You should see the **Normal Website** (not maintenance page)

### 3d. Test Real-time (Optional)
- [ ] Open 2 browser tabs
- [ ] Tab 1: Regular site page
- [ ] Tab 2: Admin dashboard
- [ ] In Tab 2, enable maintenance mode
- [ ] In Tab 1, refresh (or wait ~1 second)
- [ ] Maintenance page should appear without admin clicking anything
- [ ] Nice! Real-time sync works! ✨

---

## 📱 Step 4: Test Responsiveness (3 minutes)

**Location**: Any public page with maintenance enabled

- [ ] **Desktop**: Looks good at 1920px+
  - Card centered
  - All content visible
  - Spacing comfortable
- [ ] **Tablet**: Looks good at 768px-1024px
  - Card responsive width
  - Font sizes appropriate
  - Padding good
- [ ] **Mobile**: Looks good at 375px-480px
  - Full width with padding
  - Text readable
  - Icons centered
  - "Estimated downtime" section visible
  - Contact info accessible

**How to Test**:
1. Open website
2. Open Chrome DevTools (F12)
3. Click device toolbar icon (mobile icon)
4. Test at various screen sizes

---

## 🎨 Step 5: Customization (Optional)

### 5a. Change Text
**File**: `components/MaintenancePage.jsx`

- [ ] Change main heading (line ~45)
- [ ] Change description (line ~50)
- [ ] Change downtime text (line ~56)
- [ ] Change contact email (line ~63)
- [ ] Change footer copyright (line ~72)

### 5b. Change Colors
**File**: `components/MaintenancePage.jsx`

Look for these Tailwind classes:
- [ ] `from-emerald-50 via-green-50 to-teal-50` → Change gradient
- [ ] `from-emerald-400 via-teal-400 to-green-400` → Change accent line
- [ ] `bg-emerald-50` → Change alert box background
- [ ] Try other colors: `blue`, `indigo`, `cyan`, `green`, `lime`, etc.

### 5c. Change Icon
**File**: `components/MaintenancePage.jsx`

- [ ] Line 4: `import { FiLeaf } from "react-icons/fi";`
- [ ] Try other icons from react-icons:
  - `FiTree` (different tree)
  - `FiTreepine` (evergreen)
  - `FiSearch` (magnifying glass)
  - `FiRefreshCw` (loading animation)
  - Or any other icon from react-icons library

### 5d. Test Customizations
- [ ] Enable maintenance mode
- [ ] Verify changes appear on maintenance page
- [ ] Disable maintenance mode
- [ ] Verify normal site still works

---

## 🚀 Step 6: Final Verification

- [ ] [ ] All components created:
  - [ ] `components/MaintenancePage.jsx` exists
  - [ ] `components/MaintenanceWrapper.jsx` exists
  - [ ] `components/admin/MaintenanceModeToggle.jsx` exists

- [ ] [ ] All utilities created:
  - [ ] `lib/useMaintenanceMode.js` exists
  - [ ] `lib/siteSettingKeys.js` updated with maintenance_mode

- [ ] [ ] All modifications made:
  - [ ] `src/app/SiteChrome.jsx` updated with MaintenanceWrapper
  - [ ] `src/app/admin/(protected)/dashboard/page.jsx` has toggle

- [ ] [ ] Database setup:
  - [ ] `site_settings` table has `maintenance_mode` row
  - [ ] Value is `"false"` initially

- [ ] [ ] Tests passing:
  - [ ] Toggle button shows in admin
  - [ ] Enable works (maintenance page appears)
  - [ ] Disable works (normal site appears)
  - [ ] Real-time sync works (~1 second update time)
  - [ ] Responsive design works (mobile/tablet/desktop)

- [ ] [ ] Documentation reviewed:
  - [ ] MAINTENANCE_MODE_SETUP.md
  - [ ] MAINTENANCE_INTEGRATION_EXAMPLE.jsx
  - [ ] MAINTENANCE_QUICK_REFERENCE.md

---

## 🎯 Production Deployment

Before going live with maintenance mode:

- [ ] Test enable/disable in production environment
- [ ] Verify database migration ran on production DB
- [ ] Test toggle button works with production credentials
- [ ] Have admin dashboard open while using in production
- [ ] Document process for other admin users

### When Using Maintenance Mode in Production

- [ ] Set a specific maintenance window (e.g., "10:00 AM - 10:30 AM EST")
- [ ] Notify users beforehand (email, social media, banner)
- [ ] Enable maintenance mode
- [ ] Do your work/updates
- [ ] Verify site works before disabling
- [ ] Disable maintenance mode
- [ ] Confirm public site is back online
- [ ] Send follow-up notification to users

---

## 📚 Documentation Files (For Reference)

These files have been created. Refer to them as needed:

- [ ] **MAINTENANCE_MODE_SETUP.md** - Quick start (5 min read)
- [ ] **MAINTENANCE_INTEGRATION_EXAMPLE.jsx** - Code example (2 min read)
- [ ] **MAINTENANCE_QUICK_REFERENCE.md** - Quick lookup (5 min read)
- [ ] **MAINTENANCE_MODE_GUIDE.md** - Complete guide (10 min read)
- [ ] **MAINTENANCE_FEATURES.md** - Technical details (10 min read)
- [ ] **supabase-migration-maintenance-mode.sql** - Database script
- [ ] **MAINTENANCE_DELIVERY_SUMMARY.md** - Full summary (what was made)

---

## 🐛 Troubleshooting Checklist

If something doesn't work:

### Maintenance page not showing
- [ ] Check database: Does `site_settings` have `maintenance_mode = "true"`?
- [ ] Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- [ ] Check browser console for errors: F12 → Console
- [ ] Verify Supabase connection is working
- [ ] Try toggling OFF and ON again

### Toggle button not showing in admin
- [ ] Did you add the import? `import { MaintenanceModeToggle }`
- [ ] Did you add `<MaintenanceModeToggle />` to JSX?
- [ ] Did you save the file?
- [ ] Did you refresh the page?
- [ ] Are you logged into the admin dashboard?
- [ ] Are you on a protected admin route?

### Changes not appearing instantly
- [ ] Refresh page (Ctrl+F5)
- [ ] Changes should appear within 1-2 seconds
- [ ] Check Supabase real-time is enabled in project
- [ ] Try toggling again

### Styling looks wrong
- [ ] Ensure Tailwind CSS is working (check other pages)
- [ ] Clear browser cache: Ctrl+Shift+Delete
- [ ] Rebuild: `npm run build`
- [ ] Check that react-icons is installed

### Database errors
- [ ] Verify Supabase credentials
- [ ] Check `site_settings` table exists
- [ ] Run the SQL migration again
- [ ] Check internet connection to Supabase

---

## ✅ Success Checklist

When everything is working, you should be able to:

- [ ] See "Site Maintenance" section in admin dashboard
- [ ] Click "Enable" and see maintenance page on public site
- [ ] Click "Disable" and see normal site on public site
- [ ] See changes appear instantly across browser tabs
- [ ] See beautiful, professional maintenance page design
- [ ] Customize text and colors as needed
- [ ] Have admin control at fingertips

---

## 🎉 Completion

Once all items are checked:

✅ **Your maintenance mode is ready!**

You can now:
1. Use it whenever you need scheduled maintenance
2. Toggle on/off instantly from admin dashboard
3. Provide professional downtime messaging to users
4. Customize text/colors as needed
5. Trust that everything works smoothly

---

## 📞 Quick Reference

**Most Important**: When you need to enable maintenance mode:

1. Go to: Admin Dashboard → Site Maintenance
2. Click: **Enable** button
3. Done! Users see maintenance page
4. When ready, click: **Disable** button
5. Done! Users see normal site

That's it! 🎉

---

**Last Updated**: April 2026  
**Status**: ✅ Ready to Use  
**Questions?** Check documentation files listed above
