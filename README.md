# Frontend Test Project

This project is used for the frontend test assignment.

## 🎨 Design Reference

**Figma Design:** [Newtech UI Test](https://www.figma.com/design/FjhBXuO6b3Ti4Odc4GBI2k/Newtech-UI-Test?node-id=0-1&t=i4KJZjkrMU96x2jD-1)

## 🛠️ Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Nuxt 3** - Full-stack framework built on Vue.js
- **TypeScript** - Typed superset of JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Pinia** - State management for Vue.js

## ✨ Features

- 🛍️ Product showcase with dynamic options selection
- 🖼️ Interactive image gallery with carousel
- 📱 Responsive design for all devices
- 🎯 Toast notifications for user feedback
- 🔧 State management with Pinia
- 🎨 Custom design system with Tailwind CSS

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 📁 Project Structure

```
├── components/          # Reusable Vue components
│   ├── ProductImageGallery.vue
│   ├── SelectOptionsSidebar.vue
│   └── Toast.vue
├── pages/              # Application pages
│   ├── index.vue       # Home page (redirects to product)
│   └── product/        # Product pages
│       └── [slug].vue  # Dynamic product page
├── stores/             # Pinia state management
│   └── product.ts      # Product store
├── assets/             # Static assets
│   ├── css/           # Global styles
│   └── icons/         # SVG icons
├── public/             # Public static files
│   └── images/        # Product images
└── constants.ts        # Mock data and constants
```
