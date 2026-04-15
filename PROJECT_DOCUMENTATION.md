# Forest Ecology Lab - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Frontend Routes & Flow](#frontend-routes--flow)
5. [Backend/Database Structure](#backendarapi-structure)
6. [Admin Panel Structure](#admin-panel-structure)
7. [Database Schema](#database-schema)
8. [Environment Setup](#environment-setup)
9. [Project Structure](#complete-project-structure)
10. [Deployment Guide](#deployment-guide)

---

## 🌳 Project Overview

**Forest Ecology Lab** is a full-stack Next.js web application for showcasing forest ecology research, team members, gallery images, and research areas. It features:

- **Public Website**: Marketing site with hero, gallery, research areas, team, and contact form
- **Admin CMS**: Authenticated dashboard to manage all website content
- **Real-time Updates**: Live content synchronization across all pages
- **Cloud-based Backend**: Supabase for database + authentication
- **CDN Images**: Cloudinary integration for optimized image delivery
- **3D Visualization**: Three.js for forest scene visualization

**Key Features:**
- ✅ Public website with multiple sections
- ✅ Email/password authentication for admins
- ✅ Real-time content management
- ✅ Gallery with lightbox views
- ✅ Multi-image research posts
- ✅ Team member management
- ✅ Collaborator affiliations
- ✅ Contact form with message storage
- ✅ Site-wide customizable settings
- ✅ Hero carousel slides

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | Next.js | 16.1.6 |
| **React** | React | 19.2.3 |
| **Styling** | TailwindCSS | 4.0 |
| **Database** | Supabase (PostgreSQL) | - |
| **Authentication** | Supabase Auth | - |
| **Real-time** | Supabase Realtime (WebSocket) | - |
| **File Storage** | Cloudinary | - |
| **3D Graphics** | Three.js | 0.183.2 |
| **3D with React** | @react-three/fiber | 9.5.0 |
| **3D Utilities** | @react-three/drei | 10.7.7 |
| **Animations** | Framer Motion | 12.36.0 |
| **Notifications** | React Hot Toast | 2.6.0 |
| **Icons** | React Icons | 5.6.0 |
| **Build Tool** | Webpack (Next.js) | - |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js 16)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────┐      ┌──────────────────────────────┐  │
│  │  PUBLIC PAGES       │      │   PROTECTED ADMIN PAGES      │  │
│  │                     │      │   (Auth Guard in Layout)     │  │
│  │ • Home (Hero)       │      │                              │  │
│  │ • Gallery           │      │ • /admin/login               │  │
│  │ • Research          │      │ • /admin/dashboard           │  │
│  │ • Team              │      │ • /admin/home                │  │
│  │ • Contact           │      │ • /admin/gallery             │  │
│  │                     │      │ • /admin/research            │  │
│  └─────────────────────┘      │ • /admin/team                │  │
│                               │ • /admin/collaborators       │  │
│                               │ • /admin/messages            │  │
│                               └──────────────────────────────┘  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │         SUPABASE CLIENT (@supabase/supabase-js)          │   │
│  │                                                           │   │
│  │  • Real-time subscriptions (gallery, research, etc)      │   │
│  │  • Authentication (email/password)                       │   │
│  │  • Direct database queries (no API routes needed)        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            CLOUDINARY CLIENT (Image uploads)             │   │
│  │                                                           │   │
│  │  • Direct upload from browser to Cloudinary             │   │
│  │  • URL-based image delivery with optimization           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                ┌─────────────┴──────────────┐
                │                            │
                ▼                            ▼
        ┌──────────────────┐      ┌──────────────────┐
        │  SUPABASE        │      │   CLOUDINARY     │
        │  PostgreSQL      │      │   Image CDN      │
        │  + RLS + RealTime│      │   + Optimization │
        └──────────────────┘      └──────────────────┘
                │
                ▼
        ┌──────────────────┐
        │  Database Tables │
        │  • gallery       │
        │  • research      │
        │  • team          │
        │  • hero_slides   │
        │  • collaborators │
        │  • site_settings │
        │  • contact_msgs  │
        └──────────────────┘
```

### Data Flow

1. **Public Users:**
   - Browser → Supabase (public read)
   - Fetches gallery, research, team, hero slides, site settings
   - Real-time subscriptions for live updates

2. **Admin Users:**
   - Login → Supabase Auth → Session stored in localStorage
   - Admin pages → Protected layout verifies auth
   - CRUD operations → Supabase (authenticated write)
   - Image uploads → Cloudinary (direct browser upload)
   - Real-time listeners update dashboard as changes happen

3. **Contact Form:**
   - Public insert to `contact_messages` (no auth needed)
   - Admin can read/update/delete (auth required)

---

## 🌐 Frontend Routes & Flow

### **Public Routes** (No Authentication Required)

```
/ (Home Page)
├── Hero carousel (hero_slides table)
├── About section (about key from site_settings)
├── Gallery preview (gallery table)
├── Research overview (research table)
├── Team preview (team table)
└── Footer with contact CTA

/gallery
├── Full gallery view
├── Images from gallery table
└── Lightbox with zoom/navigation

/research
├── Research cards
├── Images from research table
└── Modal with full research details + image_urls array

/team
├── Team members from team table
├── Shows name, role, description, image_url, bio, tagline
└── Collaborators section (collaborators table)

/contact
├── Contact form (name, email, subject, message)
├── Submit to contact_messages table
└── Confirmation toast
```

### **Protected Routes** (Authentication Required)

```
/admin/login
├── Email input
├── Password input
├── Supabase Auth
├── Success → redirect to /admin/dashboard
└── Failure → show error toast

/admin (Layout wrapper for protected routes)
├── Sidebar navigation
├── AdminNavbar with logout
├── Sidebar + Toaster component
└── Auth guard: checks getUser() on mount
   └── If no user → redirect to /admin/login
   └── If user exists → render protected page

/admin/(protected)/dashboard
├── Statistics cards:
│  ├── Gallery count
│  ├── Research count
│  ├── Team count
│  ├── Hero slides count
│  ├── Collaborators count
│  ├── Contact messages count
│  └── Unread messages count
├── Recent gallery items (realtime)
├── Recent messages (realtime)
└── Links to edit content

/admin/(protected)/home
├── Hero slides management
│  ├── List all hero_slides (sortable)
│  ├── Add new slide (ImageUpload → Cloudinary)
│  ├── Edit slide (sort order, image)
│  └── Delete slide (with confirmation)
├── Site settings editor
│  ├── About text (about key)
│  ├── Research intro text (research_intro key)
│  ├── Contact info (contact_info key)
│  └── Save/edit modals
└── Real-time subscriptions for live updates

/admin/(protected)/gallery
├── List all gallery images
├── Add new image (ImageUpload component)
├── Edit image (title, url)
├── Delete image (with confirmation)
└── Real-time sync across open admin tabs

/admin/(protected)/research
├── List all research posts
├── Add new research
│  ├── Title, description, tagline, bio inputs
│  ├── MultiImageUpload for image_urls array
│  └── First image sets primary image_url
├── Edit existing research
│  ├── Update text fields
│  ├── Manage images
│  └── Modify sort order
├── Delete research (with confirmation)
└── Real-time updates

/admin/(protected)/team
├── List all team members
├── Add team member
│  ├── Name, role, tagline, bio, description inputs
│  ├── ImageUpload for team image
│  └── Create new team entry
├── Edit team member
│  ├── Update all fields
│  ├── Change image
│  └── Save changes
├── Delete team member
└── Real-time sync

/admin/(protected)/collaborators
├── List all collaborators
├── Add collaborator
│  ├── Name, title, affiliation, address inputs
│  ├── ImageUpload for collaborator image
│  ├── Sort order (default 0)
│  └── Create entry
├── Edit collaborator details
├── Delete collaborator
└── Real-time updates

/admin/(protected)/messages
├── List all contact_messages
├── Filter by read/unread status
├── Mark as read (toggle read boolean)
├── View message details in modal
├── Delete message (with confirmation)
└── Real-time notification of new messages
```

---

## 🔌 Backend/API Structure

### **No Traditional API Routes** ❌

This project uses **Supabase client-side queries** instead of API routes:

```javascript
// Instead of: POST /api/gallery
// Use direct Supabase:

const { data, error } = await supabase
  .from('gallery')
  .insert([{ title: 'Photo', image_url: 'https://...' }])
  .select()

// RLS (Row Level Security) handles permissions
```

### **Why No API Routes?**

✅ **Advantages:**
- Simplified architecture (no backend code maintenance)
- Row Level Security (RLS) provides built-in access control
- Real-time subscriptions work natively in frontend
- Cloudinary handles image optimization
- Supabase handles scaling

⚠️ **Considerations:**
- All business logic lives in React components
- No backend validation layer (consider Edge Functions for production)
- Rate limiting relies on Supabase settings
- Better for CMS/content-heavy sites (not API-first applications)

### **Data Access Layer** (lib/supabase.js)

```javascript
// Supabase client initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Export for use across app:
// - supabase.auth.signInWithPassword()
// - supabase.from('table_name').select()
// - supabase.from('table_name').insert()
// - supabase.from('table_name').update()
// - supabase.from('table_name').delete()
```

### **Image Upload Flow** (lib/cloudinary.js)

```javascript
// Direct browser upload (no backend needed)
const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  )
  
  return response.json()
}

// URL optimization (CDN transform)
const optimizeCloudinaryUrl = (url) => {
  // Adds f_auto, q_auto for automatic format/quality
  return url.replace('/upload/', '/upload/f_auto,q_auto/')
}
```

### **Authentication Flow** (Supabase)

```javascript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'password123'
})

// Session check
const { data: { user } } = await supabase.auth.getUser()

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT') {
    // Handle logout
  }
})

