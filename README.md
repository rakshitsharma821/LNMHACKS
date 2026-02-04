# MindScoreAI - AI Mental Wellness Tracking

A modern, lightweight React.js application for tracking mental wellness with AI-powered check-ins and personalized insights.

## Tech Stack

- **Frontend**: React 18.3.1
- **Framework**: Next.js 14.1.0 (React meta-framework)
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **Icons**: Lucide React
- **Themes**: next-themes (light/dark mode)

## Project Structure

```
Frontend/
├── app/                    # Next.js app directory (React components)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── app/               # Nested app routes
│       ├── check-in/      # Mental check-in interface
│       ├── score/         # Wellness score display
│       ├── trends/        # Trends visualization
│       ├── rewards/       # Rewards system
│       ├── markets/       # Markets view
│       ├── city-index/    # City index
│       └── ...
├── components/            # Reusable React components
│   ├── ui/               # UI components (button, card, input, slider)
│   ├── providers.tsx     # Context providers
│   └── safety-modal.tsx  # Safety features
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind CSS config
└── postcss.config.js     # PostCSS config
```

## Installation

```bash
# Install dependencies (React and related packages only)
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

## Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checker

## Key Features

✅ **React-Only**: Pure React.js codebase with no Node.js backend
✅ **Lightweight**: Minimal dependencies for faster loading
✅ **Type Safe**: Full TypeScript support
✅ **Responsive**: Mobile-first design with Tailwind CSS
✅ **Dark Mode**: Built-in light/dark theme support
✅ **AI-Powered**: Simulated AI check-ins for mental wellness tracking

## GitHub Optimization

This project is optimized for GitHub:
- `node_modules/` is excluded via `.gitignore`
- Only `package.json` and `package-lock.json` are tracked
- Reinstall dependencies after cloning with `npm install`
- Minimal file count for faster cloning and deployment

## Getting Started After Cloning

```bash
git clone https://github.com/yourusername/mindscoreai.git
cd mindscoreai
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file if needed for any environment-specific settings:
```
# .env.local
NEXT_PUBLIC_API_URL=your_api_url
```

## Dependencies

### Production
- `react` - React library
- `react-dom` - React DOM rendering
- `next` - React framework with SSR/SSG
- `next-themes` - Theme management
- `lucide-react` - Icon library

### Development & Styling
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS framework
- `postcss` - CSS processor
- `autoprefixer` - Vendor prefixes
- `class-variance-authority` - Component class management
- `clsx` - Class name utilities
- `tailwind-merge` - Merge Tailwind classes

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
