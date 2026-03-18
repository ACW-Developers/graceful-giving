import { motion } from "framer-motion";
import { User, Mail, ShieldCheck, Calendar } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Profile</h1>
        <p className="font-body text-sm text-muted-foreground">Admin account details</p>
      </motion.div>

      <motion.div
        className="bg-card rounded-xl p-6 md:p-8 border border-border shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-foreground">Administrator</h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs font-body font-medium">
              <ShieldCheck className="w-3 h-3" /> Admin
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-surface">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-body text-xs text-muted-foreground">Email</p>
              <p className="font-body text-sm font-medium text-foreground">{user?.email ?? "—"}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-surface">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-body text-xs text-muted-foreground">Account Created</p>
              <p className="font-body text-sm font-medium text-foreground">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
