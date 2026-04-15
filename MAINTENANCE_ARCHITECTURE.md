# 🌲 Maintenance Mode - System Architecture & Data Flow

## Complete System Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FOREST ECOLOGY LAB WEBSITE                       │
│                                                                           │
│  ╔──────────────────────────────────────────────────────────────────╗  │
│  ║                      NEXT.JS APP ROUTER                          ║  │
│  ║                                                                  ║  │
│  ║  ┌──────────────────────────────────────────────────────────┐  ║  │
│  ║  │  /admin/(protected)                    /home, /research/  │  ║  │
│  ║  │                                                           │  ║  │
│  ║  │  ┌─────────────────────────┐  ┌──────────────────────┐ │  ║  │
│  ║  │  │  Dashboard Page         │  │  SiteChrome (Root)   │ │  ║  │
│  ║  │  │                         │  │  Wrapper             │ │  ║  │
│  ║  │  │ MaintenanceModeToggle   │  │ ┌──────────────────┐ │ │  ║  │
│  ║  │  │ (Admin Button)          │  │ │ MaintenanceWrapper   │ │  ║  │
│  ║  │  │                         │  │ │ (Conditional Logic)  │ │  ║  │
│  ║  │  │ ┌─────────────────────┐ │  │ │ ┌──────────────────┐ │ │  ║  │
│  ║  │  │ │ [Enable] [Disable]  │ │  │ │ │ useMaintenanceMode │ │  ║  │
│  ║  │  │ │ Button              │ │  │ │ │ Hook               │ │  ║  │
│  ║  │  │ └─────────────────────┘ │  │ │ └──────────────────┘ │ │  ║  │
│  ║  │  │ Updates DB              │  │ │          ↓            │ │  ║  │
│  ║  │  └─────────────────────────┘  │ │ ┌──────────────────┐ │ │  ║  │
│  ║  │         ↓                      │ │ │ Admin sees       │ │ │  ║  │
│  ║  │  toast.success()              │ │ │ Maintenance Page │ │ │  ║  │
│  ║  │  "Maintenance mode enabled"   │ │ │ OR               │ │ │  ║  │
│  ║  └─────────────────────────────────┤ | Normal Content  │ │ │  ║  │
│  ║                                     │ └──────────────────┘ │ │  ║  │
│  ║                                     └──────────────────────┘ │  ║  │
│  ║                                                              ║  ║  │
│  ╚──────────────────────────────────────────────────────────────╝  │  │
│                           ↓ ↑                               │           │
│                   (Real-time Updates)                       │           │
│                                                             │           │
└─────────────────────┬───────────────────────────────────────┴───────────┘
                      │
                      │ Postgres Changes WebSocket
                      ↓ (Real-time subscription)
┌─────────────────────────────────────────────────────────────────────────┐
│                         SUPABASE BACKEND                                 │
│                                                                           │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                              │  │
│  │                                                                   │  │
│  │  ┌─────────────────────────────────────────────────────────────┐ │  │
│  │  │  site_settings Table                                        │ │  │
│  │  │                                                             │ │  │
│  │  │  ┌─────────────────────────────────────────────────────┐  │ │  │
│  │  │  │  key              │ value   │ updated_at           │  │ │  │
│  │  │  ├─────────────────────────────────────────────────────┤  │ │  │
│  │  │  │ maintenance_mode  │ "true"  │ 2026-04-15 10:30:00 │  │ │  │
│  │  │  │ contact_email     │ "..."   │ ...                 │  │ │  │
│  │  │  │ home_about_title  │ "..."   │ ...                 │  │ │  │
│  │  │  └─────────────────────────────────────────────────────┘  │ │  │
│  │  │                                                             │ │  │
│  │  │  When admin updates maintenance_mode:                       │ │  │
│  │  │  1. database row UPDATED                                   │ │  │
│  │  │  2. postgres_changes event fired                          │ │  │
│  │  │  3. all subscribed clients notified                       │ │  │
│  │  └─────────────────────────────────────────────────────────────┘ │  │
│  │                                                                   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## User Journey Diagrams

### Journey 1: Admin Enables Maintenance Mode

