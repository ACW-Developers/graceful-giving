import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign } from "lucide-react";

const AdminDonations = () => {
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => data && setDonations(data));
  }, []);

  const total = donations.reduce((acc, d) => acc + Number(d.amount), 0);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Donations</h1>
        <p className="font-body text-sm text-muted-foreground">All donation records</p>
      </motion.div>

      <div className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border shadow-sm">
        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <p className="font-display text-xl font-bold text-foreground">${total.toLocaleString()}</p>
          <p className="font-body text-xs text-muted-foreground">{donations.length} donations total</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-left font-body text-xs font-medium text-muted-foreground p-3">Donor</th>
                <th className="text-left font-body text-xs font-medium text-muted-foreground p-3">Email</th>
                <th className="text-right font-body text-xs font-medium text-muted-foreground p-3">Amount</th>
                <th className="text-left font-body text-xs font-medium text-muted-foreground p-3 hidden md:table-cell">Message</th>
                <th className="text-left font-body text-xs font-medium text-muted-foreground p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 font-body text-sm text-muted-foreground">No donations yet</td></tr>
              ) : donations.map((d: any) => (
                <tr key={d.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                  <td className="p-3 font-body text-sm text-foreground">{d.donor_name}</td>
                  <td className="p-3 font-body text-sm text-muted-foreground">{d.donor_email}</td>
                  <td className="p-3 font-display text-sm font-bold text-secondary text-right">${d.amount}</td>
                  <td className="p-3 font-body text-xs text-muted-foreground hidden md:table-cell truncate max-w-[200px]">{d.message || "—"}</td>
                  <td className="p-3 font-body text-xs text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDonations;
