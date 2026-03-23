import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { usePageTracker } from "@/hooks/usePageTracker";
import { Link } from "react-router-dom";
import { LogIn, LogOut, Heart } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout = () => {
  const { isAdmin, user, signOut } = useAuth();
  const isMobile = useIsMobile();
  usePageTracker();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-2 sm:gap-4 border-b border-border bg-card px-3 sm:px-4 sticky top-0 z-20">
            <SidebarTrigger />
            <div className="flex-1" />
            <ThemeToggle />
            {user ? (
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground font-body text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground font-body text-sm transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-body text-sm font-semibold hover:brightness-110 transition-all shadow-sm"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Donate Now</span>
            </Link>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
          <footer className="border-t border-border bg-card px-4 py-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-body text-muted-foreground">
              <span>© {new Date().getFullYear()} Unashamed Charity Organization. All rights reserved.</span>
              <span className="italic">Our Kindness, Someone's Hope</span>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
