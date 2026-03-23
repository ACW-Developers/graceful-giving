import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await supabase.from("site_visitors").insert({
          page: location.pathname,
          visitor_ip: null,
        });
      } catch {
        // silent fail
      }
    };
    trackVisit();
  }, [location.pathname]);
}