// Logout
await supabase.auth.signOut()
```

### **Real-time Subscriptions**

```javascript
// Subscribe to changes in real-time
const channel = supabase
  .channel('public:gallery')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'gallery' },
    (payload) => {
      // Refetch/update UI with new data
    }
  )
  .subscribe()

// Clean up
supabase.removeChannel(channel)
```

---

## 📊 Admin Panel Structure

### **Main Navigation (Sidebar)**

```
Sidebar Menu:
├── Dashboard [icon]
│   └── Overview statistics & recent activity
├── Home [icon]
│   └── Hero carousel & site copy management
├── Gallery [icon]
│   └── Manage gallery images
├── Research [icon]
│   └── Manage research posts
├── Team [icon]
│   └── Manage team members
├── Collaborators [icon]
│   └── Manage partner affiliations
└── Messages [icon]
    └── View contact form submissions
```

### **Dashboard Statistics**

```
┌──────────────────────────────────────────────────────┐
│              ADMIN DASHBOARD                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Stat Card]   [Stat Card]   [Stat Card]            │
│  Gallery: 23   Research: 12  Team: 8                │
│                                                      │
│  [Stat Card]   [Stat Card]   [Stat Card]            │
│  Slides: 5     Collaborators: 4  Messages: 15       │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │ RECENT GALLERY ITEMS (Real-time)               │ │
│  │ ────────────────────────────────────────────── │ │
│  │ • Photo 1 - Updated 2 min ago                  │ │
│  │ • Photo 2 - Updated 15 min ago                 │ │
│  │ • Photo 3 - Updated 1 hour ago                 │ │
│  └────────────────────────────────────────────────┘ │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │ RECENT MESSAGES (Unread: 3)                     │ │
│  │ ────────────────────────────────────────────── │ │
│  │ 🔴 John Smith - Subject line here... 1 min ago │ │
│  │ 🔴 Jane Doe - Another inquiry... 10 min ago   │ │
│  └────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### **Content Management Workflow**

