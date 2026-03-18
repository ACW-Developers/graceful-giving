import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Outlet, Navigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import DashboardFooter from "@/components/DashboardFooter";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const AdminLayout = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-surface">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-4 border-b border-border bg-background px-4 sticky top-0 z-20">
            <SidebarTrigger />
            <div className="flex-1" />
            <ThemeToggle />
            <span className="font-body text-xs text-muted-foreground hidden sm:inline">Admin Panel</span>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
          <DashboardFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
