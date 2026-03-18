import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, Eye, Activity, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["hsl(145,63%,32%)", "hsl(234,55%,30%)", "hsl(43,96%,56%)", "hsl(0,84%,60%)"];

const mockTraffic = [
  { name: "Mon", visitors: 45 }, { name: "Tue", visitors: 62 },
  { name: "Wed", visitors: 38 }, { name: "Thu", visitors: 55 },
  { name: "Fri", visitors: 71 }, { name: "Sat", visitors: 89 },
  { name: "Sun", visitors: 64 },
];

const mockDonationTrend = [
  { name: "Week 1", amount: 850 }, { name: "Week 2", amount: 1200 },
  { name: "Week 3", amount: 980 }, { name: "Week 4", amount: 1420 },
  { name: "Week 5", amount: 1650 }, { name: "Week 6", amount: 1100 },
];

const mockPageViews = [
  { name: "Dashboard", value: 340 }, { name: "Donate", value: 280 },
  { name: "Mission", value: 150 }, { name: "Impact", value: 120 },
];

interface CampaignSettings {
  id: string;
  goal_amount: number;
  raised_amount: number;
  donors_count: number;
  days_left: number;
}

const AdminDashboard = () => {
  const [campaign, setCampaign] = useState<CampaignSettings | null>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [editingCampaign, setEditingCampaign] = useState(false);
  const [campaignForm, setCampaignForm] = useState({ goal_amount: 0, raised_amount: 0, donors_count: 0, days_left: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [campaignRes, donationsRes, logsRes] = await Promise.all([
      supabase.from("campaign_settings").select("*").limit(1).single(),
      supabase.from("donations").select("*").order("created_at", { ascending: false }).limit(20),
      supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(10),
    ]);
    if (campaignRes.data) {
      setCampaign(campaignRes.data as CampaignSettings);
      setCampaignForm({
        goal_amount: campaignRes.data.goal_amount,
        raised_amount: campaignRes.data.raised_amount,
        donors_count: campaignRes.data.donors_count,
        days_left: campaignRes.data.days_left,
      });
    }
    if (donationsRes.data) setDonations(donationsRes.data);
    if (logsRes.data) setActivityLogs(logsRes.data);
  };

  const updateCampaign = async () => {
    if (!campaign) return;
    await supabase
      .from("campaign_settings")
      .update({ ...campaignForm, updated_at: new Date().toISOString() })
      .eq("id", campaign.id);
    setEditingCampaign(false);
    fetchData();
  };

  const progress = campaign ? (campaign.raised_amount / campaign.goal_amount) * 100 : 0;

  const statCards = [
    { label: "Total Raised", value: `$${campaign?.raised_amount?.toLocaleString() ?? "0"}`, icon: DollarSign, change: "+12%", up: true, color: "bg-secondary/10 text-secondary" },
    { label: "Total Donors", value: campaign?.donors_count ?? 0, icon: Users, change: "+8%", up: true, color: "bg-primary/10 text-primary" },
    { label: "Page Views", value: "1,247", icon: Eye, change: "+23%", up: true, color: "bg-accent/20 text-accent-foreground" },
    { label: "Conversion Rate", value: "4.2%", icon: Activity, change: "-0.3%", up: false, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="font-body text-sm text-muted-foreground">Platform analytics & management</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            className="bg-card rounded-xl p-4 md:p-5 border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center`}>
                <s.icon className="w-4 h-4" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-body font-medium ${s.up ? "text-secondary" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.change}
              </span>
            </div>
            <div className="font-display text-xl md:text-2xl font-bold text-foreground">{s.value}</div>
            <p className="font-body text-[11px] text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Visitor Traffic */}
        <motion.div className="bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="font-display text-base font-bold text-foreground mb-4">Visitor Traffic</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockTraffic}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145,63%,32%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145,63%,32%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
              <Tooltip />
              <Area type="monotone" dataKey="visitors" stroke="hsl(145,63%,32%)" fillOpacity={1} fill="url(#colorVisitors)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Donation Trend */}
        <motion.div className="bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="font-display text-base font-bold text-foreground mb-4">Donation Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockDonationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
              <Tooltip />
              <Bar dataKey="amount" fill="hsl(234,55%,30%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Campaign Progress + Page Views */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Campaign Settings */}
        <motion.div className="lg:col-span-2 bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base font-bold text-foreground">Campaign Progress</h2>
            <button
              onClick={() => editingCampaign ? updateCampaign() : setEditingCampaign(true)}
              className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-body text-xs font-medium hover:brightness-110 transition-all"
            >
              {editingCampaign ? "Save Changes" : "Edit Campaign"}
            </button>
          </div>

          {editingCampaign ? (
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Goal Amount ($)", key: "goal_amount" as const },
                { label: "Raised Amount ($)", key: "raised_amount" as const },
                { label: "Donors Count", key: "donors_count" as const },
                { label: "Days Left", key: "days_left" as const },
              ].map((f) => (
                <div key={f.key}>
                  <label className="font-body text-xs text-muted-foreground mb-1 block">{f.label}</label>
                  <input
                    type="number"
                    value={campaignForm[f.key]}
                    onChange={(e) => setCampaignForm({ ...campaignForm, [f.key]: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-body text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold text-foreground">
                    ${campaign?.raised_amount?.toLocaleString()} / ${campaign?.goal_amount?.toLocaleString()}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary/70"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
                <p className="font-body text-xs text-muted-foreground mt-1">{progress.toFixed(1)}% of goal reached</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-surface">
                  <div className="font-display text-lg font-bold text-foreground">{campaign?.donors_count}</div>
                  <p className="font-body text-[10px] text-muted-foreground">Donors</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface">
                  <div className="font-display text-lg font-bold text-foreground">${campaign ? Math.round(campaign.raised_amount / Math.max(campaign.donors_count, 1)) : 0}</div>
                  <p className="font-body text-[10px] text-muted-foreground">Avg Donation</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface">
                  <div className="font-display text-lg font-bold text-foreground">{campaign?.days_left}</div>
                  <p className="font-body text-[10px] text-muted-foreground">Days Left</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Page Views Pie */}
        <motion.div className="bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <h2 className="font-display text-base font-bold text-foreground mb-4">Page Views</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={mockPageViews} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                {mockPageViews.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {mockPageViews.map((p, i) => (
              <div key={p.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="font-body text-[10px] text-muted-foreground">{p.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Donations Table + Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Donations */}
        <motion.div className="bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h2 className="font-display text-base font-bold text-foreground mb-4">Recent Donations</h2>
          {donations.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground text-center py-8">No donations yet</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-auto">
              {donations.map((d: any) => (
                <div key={d.id} className="flex items-center justify-between p-3 rounded-lg bg-surface">
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{d.donor_name}</p>
                    <p className="font-body text-[10px] text-muted-foreground">{d.donor_email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-sm font-bold text-secondary">${d.amount}</p>
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
        <motion.div className="bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <h2 className="font-display text-base font-bold text-foreground mb-4">Activity Log</h2>
          {activityLogs.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground text-center py-8">No activity recorded yet</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-auto">
              {activityLogs.map((log: any) => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0" />
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{log.action}</p>
                    <p className="font-body text-[10px] text-muted-foreground">{log.description}</p>
                    <p className="font-body text-[10px] text-muted-foreground/60 mt-0.5">
                      {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
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
