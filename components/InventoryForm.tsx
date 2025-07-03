import React from "react";
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
import { useForm } from "react-hook-form";
import { DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { InventoryRecord } from "../App";

interface InventoryFormProps {
  record?: InventoryRecord | null;
  onSubmit: (data: Omit<InventoryRecord, "id"> | InventoryRecord) => void;
  onCancel: () => void;
  categories: string[];
}

export function InventoryForm({ record, onSubmit, onCancel, categories }: InventoryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Omit<InventoryRecord, "id">>({
    defaultValues: record
      ? {
          date: record.date,
          category: record.category,
          value: record.value,
          responsible: record.responsible,
          status: record.status,
        }
      : {
          date: new Date().toISOString().split("T")[0],
          category: categories[0] || "Raw Materials",
          value: 0,
          responsible: "",
          status: "pending" as const,
        },
  });

  const watchedCategory = watch("category");
  const watchedStatus = watch("status");

  const handleFormSubmit = (data: Omit<InventoryRecord, "id">) => {
    if (record) {
      onSubmit({ ...data, id: record.id });
    } else {
      onSubmit(data);
    }
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-title-lg text-foreground">
          {record ? "Edit Inventory Record" : "Create New Record"}
        </DialogTitle>
        <DialogDescription className="text-body-md text-muted-foreground">
          {record ? "Update the details for this inventory record." : "Fill in the information to create a new inventory record."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Date Field */}
        <div className="space-y-2">
          <Label htmlFor="date" className="text-label-lg">
            Date *
          </Label>
          <Input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
            className={`touch-target transition-brand ${
              errors.date ? "border-destructive focus:ring-destructive" : ""
            }`}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && (
            <p id="date-error" className="text-body-md text-destructive" role="alert">
              {errors.date.message}
            </p>
          )}
        </div>

        {/* Category Field */}
        <div className="space-y-2">
          <Label htmlFor="category" className="text-label-lg">
            Category *
          </Label>
          <Select
            value={watchedCategory}
            onValueChange={(value) => setValue("category", value)}
          >
            <SelectTrigger
              id="category"
              className={`touch-target transition-brand ${
                errors.category ? "border-destructive focus:ring-destructive" : ""
              }`}
              aria-describedby={errors.category ? "category-error" : undefined}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-popover/95 backdrop-blur-lg border-border/50 elevation-3">
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
          <input
            type="hidden"
            {...register("category", { required: "Category is required" })}
          />
          {errors.category && (
            <p id="category-error" className="text-body-md text-destructive" role="alert">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Value Field */}
        <div className="space-y-2">
          <Label htmlFor="value" className="text-label-lg">
            Value (USD) *
          </Label>
          <Input
            id="value"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            {...register("value", {
              required: "Value is required",
              min: { value: 0, message: "Value must be positive" },
              valueAsNumber: true,
            })}
            className={`touch-target transition-brand ${
              errors.value ? "border-destructive focus:ring-destructive" : ""
            }`}
            aria-describedby={errors.value ? "value-error" : undefined}
          />
          {errors.value && (
            <p id="value-error" className="text-body-md text-destructive" role="alert">
              {errors.value.message}
            </p>
          )}
        </div>

        {/* Responsible Field */}
        <div className="space-y-2">
          <Label htmlFor="responsible" className="text-label-lg">
            Responsible Person *
          </Label>
          <Input
            id="responsible"
            type="text"
            placeholder="Enter full name"
            {...register("responsible", {
              required: "Responsible person is required",
              minLength: { value: 2, message: "Name must be at least 2 characters" },
            })}
            className={`touch-target transition-brand ${
              errors.responsible ? "border-destructive focus:ring-destructive" : ""
            }`}
            aria-describedby={errors.responsible ? "responsible-error" : undefined}
          />
          {errors.responsible && (
            <p id="responsible-error" className="text-body-md text-destructive" role="alert">
              {errors.responsible.message}
            </p>
          )}
        </div>

        {/* Status Field */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-label-lg">
            Status
          </Label>
          <Select
            value={watchedStatus}
            onValueChange={(value) => setValue("status", value as "pending" | "approved" | "rejected")}
          >
            <SelectTrigger id="status" className="touch-target transition-brand">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover/95 backdrop-blur-lg border-border/50 elevation-3">
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

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border/50">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 touch-target transition-brand"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 touch-target transition-brand elevation-2 hover:elevation-brand bg-brand-gradient text-primary-foreground"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : record
              ? "Update Record"
              : "Create Record"}
          </Button>
        </div>
      </form>
    </div>
  );
}