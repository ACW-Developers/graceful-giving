import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DonatePage from "./pages/DonatePage";
import MissionPage from "./pages/MissionPage";
import ImpactPage from "./pages/ImpactPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDonations from "./pages/AdminDonations";
import AdminCampaign from "./pages/AdminCampaign";
import AdminActivity from "./pages/AdminActivity";
import AdminReceipts from "./pages/AdminReceipts";
import DonationSuccess from "./pages/DonationSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin login is standalone - no sidebar/navbar */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<DashboardLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/mission" element={<MissionPage />} />
                <Route path="/impact" element={<ImpactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/donations" element={<AdminDonations />} />
                <Route path="/admin/campaign" element={<AdminCampaign />} />
                <Route path="/admin/activity" element={<AdminActivity />} />
                <Route path="/admin/receipts" element={<AdminReceipts />} />
              </Route>
              <Route path="/donation-success" element={<DonationSuccess />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