**Example: Adding Gallery Image**

```
User clicks "+ Add Gallery"
  ↓
Modal opens with:
  • Title input
  • ImageUpload component
  ↓
User selects image file
  ↓
ImageUpload uploads to Cloudinary:
  • Browser → Cloudinary API (direct)
  • Returns: image_url
  ↓
User enters title
  ↓
User clicks "Save"
  ↓
Insert into database:
  supabase.from('gallery').insert({
    title: '...',
    image_url: '...'
  })
  ↓
Success toast: "Gallery item added"
Modal closes
  ↓
Real-time listener refreshes list
  • Gallery component receives update
  • List re-renders with new item
  • Dashboard stat updates
```

### **Real-time Sync Example**

```
SCENARIO: Admin 1 adds photo, Admin 2 sees it immediately

Admin 1 (Tab A)                Admin 2 (Tab B)
─────────────────────         ───────────────────
Clicks "+ Add"                [Looking at gallery]
Opens modal
Uploads image
Clicks "Save"
  │
  └─→ INSERT into gallery
       │
       └─→ Supabase triggers channel
            notification
            │
            ├─→ Admin 1's component
            │    • Refetch gallery list
            │    • Re-render
            │    • Show toast: "Added!"
            │
            └─→ Admin 2's channel listener
                 • Receives INSERT event
                 • Refetch gallery list
                 • Re-render
                 • AUTO-UPDATE (no action needed!)
```

