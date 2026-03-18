import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useCampaignSettings } from "@/hooks/useCampaignSettings";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { DollarSign, Users, Eye, Activity, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { campaign } = useCampaignSettings();
  const [donationCount, setDonationCount] = useState(0);
  const [totalDonated, setTotalDonated] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchData = async () => {
      const [donations, visitors, logs] = await Promise.all([
        supabase.from("donations").select("*").order("created_at", { ascending: false }).limit(10),
        supabase.from("site_visitors").select("id", { count: "exact" }),
        supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(8),
      ]);
      if (donations.data) {
        setRecentDonations(donations.data);
        setDonationCount(donations.data.length);
        setTotalDonated(donations.data.reduce((s, d) => s + Number(d.amount), 0));
      }
      setVisitorCount(visitors.count ?? 0);
      if (logs.data) setRecentLogs(logs.data);
    };
    fetchData();
  }, [isAdmin]);

  if (authLoading) return null;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const percentage = campaign.goal_amount > 0
    ? Math.round((campaign.raised_amount / campaign.goal_amount) * 100)
    : 0;

  const stats = [
    { label: "Total Raised", value: `$${campaign.raised_amount.toLocaleString()}`, icon: DollarSign, color: "text-secondary" },
    { label: "Total Donors", value: campaign.donors_count.toString(), icon: Users, color: "text-primary" },
    { label: "Site Visitors", value: visitorCount.toString(), icon: Eye, color: "text-accent-foreground" },
    { label: "Campaign Progress", value: `${percentage}%`, icon: TrendingUp, color: "text-secondary" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Admin Overview</h1>
        <p className="font-body text-sm text-muted-foreground">Real-time campaign analytics and management</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card rounded-xl p-4 sm:p-5 border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="font-body text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="font-display text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Donations */}
        <motion.div
          className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Recent Donations</h2>
          {recentDonations.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground">No donations yet.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentDonations.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-background">
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{d.donor_name}</p>
                    <p className="font-body text-xs text-muted-foreground">{d.donor_email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-secondary">${Number(d.amount).toLocaleString()}</p>
                    <p className="font-body text-[10px] text-muted-foreground">
                      {new Date(d.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Activity Logs */}
        <motion.div
          className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-muted-foreground" />
            Activity Logs
          </h2>
          {recentLogs.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground">No activity recorded yet.</p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg bg-background">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm font-medium text-foreground">{log.action}</span>
                    <span className="font-body text-[10px] text-muted-foreground">
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                  {log.description && (
                    <p className="font-body text-xs text-muted-foreground mt-1">{log.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
