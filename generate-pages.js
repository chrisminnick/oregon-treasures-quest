const fs = require('fs');
const path = require('path');

// Read the treasures data
const treasuresPath = path.join(
  __dirname,
  '..',
  'wayfinder-site-builder',
  'data',
  'treasures.json'
);
const data = JSON.parse(fs.readFileSync(treasuresPath, 'utf8'));

// Shared header component
function getHeader(pageTitle = '2025 Oregon Treasures Quest Guide') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pageTitle}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            'oregon-teal': '#00363b',
            'oregon-blue': '#205e9e',
          },
        },
      },
    };
  </script>
</head>
<body class="bg-gray-50">`;
}

// Navigation component
function getNavigation(currentCounty = null) {
  const allCounties = data.counties.map((c) => ({
    name: c.name,
    slug: c.slug,
  }));

  let currentIndex = -1;
  if (currentCounty) {
    currentIndex = allCounties.findIndex((c) => c.slug === currentCounty.slug);
  }

  const prevCounty = currentIndex > 0 ? allCounties[currentIndex - 1] : null;
  const nextCounty =
    currentIndex < allCounties.length - 1
      ? allCounties[currentIndex + 1]
      : null;

  return `
  <nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4 py-3">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <!-- Home link -->
        <div class="flex items-center">
          <a href="${
            currentCounty ? '../index.html' : 'index.html'
          }" class="text-oregon-teal hover:text-oregon-blue font-semibold text-lg">
            🏠 Oregon Treasures Quest
          </a>
        </div>
        
        <!-- County selector and navigation -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          ${
            currentCounty
              ? `
          <!-- Previous/Next buttons -->
          <div class="flex gap-2">
            ${
              prevCounty
                ? `
            <a href="${prevCounty.slug}.html" class="flex-1 sm:flex-none px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-center text-sm font-medium">
              ← ${prevCounty.name}
            </a>
            `
                : '<div class="flex-1 sm:flex-none px-4 py-2 bg-gray-100 text-gray-400 rounded text-center text-sm">← First County</div>'
            }
            
            ${
              nextCounty
                ? `
            <a href="${nextCounty.slug}.html" class="flex-1 sm:flex-none px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-center text-sm font-medium">
              ${nextCounty.name} →
            </a>
            `
                : '<div class="flex-1 sm:flex-none px-4 py-2 bg-gray-100 text-gray-400 rounded text-center text-sm">Last County →</div>'
            }
          </div>
          `
              : ''
          }
          
          <!-- County dropdown -->
          <select onchange="if(this.value) window.location.href=this.value" class="px-4 py-2 border border-gray-300 rounded bg-white text-gray-800 text-sm font-medium cursor-pointer hover:border-oregon-blue focus:outline-none focus:ring-2 focus:ring-oregon-blue">
            <option value="">Jump to County...</option>
            ${allCounties
              .map(
                (c) => `
            <option value="${currentCounty ? '' : 'counties/'}${c.slug}.html" ${
                  currentCounty && c.slug === currentCounty.slug
                    ? 'selected'
                    : ''
                }>
              ${c.name}
            </option>`
              )
              .join('')}
          </select>
        </div>
      </div>
    </div>
  </nav>`;
}

// Breadcrumb component
function getBreadcrumb(countyName) {
  return `
  <nav class="container mx-auto px-4 py-3 text-sm" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 text-gray-600">
      <li>
        <a href="../index.html" class="hover:text-oregon-blue">Home</a>
      </li>
      <li class="flex items-center">
        <span class="mx-2">/</span>
        <span class="text-gray-800 font-semibold">${countyName}</span>
      </li>
    </ol>
  </nav>`;
}

// Footer component
function getFooter() {
  return `
  <footer class="bg-oregon-teal text-white mt-12">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center">
        <p class="mb-2">2025 Oregon Treasures Quest Guide</p>
        <p class="text-sm opacity-75">Brought to you by Oregon's U.S. Senator Jeff Merkley</p>
        <p class="text-sm opacity-75 mt-2">
          <a href="https://www.merkley.senate.gov/" target="_blank" rel="noopener" class="hover:text-gray-300 underline">
            Visit merkley.senate.gov
          </a>
        </p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// Generate homepage
