import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from './ui/popover';
import { 
  Settings, 
  Sparkles, 
  Palette,
  Check
} from 'lucide-react';

export type PresentationMode = {
  version: 'old' | 'new';
  fidelity: 'wireframe' | 'high-fidelity';
};

interface PresentationSelectorProps {
  currentMode: PresentationMode;
  onModeChange: (mode: PresentationMode) => void;
}

const presentationOptions = [
  {
    version: 'old' as const,
    fidelity: 'high-fidelity' as const,
    label: 'As IS (High-Fidelity)',
    description: 'Current system with polished design',
    icon: Palette,
    badge: 'Current',
    badgeVariant: 'secondary' as const
  },
  {
    version: 'new' as const,
    fidelity: 'wireframe' as const,
    label: 'New (Wireframe)',
    description: 'Enhanced system with basic styling',
    icon: Sparkles,
    badge: 'Enhanced',
    badgeVariant: 'default' as const
  }
];

export function PresentationSelector({ currentMode, onModeChange }: PresentationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = presentationOptions.find(
    option => option.version === currentMode.version && option.fidelity === currentMode.fidelity
  );

  const handleModeSelect = (version: 'old' | 'new', fidelity: 'wireframe' | 'high-fidelity') => {
    onModeChange({ version, fidelity });
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 no-print">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-14 px-4 gap-3 bg-card/95 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl design-transition"
            aria-label="Change presentation mode"
          >
            <Settings className="h-5 w-5" />
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-label-lg font-medium">Presentation</span>
              <Badge 
                variant={currentOption?.badgeVariant} 
                className="text-xs px-1 py-0 h-4"
              >
                {currentOption?.badge}
              </Badge>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-0 bg-card/95 backdrop-blur-sm border-border/50 shadow-xl"
          side="top"
          align="start"
          sideOffset={8}
        >
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-3">
              <CardTitle className="text-title-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Presentation Mode
              </CardTitle>
              <p className="text-body-md text-muted-foreground">
                Compare current system with enhanced version
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Presentation Options */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 gap-2">
                  {presentationOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = currentMode.version === option.version && currentMode.fidelity === option.fidelity;
                    
                    return (
                      <Button
                        key={`${option.version}-${option.fidelity}`}
                        variant={isSelected ? "default" : "ghost"}
                        className="w-full justify-start h-auto p-3 text-left"
                        onClick={() => handleModeSelect(option.version, option.fidelity)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-label-lg">{option.label}</div>
                            <div className="text-body-md text-muted-foreground truncate">
                              {option.description}
                            </div>
                          </div>
                          {isSelected && <Check className="h-4 w-4 flex-shrink-0" />}
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Current Mode Info */}
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-label-md text-muted-foreground">Current Mode:</span>
                  <Badge variant={currentOption?.badgeVariant} className="gap-1">
                    {currentOption?.icon && <currentOption.icon className="h-3 w-3" />}
                    {currentOption?.badge}
                  </Badge>
                </div>
              </div>

              {/* Mode Description */}
              <div className="bg-muted/50 rounded-md p-3">
                <p className="text-body-md text-muted-foreground">
                  {currentMode.version === 'old' && currentMode.fidelity === 'high-fidelity' && 
                    "Viewing the current inventory system with polished design and enhanced visual elements."
                  }
                  {currentMode.version === 'new' && currentMode.fidelity === 'wireframe' && 
                    "Viewing the enhanced system with full hierarchy (Category → Subcategory → SKU) using basic wireframe styling."
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}