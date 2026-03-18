import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminActivity = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => data && setLogs(data));
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Activity Logs</h1>
        <p className="font-body text-sm text-muted-foreground">Recent platform activity</p>
      </motion.div>

      <div className="bg-card rounded-xl border border-border shadow-sm p-5 md:p-6">
        {logs.length === 0 ? (
          <div className="text-center py-12">
            <Activity className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="font-body text-sm text-muted-foreground">No activity recorded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log: any) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface hover:bg-muted/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-medium text-foreground">{log.action}</p>
                  {log.description && (
                    <p className="font-body text-xs text-muted-foreground mt-0.5">{log.description}</p>
                  )}
                </div>
                <span className="font-body text-[10px] text-muted-foreground/60 shrink-0">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActivity;
