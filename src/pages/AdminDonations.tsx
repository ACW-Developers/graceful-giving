import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Search, Hash, DollarSign, TrendingUp, Trash2, Loader2 } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

const COLORS = {
  blue: "#333797",
  green: "#44b752",
  yellow: "#fddf76",
};

const AdminDonations = () => {
  const { isAdmin, loading: authLoading, session } = useAuth();
  const [donations, setDonations] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [flushing, setFlushing] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchDonations = () => {
      supabase
        .from("donations")
        .select("*")
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) setDonations(data);
        });
    };

    fetchDonations();

    const channel = supabase
      .channel("donations-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "donations" }, (payload) => {
        setDonations((prev) => [payload.new as any, ...prev]);
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "donations" }, () => {
        fetchDonations();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [isAdmin]);

  const handleFlush = async () => {
    if (!confirm("Are you sure you want to clear ALL donation records? This cannot be undone.")) return;
    setFlushing(true);
    try {
      const { error } = await supabase.functions.invoke("flush-donations", {
        body: {},
      });
      if (error) throw error;
      setDonations([]);
      toast.success("All donation records cleared successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to flush donations.");
    } finally {
      setFlushing(false);
    }
  };

  if (authLoading) return null;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const filtered = donations.filter(
    (d) =>
      d.donor_name.toLowerCase().includes(search.toLowerCase()) ||
      d.donor_email.toLowerCase().includes(search.toLowerCase())
  );

  const totalAmount = donations.reduce((s, d) => s + Number(d.amount), 0);
  const avgAmount = donations.length > 0 ? Math.round(totalAmount / donations.length) : 0;

  const byDay: Record<string, { count: number; amount: number }> = {};
  donations.forEach((d) => {
    const day = new Date(d.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (!byDay[day]) byDay[day] = { count: 0, amount: 0 };
    byDay[day].count += 1;
    byDay[day].amount += Number(d.amount);
  });
  const chartData = Object.entries(byDay).reverse().map(([day, v]) => ({ day, ...v }));

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Donations</h1>
          <p className="font-body text-sm text-muted-foreground">Real-time donation records and analytics</p>
        </div>
        <button
          onClick={handleFlush}
          disabled={flushing || donations.length === 0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-body text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-50"
        >
          {flushing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Flush All
        </button>
      </motion.div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Total Donations", value: donations.length, icon: Hash, color: COLORS.blue },
          { label: "Total Amount", value: `$${totalAmount.toLocaleString()}`, icon: DollarSign, color: COLORS.green },
          { label: "Avg Donation", value: `$${avgAmount}`, icon: TrendingUp, color: COLORS.yellow },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            className="bg-card rounded-xl p-4 border border-border shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + "18" }}>
                <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
              </div>
              <span className="font-body text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Donation Trend Chart */}
      {chartData.length > 0 && (
        <motion.div className="bg-card rounded-xl p-5 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display text-base font-bold text-foreground mb-3">Donation Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="gradDonation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.green} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke={COLORS.green} strokeWidth={2} fill="url(#gradDonation)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search donors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-border bg-card font-body text-foreground text-sm focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground">Donor</th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground">Email</th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground">Amount</th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-background/50">
                  <td className="px-4 py-3 font-body text-sm text-foreground">{d.donor_name}</td>
                  <td className="px-4 py-3 font-body text-sm text-muted-foreground">{d.donor_email}</td>
                  <td className="px-4 py-3 font-display font-bold" style={{ color: COLORS.green }}>${Number(d.amount).toLocaleString()}</td>
                  <td className="px-4 py-3 font-body text-xs text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-[10px] font-body font-semibold" style={{ backgroundColor: COLORS.green + "18", color: COLORS.green }}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 font-body text-sm text-muted-foreground">No donations found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDonations;
