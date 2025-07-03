import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';

export type DesignSystem = 'material' | 'ant' | 'hig';

interface DesignSystemSelectorProps {
  value: DesignSystem;
  onChange: (value: DesignSystem) => void;
}

const designSystems = [
  {
    id: 'material' as const,
    name: 'Material Design',
    description: 'Google\'s Material Design 3'
  },
  {
    id: 'ant' as const,
    name: 'Ant Design',
    description: 'Ant Group\'s Design Language'
  },
  {
    id: 'hig' as const,
    name: 'Human Interface Guidelines',
    description: 'Apple\'s Design System'
  }
];

export function DesignSystemSelector({ value, onChange }: DesignSystemSelectorProps) {
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