```
TIMELINE:
┌───────────────────────────────────────────────────────────────────────┐
│                                                                       │
│ T=0:00  Admin clicks [Enable] button in dashboard                   │
│         └─ Button shows "Updating..." state                         │
│                                                                       │
│ T=0:10  API call sent to Supabase                                   │
│         └─ upsert: site_settings → maintenance_mode = "true"       │
│                                                                       │
│ T=0:20  Database updated                                             │
│         └─ PostgreSQL triggers postgres_changes event               │
│                                                                       │
│ T=0:30  Real-time broadcast to all clients                          │
│         └─ WebSocket message sent to all connected users           │
│                                                                       │
│ T=0:40  Admin receives update                                        │
│         └─ Button changes to [Disable] (red)                        │
│         └─ Warning message appears                                   │
│         └─ Toast: "Maintenance mode enabled" ✓                      │
│                                                                       │
│ T=0:50  Public website visitor's browser receives update            │
│         └─ useMaintenanceMode hook fires                            │
│         └─ isMaintenanceMode = true                                 │
│         └─ MaintenanceWrapper re-renders                            │
│         └─ Shows <MaintenancePage /> instead of content             │
│                                                                       │
│ T=0:60  User sees maintenance page with fade-in animation           │
│         └─ ✨ Maintenance page appears (beautiful UI)               │
│                                                                       │
│ T=1:00  All users see maintenance page (within ~1 second total)    │
│         └─ No page refresh needed (automatic updates) ✨            │
│                                                                       │
└───────────────────────────────────────────────────────────────────────┘

RESULT: Website is DOWN ⛔ → Visitors see maintenance page 🎯
```

### Journey 2: User Visits Website During Maintenance

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│ User visits: https://forest-ecology-lab.com                        │
│                    ↓                                                 │
│ Browser loads app/layout.jsx                                       │
│                    ↓                                                 │
│ SiteChrome component renders                                       │
│                    ↓                                                 │
│ MaintenanceWrapper mounts                                          │
│                    ↓                                                 │
│ useMaintenanceMode hook fires                                      │
│                    ↓                                                 │
│ Queries Supabase: "Is maintenance_mode = true?"                   │
│                    ↓                                                 │
│ Response: YES, maintenance_mode = "true"                           │
│                    ↓                                                 │
│ isMaintenanceMode = true                                           │
│                    ↓                                                 │
│ MaintenanceWrapper returns <MaintenancePage />                     │
│                    ↓                                    │            │
│ ╔════════════════════════════════════════════╗        │            │
│ ║   🌲 MAINTENANCE PAGE DISPLAYED 🌲         ║        │            │
│ ║                                            ║        │            │
│ ║   Green gradient background                ║        │            │
│ ║   Animated leaf icon                       ║        │            │
│ ║   "Under Maintenance" heading              ║        │            │
│ ║   Description text                         ║        │            │
│ ║   30-60 minutes estimate                   ║        │            │
│ ║   Contact email                            ║        │            │
│ ║   Fade-in animation (1000ms)               ║        │            │
│ ║   Animated background blobs                ║        │            │
│ ╚════════════════════════════════════════════╝        │            │
│                    ↓                                   │            │
│ Subscribe to real-time updates                       │            │
│ (watch for maintenance_mode changes)                 │            │
│                                                       │            │
│ If admin disables maintenance:                        │            │
│                    ↓                                   │            │
│ postgres_changes event fires                         │            │
│                    ↓                                   │            │
│ Hook receives: maintenance_mode = "false"            │            │
│                    ↓                                   │            │
│ MaintenanceWrapper re-renders                        │            │
│                    ↓                                   │            │
│ Shows normal website (no refresh needed!) ✨         │            │
│                                                       │            │
└──────────────────────────────────────────────────────┘            │
```

### Journey 3: Admin Disables Maintenance Mode

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│ Admin clicks [Disable] button in dashboard                        │
│         ↓                                                           │
│ Updates site_settings → maintenance_mode = "false"               │
│         ↓                                                           │
│ Database broadcasts update                                        │
│         ↓                                                           │
│ Admin sees:                                                        │
│ ✓ Button changes to [Enable] (green)                             │
│ ✓ Warning disappears                                             │
│ ✓ Toast: "Maintenance mode disabled"                             │
│         ↓                                                           │
│ PUBLIC USERS see:                                                  │
│ Website gradually transitions (within ~1 second)                 │
│ Maintenance page fades away                                      │
│ Normal website loads                                              │
│ NO page refresh needed! ✨                                        │
│         ↓                                                           │
│ All visitors back to normal browsing                              │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
RootLayout (src/app/layout.jsx)
  ↓
  SiteChrome (src/app/SiteChrome.jsx) ──┐
                                        │
                    ┌───────────────────┘
                    ↓
  MaintenanceWrapper (components/MaintenanceWrapper.jsx)
                    │
        ┌───────────┼───────────┐
        ↓                       ↓
  [MAINTENANCE]            [NORMAL]
        │                       │
        ↓                       ↓
  MaintenancePage          Regular Routes
  (beautiful page)         (/home, /research, etc.)
                                │
                        ┌───────┴────────┐
                        ↓                ↓
                    GovernmentHeader    Footer


Admin Routes:
/admin/dashboard → MaintenanceModeToggle (Button)
                  └─ Updates: site_settings.maintenance_mode
```

