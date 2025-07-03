import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Monitor } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    
    if (newTheme === 'system') {
      const systemTheme = getSystemTheme();
      if (systemTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  // Handle theme change
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Get current icon based on theme
  const getCurrentIcon = () => {
    if (!mounted) return <Monitor className="h-4 w-4" />;
    
    if (theme === 'system') {
      return <Monitor className="h-4 w-4" />;
    } else if (theme === 'dark') {
      return <Moon className="h-4 w-4" />;
    } else {
      return <Sun className="h-4 w-4" />;
    }
  };

  // Get theme label for accessibility
  const getThemeLabel = () => {
    if (theme === 'system') return 'System theme';
    if (theme === 'dark') return 'Dark theme';
    return 'Light theme';
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`touch-target ${className}`}
        disabled
        aria-label="Theme toggle loading"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`touch-target ${className}`}
          aria-label={`Current theme: ${getThemeLabel()}. Click to change theme`}
        >
          {getCurrentIcon()}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="elevation-3 border-border bg-background min-w-[140px]"
        role="menu"
        aria-label="Theme selection menu"
      >
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className={`gap-3 text-body-md py-3 px-3 cursor-pointer hover:bg-accent/50 design-transition ${
            theme === 'light' ? 'bg-accent/30' : ''
          }`}
          role="menuitem"
          aria-checked={theme === 'light'}
        >
          <Sun className="h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className={`gap-3 text-body-md py-3 px-3 cursor-pointer hover:bg-accent/50 design-transition ${
            theme === 'dark' ? 'bg-accent/30' : ''
          }`}
          role="menuitem"
          aria-checked={theme === 'dark'}
        >
          <Moon className="h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('system')}
          className={`gap-3 text-body-md py-3 px-3 cursor-pointer hover:bg-accent/50 design-transition ${
            theme === 'system' ? 'bg-accent/30' : ''
          }`}
          role="menuitem"
          aria-checked={theme === 'system'}
        >
          <Monitor className="h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}