import {
  LayoutDashboard, DollarSign, Users, Activity, UserCircle, LogOut, BarChart3,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import futuresLogo from "@/assets/5000-futures-logo.png";

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Donations", url: "/admin/donations", icon: DollarSign },
  { title: "Statistics", url: "/admin/stats", icon: BarChart3 },
  { title: "Activity Logs", url: "/admin/activity", icon: Activity },
  { title: "Profile", url: "/admin/profile", icon: UserCircle },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1">
            <img src={futuresLogo} alt="5000 Futures" className="w-full h-full object-contain" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-display text-sm font-bold text-sidebar-foreground truncate">Admin Portal</span>
              <span className="text-[10px] text-sidebar-foreground/60 font-body truncate">5,000 Futures</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-primary/20 text-sidebar-primary font-semibold">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 font-body text-sm transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
