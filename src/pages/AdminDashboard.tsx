import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useCampaignSettings } from "@/hooks/useCampaignSettings";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { DollarSign, Users, Eye, Activity, TrendingUp, Hash, RefreshCw } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
} from "recharts";

const COLORS = {
  blue: "#333797",
  green: "#44b752",
  yellow: "#fddf76",
  muted: "#e2e8f0",
};

const AdminDashboard = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const { campaign, refetch: refetchCampaign } = useCampaignSettings();
  const [donationCount, setDonationCount] = useState(0);
  const [totalDonated, setTotalDonated] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [donationsByDay, setDonationsByDay] = useState<any[]>([]);
  const [visitorsByDay, setVisitorsByDay] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    const [donationsRes, visitorsRes, logsRes, allDonations, allVisitors] = await Promise.all([
      supabase.from("donations").select("*").order("created_at", { ascending: false }).limit(10),
      supabase.from("site_visitors").select("id", { count: "exact" }),
      supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(8),
      supabase.from("donations").select("amount, created_at").order("created_at", { ascending: true }),
      supabase.from("site_visitors").select("created_at").order("created_at", { ascending: true }),
    ]);

    if (donationsRes.data) setRecentDonations(donationsRes.data);

    if (allDonations.data) {
      setDonationCount(allDonations.data.length);
      setTotalDonated(allDonations.data.reduce((s, d) => s + Number(d.amount), 0));
      const byDay: Record<string, number> = {};
      allDonations.data.forEach((d) => {
        const day = new Date(d.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        byDay[day] = (byDay[day] || 0) + Number(d.amount);
      });
      setDonationsByDay(Object.entries(byDay).map(([day, amount]) => ({ day, amount })));
    }

    setVisitorCount(visitorsRes.count ?? 0);

    if (allVisitors.data) {
      const vByDay: Record<string, number> = {};
      allVisitors.data.forEach((v) => {
        const day = new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        vByDay[day] = (vByDay[day] || 0) + 1;
      });
      setVisitorsByDay(Object.entries(vByDay).map(([day, count]) => ({ day, count })));
    }

    if (logsRes.data) setRecentLogs(logsRes.data);
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchData();

    const channel = supabase
      .channel("admin-donations")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "donations" }, (payload) => {
        setRecentDonations((prev) => [payload.new as any, ...prev].slice(0, 10));
        setDonationCount((c) => c + 1);
        setTotalDonated((t) => t + Number((payload.new as any).amount));
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchData(), refetchCampaign()]);
    setTimeout(() => setRefreshing(false), 600);
  };

  if (authLoading) return null;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const percentage = campaign.goal_amount > 0
    ? Math.round((campaign.raised_amount / campaign.goal_amount) * 100)
    : 0;

  const stats = [
    { label: "Total Raised", value: `$${campaign.raised_amount.toLocaleString()}`, icon: DollarSign, color: COLORS.green },
    { label: "Total Donors", value: campaign.donors_count.toString(), icon: Users, color: COLORS.blue },
    { label: "Donations", value: donationCount.toString(), icon: Hash, color: COLORS.yellow },
    { label: "Site Visitors", value: visitorCount.toString(), icon: Eye, color: COLORS.blue },
    { label: "Progress", value: `${percentage}%`, icon: TrendingUp, color: COLORS.green },
  ];

  const pieData = [
    { name: "Raised", value: campaign.raised_amount },
    { name: "Remaining", value: Math.max(0, campaign.goal_amount - campaign.raised_amount) },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Admin Overview</h1>
          <p className="font-body text-sm text-muted-foreground">Real-time campaign analytics</p>
        </div>
        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border font-body text-sm text-foreground hover:bg-muted transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card rounded-xl p-4 sm:p-5 border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + "18" }}>
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
              </div>
            </div>
            <div className="font-display text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
            <span className="font-body text-[10px] text-muted-foreground">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Donations Over Time */}
        <motion.div className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Donations Over Time</h2>
          {donationsByDay.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={donationsByDay}>
                <defs>
                  <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.green} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                <Area type="monotone" dataKey="amount" stroke={COLORS.green} strokeWidth={2.5} fill="url(#gradGreen)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[250px] flex items-center justify-center">
              <p className="font-body text-sm text-muted-foreground">No donation data yet</p>
            </div>
          )}
        </motion.div>

        {/* Campaign Progress Donut */}
        <motion.div className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Campaign Progress</h2>
          <div className="flex items-center gap-6">
            <div className="w-44 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value" strokeWidth={0}>
                    <Cell fill={COLORS.green} />
                    <Cell fill={COLORS.muted} />
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.green }} />
                <span className="font-body text-sm text-foreground">Raised: <strong>${campaign.raised_amount.toLocaleString()}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS.muted }} />
                <span className="font-body text-sm text-foreground">Remaining: <strong>${Math.max(0, campaign.goal_amount - campaign.raised_amount).toLocaleString()}</strong></span>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="font-display text-2xl font-bold" style={{ color: COLORS.green }}>{percentage}%</p>
                <p className="font-body text-xs text-muted-foreground">of ${campaign.goal_amount.toLocaleString()} goal</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Visitor Traffic */}
      <motion.div className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="font-display text-lg font-bold text-foreground mb-4">Site Visitors Traffic</h2>
        {visitorsByDay.length > 0 ? (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visitorsByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke={COLORS.blue} strokeWidth={2.5} dot={{ r: 3, fill: COLORS.blue }} activeDot={{ r: 5, fill: COLORS.yellow }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[200px] flex items-center justify-center">
            <p className="font-body text-sm text-muted-foreground">No visitor data yet</p>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Donations */}
        <motion.div className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Recent Donations</h2>
          {recentDonations.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-body text-sm text-muted-foreground">No donations yet. Waiting for first donation...</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentDonations.map((d) => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{d.donor_name}</p>
                    <p className="font-body text-xs text-muted-foreground">{d.donor_email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold" style={{ color: COLORS.green }}>${Number(d.amount).toLocaleString()}</p>
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
        <motion.div className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <h2 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-muted-foreground" />
            Activity Logs
          </h2>
          {recentLogs.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-body text-sm text-muted-foreground">No activity recorded yet.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg bg-background border border-border">
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