---

## 🗄️ Database Schema

### **Complete Schema Diagram**

```
┌─────────────────────────────────────┐
│         PUBLIC READ TABLES          │
├─────────────────────────────────────┤
│                                     │
│  GALLERY                            │
│  ├── id (UUID) PK                   │
│  ├── title (text) NOT NULL          │
│  ├── image_url (text) NOT NULL      │
│  └── created_at (timestamptz)       │
│                                     │
│  RESEARCH                           │
│  ├── id (UUID) PK                   │
│  ├── title (text) NOT NULL          │
│  ├── description (text) NOT NULL    │
│  ├── image_url (text)               │
│  ├── image_urls (text[])            │
│  ├── tagline (text)                 │
│  ├── bio (text)                     │
│  └── created_at (timestamptz)       │
│                                     │
│  TEAM                               │
│  ├── id (UUID) PK                   │
│  ├── name (text) NOT NULL           │
│  ├── role (text) NOT NULL           │
│  ├── description (text)             │
│  ├── image_url (text)               │
│  ├── tagline (text)                 │
│  ├── bio (text)                     │
│  └── created_at (timestamptz)       │
│                                     │
│  HERO_SLIDES                        │
│  ├── id (UUID) PK                   │
│  ├── image_url (text) NOT NULL      │
│  ├── sort_order (int)               │
│  └── created_at (timestamptz)       │
│                                     │
│  COLLABORATORS                      │
│  ├── id (UUID) PK                   │
│  ├── name (text) NOT NULL           │
│  ├── title (text)                   │
│  ├── affiliation (text)             │
│  ├── address (text)                 │
│  ├── image_url (text)               │
│  ├── sort_order (int)               │
│  └── created_at (timestamptz)       │
│                                     │
│  SITE_SETTINGS                      │
│  ├── key (text) PK                  │
│  ├── value (text)                   │
│  └── updated_at (timestamptz)       │
│     (Keys: about, research_intro,   │
│      contact_info, etc.)            │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│      SUBMISSION TABLE               │
├─────────────────────────────────────┤
│                                     │
│  CONTACT_MESSAGES                   │
│  ├── id (UUID) PK                   │
│  ├── name (text) NOT NULL           │
│  ├── email (text) NOT NULL          │
│  ├── subject (text) NOT NULL        │
│  ├── message (text) NOT NULL        │
│  ├── read (boolean)                 │
│  └── created_at (timestamptz)       │
│                                     │
│  (Public insert, auth-only read)    │
│                                     │
└─────────────────────────────────────┘
```

