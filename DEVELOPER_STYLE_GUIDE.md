# InventoryPro Developer Style Guide

## Overview

This style guide documents the design system tokens, utilities, and patterns used in the InventoryPro platform. Built with **Tailwind CSS v4** and **CSS custom properties**, this system provides a consistent, maintainable, and accessible foundation for UI development.

## 🎨 Design Token System

### Priority Token Categories

1. **🎯 High Priority** - Core tokens used throughout the application
2. **📋 Medium Priority** - Component-specific and semantic tokens  
3. **🔧 Low Priority** - Utility and specialty tokens

---

## 🎯 HIGH PRIORITY TOKENS

### Brand Color System

The primary brand colors drive the visual identity and are used extensively throughout the platform.

```css
/* Core Brand Colors (Corporate Blue Theme) */
--brand-primary-500: #0066ff;   /* Main brand color */
--brand-primary-600: #0052cc;   /* Primary buttons, links */
--brand-primary-700: #003d99;   /* Active states */
--brand-primary-200: #bae0ff;   /* Disabled states */
--brand-primary-100: #e0efff;   /* Light backgrounds */
--brand-primary-50: #f0f7ff;    /* Subtle backgrounds */

/* Design System Mapping */
--color-primary: var(--brand-primary-600);           /* #0052cc */
--color-primary-hover: var(--brand-primary-500);     /* #0066ff */
--color-primary-active: var(--brand-primary-700);    /* #003d99 */
--color-primary-foreground: #ffffff;                 /* Text on primary */
```

**Usage Examples:**
```tsx
// Primary buttons (from App.tsx)
<Button className="bg-brand-gradient text-primary-foreground">
  New Record
</Button>

// Brand logo
<h1 className="brand-logo text-title-lg">InventoryPro</h1>

// Primary text color
<div className="text-brand-primary">Brand colored text</div>
```

### Typography Scale

Responsive typography system based on clamp() for fluid scaling.

```css
/* Typography Tokens (Priority Order) */
--font-title-lg: clamp(20px, 2vw, 24px);     /* Section headers */
--font-title-md: 18px;                       /* Card titles */
--font-body-lg: 16px;                        /* Main content */
--font-body-md: 14px;                        /* Secondary content */
--font-label-lg: 14px;                       /* Form labels */
--font-label-md: 12px;                       /* Small labels */
--font-headline-lg: clamp(28px, 3vw, 34px);  /* Page titles */
--font-headline-md: clamp(24px, 2.5vw, 28px); /* Stats numbers */
```

**CSS Classes (High Priority):**
```css
.text-title-lg     /* Section headers - used in App.tsx */
.text-title-md     /* Card titles */
.text-body-lg      /* Main paragraph text */
.text-body-md      /* Secondary text */
.text-label-lg     /* Form labels */
.text-label-md     /* Small labels, uppercase */
.text-headline-md  /* Stats card numbers */
```

**Usage Examples:**
```tsx
// Section headers (from App.tsx)
<h2 className="text-title-lg text-foreground font-semibold">
  Inventory Records
</h2>

// Stats display
<p className="text-headline-md font-semibold text-warning">
  {stats.pending}
</p>

// Labels and descriptions
<p className="text-label-md font-medium uppercase tracking-wide text-warning">
  Pending
</p>
```

### Elevation & Shadow System

Brand-aware shadows with consistent elevation levels.

```css
/* Elevation Tokens (Priority Order) */
--elevation-1: 0 1px 3px 0 rgba(23, 43, 77, 0.08), 0 1px 2px 0 rgba(23, 43, 77, 0.12);
--elevation-2: 0 4px 6px -1px rgba(23, 43, 77, 0.10), 0 2px 4px -1px rgba(23, 43, 77, 0.06);
--elevation-3: 0 10px 15px -3px rgba(23, 43, 77, 0.12), 0 4px 6px -2px rgba(23, 43, 77, 0.08);
--elevation-brand: 0 4px 14px 0 rgba(0, 82, 204, 0.25); /* Brand colored shadow */
```

**CSS Classes:**
```css
.elevation-1       /* Subtle cards */
.elevation-2       /* Interactive elements */
.elevation-3       /* Important cards */
.elevation-brand   /* Primary buttons */
.hover:elevation-2 /* Hover states */
```

**Usage Examples:**
```tsx
// Card with elevation (from App.tsx)
<Card className="elevation-3 bg-card/95 backdrop-blur-sm border-border/50 hover:elevation-4">

// Primary button with brand shadow
<Button className="elevation-2 hover:elevation-brand bg-brand-gradient">

// Stats cards
<Card className="elevation-1 hover:elevation-2">
```

---

## 📋 MEDIUM PRIORITY TOKENS

### Semantic Color System

Status-based colors for consistent UI feedback.

