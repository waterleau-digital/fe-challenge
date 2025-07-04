import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { apiService, DesignSystem } from '../src/services/api';

interface DesignSystemSelectorProps {
  value: string;
  onChange: (value: string) => void;
}


export function DesignSystemSelector({ value, onChange }: DesignSystemSelectorProps) {
  const [designSystems, setDesignSystems] = useState<DesignSystem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDesignSystems = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDesignSystems();
        setDesignSystems(data);
      } catch (error) {
        console.error('Failed to load design systems:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDesignSystems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <Label className="text-sm font-medium whitespace-nowrap">Design System:</Label>
        <div className="w-[200px] h-9 bg-muted/50 rounded-md animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Label htmlFor="design-system-selector" className="text-sm font-medium whitespace-nowrap">
        Design System:
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger 
          id="design-system-selector"
          className="w-[200px] bg-background border-border hover:border-primary focus:border-primary transition-colors"
        >
          <SelectValue placeholder="Select design system" />
        </SelectTrigger>
        <SelectContent className="border-border bg-background">
          {designSystems.map(system => (
            <SelectItem 
              key={system.id} 
              value={system.id}
              className="cursor-pointer hover:bg-accent focus:bg-accent"
            >
              <div className="flex flex-col">
                <span className="font-medium">{system.name}</span>
                <span className="text-xs text-muted-foreground">{system.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}