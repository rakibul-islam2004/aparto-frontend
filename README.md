# Aparto Frontend

Frontend application for Aparto - Apartment Accessories Ecommerce Platform.

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Authentication:** Better Auth
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ LTS
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Update .env.local with your configuration
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type check
npm run type-check
```

## Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/             # Utilities and configurations
├── hooks/           # Custom React hooks
├── services/        # API service layer
├── stores/          # State management
├── types/           # TypeScript types
└── styles/          # Global styles
```

## Environment Variables

See `.env.example` for required environment variables.

## Deployment

This project is configured for automatic deployment to Vercel via GitHub Actions.

- **Production:** Push to `main` branch
- **Preview:** Push to `develop` branch

## License

Copyright © 2026 Neurosoftic
