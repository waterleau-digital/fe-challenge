# InventoryPro Documentation Index

## 📚 Developer Documentation

### Primary References

1. **[DEVELOPER_STYLE_GUIDE.md](./DEVELOPER_STYLE_GUIDE.md)** - Complete design system and token reference
   - Design tokens by priority
   - Typography system
   - Color palettes
   - Component patterns
   - Accessibility guidelines
   - Implementation examples from actual codebase

### Supporting Documentation

2. **[Guidelines.md](./Guidelines.md)** - General development guidelines
3. **[Attributions.md](./Attributions.md)** - Third-party dependencies and credits

### Legacy Files (Archived)

- `BRAND_IDENTITY_GUIDE.md` - Replaced by DEVELOPER_STYLE_GUIDE.md
- `FIGMA_*.md` - Figma-specific documentation (archived)

## 🎯 Quick Start for Developers

### Essential Design Tokens

```css
/* Most Important Colors */
--color-primary: #0052cc;              /* Primary buttons, links */
--color-foreground: #172b4d;           /* Main text */
--color-muted-foreground: #6b778c;     /* Secondary text */

/* Most Important Typography */
.text-title-lg      /* Section headers */
.text-body-lg       /* Main content */
.text-label-md      /* Small labels */

/* Most Important Utilities */
.transition-brand   /* Standard transitions */
.elevation-2        /* Card shadows */
.touch-target       /* Accessibility compliance */
```

### Common Patterns

```tsx
// Primary button
<Button className="transition-brand elevation-2 hover:elevation-brand bg-brand-gradient text-primary-foreground">

// Stats card
<Card className="transition-brand bg-warning-background border-warning-border elevation-1 hover:elevation-2">

// Section header
<div className="brand-accent pl-4">
  <h2 className="text-title-lg text-foreground font-semibold">Title</h2>
</div>
```

## 🏗️ Architecture Overview

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4 + CSS Custom Properties
- **Components**: shadcn/ui + custom components
- **Icons**: Lucide React
- **Build**: Modern ES modules, optimized for performance

## 📞 Support

For questions about the design system or implementation patterns, refer to the **DEVELOPER_STYLE_GUIDE.md** which documents all tokens and utilities currently in use in the platform.