import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Download, Search } from "lucide-react";

const AdminDonations = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [donations, setDonations] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setDonations(data);
      });
  }, [isAdmin]);

  if (authLoading) return null;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const filtered = donations.filter(
    (d) =>
      d.donor_name.toLowerCase().includes(search.toLowerCase()) ||
      d.donor_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Donations</h1>
        <p className="font-body text-sm text-muted-foreground">All donation records</p>
      </motion.div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search donors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-border bg-card font-body text-foreground text-sm focus:border-secondary focus:outline-none transition-colors"
          />
        </div>
      </div>

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
                  <td className="px-4 py-3 font-display font-bold text-secondary">${Number(d.amount).toLocaleString()}</td>
                  <td className="px-4 py-3 font-body text-xs text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-[10px] font-body font-semibold bg-secondary/10 text-secondary">
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
