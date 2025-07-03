# InventoryPro

Professional inventory management system built with React and Tailwind CSS.

## Features

- **Dashboard**: Real-time statistics and overview
- **Advanced Filtering**: Multi-criteria search with deferred application  
- **Record Management**: Create, edit, approve, and delete inventory records
- **Export**: CSV download for data analysis
- **Responsive Design**: Optimized for desktop and mobile
- **Accessibility**: WCAG AA compliant with keyboard navigation

## Tech Stack

- React 18 with TypeScript
- Tailwind CSS v4 with custom design system
- Radix UI for accessible components
- Lucide React for icons
- React Hook Form for validation

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## Usage

- **Add Record**: Click "New Record" button
- **Filter Data**: Set criteria and press Enter or click Apply
- **Export Data**: Click Export to download filtered records as CSV
- **Manage Records**: Use three-dots menu for edit, approve, delete actions

## Project Structure

```
├── App.tsx                    # Main application
├── components/
│   ├── FilterBar.tsx         # Filter controls  
│   ├── InventoryForm.tsx     # Add/edit form
│   ├── InventoryTable.tsx    # Data table
│   └── ui/                   # Essential UI components
└── styles/
    └── globals.css           # Design system & styles
```

## License

MIT License