function generateHomepage() {
  const html = `${getHeader()}
${getNavigation()}

<!-- Header -->
<header class="bg-oregon-teal text-white">
  <div class="container mx-auto px-4 py-8 md:py-12">
    <div class="text-center">
      <img
        src="images/Image_001.png"
        alt="Oregon Landscape"
        class="mx-auto max-w-full h-auto mb-6 rounded-lg shadow-lg"
      />
      <h1 class="text-3xl md:text-5xl font-bold mb-4">
        2025 Guide to Oregon's Treasures
      </h1>
      <p class="text-lg md:text-xl italic">
        Treasures worth exploring in each of Oregon's 36 counties
      </p>
      <p class="text-lg md:text-xl italic">
        Brought to you by Oregon's U.S. Senator Jeff Merkley
      </p>
      <img
        src="images/Image_002.png"
        alt="Senator Logo"
        class="mx-auto mt-6 max-w-xs"
      />
    </div>
  </div>
</header>

<!-- Main Content -->
<main class="container mx-auto px-4 py-8">
  <!-- Introduction Section -->
  <section id="intro" class="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
      A NOTE FROM JEFF
    </h2>

    <div class="prose max-w-none space-y-4 text-gray-700">
      <p class="text-center">
        Oregon is the most spectacular place. Every one of our 36 counties
        has exciting and rewarding places to explore. In 2024, hundreds of
        people participated in the first Oregon Treasures Quest Challenge. I
        hope this book, now in its second year, will help you find and enjoy
        sites throughout the state.
      </p>

      <p class="text-center">
        And should you choose to accept it, we offer you the 2025 Oregon
        Treasures Quest Challenge.
      </p>

      <p class="text-center">
        Visit at least 10 different counties between January 1, 2025 and
        November 1, 2025 to participate in the Oregon Treasures Quest
        Challenge. To qualify for this challenge, you must visit sites that
        are listed in the main descriptions or the "You May Also Want to
        Explore..." section of this book. Document your visits by sending us
        selfies with the sites in the background, and if you reach Oregon
        Ranger status, you will win an invitation to the 2025 Oregon
        Treasures Quest Party, to be held near the end of the year, probably
        mid-November.
      </p>

      <!-- Challenge Levels Table -->
      <div class="my-8">
        <table class="w-full max-w-2xl mx-auto border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 px-4 py-3 text-left font-bold">
                Visit:
              </th>
              <th class="border border-gray-300 px-4 py-3 text-left font-bold">
                And be recognized as an:
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-3">10 counties</td>
              <td class="border border-gray-300 px-4 py-3">Oregon Apprentice</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-3">18 counties</td>
              <td class="border border-gray-300 px-4 py-3">Oregon Journeyer</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-3">27 counties</td>
              <td class="border border-gray-300 px-4 py-3">Oregon Ranger</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="border border-gray-300 px-4 py-3">36 counties</td>
              <td class="border border-gray-300 px-4 py-3">Oregon Master</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-center font-semibold">
        Submit your photos to:
        <a href="mailto:OregonTreasures@merkley.senate.gov" class="text-oregon-blue hover:underline">
          OregonTreasures@merkley.senate.gov
        </a>
      </p>

      <p class="text-center text-sm italic">
        All are welcome, regardless of age.
      </p>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
        <p class="font-semibold text-yellow-800 mb-2">Before You Go:</p>
        <ul class="list-disc list-inside text-yellow-800 space-y-1 text-sm">
          <li>Check websites for hours of operation, fees, and reservation requirements</li>
          <li>Many outdoor sites have seasonal closures - verify accessibility before traveling</li>
          <li>Pack extra water, fuel, and essentials for remote locations</li>
          <li>Respect wildlife, stay on trails, and leave no trace</li>
        </ul>
      </div>
    </div>
  </section>

  <!-- Counties Grid -->
  <section id="counties" class="mb-8">
    <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
      Explore Oregon's 36 Counties
    </h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      ${data.counties
        .map(
          (county) => `
      <a href="counties/${county.slug}.html" class="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div class="aspect-video w-full overflow-hidden bg-gray-200">
          <img 
            src="${county.image.src}" 
            alt="${county.image.alt}"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-bold text-gray-800 group-hover:text-oregon-blue mb-2">
            ${county.name}
          </h3>
          <p class="text-sm text-gray-600 line-clamp-2">
            ${county.primaryAttraction.name}
          </p>
          <div class="mt-3 text-oregon-blue text-sm font-semibold">
            Learn more →
          </div>
        </div>
      </a>
      `
        )
        .join('')}
    </div>
  </section>
</main>

${getFooter()}`;

  fs.writeFileSync('index.html', html);
  console.log('✓ Generated index.html');
}

