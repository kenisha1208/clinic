# Overview

This is a digital patient records management system for Shree Hari Clinic. The application allows healthcare providers to register new patients, manage patient information, and maintain comprehensive medical records including symptoms, treatments, prescriptions, and follow-up appointments. Built as a full-stack web application with a React frontend and Express backend, it provides a clean, professional interface for clinic operations.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js for the REST API server
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas for runtime type checking and validation
- **Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Vite for fast development server and hot module replacement

## Data Storage
- **Current Implementation**: In-memory storage using JavaScript Maps for development and testing
- **Planned Database**: PostgreSQL with Drizzle ORM configuration already in place
- **Schema Design**: Separate tables for users and patients with comprehensive patient fields including medical history, prescriptions, and billing information

## API Design
- **Pattern**: RESTful API with standard HTTP methods
- **Endpoints**: CRUD operations for patients (`/api/patients`) with search functionality
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Validation**: Request/response validation using Zod schemas shared between frontend and backend

## Authentication & Authorization
- **Current State**: Basic user schema defined but authentication not yet implemented
- **Planned**: Session-based authentication with user management capabilities

# External Dependencies

## Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database driver for serverless environments
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **@tanstack/react-query**: Server state management and data fetching
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries

## UI Components
- **@radix-ui/***: Comprehensive set of accessible UI primitives (dialogs, dropdowns, forms, etc.)
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for creating variant-based component APIs
- **lucide-react**: Icon library for consistent iconography

## Development Tools
- **vite**: Build tool and development server
- **typescript**: Static type checking
- **zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting utilities

## Database & Validation
- **drizzle-kit**: Database migration and schema management tool
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **connect-pg-simple**: PostgreSQL session store for Express sessions