# shadcn/ui Components Audit

## ✅ Components Actually Used (Keep These)

Based on analysis of App.tsx, InventoryTable.tsx, InventoryForm.tsx, and FilterBar.tsx:

### Core UI Components
- `button.tsx` - Used extensively (primary buttons, action buttons)
- `card.tsx` - Used for stats cards and main table wrapper
- `dialog.tsx` - Used for form modal
- `sheet.tsx` - Used for mobile menu
- `input.tsx` - Used in forms and filters
- `select.tsx` - Used in FilterBar and InventoryForm
- `label.tsx` - Used in forms
- `form.tsx` - Used in InventoryForm (React Hook Form integration)
- `table.tsx` - Used in InventoryTable

### Utility Components
- `use-mobile.ts` - Mobile detection utility
- `utils.ts` - CN utility function

## ❌ Components to Remove (Unused)

These components are not imported or used anywhere in the codebase:

### Modal/Overlay Components
- `alert-dialog.tsx`
- `popover.tsx`
- `hover-card.tsx`
- `tooltip.tsx`
- `context-menu.tsx`
- `dropdown-menu.tsx`
- `menubar.tsx`
- `navigation-menu.tsx`
- `drawer.tsx`

### Form Components
- `checkbox.tsx`
- `radio-group.tsx`
- `switch.tsx`
- `slider.tsx`
- `textarea.tsx`
- `calendar.tsx`
- `input-otp.tsx`

### Layout Components
- `accordion.tsx`
- `collapsible.tsx`
- `tabs.tsx`
- `separator.tsx`
- `resizable.tsx`
- `sidebar.tsx`
- `breadcrumb.tsx`

### Display Components
- `alert.tsx`
- `avatar.tsx`
- `badge.tsx`
- `progress.tsx`
- `skeleton.tsx`
- `scroll-area.tsx`
- `aspect-ratio.tsx`

### Interactive Components
- `command.tsx`
- `toggle.tsx`
- `toggle-group.tsx`
- `pagination.tsx`

### Media Components
- `carousel.tsx`
- `chart.tsx`

### Notification Components
- `sonner.tsx`

## 📊 Cleanup Impact

**Before:** 45 shadcn/ui components
**After:** 9 essential components
**Reduction:** 80% fewer UI component files

This dramatically reduces bundle size and complexity while keeping all functionality intact.

## 🎯 Final Component Structure

```
/components/
├── FilterBar.tsx          # Advanced filtering
├── InventoryForm.tsx      # Create/edit forms  
├── InventoryTable.tsx     # Data table
├── figma/
│   └── ImageWithFallback.tsx  # Protected component
└── ui/
    ├── button.tsx         # All button variants
    ├── card.tsx          # Cards and containers
    ├── dialog.tsx        # Modal dialogs
    ├── form.tsx          # Form utilities
    ├── input.tsx         # Text inputs
    ├── label.tsx         # Form labels
    ├── select.tsx        # Dropdown selects
    ├── sheet.tsx         # Mobile slide-outs
    ├── table.tsx         # Data tables
    ├── use-mobile.ts     # Mobile detection
    └── utils.ts          # Utility functions
```

This keeps only the components that are actually used in the inventory management system.