```css
/* Semantic Colors */
--semantic-success-500: #00875a;     /* Success primary */
--semantic-success-bg: #e3fcef;      /* Success background */
--semantic-success-border: #99d6b8;  /* Success border */

--semantic-warning-500: #974f00;     /* Warning primary */
--semantic-warning-bg: #fff4e6;      /* Warning background */
--semantic-warning-border: #ffcc99;  /* Warning border */

--semantic-error-500: #c9372c;       /* Error primary */
--semantic-error-bg: #ffebe6;        /* Error background */
--semantic-error-border: #ffb3b3;    /* Error border */

/* Info uses brand colors */
--semantic-info-500: var(--brand-primary-600);
--semantic-info-bg: var(--brand-primary-100);
--semantic-info-border: var(--brand-primary-200);
```

**Usage Examples:**
```tsx
// Success card (from App.tsx)
<Card className="bg-success-background border-success-border">
  <p className="text-success">{stats.approved}</p>
</Card>

// Warning card
<Card className="bg-warning-background border-warning-border">
  <p className="text-warning">{stats.pending}</p>
</Card>

// Info/brand card
<Card className="bg-info-background border-info-border">
  <p className="text-info">${stats.total.toLocaleString()}</p>
</Card>
```

### Neutral Color System

Foundation colors for backgrounds, text, and borders.

```css
/* Text Colors (WCAG AA Compliant) */
--neutral-text-primary: #172b4d;     /* 10.4:1 contrast - main text */
--neutral-text-secondary: #5e6c84;   /* 4.6:1 contrast - secondary text */
--neutral-text-tertiary: #6b778c;    /* 4.5:1 contrast - muted text */

/* Background Colors */
--neutral-bg-primary: #ffffff;       /* Main background */
--neutral-bg-secondary: #fafbfc;     /* Secondary background */
--neutral-bg-tertiary: #f4f5f7;      /* Muted background */

/* Border Colors */
--neutral-border-primary: #c1c7d0;   /* Standard borders */
--neutral-border-secondary: #dfe1e6; /* Light borders */
```

**Design System Mapping:**
```css
--color-background: var(--neutral-bg-primary);
--color-foreground: var(--neutral-text-primary);
--color-muted: var(--neutral-bg-tertiary);
--color-muted-foreground: var(--neutral-text-tertiary);
--color-border: var(--neutral-border-primary);
```

### Animation & Transition System

Consistent timing and easing for smooth interactions.

```css
/* Transition Tokens */
--transition-fast: 0.15s ease-out;           /* Quick hover states */
--transition-normal: 0.25s ease-out;         /* Standard transitions */
--transition-brand: 0.25s cubic-bezier(0.4, 0, 0.2, 1); /* Brand easing */
```

**CSS Classes:**
```css
.transition-brand  /* Primary interactive elements */
.transition-fast   /* Quick hover states */
.transition-normal /* Standard transitions */
```

**Usage Examples:**
```tsx
// Interactive elements (from App.tsx)
<Button className="transition-brand elevation-2 hover:elevation-brand">
<Card className="transition-brand hover:elevation-2">
```

---

## 🔧 LOW PRIORITY TOKENS

### Brand Gradient System

```css
/* Brand Gradients */
--brand-gradient-primary: linear-gradient(135deg, var(--brand-primary-500) 0%, var(--brand-primary-600) 100%);
--brand-gradient-subtle: linear-gradient(135deg, var(--brand-primary-50) 0%, var(--brand-primary-100) 100%);
```

**CSS Classes:**
```css
.bg-brand-gradient        /* Primary buttons, logo background */
.bg-brand-gradient-subtle /* Subtle background treatments */
```

### Layout & Spacing System

```css
/* Container Utilities */
.container-responsive /* Responsive container with padding */

/* Touch Targets (Accessibility) */
.touch-target        /* Minimum 44px touch targets */

/* Border Radius */
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 8px;    /* Default brand radius */
--radius-lg: 12px;
--radius-xl: 16px;
```

### Brand Component Utilities

```css
/* Brand-Specific Components */
.brand-logo          /* Brand logo styling */
.brand-accent        /* Left border accent (3px brand gradient) */
.text-brand-primary  /* Brand colored text */
```

**Usage Examples:**
```tsx
// Brand logo (from App.tsx)
<h1 className="brand-logo text-title-lg">InventoryPro</h1>

// Section with brand accent (from App.tsx)
<div className="brand-accent pl-4">
  <h2 className="text-title-lg">Inventory Records</h2>
</div>
```

---

## 🚀 Implementation Patterns

### Common Component Patterns

Based on actual usage in `App.tsx`:

#### 1. Stats Cards
```tsx
<Card className="transition-brand bg-warning-background border-warning-border elevation-1 hover:elevation-2">
  <CardContent className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-label-md font-medium uppercase tracking-wide text-warning">
          Label
        </p>
        <p className="text-headline-md font-semibold text-warning">
          Value
        </p>
      </div>
      <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-warning-background/50 border border-warning-border">
        <Icon className="h-6 w-6 text-warning" />
      </div>
    </div>
  </CardContent>
</Card>
```

