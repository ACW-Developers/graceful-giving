import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Activity } from "lucide-react";

const AdminActivity = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) return;
    supabase
      .from("activity_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        if (data) setLogs(data);
      });
  }, [isAdmin]);

  if (authLoading) return null;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
          <Activity className="w-7 h-7" />
          Activity Logs
        </h1>
        <p className="font-body text-sm text-muted-foreground">Track all admin actions and system events</p>
      </motion.div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {logs.length === 0 ? (
          <p className="p-8 text-center font-body text-sm text-muted-foreground">No activity recorded yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                className="p-4 flex items-start gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
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
      </div>
    </div>
  );
};

export default AdminActivity;
