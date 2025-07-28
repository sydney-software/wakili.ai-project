# Replit.md - Wakili.ai Kenyan Legal Assistant

## Overview

Wakili.ai is a full-stack web application that serves as an AI-powered legal assistant specializing in Kenyan law. The application provides users with accurate, up-to-date legal information based on the 2010 Constitution, Penal Code, and current legislation. Users can ask legal questions and receive detailed responses with proper citations and confidence ratings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for client-side routing
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for legal queries and document search
- **Development Server**: Custom Vite integration for hot module replacement

### Database Architecture
- **Database**: MongoDB with Mongoose ODM (mongodb-memory-server for development)
- **Connection**: In-memory MongoDB instance for reliable local development
- **Schema Management**: Mongoose schemas for data modeling
- **Current Storage**: MongoDB implementation with automatic data initialization
- **Collections**: legaldocuments (Constitution, Penal Code, Contract Law, Property Law, Employment Law, Family Law), legalqueries (AI responses)
- **Legal Categories**: 6 complete legal areas with authentic Kenyan legal provisions

## Key Components

### Legal Query Processing
- **AI Integration**: OpenAI GPT-4o model for processing legal questions
- **Query Categories**: Constitutional, criminal, civil, employment, property, family, commercial law
- **Response Structure**: Includes response text, sources, category classification, and confidence level
- **Source Attribution**: Proper legal citations with document excerpts

### Legal Document Management
- **Constitution Database**: Complete articles from the 2010 Constitution of Kenya
- **Penal Code Database**: Criminal offences and penalties from the Kenyan Penal Code
- **Contract Law Database**: Provisions from Law of Contract Act, Consumer Protection Act, Business Laws Amendment Act 2024
- **Property Law Database**: Land ownership, tenure systems, and rights from Land Act 2012
- **Employment Law Database**: Worker rights, leave entitlements, and protections from Employment Act 2007
- **Family Law Database**: Marriage, divorce, child custody provisions from Marriage Act 2014, Children Act 2022
- **Search Functionality**: Text-based search across all legal document categories
- **Document Types**: Constitutional articles, criminal law sections, civil law provisions, regulatory acts

### User Interface Components
- **Search Interface**: Textarea input with real-time query processing
- **AI Response Display**: Formatted legal responses with source citations
- **Legal Categories**: Visual categorization of different law areas
- **Mobile Responsive**: Optimized for both desktop and mobile devices

## Data Flow

### AI Legal Assistant
1. **User Query**: User submits legal question through search interface
2. **Document Retrieval**: System searches relevant legal documents based on query
3. **AI Processing**: OpenAI processes query with legal context and returns structured response
4. **Response Storage**: Query and response are stored for future reference
5. **UI Update**: Frontend displays formatted response with sources and confidence rating

### Legal Document Browser
1. **Category Selection**: User clicks on legal category (Constitution, Criminal, Contract, Property, Employment, Family)
2. **Document Listing**: System retrieves and displays all documents in selected category
3. **Document Access**: User clicks individual document for full content view
4. **Citation Copy**: Users can copy legal citations for reference

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for legal question processing
- **API Key**: Configurable via OPENAI_API_KEY or OPENAI_KEY environment variables

### Database Services
- **Neon Database**: PostgreSQL serverless database provider
- **Connection**: Via @neondatabase/serverless package

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management

### Development Tools
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast JavaScript bundling for production
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds client-side React application to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Assets**: Served from the built public directory

### Environment Configuration
- **Development**: `npm run dev` - runs TypeScript server with Vite HMR
- **Production**: `npm run build && npm start` - builds and runs optimized bundle
- **Database**: Requires DATABASE_URL environment variable for PostgreSQL connection

### Replit Integration
- **Runtime Error Overlay**: Development error handling
- **Cartographer Plugin**: Replit-specific development enhancements
- **Development Banner**: Automatic Replit environment detection

### Database Setup
- **Schema**: Defined in `shared/schema.ts` with Drizzle ORM
- **Migrations**: Generated in `./migrations` directory
- **Push Command**: `npm run db:push` applies schema changes to database
- **Data Initialization**: Automatic loading of legal documents on server startup
- **Document Count**: 70+ authentic legal provisions across 6 categories