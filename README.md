# Oregon Treasures Quest - Multi-Page Site

A mobile-friendly, multi-page website for the 2025 Oregon Treasures Quest featuring all 36 Oregon counties.

## 📁 Site Structure

```
oregon-treasures-quest/
├── index.html              # Homepage with intro and county grid
├── counties/               # Individual county pages (36 files)
│   ├── baker-county.html
│   ├── benton-county.html
│   ├── clackamas-county.html
│   └── ... (33 more)
├── images/                 # All county images
├── generate-pages.js       # Page generator script
└── README.md              # This file
```

## 🎯 Features

### Homepage (`index.html`)

- Full introduction from Senator Merkley
- Challenge levels table
- Grid of all 36 counties with images
- Mobile-responsive card layout
- Direct links to county pages

### County Pages (`counties/*.html`)

- **Breadcrumb navigation**: Home / County Name
- **County dropdown**: Jump to any county instantly
- **Previous/Next buttons**: Navigate sequentially through counties
- **Primary attraction**: Featured destination with full description
- **Additional attractions**: List of extra sites to explore
- **More information**: Official website links
- **Back to home**: Easy return to county grid

### Mobile-First Design

- Responsive navigation that adapts to screen size
- Touch-friendly buttons and dropdowns
- Optimized images with lazy loading
- Card-based layouts that stack on mobile
- Sticky navigation bar for easy access

## 🔄 Regenerating Pages

If you need to update the content or design:

1. **Update the data source**:

   - Edit `/wayfinder-site-builder/data/treasures.json`

2. **Modify the templates**:

   - Edit `generate-pages.js` to change page structure or styling

3. **Regenerate all pages**:
   ```bash
   node generate-pages.js
   ```

This will regenerate:

- 1 homepage (`index.html`)
- 36 county pages in the `counties/` directory

## 🎨 Customization

### Colors

The site uses Oregon-themed colors defined in Tailwind config:

- `oregon-teal`: #00363b (primary brand color)
- `oregon-blue`: #205e9e (accent color)

### Navigation Components

All pages share consistent navigation:

- **Header navigation**: Home link, county dropdown, prev/next buttons
- **Breadcrumbs**: Shows current location (county pages only)
- **Footer**: Senator Merkley branding and links

### Layout Changes

Edit the following functions in `generate-pages.js`:

- `getHeader()`: Modify `<head>` section and Tailwind config
- `getNavigation()`: Change navigation bar layout
- `getBreadcrumb()`: Adjust breadcrumb display
- `getFooter()`: Update footer content
- `generateHomepage()`: Customize homepage layout
- `generateCountyPage()`: Modify county page template

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (default, stacked layout)
- **Tablet**: 640px - 1024px (sm: and md: prefixes)
- **Desktop**: 1024px+ (lg: and xl: prefixes)

## 🚀 Deployment

Simply upload all files to your web server:

- `index.html` (homepage)
- `counties/` directory (all county pages)
- `images/` directory (all photos)

No build process required - pages are static HTML.

## 📊 SEO & Accessibility

- Semantic HTML5 elements
- Descriptive page titles for each county
- Alt text on all images
- ARIA labels for navigation
- Breadcrumb markup for search engines
- Mobile-friendly viewport settings

## 🔗 Data Source

County data is managed in:
`/wayfinder-site-builder/data/treasures.json`

This JSON file contains:

- 36 counties with metadata
- Primary attractions
- Additional attractions with URLs
- Image paths and credits
- "More info" sections

## 📝 License

2025 Oregon Treasures Quest Guide
Brought to you by Oregon's U.S. Senator Jeff Merkley
