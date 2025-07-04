# InventoryPro - Frontend Challenge Base

A professional inventory management system built with React and Tailwind CSS. This serves as the base application for frontend technical interviews and coding challenges.

## Overview

This is an internal inventory management tool designed to help organizations track and manage their inventory records. The application provides a clean, professional interface for viewing, filtering, creating, and managing inventory items.

## Features

- **Dashboard Overview**: Real-time statistics and metrics
- **Advanced Filtering**: Multi-criteria search with category, status, and date filtering
- **Record Management**: Create, edit, approve, and delete inventory records
- **Data Export**: CSV download functionality for filtered data
- **Responsive Design**: Optimized for desktop and mobile devices
- **Accessibility**: WCAG AA compliant with keyboard navigation support

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** with custom design system
- **Radix UI** for accessible components
- **Lucide React** for icons
- **React Hook Form** for form validation
- **Vite** for development and build tooling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development servers:
   ```bash
   npm run dev:with-mock
   ```

4. Open your browser and navigate to:
   - Frontend: `http://localhost:3000`
   - Mock API: `http://localhost:3001`

### Available Scripts

- `npm run dev` - Start frontend development server only
- `npm run dev:with-mock` - Start both frontend and mock API server
- `npm run mock-server` - Start mock API server only  
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Application Structure

```
├── App.tsx                    # Main application component
├── components/
│   ├── FilterBar.tsx         # Advanced filtering interface
│   ├── InventoryForm.tsx     # Create/edit form with validation
│   ├── InventoryTable.tsx    # Sortable data table
│   └── ui/                   # Essential UI components
├── src/services/
│   └── api.ts                # API service layer
├── mocks/                    # Mock API responses
├── data/                     # Sample data files
├── mockserver.js             # Development mock server
└── styles/
    └── globals.css           # Complete design system
```

## Usage Guide

### Basic Operations

- **Add New Record**: Click the "New Record" button to open the creation form
- **Filter Data**: Use the filter bar to search by category, status, or date range
- **Export Data**: Click the "Export" button to download filtered records as CSV
- **Manage Records**: Use the three-dots menu in each row for edit, approve, or delete actions

### Key Components

- **FilterBar**: Advanced filtering with real-time search and filter application
- **InventoryTable**: Sortable table with action menu for each record
- **InventoryForm**: Modal form for creating and editing inventory records

## Mock API Endpoints

The mock server provides the following endpoints:

- `GET /api/inventory-records` - Retrieve all inventory records
- `GET /api/categories` - Get available categories
- `GET /api/themes` - Get theme configurations
- `GET /api/design-systems` - Get design system options
- `GET /api/presentation-modes` - Get presentation mode options

## Development Notes

- The application uses a mock server for development that serves static JSON responses
- All styling is handled through Tailwind CSS with a custom design system
- Form validation is implemented using React Hook Form
- The application is fully responsive and accessible

## License

MIT License