### **Row Level Security (RLS) Policies**

| Table | Role | Operations | Policy |
|-------|------|-----------|--------|
| gallery | PUBLIC | SELECT | Allow all |
| gallery | AUTHENTICATED | INSERT, UPDATE, DELETE | Allow all |
| research | PUBLIC | SELECT | Allow all |
| research | AUTHENTICATED | INSERT, UPDATE, DELETE | Allow all |
| team | PUBLIC | SELECT | Allow all |
| team | AUTHENTICATED | INSERT, UPDATE, DELETE | Allow all |
| hero_slides | PUBLIC | SELECT | Allow all |
| hero_slides | AUTHENTICATED | INSERT, UPDATE, DELETE | Allow all |
| site_settings | PUBLIC | SELECT | Allow all |
| site_settings | AUTHENTICATED | INSERT, UPDATE, DELETE | Allow all |
| collaborators | PUBLIC | SELECT | Allow all |
| collaborators | AUTHENTICATED | INSERT, UPDATE, DELETE | Allow all |
| contact_messages | PUBLIC | INSERT | Allow all |
| contact_messages | AUTHENTICATED | SELECT, UPDATE, DELETE | Allow all |

### **Real-time Subscriptions Enabled**
- ✅ gallery
- ✅ research
- ✅ team
- ✅ hero_slides
- ✅ site_settings
- ✅ collaborators
- ✅ contact_messages

---

## 🔧 Environment Setup

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Supabase account (create free at supabase.com)
- Cloudinary account (create free at cloudinary.com)

### **Step 1: Clone & Install**

```bash
git clone <repository>
cd forest2-main
npm install
```

### **Step 2: Create Supabase Project**

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Run the SQL migrations:
   - Copy **supabase-setup.sql** into Supabase SQL Editor → Run
   - Copy **supabase-migration-v2.sql** into Supabase SQL Editor → Run
   - (Optional) Copy **supabase-migration-collaborators-fields.sql** → Run
   - (Optional) Copy **supabase-collaborators-seed.sql** → Run (adds 5 sample collaborators)

4. Get your credentials:
   - Dashboard → Settings → API
   - Copy `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy `Anon Public Key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### **Step 3: Create Cloudinary Account**

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up (free tier available)
3. Dashboard → Settings → Upload
   - Copy `Cloud Name` → `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
4. Dashboard → Settings → Upload → Add Upload Preset
   - Create unsigned preset named `forest_lab`
   - Copy name → `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

### **Step 4: Environment Variables**

Create `.env.local` in project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=forest_lab