---

## Real-time Sync Timeline (Detailed)

```
┌─────────────────────────────────────────────────────────────────────┐
│  MOMENT 1: Admin clicks Enable button (T=0ms)                      │
└─────────────────────────────────────────────────────────────────────┘

Admin's Device                          Supabase Database
┌──────────────┐                       ┌────────────────┐
│ [Enable]     │ ──HTTP POST──────────→│ site_settings  │
│ Button       │                       │ table updates  │
└──────────────┘                       └────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│  MOMENT 2: Database broadcasts event (T=20-50ms)                  │
└─────────────────────────────────────────────────────────────────────┘

Postgres Changes Channel
┌──────────────────────────────────────────┐
│  DATABASE EVENT: UPDATE site_settings    │
│  WHERE key = 'maintenance_mode'          │
│  SET value = 'true'                      │
│                                           │
│  Subscribers waiting:                    │
│  - Admin Dashboard (socket 1)            │
│  - User's Browser (socket 2)             │
│  - Other User's Browser (socket 3)       │
└──────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│  MOMENT 3: Clients receive WebSocket message (T=50-500ms)          │
└─────────────────────────────────────────────────────────────────────┘

Connected Clients:

Socket 1: Admin Dashboard              Socket 2: User's Browser
┌────────────────────────────┐        ┌────────────────────────────┐
│ Event received:            │        │ Event received:            │
│ maintenance_mode = "true"  │        │ maintenance_mode = "true"  │
│           ↓                │        │           ↓                │
│ MaintenanceModeToggle      │        │ useMaintenanceMode hook    │
│ re-renders                 │        │ fires                      │
│           ↓                │        │           ↓                │
│ Button: [Disable] (red)    │        │ isMaintenanceMode = true   │
│ Warning: Maintenance is ON │        │           ↓                │
│ Toast: Success notif.      │        │ MaintenanceWrapper         │
│           ↓                │        │ re-renders                 │
│ ✓ User sees immediately   │        │           ↓                │
│                            │        │ <MaintenancePage />        │
│                            │        │ (with fade-in animation)   │
│                            │        │           ↓                │
│                            │        │ ✓ User sees page (no       │
│                            │        │   refresh needed!)         │
└────────────────────────────┘        └────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│  MOMENT 4: All clients synchronized (T=500-1000ms)                 │
└─────────────────────────────────────────────────────────────────────┘

FINAL STATE:
✓ Admin sees "Maintenance mode is ON" warning
✓ Admin's button shows [Disable]
✓ All public users see maintenance page
✓ All happen within ~1 second
✓ NO page refresh needed
✓ BEAUTIFUL real-time experience! ✨
```

---

## Database State Changes

```
INITIAL STATE (Before Enabling Maintenance):
┌───────────────────────────────────────────┐
│ site_settings Table                       │
├──────────────────┬────────────────────────┤
│ key              │ value                  │
├──────────────────┼────────────────────────┤
│ maintenance_mode │ "false"  ← (OFF)       │
│ contact_email    │ "..."                  │
│ home_about_title │ "..."                  │
└──────────────────┴────────────────────────┘

                         ↓ [Admin clicks Enable]

AFTER ENABLING MAINTENANCE:
┌───────────────────────────────────────────┐
│ site_settings Table                       │
├──────────────────┬────────────────────────┤
│ key              │ value                  │
├──────────────────┼────────────────────────┤
│ maintenance_mode │ "true"   ← (ON!)       │
│ contact_email    │ "..."                  │
│ home_about_title │ "..."                  │
└──────────────────┴────────────────────────┘

                         ↓ [Admin clicks Disable]

AFTER DISABLING MAINTENANCE:
┌───────────────────────────────────────────┐
│ site_settings Table                       │
├──────────────────┬────────────────────────┤
│ key              │ value                  │
├──────────────────┼────────────────────────┤
│ maintenance_mode │ "false"  ← (OFF)       │
│ contact_email    │ "..."                  │
│ home_about_title │ "..."                  │
└──────────────────┴────────────────────────┘
```

