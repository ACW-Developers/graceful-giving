import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Activity, Eye, MousePointerClick } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";

const COLORS = {
  blue: "#333797",
  green: "#44b752",
  yellow: "#fddf76",
};

const AdminActivity = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [visitorsByDay, setVisitorsByDay] = useState<any[]>([]);
  const [pageStats, setPageStats] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) return;

    // Fetch activity logs
    supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (data) setLogs(data);
      });

    // Fetch all visitors
    supabase
      .from("site_visitors")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setVisitors(data);

          // Group by day
          const byDay: Record<string, number> = {};
          data.forEach((v) => {
            const day = new Date(v.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
            byDay[day] = (byDay[day] || 0) + 1;
          });
          setVisitorsByDay(Object.entries(byDay).map(([day, count]) => ({ day, count })));

          // Group by page
          const byPage: Record<string, number> = {};
          data.forEach((v) => {
            byPage[v.page] = (byPage[v.page] || 0) + 1;
          });
          const sorted = Object.entries(byPage)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 8)
            .map(([page, count]) => ({ page: page === "/" ? "Home" : page.replace(/^\//, ""), count }));
          setPageStats(sorted);
        }
      });
  }, [isAdmin]);

  if (authLoading) return null;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
          <Activity className="w-7 h-7" />
          Activity & Traffic
        </h1>
        <p className="font-body text-sm text-muted-foreground">Site visits, page views, and admin actions</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <motion.div className="bg-card rounded-xl p-4 border border-border shadow-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4" style={{ color: COLORS.blue }} />
            <span className="font-body text-xs text-muted-foreground">Total Page Views</span>
          </div>
          <div className="font-display text-xl font-bold text-foreground">{visitors.length}</div>
        </motion.div>
        <motion.div className="bg-card rounded-xl p-4 border border-border shadow-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="flex items-center gap-2 mb-1">
            <MousePointerClick className="w-4 h-4" style={{ color: COLORS.green }} />
            <span className="font-body text-xs text-muted-foreground">Pages Tracked</span>
          </div>
          <div className="font-display text-xl font-bold text-foreground">{pageStats.length}</div>
        </motion.div>
        <motion.div className="bg-card rounded-xl p-4 border border-border shadow-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4" style={{ color: COLORS.yellow }} />
            <span className="font-body text-xs text-muted-foreground">Admin Actions</span>
          </div>
          <div className="font-display text-xl font-bold text-foreground">{logs.length}</div>
        </motion.div>
      </div>

      {/* Traffic Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div className="bg-card rounded-xl p-5 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2 className="font-display text-base font-bold text-foreground mb-3">Visitor Traffic Over Time</h2>
          {visitorsByDay.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={visitorsByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke={COLORS.blue} strokeWidth={2.5} dot={{ r: 3, fill: COLORS.blue }} activeDot={{ r: 5, fill: COLORS.yellow }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center">
              <p className="font-body text-sm text-muted-foreground">No visitor data yet</p>
            </div>
          )}
        </motion.div>

        <motion.div className="bg-card rounded-xl p-5 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="font-display text-base font-bold text-foreground mb-3">Top Pages</h2>
          {pageStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={pageStats} layout="vertical" barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="page" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {pageStats.map((_, idx) => (
                    <Cell key={idx} fill={[COLORS.blue, COLORS.green, COLORS.yellow][idx % 3]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center">
              <p className="font-body text-sm text-muted-foreground">No page data yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Activity Logs */}
      <motion.div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="p-4 border-b border-border">
          <h2 className="font-display text-base font-bold text-foreground">System Activity Log</h2>
        </div>
        {logs.length === 0 ? (
          <p className="p-8 text-center font-body text-sm text-muted-foreground">No activity recorded yet.</p>
        ) : (
          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                className="p-4 flex items-start gap-4 hover:bg-background/50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
              >
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: COLORS.green }} />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-foreground">{log.action}</p>
                  {log.description && (
                    <p className="font-body text-xs text-muted-foreground mt-0.5">{log.description}</p>
                  )}
                </div>
                <span className="font-body text-xs text-muted-foreground shrink-0">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminActivity;
