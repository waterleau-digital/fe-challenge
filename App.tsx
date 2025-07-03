import React, { useState, useMemo } from "react";
import { InventoryTable } from "./components/InventoryTable";
import { InventoryForm } from "./components/InventoryForm";
import { FilterBar } from "./components/FilterBar";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import {
  Plus,
  Download,
  Menu,
  TrendingUp,
  Package,
  DollarSign,
  Box,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./components/ui/sheet";

export interface InventoryRecord {
  id: string;
  date: string;
  category: string;
  value: number;
  responsible: string;
  status: "pending" | "approved" | "rejected";
}

const categories = [
  "Raw Materials",
  "Finished Products", 
  "Equipment",
  "Packaging",
  "Tools",
  "Consumables"
];

const initialRecords: InventoryRecord[] = [
  {
    id: "1",
    date: "2025-06-27",
    category: "Raw Materials",
    value: 15000,
    responsible: "John Smith",
    status: "approved",
  },
  {
    id: "2",
    date: "2025-06-26",
    category: "Finished Products",
    value: 8500,
    responsible: "Maria Johnson",
    status: "pending",
  },
  {
    id: "3",
    date: "2025-06-25",
    category: "Equipment",
    value: 32000,
    responsible: "Carlos Rodriguez",
    status: "approved",
  },
  {
    id: "4",
    date: "2025-06-24",
    category: "Raw Materials",
    value: 12300,
    responsible: "Anna Williams",
    status: "pending",
  },
  {
    id: "5",
    date: "2025-06-23",
    category: "Packaging",
    value: 2800,
    responsible: "Peter Brown",
    status: "approved",
  },
  {
    id: "6",
    date: "2025-06-22",
    category: "Tools",
    value: 4200,
    responsible: "Linda Davis",
    status: "approved",
  },
  {
    id: "7",
    date: "2025-06-21",
    category: "Consumables",
    value: 1800,
    responsible: "Robert Wilson",
    status: "pending",
  },
  {
    id: "8",
    date: "2025-06-20",
    category: "Finished Products",
    value: 25000,
    responsible: "Maria Johnson",
    status: "approved",
  },
];

const defaultFilters = {
  category: "all",
  dateFrom: "",
  dateTo: "",
  responsible: "",
  status: "all",
};

export default function App() {
  const [records, setRecords] = useState<InventoryRecord[]>(initialRecords);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<InventoryRecord | null>(null);
  
  // Separate pending filters (in UI) from applied filters (affecting table)
  const [pendingFilters, setPendingFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  // Filter records based on applied filters only
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      if (appliedFilters.category !== "all" && record.category !== appliedFilters.category) return false;
      if (appliedFilters.responsible && !record.responsible.toLowerCase().includes(appliedFilters.responsible.toLowerCase())) return false;
      if (appliedFilters.status !== "all" && record.status !== appliedFilters.status) return false;
      if (appliedFilters.dateFrom && record.date < appliedFilters.dateFrom) return false;
      if (appliedFilters.dateTo && record.date > appliedFilters.dateTo) return false;
      return true;
    });
  }, [records, appliedFilters]);

  // Calculate statistics based on filtered records
  const stats = useMemo(() => {
    const pending = filteredRecords.filter((r) => r.status === "pending").length;
    const approved = filteredRecords.filter((r) => r.status === "approved").length;
    const total = filteredRecords.reduce((sum, record) => sum + record.value, 0);
    return { pending, approved, total };
  }, [filteredRecords]);

  // Check if there are pending changes
  const hasPendingChanges = JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);

  const handleApplyFilters = () => {
    setAppliedFilters(pendingFilters);
  };

  const handleClearFilters = () => {
    setPendingFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const handleAddRecord = (newRecord: Omit<InventoryRecord, "id">) => {
    const record: InventoryRecord = {
      ...newRecord,
      id: Date.now().toString(),
    };
    setRecords((prev) => [record, ...prev]);
    setIsFormOpen(false);
  };

  const handleEditRecord = (updatedRecord: InventoryRecord) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record,
      ),
    );
    setEditingRecord(null);
    setIsFormOpen(false);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const handleApproveRecord = (id: string) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, status: "approved" as const } : record,
      ),
    );
  };

  const handleExportCSV = () => {
    const headers = ["Date", "Category", "Value", "Responsible", "Status"];
    const csvRows = filteredRecords.map((record) =>
      [
        record.date,
        record.category,
        record.value.toString(),
        record.responsible,
        record.status,
      ].join(","),
    );

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `inventory_records_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openEditForm = (record: InventoryRecord) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingRecord(null);
  };

  return (
    <div className="min-h-screen transition-brand bg-gradient-to-br from-background via-background to-muted/20">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header 
        className="sticky top-0 z-10 transition-brand bg-card/95 backdrop-blur-lg border-b border-border/50 elevation-2"
        role="banner"
      >
        <div className="container-responsive py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-shrink-0 min-w-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-brand-gradient flex items-center justify-center elevation-brand">
                  <Box className="h-6 w-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="space-y-0.5">
                  <h1 className="brand-logo text-title-lg truncate">
                    InventoryPro
                  </h1>
                  <p className="text-label-md text-muted-foreground hidden sm:block">
                    Internal Platform
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  onClick={handleExportCSV}
                  variant="outline"
                  className="gap-2 touch-target transition-brand bg-background/50 backdrop-blur-sm hover:bg-background/80 elevation-1 hover:elevation-2 border-border hover:border-primary"
                  aria-label={`Export ${filteredRecords.length} records to CSV`}
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden md:inline">Export</span>
                </Button>
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="gap-2 touch-target transition-brand elevation-2 hover:elevation-brand bg-brand-gradient hover:opacity-90 text-primary-foreground font-medium"
                      onClick={() => setEditingRecord(null)}
                      aria-label="Create new inventory record"
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden md:inline">New Record</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md transition-brand elevation-4 bg-card/95 backdrop-blur-lg border-border/50">
                    <InventoryForm
                      record={editingRecord}
                      onSubmit={editingRecord ? handleEditRecord : handleAddRecord}
                      onCancel={closeForm}
                      categories={categories}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="sm:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="touch-target transition-brand hover:bg-accent/50"
                      aria-label="Open menu"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[280px] sm:w-[400px] bg-card/95 backdrop-blur-lg border-border/50"
                  >
                    <div className="space-y-6 pt-6">
                      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                        <div className="h-8 w-8 rounded-lg bg-brand-gradient flex items-center justify-center">
                          <Box className="h-5 w-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                          <div className="brand-logo text-title-md">InventoryPro</div>
                          <div className="text-label-md text-muted-foreground">Internal Platform</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h2 className="text-title-lg">Actions</h2>
                        <div className="space-y-3">
                          <Button
                            onClick={handleExportCSV}
                            variant="outline"
                            className="w-full gap-2 justify-start touch-target transition-brand"
                            aria-label={`Export ${filteredRecords.length} records to CSV`}
                          >
                            <Download className="h-4 w-4" />
                            Export Records
                          </Button>
                          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                            <DialogTrigger asChild>
                              <Button
                                className="w-full gap-2 justify-start touch-target transition-brand bg-brand-gradient text-primary-foreground"
                                onClick={() => setEditingRecord(null)}
                              >
                                <Plus className="h-4 w-4" />
                                New Record
                              </Button>
                            </DialogTrigger>
                          </Dialog>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h2 className="text-title-lg">Statistics</h2>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="rounded-lg p-3 bg-warning-background border border-warning-border transition-brand">
                            <div className="text-title-md font-medium text-warning">
                              {stats.pending}
                            </div>
                            <div className="text-body-md text-muted-foreground">Pending</div>
                          </div>
                          <div className="rounded-lg p-3 bg-success-background border border-success-border transition-brand">
                            <div className="text-title-md font-medium text-success">
                              {stats.approved}
                            </div>
                            <div className="text-body-md text-muted-foreground">Approved</div>
                          </div>
                          <div className="rounded-lg p-3 bg-info-background border border-info-border transition-brand">
                            <div className="text-title-md font-medium text-info">
                              ${stats.total.toLocaleString("en-US")}
                            </div>
                            <div className="text-body-md text-muted-foreground">Total Value</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="container-responsive py-6 space-y-6"
        role="main"
        aria-label="Inventory management interface"
      >
        <section aria-label="Statistics overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="transition-brand bg-warning-background border-warning-border elevation-1 hover:elevation-2 hover:border-warning-border/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-label-md font-medium uppercase tracking-wide text-warning">
                      Pending
                    </p>
                    <p className="text-headline-md font-semibold text-warning">
                      {stats.pending}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-warning-background/50 border border-warning-border transition-brand">
                    <TrendingUp className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-brand bg-success-background border-success-border elevation-1 hover:elevation-2 hover:border-success-border/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-label-md font-medium uppercase tracking-wide text-success">
                      Approved
                    </p>
                    <p className="text-headline-md font-semibold text-success">
                      {stats.approved}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-success-background/50 border border-success-border transition-brand">
                    <Package className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="transition-brand bg-info-background border-info-border elevation-1 hover:elevation-2 hover:border-info-border/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-label-md font-medium uppercase tracking-wide text-info">
                      Total Value
                    </p>
                    <p className="text-headline-md font-semibold text-info">
                      ${stats.total.toLocaleString("en-US")}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-info-background/50 border border-info-border transition-brand">
                    <DollarSign className="h-6 w-6 text-info" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section aria-label="Filter controls">
          <FilterBar
            pendingFilters={pendingFilters}
            appliedFilters={appliedFilters}
            onPendingFiltersChange={setPendingFilters}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
            hasPendingChanges={hasPendingChanges}
            categories={categories}
          />
        </section>

        <section aria-label="Inventory data">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="brand-accent pl-4">
                <h2 className="text-title-lg text-foreground font-semibold">Inventory Records</h2>
                <p className="text-body-md text-muted-foreground">
                  {filteredRecords.length}{" "}
                  {filteredRecords.length === 1 ? "record found" : "records found"}
                </p>
              </div>
            </div>

            <Card className="overflow-hidden transition-brand elevation-3 bg-card/95 backdrop-blur-sm border-border/50 hover:elevation-4">
              <CardContent className="p-0">
                <InventoryTable
                  records={filteredRecords}
                  onEdit={openEditForm}
                  onDelete={handleDeleteRecord}
                  onApprove={handleApproveRecord}
                />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <div className="fixed bottom-6 right-6 sm:hidden no-print">
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full touch-target transition-brand elevation-4 hover:elevation-brand bg-brand-gradient text-primary-foreground hover:opacity-90"
              onClick={() => setEditingRecord(null)}
              aria-label="Create new inventory record"
            >
              <Plus className="h-6 w-6" aria-hidden="true" />
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
    </div>
  );
}