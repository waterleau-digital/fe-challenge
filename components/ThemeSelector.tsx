import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Palette, Check } from 'lucide-react';
import { apiService, Theme } from '../src/services/api';



export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState('corporate-blue');
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load themes from API
  useEffect(() => {
    const loadThemes = async () => {
      try {
        setLoading(true);
        const themesData = await apiService.getThemes();
        setThemes(themesData);
      } catch (error) {
        console.error('Failed to load themes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadThemes();
  }, []);

  // Initialize theme on component mount
  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('inventory-theme') || 'corporate-blue';
      
      // Validate theme exists
      if (themes.find(t => t.id === savedTheme)) {
        setCurrentTheme(savedTheme);
        applyTheme(savedTheme);
      } else {
        // Fallback to default theme
        setCurrentTheme('corporate-blue');
        applyTheme('corporate-blue');
      }
    };

    // Apply theme immediately on mount
    initializeTheme();
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    const htmlElement = document.documentElement;
    
    // Remove all theme classes
    themes.forEach(t => {
      htmlElement.classList.remove(`theme-${t.id}`);
    });

    // Apply new theme class
    htmlElement.classList.add(`theme-${themeId}`);
    
    // Save to localStorage
    localStorage.setItem('inventory-theme', themeId);

    // Update brand name in header (for dynamic brand name updates)
    const brandElements = document.querySelectorAll('.brand-logo');
    brandElements.forEach(element => {
      if (element.textContent?.includes('Inventory') || element.textContent?.includes('Pro')) {
        element.textContent = theme.name;
      }
    });

    console.log(`Theme applied: ${themeId} (${theme.name})`);
  };

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 transition-brand bg-background/50 backdrop-blur-sm hover:bg-background/80 elevation-1 hover:elevation-2 border-border/50 hover:border-primary/30"
          aria-label="Change brand theme"
        >
          <Palette className="h-4 w-4" />
          <span className="hidden md:inline">Theme</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl transition-brand elevation-4 bg-card/95 backdrop-blur-lg border-border/50">
        <DialogHeader>
          <DialogTitle className="text-title-lg">Choose Brand Theme</DialogTitle>
          <DialogDescription className="text-body-md">
            Select a theme to instantly rebrand the entire platform. Changes are saved automatically and persist across sessions.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground mt-2">Loading themes...</p>
            </div>
          ) : (
            themes.map((theme) => (
            <Card
              key={theme.id}
              className={`cursor-pointer transition-brand border-2 group hover:scale-[1.02] ${
                currentTheme === theme.id
                  ? 'border-primary elevation-3 bg-primary/5'
                  : 'border-border hover:border-border/80 elevation-1 hover:elevation-2'
              }`}
              onClick={() => handleThemeChange(theme.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-16 h-16 rounded-xl border-2 border-white/20 shadow-inner"
                    style={{ background: theme.colors.gradient }}
                  />
                  {currentTheme === theme.id && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-title-md font-semibold group-hover:text-primary transition-brand">
                    {theme.name}
                  </CardTitle>
                  <p className="text-label-lg text-muted-foreground mt-1">
                    {theme.tagline}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-body-md text-muted-foreground mb-3">
                  {theme.description}
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border border-border/50 shadow-sm"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <span className="text-label-lg text-muted-foreground font-mono text-xs">
                    {theme.colors.primary}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>

        {/* Current Theme Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border border-border/50">
          <h4 className="text-title-md font-semibold mb-3 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Current Active Theme
          </h4>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg border-2 border-white/20 shadow-inner"
              style={{ background: currentThemeData?.colors.gradient }}
            />
            <div className="flex-1">
              <div className="text-body-lg font-semibold">{currentThemeData?.name}</div>
              <div className="text-label-lg text-muted-foreground">{currentThemeData?.tagline}</div>
            </div>
            <div className="text-right">
              <div className="text-label-md text-muted-foreground uppercase tracking-wider">Applied</div>
              <div className="w-2 h-2 rounded-full bg-green-500 ml-auto mt-1"></div>
            </div>
          </div>
        </div>

        {/* Theme Application Info */}
        <div className="mt-4 p-4 bg-info-background/30 rounded-lg border border-info-border/30">
          <h5 className="text-label-lg font-semibold text-info mb-2">How Theme Switching Works</h5>
          <ul className="text-body-md text-muted-foreground space-y-1 text-sm">
            <li>• <strong>Instant Application:</strong> Themes apply immediately across the entire platform</li>
            <li>• <strong>Persistent Storage:</strong> Your choice is saved and restored on future visits</li>
            <li>• <strong>Brand Elements:</strong> Logo, colors, gradients, and shadows update automatically</li>
            <li>• <strong>Accessibility:</strong> All themes maintain WCAG AA contrast standards</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
          <Button 
            onClick={() => setIsOpen(false)} 
            className="transition-brand bg-brand-gradient text-primary-foreground px-8"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}