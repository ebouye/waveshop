# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Production build with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Database (Prisma + Neon)
- `pnpm db:generate` - Generate Prisma client after schema changes
- `pnpm db:push` - Push schema changes to Neon database
- `pnpm db:migrate` - Create and apply database migrations
- `pnpm db:studio` - Open Prisma Studio database browser
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:reset` - Reset database and reseed

### Environment Setup
- Configure Neon database URL in `.env.local` file (see `.env.example`)
- Run `pnpm db:generate` after schema changes
- Use `pnpm db:studio` to browse database visually
- **Environment variables are loaded explicitly** in both Prisma client and Next.js config

### Database Connection Notes
- Prisma client loads environment variables from `.env.local` using dotenv
- Next.js config explicitly passes DATABASE_URL to build time
- No need to restart dev server for environment variable changes

## Database Architecture

### Prisma Configuration
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Prisma with singleton client pattern
- **Location**: Schema in `prisma/schema.prisma`
- **Client**: Singleton instance at `lib/prisma.ts`

### Database Schema
- **User**: Authentication and user profiles
- **Category**: Product categorization with unique slugs
- **Product**: Shop items with pricing, stock, and relations
- **Order**: Purchase tracking with status management
- **OrderItem**: Line items within orders with pricing snapshot
- **Review**: Product ratings with one-per-user constraint

### API Routes
- `GET/POST /api/products` - Product CRUD with pagination and filtering
- `GET/POST /api/categories` - Category management
- `GET /api/health` - Database health check and stats

## Architecture Overview

### Project Structure
This is a Next.js 15 application using the App Router pattern with React 19 and Tailwind CSS v4.

### Key Technologies & Patterns
- **Next.js 15** with App Router (`app/` directory)
- **React 19** with TypeScript for type safety
- **Tailwind CSS v4** with PostCSS for styling
- **Turbopack** for development and build optimization
- **Geist fonts** (sans and mono) loaded via next/font

### File Organization
- `app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration and metadata
  - `page.tsx` - Homepage with default Next.js template content
  - `globals.css` - Global styles with Tailwind imports and CSS custom properties
- Root configuration files for Next.js, TypeScript, ESLint, and PostCSS

### Styling System
- Uses Tailwind CSS v4 with PostCSS plugin
- CSS custom properties for theming (background/foreground colors)
- Dark mode support via `prefers-color-scheme` media query
- Font variables defined in globals.css and used in layout.tsx

### Import Aliases
- `@/*` maps to project root for clean imports (configured in tsconfig.json)

### TypeScript Configuration
- Strict mode enabled
- Next.js plugin for enhanced TypeScript support
- Path aliases configured for cleaner imports

## Development Notes

### Current State
This is a fresh Next.js project with the default template. The homepage contains the standard Next.js landing page with links to documentation and deployment options.

### Build System
- Uses Turbopack for both development and production builds
- ESLint configured with Next.js core-web-vitals and TypeScript rules
- PostCSS configured with Tailwind CSS v4 plugin

### Font Loading
Fonts are loaded using Next.js font optimization with Geist Sans and Geist Mono families, configured as CSS variables for consistent usage across the application.