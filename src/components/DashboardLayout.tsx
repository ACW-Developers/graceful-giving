import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-surface">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-4 border-b border-border bg-background px-4 sticky top-0 z-20">
            <SidebarTrigger />
            <div className="flex-1" />
            <a
              href="/donate"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-body text-sm font-semibold hover:brightness-110 transition-all shadow-sm"
            >
              <span className="hidden sm:inline">Donate Now</span>
              <span className="sm:hidden">💚</span>
            </a>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
