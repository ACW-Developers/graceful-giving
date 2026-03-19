import { Heart, Target, Sparkles, Info, LayoutDashboard, Mail, Shield, BarChart3, Settings, Activity, Receipt } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import futuresLogo from "@/assets/5000-futures-logo.png";
import logo from "@/assets/logo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";

const publicItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Donate", url: "/donate", icon: Heart },
  { title: "Our Mission", url: "/mission", icon: Target },
  { title: "Our Impact", url: "/impact", icon: Sparkles },
  { title: "About Us", url: "/about", icon: Info },
  { title: "Contact", url: "/contact", icon: Mail },
];

const adminItems = [
  { title: "Admin Overview", url: "/admin", icon: Shield },
  { title: "Donations", url: "/admin/donations", icon: BarChart3 },
  { title: "Campaign Settings", url: "/admin/campaign", icon: Settings },
  { title: "Activity Logs", url: "/admin/activity", icon: Activity },
  { title: "Receipts", url: "/admin/receipts", icon: Receipt },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { isAdmin } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/90 flex items-center justify-center flex-shrink-0 p-1">
            <img
              src={futuresLogo}
              alt="5000 Futures"
              className="w-full h-full object-contain"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-display text-sm font-bold text-sidebar-foreground truncate">
                5,000 Futures
              </span>
              <span className="text-[10px] text-sidebar-foreground/60 font-body truncate">
                Refugee Empowerment
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publicItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-primary/20 text-sidebar-primary font-semibold"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {adminItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                        tooltip={item.title}
                      >
                        <NavLink
                          to={item.url}
                          end
                          className="hover:bg-sidebar-accent/50"
                          activeClassName="bg-sidebar-primary/20 text-sidebar-primary font-semibold"
                        >
                          <item.icon className="h-4 w-4" />
                          {!collapsed && <span>{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center flex-shrink-0 p-0.5">
            <img
              src={logo}
              alt="Unashamed Charity"
              className="w-full h-full rounded-full object-contain"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-body font-medium text-sidebar-foreground/80 truncate">
                Unashamed Charity
              </span>
              <span className="text-[10px] text-sidebar-foreground/50 font-body italic truncate">
                Our Kindness, Someone's Hope
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
