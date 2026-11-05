# THE FRAME

A high-performance visual discovery and curated collection browser built with React 19, TypeScript, and Vite, powered by the Unsplash API. Designed with an Exhibition Darkroom aesthetic where quiet chrome and graphite neutrals let the photography lead.

---

## Features

* **Infinite Scroll Gallery:** Fluid infinite scrolling driven by the `IntersectionObserver` API with debounce handling and end-of-feed indicators.
* **Zero-CLS Masonry Grid:** Dynamic responsive masonry layout using intrinsic aspect-ratio containers and dominant-color placeholders to completely eliminate layout shifts.
* **Curated Collections & Deep Fetching:** Browse thematic series with multi-image preview mosaics. Opening a collection dynamically fetches its full photography series on demand.
* **Unified Lightbox Experience:** Lazy-loaded Swiper modal with multi-level zoom (up to 4x), keyboard navigation (`Escape`, arrows), slide counters, and photographer attributions.
* **Live Search & Category Filtering:** Real-time search across photographs and collections with category filtering synchronized to routing.
* **Exhibition Darkroom Aesthetic:** Clean typography, nested radius hierarchy, 4px spatial rhythm, and quiet hairlines (`rgba(237, 237, 237, 0.08)`) calibrated for visual media.
* **Optimized Bundle Splitting:** Route-level and component-level code splitting isolates heavy dependencies (such as Swiper) into on-demand chunks, keeping the initial JavaScript bundle under 290 kB.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/), [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Grid & Layout** | `@mui/lab/Masonry`, CSS Grid, Flexbox |
| **Lightbox & Carousel** | [Swiper v14](https://swiperjs.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Styling** | Sass (Dart Sass `@use` modular architecture) |
| **Data Source** | [Unsplash API](https://unsplash.com/developers) |

---

## Project Structure

```text
src/
├── assets/                  # Vector icons and brand assets
├── components/
│   ├── common/              # Shared header and search bar components
│   ├── gallery/             # ImageCard, CollectionItem, MasonryGrid, Skeletons
│   └── lightbox/            # Swiper lightbox viewer & controls
├── context/                 # GalleryContext (global search & navigation state)
├── hooks/                   # Custom hooks (useGallery, useCollections, useDebounce, etc.)
├── layouts/                 # MainLayout shell
├── pages/                   # Route views (Home, Collections)
├── routes/                  # AppRouter configuration with Suspense fallbacks
├── services/                # Unsplash API services (photos, search, collections)
├── styles/                  # Reset, variables (Graphite Darkroom ramp), globals
├── types/                   # TypeScript interfaces (Image, Collection, API responses)
└── utils/                   # Constants and deduplication helpers
```

---

## Getting Started

### Prerequisites

* Node.js 18+ installed on your machine
* An [Unsplash Developer Account](https://unsplash.com/developers) with an Access Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Infinite-Image-Gallery.git
   cd Infinite-Image-Gallery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory (or copy from [`.env.example`](.env.example)):
   ```env
   VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   VITE_UNSPLASH_BASE_URL=https://api.unsplash.com
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite dev server with Hot Module Replacement (HMR) |
| `npm run build` | Type-checks with `tsc` and builds the optimized production bundle |
| `npm run preview` | Locally previews the production build from `dist/` |
| `npm run lint` | Runs ESLint checks across all TypeScript and React files |

---

## Performance & Optimization Notes

* **In-Memory Caching:** Collection photo series are cached in a ref-backed memory map to avoid redundant network requests when switching between collections.
* **Code Splitting:** Heavy vendor chunks (Swiper and Swiper CSS) and page views are code-split using `React.lazy`, eliminating the Vite 500 kB chunk warning.
* **Zero CLS:** Every image card calculates its container `aspectRatio` dynamically using the photograph's intrinsic `width` and `height`, preventing content jumps during image load.
* **Responsive Assets:** Uses `srcSet` with `sizes` so mobile devices download lightweight 400w images, saving bandwidth and boosting render performance.

---

## License

This project is open source and available under the [MIT License](LICENSE).
