# Project Cleanup Actions

## 🗑️ Files to Delete

### Unused Component Files
```
/components/ThemeSelector.tsx          # Theme switching removed
/components/ThemeToggle.tsx            # Not used anywhere
/components/DesignSystemSelector.tsx   # Not used anywhere
/components/PresentationSelector.tsx   # Not used anywhere
/components/PowerUserToolbar.tsx       # Not used anywhere
/components/KeyboardShortcuts.tsx      # Not used anywhere
/components/QuickEntry.tsx             # Not used anywhere
```

### Redundant Documentation Files
```
/BRAND_IDENTITY_GUIDE.md              # Replaced by DEVELOPER_STYLE_GUIDE.md
/FIGMA_COMPONENT_SPECS.json           # Outdated Figma specs
/FIGMA_CONVERSION_BLUEPRINT.md        # Outdated Figma documentation
/FIGMA_PROTOTYPE_GUIDE.md             # Outdated Figma documentation
/README_DOCS.md                       # Replaced by README.md
```

### Redundant CSS Files
```
/styles/themes.css                    # Functionality merged into globals.css
```

## ✅ Files to Keep

### Core Components (Used in App.tsx)
- `/components/FilterBar.tsx`
- `/components/InventoryForm.tsx`
- `/components/InventoryTable.tsx`

### Essential UI Components (Used)
- `/components/ui/button.tsx`
- `/components/ui/card.tsx`
- `/components/ui/dialog.tsx`
- `/components/ui/sheet.tsx`
- `/components/ui/input.tsx`
- `/components/ui/select.tsx`
- `/components/ui/label.tsx`
- `/components/ui/form.tsx`
- `/components/ui/table.tsx`

### Core Files
- `/App.tsx`
- `/styles/globals.css`
- `/components/figma/ImageWithFallback.tsx` (Protected)

### Essential Documentation
- `/README.md` (Updated)
- `/DEVELOPER_STYLE_GUIDE.md`
- `/Guidelines.md`
- `/Attributions.md`

## 📊 Cleanup Summary

**Before Cleanup:**
- Total files: ~60+
- Component files: ~15
- Documentation files: ~8
- CSS files: 2

**After Cleanup:**
- Total files: ~35
- Component files: ~8 (only used ones)
- Documentation files: 4 (essential only)
- CSS files: 1 (optimized)

**Benefits:**
- 40%+ reduction in file count
- Removed all unused theme-related code
- Streamlined CSS with no redundancy
- Clear, focused documentation
- Easier maintenance and navigation
```

## 🔄 Next Steps

1. Delete the listed unused files
2. Test that all functionality still works
3. Verify no import errors
4. Update any remaining references
5. Run final optimization check

This cleanup removes all unused features while preserving core inventory management functionality.