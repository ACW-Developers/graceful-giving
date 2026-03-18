import { useState, useEffect } from "react";
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
  raised_amount: 4250,
  donors_count: 127,
  days_left: 42,
};

export function useCampaignSettings() {
  const [campaign, setCampaign] = useState<CampaignData>(defaultCampaign);
  const [loading, setLoading] = useState(true);

  const fetchCampaign = async () => {
    const { data, error } = await supabase
      .from("campaign_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (data && !error) {
      setCampaign(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCampaign();
  }, []);

  return { campaign, loading, refetch: fetchCampaign };
}
