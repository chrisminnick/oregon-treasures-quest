# Site Preview Guide

## 🖥️ Homepage (`index.html`)

### Layout Structure

```
┌─────────────────────────────────────────┐
│  🏠 Oregon Treasures Quest   [Dropdown] │ ← Sticky Navigation
├─────────────────────────────────────────┤
│                                         │
│         [Oregon Landscape Image]        │ ← Header with branding
│                                         │
│      2025 Guide to Oregon's Treasures   │
│   Treasures in each of Oregon's 36     │
│              counties                    │
│      Brought to you by Senator Merkley  │
│         [Senator Logo]                  │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│          A NOTE FROM JEFF               │ ← Introduction section
│                                         │
│  [Full introduction text]               │
│  [Challenge levels table]               │
│  [Submit photos email]                  │
│  [Before You Go tips box]               │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│     Explore Oregon's 36 Counties        │ ← County grid
│                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐     │
│  │ [IMG]  │ │ [IMG]  │ │ [IMG]  │     │ Mobile: 1 column
│  │ Baker  │ │ Benton │ │Clackam │     │ Tablet: 2 columns
│  │County  │ │County  │ │County  │     │ Desktop: 3-4 columns
│  └────────┘ └────────┘ └────────┘     │
│                                         │
│  [... 33 more county cards ...]        │
│                                         │
└─────────────────────────────────────────┘
│     Footer with Senator info            │
└─────────────────────────────────────────┘
```

### County Card Design

```
┌─────────────────────────┐
│                         │
│    [Featured Image]     │ ← Aspect ratio maintained
│                         │   Hover: zoom & shadow
├─────────────────────────┤
│ Baker County            │ ← County name (bold)
│ National Historic       │ ← Primary attraction
│ Oregon Trail Center     │   (truncated to 2 lines)
│                         │
│ Learn more →            │ ← Call to action
└─────────────────────────┘
```

## 📄 County Page (`counties/baker-county.html`)

### Layout Structure

```
┌─────────────────────────────────────────┐
│ 🏠 Oregon Treasures Quest               │ ← Sticky navigation
│ [← Benton] [Jump to...▼] [Clackamas →] │   (always visible)
├─────────────────────────────────────────┤
│ Home / Baker County                      │ ← Breadcrumb
├─────────────────────────────────────────┤
│                                         │
│         BAKER COUNTY                    │ ← Page header
│   National Historic Oregon Trail        │   (gradient background)
│        Interpretive Center              │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│      [Large County Image]               │ ← Hero image
│  Photo credit: Team Merkley             │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  National Historic Oregon Trail         │ ← Primary attraction
│      Interpretive Center                │   section
│                                         │
│  [Full description text in multiple    │
│   paragraphs with proper spacing]      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  You May Also Want to Explore...        │ ← Additional attractions
│                                         │   (gray background)
│  • Historic Downtown Baker City →      │
│  • Sumpter Valley Dredge →             │
│  • Snake River Canyon →                │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  More Information                       │ ← Info section
│  Visit blm.gov and search...           │   (teal background)
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  Use the dropdown menu above           │ ← Navigation hint
│  [← Back to All Counties]              │   Large button
│                                         │
└─────────────────────────────────────────┘
│     Footer with Senator info            │
└─────────────────────────────────────────┘
```

## 📱 Mobile View (< 640px)

### Navigation Stacking

```
┌─────────────────────┐
│ 🏠 Oregon Treasures │ ← Home link
│      Quest          │
├─────────────────────┤
│  ← Baker County     │ ← Previous (full width)
├─────────────────────┤
│ Clackamas County →  │ ← Next (full width)
├─────────────────────┤
│  Jump to County...▼ │ ← Dropdown (full width)
└─────────────────────┘
```

### County Grid (Mobile)

```
┌─────────────────────┐
│                     │
│   [County Image]    │
│                     │
│   Baker County      │
│   Oregon Trail      │
│   Center            │
│   Learn more →      │
└─────────────────────┘
┌─────────────────────┐
│                     │
│   [County Image]    │
│                     │
│   Benton County     │
│   Marys Peak        │
│   Learn more →      │
└─────────────────────┘
   ... (stacked)
```

## 💻 Desktop View (> 1024px)

### Navigation Layout

```
┌────────────────────────────────────────────────────┐
│ 🏠 Oregon Treasures Quest    [← Baker] [Jump▼] [Benton →] │
└────────────────────────────────────────────────────┘
```

### County Grid (4 columns)

```
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│[IMG] │ │[IMG] │ │[IMG] │ │[IMG] │
│Baker │ │Benton│ │Clack-│ │Clat- │
│County│ │County│ │amas  │ │sop   │
└──────┘ └──────┘ └──────┘ └──────┘
┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐
│[IMG] │ │[IMG] │ │[IMG] │ │[IMG] │
└──────┘ └──────┘ └──────┘ └──────┘
```

## 🎨 Interactive Elements

### Hover States

- **County cards**: Shadow increases, image zooms slightly
- **Navigation buttons**: Background darkens
- **Links**: Underline appears, color changes to blue
- **Dropdown**: Border changes to Oregon blue on focus

### Click Actions

- **County card**: Navigate to county page
- **Previous button**: Go to previous county
- **Next button**: Go to next county
- **Dropdown**: Jump to selected county
- **Home link**: Return to homepage
- **Breadcrumb**: Navigate back to homepage
- **External links**: Open in new tab

## 🎯 User Flow Example

### Scenario: User wants to visit Baker County

```
1. Land on homepage
   ↓
2. Scroll through county grid
   ↓
3. Click "Baker County" card
   ↓
4. View Baker County page
   ├─ See primary attraction
   ├─ Read additional attractions
   └─ Click external link to blm.gov

5. Want to see next county:
   ├─ Option A: Click "Benton County →" button
   ├─ Option B: Use "Jump to County" dropdown
   └─ Option C: Click breadcrumb to go back home
```

## 📐 Responsive Breakpoints

### Mobile First Approach

```
Base (0-639px):     Single column, stacked layout
sm (640-767px):     2 columns for county grid
md (768-1023px):    2 columns, horizontal nav
lg (1024-1279px):   3 columns, full nav
xl (1280px+):       4 columns, full nav
```

## 🔍 Accessibility Features

### Keyboard Navigation

- Tab through all interactive elements
- Enter to activate buttons/links
- Arrow keys in dropdown menu
- Escape to close dropdown

### Screen Reader Support

- Semantic HTML (nav, main, article, section)
- ARIA labels on navigation
- Alt text on all images
- Descriptive link text

### Visual Accessibility

- High contrast text (WCAG AA compliant)
- Clear focus indicators
- Readable font sizes (16px base)
- Touch targets ≥ 44x44px

## 📊 Performance Indicators

### Load Sequence

1. HTML loads (instant)
2. Tailwind CSS loads from CDN (cached)
3. Navigation appears
4. Content renders
5. Images lazy-load as user scrolls

### Critical Rendering Path

- Above-fold content: < 200ms
- Full page interactive: < 1 second
- Images: Progressive (load on demand)

---

To preview the actual site, open `index.html` in your web browser!