---

## Data Flow: useMaintenanceMode Hook

```
Hook Lifecycle:

MOUNT:
1. Component mounts
2. State: loading = true, isMaintenanceMode = false, error = null

INITIALIZATION:
3. useEffect fires
4. Call fetchMaintenanceMode()
5. Query Supabase: SELECT value FROM site_settings WHERE key = 'maintenance_mode'

FETCH RESULT:
6. Database returns: { value: "true" } or { value: "false" }
7. Parse value as boolean: true || false
8. Update state: isMaintenanceMode = true/false
9. Update state: loading = false

SUBSCRIBE TO CHANGES:
10. Create postgres_changes subscription
11. Listen to: site_settings table, maintenance_mode key
12. On change event:
    - Parse new value
    - Update isMaintenanceMode
    - Components re-render automatically

CLEANUP (UNMOUNT):
13. useEffect return function fires
14. Call cleanupChannel(channel)
15. Unsubscribe from changes
16. Prevent memory leaks ✓

RETURN:
17. Hook returns: { isMaintenanceMode, loading, error }
```

---

## Component Communication Map

```
┌────────────────────────────────────────────────────────────────────┐
│                    Information Flow                                │
└────────────────────────────────────────────────────────────────────┘

Database Change
      ↓
Postgres Changes Event
      ↓
useMaintenanceMode Hook (listening)
      ↓
Sets: isMaintenanceMode = true/false
      ↓
MaintenanceWrapper (consumes hook)
      ↓
Re-renders based on boolean
      ├─→ if TRUE: Show <MaintenancePage />
      └─→ if FALSE: Show {children}
      ↓
User sees instant change (< 1 second)


Admin Control Flow
      ↓
MaintenanceModeToggle (button click)
      ↓
toggleMaintenance() function
      ↓
supabase.from('site_settings').upsert(...)
      ↓
Database updates
      ↓
Postgres Changes broadcasts
      ↓
useMaintenanceMode hook receives update
      ↓
App UI updates (everywhere at once!)
      ↓
Admin sees: Button state changes
Admin sees: Toast notification
Public sees: Maintenance page appears/disappears
```

---

## File Dependencies

```
src/app/layout.jsx
    ↓
src/app/SiteChrome.jsx
    ├─ import MaintenanceWrapper
    └─ import GovernmentHeader, Footer
            ↓
components/MaintenanceWrapper.jsx
    ├─ import useMaintenanceMode
    ├─ import MaintenancePage
    └─ render children or MaintenancePage
            ↓
lib/useMaintenanceMode.js
    ├─ import supabase, cleanupChannel
    └─ subscribe to postgres_changes
            ↓
lib/supabase.js
    └─ Supabase client initialization
            ↓
Supabase Backend
    ├─ site_settings table
    └─ Postgres Changes


Admin Flow:

src/app/admin/(protected)/dashboard/page.jsx
    ├─ import MaintenanceModeToggle
    └─ render <MaintenanceModeToggle />
            ↓
components/admin/MaintenanceModeToggle.jsx
    ├─ import supabase
    ├─ fetchMaintenanceStatus() function
    └─ toggleMaintenance() function
            ↓
lib/supabase.js
    └─ Supabase client operations
            ↓
Supabase Backend
    └─ Update site_settings table
```

---

## Performance Metrics

```
INITIAL LOAD:
├─ Fetch maintenance status: ~200ms (DB round-trip)
├─ Parse response: <1ms
├─ Setup subscription: ~50ms
└─ Total: ~250ms (user might see loading state)

REAL-TIME UPDATE (After Enable/Disable):
├─ Database update: ~50ms
├─ Postgres Changes broadcast: ~20ms
├─ WebSocket delivery: ~50-200ms (network dependent)
├─ Client re-render: ~10-30ms
└─ Total: ~150-300ms (usually ~1 second or less)

BUNDLE SIZE IMPACT:
├─ MaintenancePage.jsx: ~8KB
├─ useMaintenanceMode.js: ~2KB
├─ MaintenanceWrapper.jsx: ~1KB
├─ MaintenanceModeToggle.jsx: ~3KB
└─ Total: ~14KB (gzipped: ~3-4KB)
```

---

**This diagram shows:** ✨  
- How components talk to each other
- How real-time updates happen
- User experience from click to seeing change
- Database state changes
- File dependencies and imports

**Key Insight:** Real-time Postgres Changes keeps all clients in sync automatically! 🎯
