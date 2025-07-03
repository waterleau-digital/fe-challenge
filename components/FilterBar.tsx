import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { X, Filter, Search } from "lucide-react";

interface FilterBarProps {
  pendingFilters: {
    category: string;
    dateFrom: string;
    dateTo: string;
    responsible: string;
    status: string;
  };
  appliedFilters: {
    category: string;
    dateFrom: string;
    dateTo: string;
    responsible: string;
    status: string;
  };
  onPendingFiltersChange: (filters: {
    category: string;
    dateFrom: string;
    dateTo: string;
    responsible: string;
    status: string;
  }) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  hasPendingChanges: boolean;
  categories: string[];
}

export function FilterBar({ 
  pendingFilters, 
  appliedFilters,
  onPendingFiltersChange, 
  onApplyFilters,
  onClearFilters,
  hasPendingChanges,
  categories 
}: FilterBarProps) {
  const updatePendingFilter = (key: keyof typeof pendingFilters, value: string) => {
    onPendingFiltersChange({ ...pendingFilters, [key]: value });
  };

  const hasActiveFilters = 
    appliedFilters.category !== "all" || 
    appliedFilters.status !== "all" || 
    appliedFilters.dateFrom !== "" || 
    appliedFilters.dateTo !== "" || 
    appliedFilters.responsible !== "";

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && hasPendingChanges) {
      onApplyFilters();
    }
  };

  return (
    <Card className="transition-brand elevation-2 bg-card/95 backdrop-blur-sm border-border/50 hover:elevation-3">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Filter Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <div>
                <h3 className="text-title-md font-medium text-foreground">Filters</h3>
                <p className="text-body-md text-muted-foreground">Press Enter to apply changes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasPendingChanges && (
                <Button
                  onClick={onApplyFilters}
                  className="gap-2 touch-target transition-brand bg-brand-gradient text-primary-foreground elevation-1 hover:elevation-2"
                  aria-label="Apply pending filter changes"
                >
                  <Search className="h-4 w-4" />
                  Apply
                </Button>
              )}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  className="gap-2 text-muted-foreground hover:text-foreground transition-brand"
                  aria-label="Clear all filters"
                >
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" onKeyPress={handleKeyPress}>
            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category-filter" className="text-label-lg">
                Category
              </Label>
              <Select
                value={pendingFilters.category}
                onValueChange={(value) => updatePendingFilter("category", value)}
              >
                <SelectTrigger
                  id="category-filter"
                  className="touch-target transition-brand"
                  aria-label="Filter by category"
                >
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border elevation-3">
                  <SelectItem value="all" className="hover:bg-accent/50 transition-brand">
                    All categories
                  </SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="hover:bg-accent/50 transition-brand"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date From Filter */}
            <div className="space-y-2">
              <Label htmlFor="date-from-filter" className="text-label-lg">
                Date From
              </Label>
              <Input
                id="date-from-filter"
                type="date"
                value={pendingFilters.dateFrom}
                onChange={(e) => updatePendingFilter("dateFrom", e.target.value)}
                className="touch-target transition-brand"
                aria-label="Filter from date"
              />
            </div>

            {/* Date To Filter */}
            <div className="space-y-2">
              <Label htmlFor="date-to-filter" className="text-label-lg">
                Date To
              </Label>
              <Input
                id="date-to-filter"
                type="date"
                value={pendingFilters.dateTo}
                onChange={(e) => updatePendingFilter("dateTo", e.target.value)}
                className="touch-target transition-brand"
                aria-label="Filter to date"
              />
            </div>

            {/* Responsible Filter */}
            <div className="space-y-2">
              <Label htmlFor="responsible-filter" className="text-label-lg">
                Responsible
              </Label>
              <Input
                id="responsible-filter"
                type="text"
                placeholder="Search by name..."
                value={pendingFilters.responsible}
                onChange={(e) => updatePendingFilter("responsible", e.target.value)}
                className="touch-target transition-brand"
                aria-label="Filter by responsible person"
              />
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <Label htmlFor="status-filter" className="text-label-lg">
                Status
              </Label>
              <Select
                value={pendingFilters.status}
                onValueChange={(value) => updatePendingFilter("status", value)}
              >
                <SelectTrigger
                  id="status-filter"
                  className="touch-target transition-brand"
                  aria-label="Filter by status"
                >
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border elevation-3">
                  <SelectItem value="all" className="hover:bg-accent/50 transition-brand">
                    All statuses
                  </SelectItem>
                  <SelectItem value="pending" className="hover:bg-accent/50 transition-brand">
                    Pending
                  </SelectItem>
                  <SelectItem value="approved" className="hover:bg-accent/50 transition-brand">
                    Approved
                  </SelectItem>
                  <SelectItem value="rejected" className="hover:bg-accent/50 transition-brand">
                    Rejected
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="space-y-3 pt-2 border-t border-border/50">
              <h4 className="text-label-lg text-muted-foreground">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {appliedFilters.category !== "all" && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-label-md border border-primary/20">
                    <span>Category: {appliedFilters.category}</span>
                    <button
                      onClick={() => {
                        updatePendingFilter("category", "all");
                        onApplyFilters();
                      }}
                      className="hover:bg-primary/20 rounded-sm p-0.5 transition-brand"
                      aria-label={`Remove category filter: ${appliedFilters.category}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {appliedFilters.status !== "all" && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-label-md border border-primary/20">
                    <span>Status: {appliedFilters.status}</span>
                    <button
                      onClick={() => {
                        updatePendingFilter("status", "all");
                        onApplyFilters();
                      }}
                      className="hover:bg-primary/20 rounded-sm p-0.5 transition-brand"
                      aria-label={`Remove status filter: ${appliedFilters.status}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {appliedFilters.responsible && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-label-md border border-primary/20">
                    <span>Person: {appliedFilters.responsible}</span>
                    <button
                      onClick={() => {
                        updatePendingFilter("responsible", "");
                        onApplyFilters();
                      }}
                      className="hover:bg-primary/20 rounded-sm p-0.5 transition-brand"
                      aria-label={`Remove responsible filter: ${appliedFilters.responsible}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {(appliedFilters.dateFrom || appliedFilters.dateTo) && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-md text-label-md border border-primary/20">
                    <span>
                      Date: {appliedFilters.dateFrom || "Start"} → {appliedFilters.dateTo || "End"}
                    </span>
                    <button
                      onClick={() => {
                        updatePendingFilter("dateFrom", "");
                        updatePendingFilter("dateTo", "");
                        onApplyFilters();
                      }}
                      className="hover:bg-primary/20 rounded-sm p-0.5 transition-brand"
                      aria-label="Remove date filters"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}