import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Edit2,
  Trash2,
  Check,
  Clock,
  X,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { InventoryRecord } from "../App";

interface InventoryTableProps {
  records: InventoryRecord[];
  onEdit: (record: InventoryRecord) => void;
  onDelete: (id: string) => void;
  onApprove: (id: string) => void;
}

type SortField = "date" | "category" | "value" | "responsible" | "status";
type SortDirection = "asc" | "desc";

export function InventoryTable({ records, onEdit, onDelete, onApprove }: InventoryTableProps) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedRecords = [...records].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];

    if (sortField === "value") {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else if (sortField === "date") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="h-4 w-4" aria-hidden="true" />;
      case "pending":
        return <Clock className="h-4 w-4" aria-hidden="true" />;
      case "rejected":
        return <X className="h-4 w-4" aria-hidden="true" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-success bg-success-background border-success-border";
      case "pending":
        return "text-warning bg-warning-background border-warning-border";
      case "rejected":
        return "text-destructive bg-destructive/10 border-destructive/20";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-foreground transition-brand text-left"
      aria-label={`Sort by ${field} ${sortField === field ? (sortDirection === "asc" ? "descending" : "ascending") : "ascending"}`}
    >
      <span>{children}</span>
      {sortField === field ? (
        sortDirection === "asc" ? (
          <ChevronUp className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        )
      ) : (
        <div className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );

  if (records.length === 0) {
    return (
      <div className="text-center py-12 px-6">
        <div className="text-muted-foreground space-y-2">
          <p className="text-body-lg">No inventory records found</p>
          <p className="text-body-md">Try adjusting your filters or create a new record</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-md border-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/70 border-border/50">
              <TableHead className="text-muted-foreground font-medium h-12 px-6">
                <SortButton field="date">Date</SortButton>
              </TableHead>
              <TableHead className="text-muted-foreground font-medium h-12 px-4">
                <SortButton field="category">Category</SortButton>
              </TableHead>
              <TableHead className="text-muted-foreground font-medium h-12 px-4">
                <SortButton field="value">Value</SortButton>
              </TableHead>
              <TableHead className="text-muted-foreground font-medium h-12 px-4">
                <SortButton field="responsible">Responsible</SortButton>
              </TableHead>
              <TableHead className="text-muted-foreground font-medium h-12 px-4">
                <SortButton field="status">Status</SortButton>
              </TableHead>
              <TableHead className="text-muted-foreground font-medium h-12 px-6 w-16">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRecords.map((record, index) => (
              <TableRow
                key={record.id}
                className={`transition-brand hover:bg-accent/50 ${
                  index % 2 === 0 ? "bg-background" : "bg-muted/20"
                } border-border/30`}
              >
                <TableCell className="font-medium text-foreground h-16 px-6">
                  <time dateTime={record.date} className="text-body-lg">
                    {formatDate(record.date)}
                  </time>
                </TableCell>
                <TableCell className="text-foreground h-16 px-4">
                  <span className="text-body-lg">{record.category}</span>
                </TableCell>
                <TableCell className="font-medium text-foreground h-16 px-4">
                  <span className="text-body-lg">{formatCurrency(record.value)}</span>
                </TableCell>
                <TableCell className="text-foreground h-16 px-4">
                  <span className="text-body-lg">{record.responsible}</span>
                </TableCell>
                <TableCell className="h-16 px-4">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-label-md font-medium border ${getStatusColor(
                      record.status
                    )} transition-brand`}
                  >
                    {getStatusIcon(record.status)}
                    <span className="capitalize">{record.status}</span>
                  </div>
                </TableCell>
                <TableCell className="h-16 px-6 w-16">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-0 hover:bg-accent/70 transition-brand"
                        aria-label={`Actions for ${record.responsible}'s record`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-popover/95 backdrop-blur-lg border-border/50 elevation-3"
                    >
                      <DropdownMenuItem
                        onClick={() => onEdit(record)}
                        className="gap-2 cursor-pointer hover:bg-accent/50 transition-brand"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit Record
                      </DropdownMenuItem>
                      {record.status === "pending" && (
                        <>
                          <DropdownMenuItem
                            onClick={() => onApprove(record.id)}
                            className="gap-2 cursor-pointer hover:bg-accent/50 transition-brand text-success"
                          >
                            <Check className="h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border/50" />
                        </>
                      )}
                      <DropdownMenuItem
                        onClick={() => onDelete(record.id)}
                        className="gap-2 cursor-pointer hover:bg-destructive/10 transition-brand text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer with consistent spacing */}
      <div className="mt-4 px-6 flex items-center justify-between text-body-md text-muted-foreground">
        <div>
          Showing {sortedRecords.length} record{sortedRecords.length !== 1 ? "s" : ""}
        </div>
        <div className="flex items-center gap-4">
          <div>
            Sorted by {sortField} ({sortDirection === "asc" ? "ascending" : "descending"})
          </div>
        </div>
      </div>
    </div>
  );
}