# Optional: For subdirectory deployment (e.g., /babysit)
# NEXT_PUBLIC_BASE_PATH=/babysit
```

### **Step 5: Create Admin User**

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add user"
3. Enter email and password
4. Create user

### **Step 6: Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### **Admin Login**
- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: (from Step 5)
- Password: (from Step 5)

---

## 📁 Complete Project Structure

```
forest2-main/
├── src/
│   └── app/                              # Next.js 16 App Router
│       ├── layout.jsx                    # Root layout
│       ├── page.jsx                      # Home page
│       ├── (site)/                       # Public routes
│       │   ├── gallery/
│       │   │   └── page.jsx
│       │   ├── research/
│       │   │   └── page.jsx
│       │   ├── team/
│       │   │   └── page.jsx
│       │   └── contact/
│       │       ├── page.jsx
│       │       └── ContactPageClient.jsx
│       │
│       ├── admin/                        # Admin routes
│       │   ├── layout.jsx                # Auth guard + navbar
│       │   ├── login/
│       │   │   └── page.jsx              # Login form
│       │   │
│       │   └── (protected)/              # Protected route group
│       │       ├── layout.jsx            # Sidebar layout
│       │       ├── dashboard/
│       │       │   └── page.jsx
│       │       ├── home/
│       │       │   └── page.jsx
│       │       ├── gallery/
│       │       │   └── page.jsx
│       │       ├── research/
│       │       │   └── page.jsx
│       │       ├── team/
│       │       │   └── page.jsx
│       │       ├── collaborators/
│       │       │   └── page.jsx
│       │       └── messages/
│       │           └── page.jsx
│       │
│       └── SiteChrome.jsx                # Wrapper for all pages
│
├── components/                           # Reusable components
│   ├── Banner.js
│   ├── GovernmentHeader.js
│   ├── Footer/
│   │   └── Footer.js
│   ├── Navbar/
│   │   └── ...
│   ├── Hero/
│   │   └── Hero.js
│   ├── Home/
│   │   └── HomeAbout.jsx
│   ├── Gallery/
│   │   ├── Gallery.js
│   │   └── GalleryLightbox.jsx
│   ├── ResearchAreas/
│   │   ├── ResearchAreas.js
│   │   └── ResearchModal.jsx
│   ├── Team/
│   │   └── Team.js
│   ├── ForestScene/
│   │   └── ForestScene.js                # Three.js 3D scene
│   │
│   └── admin/                            # Admin-only components
│       ├── Sidebar.jsx
│       ├── AdminNavbar.jsx
│       ├── Modal.jsx                     # Reusable dialog
│       ├── ImageUpload.jsx               # Single image upload
│       ├── MultiImageUpload.jsx          # Multiple image upload
│       └── StatCard.jsx
│
├── lib/
│   ├── supabase.js                       # Supabase client init
│   ├── cloudinary.js                     # Image utility functions
│   ├── collaboratorsDefaults.js
│   └── siteSettingKeys.js
│
├── styles/
│   └── globals.css                       # TailwindCSS global styles
│
├── public/
│   ├── gilroy-font/                      # Custom fonts
│   └── placeholders/                     # Placeholder images
│
├── images/
│   └── team/                             # Team images
│
├── SQL Migrations/
│   ├── supabase-setup.sql                # Core tables
│   ├── supabase-migration-v2.sql         # v2 additions
│   ├── supabase-migration-collaborators-fields.sql
│   └── supabase-collaborators-seed.sql   # Sample data
│
├── Configuration Files/
│   ├── next.config.mjs                   # Next.js config
│   ├── jsconfig.json                     # Path aliases
│   ├── package.json                      # Dependencies
│   ├── postcss.config.mjs                # PostCSS config
│   ├── eslint.config.mjs                 # ESLint config
│   └── tailwind.config.js                # TailwindCSS config
│
├── Environment Files/
│   └── .env.local                        # (Create this)
│
└── README.md                             # Project readme
```

---

## 🚀 Deployment Guide

### **Deploy to Vercel** (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import GitHub/GitLab repository

2. **Set Environment Variables**
   - Project Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://xxxxx.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGc...
     NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
     NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = forest_lab
     ```

3. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site is live!

4. **For Subdirectory Deployment** (e.g., `/babysit`)
   - Add environment variable: `NEXT_PUBLIC_BASE_PATH=/babysit`
   - Redeploy

### **Build Command**
```bash
npm run build
```

### **Start Command**
```bash
npm start
```

### **Production Checklist**
- [ ] All environment variables set in Vercel
- [ ] Database backups enabled (Supabase)
- [ ] RLS policies verified (Supabase → Authentication → Policies)
- [ ] Cloudinary rate limits checked
- [ ] CORS configured if needed
- [ ] Analytics/monitoring setup (optional)

---

## 📊 Key Features Explained

### **1. Real-time Updates**
The dashboard updates instantly when content changes:
- Admin 1 edits gallery → Admin 2's dashboard auto-updates
- New contact message → Dashboard notification appears
- All without page refresh

