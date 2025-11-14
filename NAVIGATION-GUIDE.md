# Navigation Guide

## Site Structure

The Oregon Treasures Quest site now uses a **multi-page architecture** with:

- **1 Homepage** (`index.html`) - Landing page with all counties
- **36 County Pages** (`counties/*.html`) - Individual pages for each county

## Navigation Features

### 🏠 Homepage Navigation

The homepage provides:

1. **County Grid**:

   - Visual cards showing each county's featured image
   - County name and primary attraction
   - Hover effects with image zoom and shadow
   - Direct links to individual county pages

2. **Responsive Layout**:
   - Mobile (1 column)
   - Tablet (2 columns)
   - Desktop (3-4 columns)

### 🗺️ County Page Navigation

Each county page has **multiple navigation methods**:

#### 1. Breadcrumb Navigation

Located at the top of each page:

```
Home / Baker County
```

- Click "Home" to return to the homepage
- Shows current location in the site

#### 2. Previous/Next Buttons

Sequential navigation through counties (alphabetical order):

```
[← Benton County] [Clackamas County →]
```

- First county (Baker) shows only "Next"
- Last county (Yamhill) shows only "Previous"
- All others show both buttons
- Responsive: Stack on mobile, side-by-side on desktop

#### 3. County Dropdown Menu

Jump to any county instantly:

```
[Jump to County... ▼]
```

- Lists all 36 counties alphabetically
- Current county is pre-selected
- Works on all devices (native dropdown)

#### 4. Home Link

Always visible in the top navigation bar:

```
🏠 Oregon Treasures Quest
```

- Returns to homepage from any county page

#### 5. Back to All Counties Button

At the bottom of each county page:

```
[← Back to All Counties]
```

- Large, prominent button
- Returns to homepage

### 📱 Mobile Experience

All navigation adapts for mobile:

1. **Navigation bar**:

   - Stacks vertically on mobile
   - Prev/Next buttons become full-width
   - Dropdown remains accessible

2. **Touch targets**:

   - All buttons are at least 44x44px
   - Adequate spacing between elements

3. **Sticky navigation**:
   - Navigation bar stays at top when scrolling
   - Always accessible without scrolling back up

## User Flows

### Browsing All Counties

1. User lands on homepage
2. Scrolls through county grid
3. Clicks on a county card
4. Views county details
5. Uses dropdown to jump to another county

### Sequential Exploration

1. User visits Baker County (first)
2. Clicks "Next" to go to Benton County
3. Continues clicking "Next" through all counties
4. Reaches Yamhill County (last)

### Direct Access

1. User shares link to specific county: `counties/crater-lake.html`
2. Friend opens link directly to that county
3. Uses breadcrumb or home link to explore more

### Challenge Tracking

1. User visits homepage to see full list
2. Navigates to counties they haven't visited
3. Returns to homepage to track progress
4. Uses grid to see remaining counties

## Technical Details

### URL Structure

- Homepage: `/index.html` or just `/`
- County pages: `/counties/[slug].html`
  - Example: `/counties/baker-county.html`

### Navigation State

- Dropdown shows current county as selected
- Prev/Next buttons are disabled when not applicable
- All links use relative paths for portability

### Accessibility

- All navigation has ARIA labels
- Keyboard navigable
- Screen reader friendly
- Semantic HTML structure

## Customizing Navigation

To modify navigation, edit `generate-pages.js`:

### Change Navigation Bar Layout

Edit the `getNavigation()` function:

```javascript
function getNavigation(currentCounty = null) {
  // Modify HTML structure here
}
```

### Adjust Previous/Next Button Text

Look for the prev/next button generation:

```javascript
<a href="${prevCounty.slug}.html">← ${prevCounty.name}</a>
```

### Modify Dropdown Appearance

Edit the `<select>` element styling:

```javascript
<select class="px-4 py-2 border...">
```

### Change Breadcrumb Format

Edit the `getBreadcrumb()` function:

```javascript
function getBreadcrumb(countyName) {
  // Modify breadcrumb HTML
}
```

After making changes, regenerate pages:

```bash
node generate-pages.js
```
