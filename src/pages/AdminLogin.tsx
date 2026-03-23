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
    <div className="min-h-screen flex bg-background">
      {/* Left: Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img src={charityEvent} alt="Charity event" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/30" />
        <div className="absolute bottom-10 left-10 right-10">
          <h2 className="font-display text-4xl font-bold text-white mb-3">Making a Difference Together</h2>
          <p className="font-body text-white/80 text-base">5,000 futures. One community at a time.</p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-card rounded-2xl shadow-xl border-2 border-border p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-white p-2 flex items-center justify-center shadow-sm border border-border">
                <img src={futuresLogo} alt="5000 Futures" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">Admin Login</h1>
                <p className="font-body text-sm text-muted-foreground">Access the management dashboard</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@unashamedcharity.org"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-foreground mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background font-body text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-body font-bold text-base hover:brightness-110 transition-all disabled:opacity-70 shadow-lg"
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

            <div className="mt-8 pt-5 border-t border-border flex items-center gap-2 justify-center text-muted-foreground">
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
