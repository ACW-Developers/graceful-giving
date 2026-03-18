import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Loader2, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import charityEvent from "@/assets/charity-event.jpg";
import futuresLogo from "@/assets/5000-futures-logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error("Invalid credentials. Please try again.");
    } else {
      toast.success("Welcome back, Admin!");
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] flex">
      {/* Left: Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={charityEvent} alt="Charity event" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary/30" />
        <div className="absolute bottom-8 left-8 right-8">
          <h2 className="font-display text-3xl font-bold text-white mb-2">Making a Difference Together</h2>
          <p className="font-body text-white/80 text-sm">5,000 futures. One community at a time.</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center bg-secondary/5 p-4 sm:p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center">
                <img src={futuresLogo} alt="5000 Futures" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground">Admin Login</h1>
                <p className="font-body text-xs text-muted-foreground">Access the management dashboard</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@unashamedcharity.org"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background font-body text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-bold hover:brightness-110 transition-all disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 justify-center text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span className="font-body text-xs">Secured admin access only</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
