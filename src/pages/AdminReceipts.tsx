import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Receipt, Eye, X, Heart, CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import futuresLogo from "@/assets/5000-futures-logo.png";

const AdminReceipts = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [donations, setDonations] = useState<any[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<any | null>(null);

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

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
          <Receipt className="w-6 h-6 text-secondary" />
          Donation Receipts
        </h1>
        <p className="font-body text-sm text-muted-foreground">Archive of all donation receipts issued</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donations.map((d, i) => (
          <motion.div
            key={d.id}
            className="bg-card rounded-xl border border-border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedDonation(d)}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-bold text-secondary text-lg">${Number(d.amount).toLocaleString()}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-body font-semibold bg-secondary/10 text-secondary">
                {d.status}
              </span>
            </div>
            <p className="font-body text-sm font-medium text-foreground">{d.donor_name}</p>
            <p className="font-body text-xs text-muted-foreground">{d.donor_email}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="font-body text-[10px] text-muted-foreground">
                {new Date(d.created_at).toLocaleDateString()}
              </span>
              <button className="text-xs text-secondary font-body font-medium flex items-center gap-1 hover:underline">
                <Eye className="w-3 h-3" /> View Receipt
              </button>
            </div>
          </motion.div>
        ))}
        {donations.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Receipt className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-body text-sm text-muted-foreground">No receipts yet.</p>
          </div>
        )}
      </div>

      {/* Receipt Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedDonation(null)}>
          <motion.div
            className="max-w-lg w-full bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-primary text-primary-foreground p-5 text-center relative">
              <button
                onClick={() => setSelectedDonation(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white rounded-lg p-0.5">
                  <img src={futuresLogo} alt="5000 Futures" className="w-full h-full object-contain" />
                </div>
                <div className="w-8 h-8 bg-white rounded-full p-0.5">
                  <img src={logo} alt="Unashamed Charity" className="w-full h-full object-contain" />
                </div>
              </div>
              <h2 className="font-display text-xl font-bold">Donation Receipt</h2>
            </div>
            <div className="flex justify-center -mt-5">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shadow-md">
                <CheckCircle className="w-5 h-5 text-secondary-foreground" />
              </div>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-center font-display font-bold text-foreground">
                {selectedDonation.donor_name}
              </p>
              <div className="bg-background rounded-xl p-4 space-y-2 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="text-foreground font-medium">{new Date(selectedDonation.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground font-medium">{selectedDonation.donor_email}</span>
                </div>
                {selectedDonation.message && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Message</span>
                    <span className="text-foreground font-medium text-right max-w-[200px]">{selectedDonation.message}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="text-muted-foreground font-medium">Amount</span>
                  <span className="font-display text-xl font-bold text-secondary">${Number(selectedDonation.amount).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 text-muted-foreground">
                <Heart className="w-3 h-3 text-destructive" />
                <span className="font-body text-xs italic">Our Kindness, Someone's Hope</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminReceipts;
