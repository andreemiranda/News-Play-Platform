# NewsPlay - WordPress Sync News Portal

## Overview

NewsPlay is a modern news portal application that synchronizes content from a WordPress site in real-time. The application features a React frontend with a Node.js/Express backend, utilizing Drizzle ORM for database operations and implementing automatic WordPress content synchronization every 25 seconds.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom NewsPlay theme
- **Build Tool**: Vite for development and building

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **API Pattern**: RESTful API endpoints
- **Development**: Hot reload with Vite middleware integration

### Database Architecture
- **Storage**: In-memory storage system for WordPress content caching
- **No Database**: PostgreSQL configuration removed as requested
- **Schema Location**: `shared/schema.ts` for shared types
- **Data Persistence**: All content synchronized from WordPress API

## Key Components

### WordPress Integration
- **Sync Manager**: Automatic content synchronization every 25 seconds
- **WordPress API Client**: Custom API client for WordPress REST API integration
- **Base URL**: `https://tocanteen.com.br/wp-json/`
- **Authentication**: Bearer token authentication
- **Content Types**: Posts, categories, tags, pages, media, and authors

### Storage System
- **In-Memory Storage**: Custom storage interface for caching WordPress content
- **Data Types**: Posts, categories, tags, pages, media with full relationship mapping
- **Search Functionality**: Built-in search indexing and filtering capabilities
- **Performance**: Optimized for fast content retrieval and pagination

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Comprehensive UI components based on Radix UI
- **Search**: Advanced search with category and tag filtering
- **Pagination**: Client-side pagination for content browsing
- **Real-time Updates**: Automatic content refresh via React Query
- **Legal Pages**: Complete set of privacy, terms, and policy pages
- **Content Pages**: About Us, Our Team, FAQ, and Contact sections

## Data Flow

1. **Content Sync**: Sync manager fetches content from WordPress API every 25 seconds
2. **Storage**: Content is stored in memory storage with indexing for fast retrieval
3. **API Layer**: Express routes serve content to frontend via REST endpoints
4. **Frontend**: React components fetch data using TanStack Query with automatic caching
5. **UI Updates**: Real-time UI updates through query invalidation and refetching

## External Dependencies

### WordPress Integration
- **Source**: `https://tocanteen.com.br/wp-json/`
- **API Key**: Custom WordPress API authentication
- **Sync Frequency**: 25-second intervals
- **Content Types**: Posts, categories, tags, pages, media

### Database
- **Provider**: Neon Database (PostgreSQL serverless)
- **Connection**: Environment variable `DATABASE_URL`
- **ORM**: Drizzle with PostgreSQL dialect

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Hook Form**: Form state management

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Port**: 5000 (configured in .replit)
- **Hot Reload**: Vite middleware integration
- **Environment**: NODE_ENV=development

### Production Build
- **Frontend Build**: Vite builds client to `dist/public`
- **Backend Build**: esbuild bundles server to `dist/index.js`
- **Start Command**: `npm run start`
- **Environment**: NODE_ENV=production

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Deployment Target**: Autoscale
- **Port Mapping**: 5000 (local) → 80 (external)
- **Build Process**: Automated via deployment configuration

## Changelog

```
Changelog:
- June 26, 2025. Initial setup
- June 26, 2025. Removed PostgreSQL database configuration and created comprehensive legal/informational pages:
  * Privacy Policy (/privacidade)
  * Terms of Use (/termos) 
  * Cookie Policy (/cookies)
  * About Us (enhanced existing /sobre)
  * Our Team (/equipe)
  * FAQ (/faq)
  * Contact (existing /contato)
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
