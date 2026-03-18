import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, Globe, Clock } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts";

const weeklyData = [
  { name: "Mon", visitors: 45, donations: 3 }, { name: "Tue", visitors: 62, donations: 5 },
  { name: "Wed", visitors: 38, donations: 2 }, { name: "Thu", visitors: 55, donations: 4 },
  { name: "Fri", visitors: 71, donations: 6 }, { name: "Sat", visitors: 89, donations: 8 },
  { name: "Sun", visitors: 64, donations: 4 },
];

const monthlyData = [
  { name: "Jan", visitors: 1200 }, { name: "Feb", visitors: 1450 },
  { name: "Mar", visitors: 1800 }, { name: "Apr", visitors: 2100 },
  { name: "May", visitors: 2400 }, { name: "Jun", visitors: 2800 },
];

const stats = [
  { label: "Total Visitors", value: "12,847", icon: Eye, color: "bg-primary/10 text-primary" },
  { label: "Unique Visitors", value: "8,234", icon: Users, color: "bg-secondary/10 text-secondary" },
  { label: "Avg Session", value: "3m 42s", icon: Clock, color: "bg-accent/20 text-accent-foreground" },
  { label: "Countries", value: "24", icon: Globe, color: "bg-primary/10 text-primary" },
];

const AdminStats = () => (
  <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Statistics</h1>
      <p className="font-body text-sm text-muted-foreground">Platform analytics & insights</p>
    </motion.div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} className="bg-card rounded-xl p-4 md:p-5 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
          <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
            <s.icon className="w-4 h-4" />
          </div>
          <div className="font-display text-xl md:text-2xl font-bold text-foreground">{s.value}</div>
          <p className="font-body text-[11px] text-muted-foreground mt-1">{s.label}</p>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <motion.div className="bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2 className="font-display text-base font-bold text-foreground mb-4">Weekly Visitors & Donations</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyData}>
            <defs>
              <linearGradient id="gradV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145,63%,32%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(145,63%,32%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
            <Tooltip />
            <Area type="monotone" dataKey="visitors" stroke="hsl(145,63%,32%)" fill="url(#gradV)" strokeWidth={2} />
            <Area type="monotone" dataKey="donations" stroke="hsl(234,55%,30%)" fill="transparent" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div className="bg-card rounded-xl p-5 md:p-6 border border-border shadow-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2 className="font-display text-base font-bold text-foreground mb-4">Monthly Growth</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,32%,91%)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
            <YAxis tick={{ fontSize: 11 }} stroke="hsl(215,16%,47%)" />
            <Tooltip />
            <Line type="monotone" dataKey="visitors" stroke="hsl(43,96%,56%)" strokeWidth={2} dot={{ fill: "hsl(43,96%,56%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  </div>
);

export default AdminStats;
