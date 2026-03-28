import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface CampaignData {
  id: string;
  goal_amount: number;
  raised_amount: number;
  donors_count: number;
  days_left: number;
}

const defaultCampaign: CampaignData = {
  id: "",
  goal_amount: 20000,
  raised_amount: 0,
  donors_count: 0,
  days_left: 42,
};

export function useCampaignSettings() {
  const [campaign, setCampaign] = useState<CampaignData>(defaultCampaign);
  const [loading, setLoading] = useState(true);

  const fetchCampaign = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("campaign_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (data && !error) {
      setCampaign(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCampaign();

    // Realtime: auto-update when campaign_settings changes
    const channel = supabase
      .channel("campaign-settings-realtime")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "campaign_settings" }, (payload) => {
        setCampaign(payload.new as CampaignData);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchCampaign]);

  return { campaign, loading, refetch: fetchCampaign };
}
