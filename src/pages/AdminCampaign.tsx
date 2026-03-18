import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

const AdminCampaign = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [goalAmount, setGoalAmount] = useState(20000);
  const [raisedAmount, setRaisedAmount] = useState(4250);
  const [donorsCount, setDonorsCount] = useState(127);
  const [daysLeft, setDaysLeft] = useState(42);
  const [campaignId, setCampaignId] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from("campaign_settings")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setCampaignId(data.id);
          setGoalAmount(data.goal_amount);
          setRaisedAmount(data.raised_amount);
          setDonorsCount(data.donors_count);
          setDaysLeft(data.days_left);
        }
      });
  }, [isAdmin]);

  if (authLoading) return null;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("campaign_settings")
      .update({
        goal_amount: goalAmount,
        raised_amount: raisedAmount,
        donors_count: donorsCount,
        days_left: daysLeft,
        updated_at: new Date().toISOString(),
      })
      .eq("id", campaignId);

    if (error) {
      toast.error("Failed to save. " + error.message);
    } else {
      toast.success("Campaign settings saved! Changes are now live.");
      // Log activity
      await supabase.from("activity_logs").insert({
        action: "Campaign Updated",
        description: `Goal: $${goalAmount}, Raised: $${raisedAmount}, Donors: ${donorsCount}, Days Left: ${daysLeft}`,
      });
    }
    setSaving(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">Campaign Settings</h1>
        <p className="font-body text-sm text-muted-foreground">Update campaign progress — changes reflect on the public dashboard instantly.</p>
      </motion.div>

      <motion.div
        className="bg-card rounded-xl p-6 sm:p-8 border border-border shadow-sm space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1.5">Goal Amount ($)</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-foreground focus:border-secondary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1.5">Amount Raised ($)</label>
            <input
              type="number"
              value={raisedAmount}
              onChange={(e) => setRaisedAmount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-foreground focus:border-secondary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1.5">Donors Count</label>
            <input
              type="number"
              value={donorsCount}
              onChange={(e) => setDonorsCount(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-foreground focus:border-secondary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-body text-sm font-medium text-foreground mb-1.5">Days Left</label>
            <input
              type="number"
              value={daysLeft}
              onChange={(e) => setDaysLeft(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-foreground focus:border-secondary focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-secondary text-secondary-foreground font-body font-bold hover:brightness-110 transition-all disabled:opacity-70"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </motion.div>
    </div>
  );
};

export default AdminCampaign;