#### 2. Primary Buttons
```tsx
<Button className="gap-2 touch-target transition-brand elevation-2 hover:elevation-brand bg-brand-gradient hover:opacity-90 text-primary-foreground font-medium">
  <Icon className="h-4 w-4" />
  <span>Button Text</span>
</Button>
```

#### 3. Header Layout
```tsx
<header className="sticky top-0 z-10 transition-brand bg-card/95 backdrop-blur-lg border-b border-border/50 elevation-2">
  <div className="container-responsive py-4">
    {/* Content */}
  </div>
</header>
```

#### 4. Section Headers with Brand Accent
```tsx
<div className="brand-accent pl-4">
  <h2 className="text-title-lg text-foreground font-semibold">Section Title</h2>
  <p className="text-body-md text-muted-foreground">Description</p>
</div>
```

---

## ♿ Accessibility Guidelines

### WCAG AA Compliance

All color combinations meet minimum contrast requirements:

```css
/* Contrast Ratios */
--neutral-text-primary: #172b4d;     /* 10.4:1 on white */
--neutral-text-secondary: #5e6c84;   /* 4.6:1 on white */
--neutral-text-tertiary: #6b778c;    /* 4.5:1 on white */

/* Brand colors on white backgrounds */
--brand-primary-600: #0052cc;        /* 5.74:1 contrast */
--semantic-success-500: #00875a;     /* 4.89:1 contrast */
--semantic-warning-500: #974f00;     /* 4.52:1 contrast */
--semantic-error-500: #c9372c;       /* 5.25:1 contrast */
```

### Touch Targets

All interactive elements meet minimum 44px touch target requirements:

```css
.touch-target {
  @apply min-h-[44px] min-w-[44px];
}
```

### Focus Management

```css
/* Focus indicators */
*:focus-visible {
  @apply outline-2 outline-offset-2;
  outline-color: var(--color-ring);
}

/* Skip links for keyboard navigation */
.skip-link {
  @apply absolute left-0 top-0 z-50 -translate-y-full px-4 py-2 rounded-b-md;
  background: var(--color-primary);
  color: var(--color-primary-foreground);
}
```

---

## 📱 Responsive Design

### Breakpoint Strategy

```css
/* Mobile-first approach */
@media (max-width: 768px) {
  /* Mobile optimizations */
  button { @apply min-h-[44px] px-4; }
  input { @apply min-h-[44px]; }
}

/* Desktop hiding/showing */
.hidden.sm:flex      /* Hide on mobile, show on desktop */
.sm:hidden          /* Show on mobile, hide on desktop */
```

### Responsive Typography

```css
/* Fluid typography using clamp() */
--font-display: clamp(32px, 4vw, 42px);
--font-headline-lg: clamp(28px, 3vw, 34px);
--font-headline-md: clamp(24px, 2.5vw, 28px);
--font-title-lg: clamp(20px, 2vw, 24px);
```

---

## 🔧 Developer Utilities

### Debug Classes

```css
/* Screen reader only */
.sr-only { /* Visually hidden but accessible */ }

/* Print styles */
.no-print { display: none !important; } /* @media print */

/* Container utility */
.container-responsive { @apply container mx-auto px-4 sm:px-6 lg:px-8; }
```

### Animation Preferences

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  :root {
    --color-border: #000000;
    --color-foreground: #000000;
    --color-primary: #0000ff;
  }
}
```

---

## 📚 Quick Reference

### Most Used Token Combinations

```tsx
// Primary button
"transition-brand elevation-2 hover:elevation-brand bg-brand-gradient text-primary-foreground"

// Stats card
"transition-brand bg-warning-background border-warning-border elevation-1 hover:elevation-2"

// Main content card
"overflow-hidden transition-brand elevation-3 bg-card/95 backdrop-blur-sm border-border/50 hover:elevation-4"

// Header
"sticky top-0 z-10 transition-brand bg-card/95 backdrop-blur-lg border-b border-border/50 elevation-2"

// Brand logo
"brand-logo text-title-lg truncate"

// Section with accent
"brand-accent pl-4"
```

### Token Priority for New Components

1. **Start with:** `text-body-lg`, `transition-brand`, `elevation-1`
2. **Add interactivity:** `hover:elevation-2`, brand colors for primary actions
3. **Consider accessibility:** `touch-target`, proper contrast ratios
4. **Apply responsive:** `hidden sm:flex`, responsive typography classes

---

## 🏗️ Architecture Notes

- **CSS Custom Properties**: Enable runtime theme switching capability
- **Tailwind v4**: Modern CSS-first approach with `@theme inline`
- **Mobile-first**: All responsive utilities follow mobile-first methodology
- **WCAG AA**: All color combinations meet accessibility standards
- **Performance**: Minimal CSS output, efficient browser-native implementations

This style guide reflects the **actual implementation** in the InventoryPro platform and should be the primary reference for all UI development work.