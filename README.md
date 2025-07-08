# InventoryPro - Frontend Challenge Base

A professional inventory management system built with React and Tailwind CSS. This tool is internal and helps our organization manage inventory records efficiently. It features a clean, modern interface with advanced filtering, record management, and data export capabilities.

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

#### Development
- `npm run dev` - Start frontend development server only
- `npm run dev:with-mock` - Start both frontend and mock API server
- `npm run mock-server` - Start mock API server only  
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Dataset Management
- `npm run dataset:small` - Switch to small dataset (8 records, default)
- `npm run dataset:large` - Switch to large dataset (10,000 records)
- `npm run dataset:generate` - Generate a new large dataset

## Application Structure

```
├── App.tsx                          # Main application component
├── components/
│   ├── FilterBar.tsx               # Advanced filtering interface
│   ├── InventoryForm.tsx           # Create/edit form with validation
│   ├── InventoryTable.tsx          # Sortable data table
│   └── ui/                         # Essential UI components
├── src/services/
│   └── api.ts                      # API service layer
├── mocks/api/inventory-records/
│   ├── GET.mock                    # Current dataset (8 or 10k records)
│   ├── GET-small.mock              # Small dataset backup (8 records)
│   └── GET-large.mock              # Large dataset (10,000 records)
├── scripts/
│   ├── generate-large-dataset.js   # Generate new large dataset
│   ├── switch-to-large-dataset.js  # Switch to performance testing mode
│   └── switch-to-small-dataset.js  # Switch to normal development mode
├── mockserver.js                   # Development mock server
├── performance-test.md             # Performance testing guide
└── styles/
    └── globals.css                 # Complete design system
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

## Dataset Versions

This application supports two dataset modes:

### 🟢 Small Dataset (Default)
- **8 inventory records**

### 🔴 Large Dataset 
- **10,000+ inventory records** (~1.6MB)

## Switching Between Datasets

```bash
# Switch to large dataset for performance testing
npm run dataset:large

# Switch back to small dataset for normal development  
npm run dataset:small

# Generate a fresh large dataset (optional)
npm run dataset:generate
```

## Development Notes

- The application uses a mock server for development that serves static JSON responses
- All styling is handled through Tailwind CSS with a custom design system
- Form validation is implemented using React Hook Form
- The application is fully responsive and accessible
- Use browser DevTools Performance tab to identify bottlenecks

## Before the interview

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development environment:**
   ```bash
   npm run dev:with-mock
   ```
   This starts both the frontend (http://localhost:3000) and mock API server (http://localhost:3001).

3. **Explore the application** with the default small dataset (8 records).

## License

MIT License