// Generate individual county page
function generateCountyPage(county, index) {
  const html = `${getHeader(`${county.name} - Oregon Treasures Quest`)}
${getNavigation(county)}
${getBreadcrumb(county.name)}

<main class="container mx-auto px-4 py-6">
  <!-- County Header -->
  <article class="bg-white rounded-lg shadow-md overflow-hidden mb-8">
    <div class="county-header bg-gradient-to-r from-oregon-teal to-oregon-blue text-white p-6 md:p-8">
      <h1 class="text-3xl md:text-4xl font-bold mb-2">
        ${county.name}
      </h1>
      <p class="text-xl md:text-2xl opacity-90">
        ${county.primaryAttraction.name}
      </p>
    </div>

    <!-- County Image -->
    <div class="county-image">
      <img
        src="../${county.image.src}"
        alt="${county.image.alt}"
        class="w-full h-auto"
      />
      <p class="text-sm text-gray-600 italic px-6 py-2 bg-gray-50">
        ${county.image.credit}
      </p>
    </div>

    <!-- Primary Attraction -->
    <div class="primary-attraction p-6 md:p-8">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        ${county.primaryAttraction.name}
      </h2>
      <div class="text-gray-700 leading-relaxed space-y-4">
        ${county.primaryAttraction.description
          .split('\n\n')
          .map((para) => `<p>${para}</p>`)
          .join('\n        ')}
      </div>
    </div>

    ${
      county.additionalAttractions && county.additionalAttractions.length > 0
        ? `
    <!-- Additional Attractions -->
    <div class="additional-attractions bg-gray-50 p-6 md:p-8 border-t border-gray-200">
      <h3 class="text-xl md:text-2xl font-bold text-gray-800 mb-4">
        You May Also Want to Explore...
      </h3>
      <ul class="space-y-3">
        ${county.additionalAttractions
          .map(
            (attraction) => `
        <li class="flex items-start">
          <span class="text-oregon-blue mr-2 mt-1">•</span>
          <div>
            ${
              attraction.url
                ? `
            <a href="${attraction.url}" target="_blank" rel="noopener" class="text-oregon-blue hover:underline font-semibold">
              ${attraction.name}
            </a>
            `
                : `
            <span class="text-gray-800 font-semibold">${attraction.name}</span>
            `
            }
          </div>
        </li>
        `
          )
          .join('')}
      </ul>
    </div>
    `
        : ''
    }

    <!-- More Information -->
    <div class="more-info p-6 md:p-8 bg-oregon-teal text-white">
      <h3 class="text-xl font-bold mb-3">More Information</h3>
      <p class="leading-relaxed">
        ${county.moreInfo.fullText.replace(
          county.moreInfo.websiteName,
          `<a href="${county.moreInfo.website}" target="_blank" rel="noopener" class="underline hover:text-gray-300">${county.moreInfo.websiteName}</a>`
        )}
      </p>
    </div>
  </article>

  <!-- Navigation hint -->
  <div class="text-center py-6 text-gray-600">
    <p class="mb-2">Use the dropdown menu above to jump to another county</p>
    <a href="../index.html" class="inline-block px-6 py-3 bg-oregon-blue text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold">
      ← Back to All Counties
    </a>
  </div>
</main>

${getFooter()}`;

  const filename = `counties/${county.slug}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✓ Generated ${filename}`);
}

// Main execution
console.log('Generating Oregon Treasures Quest site...\n');

// Generate homepage
generateHomepage();

// Generate all county pages
data.counties.forEach((county, index) => {
  generateCountyPage(county, index);
});

console.log(
  `\n✅ Complete! Generated 1 homepage + ${data.counties.length} county pages`
);
console.log('\nTo view the site, open index.html in your browser.');