**How it works:**
```javascript
const channel = supabase.channel('gallery')
  .on('postgres_changes', { event: '*', table: 'gallery' }, 
    (payload) => refetchGallery()
  )
  .subscribe()
```

### **2. Image Optimization**
All images go through Cloudinary:
- Automatic format selection (WebP for modern browsers)
- Quality auto-adjustment (f_auto, q_auto)
- CDN delivery for fast loading

### **3. Row Level Security (RLS)**
Database security without API layer:
- Public users can READ gallery/research/team/etc
- Only authenticated admins can WRITE/UPDATE/DELETE
- Contact form: anyone can submit, only admins can view

### **4. Responsive Design**
TailwindCSS 4 for mobile-first styling:
- Works on mobile, tablet, desktop
- Admin panel responsive
- Gallery lightbox mobile-friendly

---

## 🛡️ Security Considerations

### **Current Setup**
✅ RLS provides database-level security
✅ Authentication required for admin operations
✅ No sensitive data exposed in frontend
✅ Cloudinary handles image security

### **Recommendations for Production**
⚠️ Add rate limiting (Supabase middleware)
⚠️ Consider email verification for admin accounts
⚠️ Enable Supabase backup & recovery
⚠️ Monitor contact form for spam (add captcha if needed)
⚠️ Regular security audits of RLS policies

---

## 🐛 Troubleshooting

### **Issue: "Unauthorized" errors after login**
- Check RLS policies: Supabase → Authentication → Policies
- Verify user role is 'authenticated'
- Clear browser cache and localStorage

### **Issue: Images not loading**
- Verify Cloudinary cloud name in env variables
- Check upload preset exists
- Confirm image URLs are valid (try in new tab)

### **Issue: Real-time not updating**
- Check real-time is enabled on tables (Supabase → Realtime)
- Verify network connection (WebSocket working)
- Check browser console for errors

### **Issue: Admin login not working**
- Verify user exists: Supabase → Authentication → Users
- Check env variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Clear browser cookies and try again

---

## 📚 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## 📝 Development Workflow

### **Adding a New Page**

1. Create file: `src/app/my-page/page.jsx`
2. Add layout if needed
3. Import components
4. Use Supabase client if needed:
   ```javascript
   import { supabase } from '@/lib/supabase'
   
   useEffect(() => {
     supabase.from('table').select().then(setData)
   }, [])
   ```

### **Adding a New Admin Page**

1. Create file: `src/app/admin/(protected)/my-feature/page.jsx`
2. Protected layout automatically wraps it
3. Sidebar automatically shows in layout
4. Add navigation link to Sidebar.jsx
5. Use Supabase for CRUD operations

### **Adding a New Database Table**

1. Go to Supabase → SQL Editor
2. Create table with UUID PK
3. Enable RLS: `ALTER TABLE table_name ENABLE ROW LEVEL SECURITY`
4. Add policies for read/write
5. Enable realtime (if needed)
6. Update frontend queries

---

## 📞 Support & Maintenance

For issues or questions:
1. Check Troubleshooting section above
2. Review Supabase error messages
3. Check browser console for JavaScript errors
4. Test in incognito mode (clear cache)

---

**Last Updated:** April 2026
**Project Version:** 1.0.0

---

## Summary

This is a **full-stack forest ecology lab website** built with:
- **Frontend:** Next.js 16 + React 19 + TailwindCSS 4
- **Backend:** Supabase (PostgreSQL + Auth + Realtime)
- **Storage:** Cloudinary (images)
- **Admin CMS:** Protected dashboard for content management
- **Real-time:** Live updates across tabs/browsers
- **Security:** Row Level Security (RLS) + Authentication

The application has no traditional API routes—it uses the Supabase client directly from the frontend, with RLS handling all access control. This makes it simple to deploy, maintain, and scale.
