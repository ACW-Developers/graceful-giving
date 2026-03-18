import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import DashboardLayout from "./components/DashboardLayout";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import DonatePage from "./pages/DonatePage";
import MissionPage from "./pages/MissionPage";
import ImpactPage from "./pages/ImpactPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DonationSuccess from "./pages/DonationSuccess";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminStats from "./pages/admin/AdminStats";
import AdminActivity from "./pages/admin/AdminActivity";
import AdminProfile from "./pages/admin/AdminProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/donations" element={<AdminDonations />} />
              <Route path="/admin/stats" element={<AdminStats />} />
              <Route path="/admin/activity" element={<AdminActivity />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
            </Route>
            <Route path="/donation-success" element={<DonationSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
