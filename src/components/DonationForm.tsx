import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import futuresLogo from "@/assets/5000-futures-logo.png";

const tiers = [
  { amount: 25, label: "$25", impact: "Provides learning materials for 1 refugee" },
  { amount: 50, label: "$50", impact: "Funds a week of language classes" },
  { amount: 100, label: "$100", impact: "Sponsors job readiness training" },
  { amount: 250, label: "$250", impact: "Feeds a family for a month" },
];

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const donationAmount = isCustom ? Number(customAmount) : selectedAmount;

  const handleSelectTier = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustom = () => {
    setIsCustom(true);
    setSelectedAmount(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!donationAmount || donationAmount < 1) {
      toast.error("Please select or enter a donation amount.");
      return;
    }
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing (Stripe integration placeholder)
    // In production, this would call a Stripe checkout session endpoint
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setIsDone(true);
    toast.success("Thank you for your generous donation!");
  };

  if (isDone) {
    return (
      <section id="donate" className="py-20 md:py-28 bg-surface">
        <div className="container max-w-xl mx-auto px-4">
          <motion.div
            className="bg-background rounded-2xl shadow-lg p-10 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Thank You!
            </h2>
            <p className="font-body text-muted-foreground mb-2">
              Your donation of <span className="font-semibold text-foreground">${donationAmount}</span> will help transform lives.
            </p>
            <p className="font-body text-muted-foreground text-sm">
              A confirmation has been sent to <span className="font-medium">{email}</span>
            </p>
            <button
              onClick={() => {
                setIsDone(false);
                setName("");
                setEmail("");
                setMessage("");
                setSelectedAmount(50);
                setIsCustom(false);
                setCustomAmount("");
              }}
              className="mt-8 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-body font-semibold hover:brightness-110 transition-all"
            >
              Make Another Donation
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="donate" className="py-20 md:py-28 bg-surface">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img src={futuresLogo} alt="5000 Futures Initiative" className="w-32 mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Make a Difference Today
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Help us reach our goal of $20,000 to empower 5,000 refugees and build the first Refugee Empowerment Centre in Nairobi.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-background rounded-2xl shadow-lg p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Amount Selection */}
          <div className="mb-10">
            <label className="block font-display text-lg font-semibold text-foreground mb-4">
              Select Donation Amount
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {tiers.map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => handleSelectTier(tier.amount)}
                  className={`relative px-4 py-4 rounded-xl border-2 font-body font-semibold text-lg transition-all duration-300 ${
                    selectedAmount === tier.amount && !isCustom
                      ? "border-secondary bg-secondary/10 text-secondary shadow-md"
                      : "border-border text-foreground hover:border-secondary/50"
                  }`}
                >
                  {tier.label}
                  <span className="block text-xs font-normal text-muted-foreground mt-1">
                    {tier.impact}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCustom}
                className={`px-6 py-3 rounded-xl border-2 font-body font-medium transition-all duration-300 ${
                  isCustom
                    ? "border-secondary bg-secondary/10 text-secondary"
                    : "border-border text-muted-foreground hover:border-secondary/50"
                }`}
              >
                Custom
              </button>
              {isCustom && (
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">$</span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-border bg-surface font-body text-foreground focus:border-secondary focus:outline-none transition-colors"
                    autoFocus
                  />
                </div>
              )}
            </div>
          </div>

          {/* Personal Details */}
          <div className="mb-10 space-y-5">
            <label className="block font-display text-lg font-semibold text-foreground mb-2">
              Your Details
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                maxLength={100}
                className="w-full px-5 py-3.5 rounded-xl border-2 border-border bg-surface font-body text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                maxLength={255}
                className="w-full px-5 py-3.5 rounded-xl border-2 border-border bg-surface font-body text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
                required
              />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Leave a message of support (optional)"
              maxLength={500}
              rows={3}
              className="w-full px-5 py-3.5 rounded-xl border-2 border-border bg-surface font-body text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Payment Section Placeholder */}
          <div className="mb-8 p-6 rounded-xl border-2 border-dashed border-border bg-surface/50">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="font-body font-semibold text-foreground text-sm">
                Secure Payment via Stripe
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground">
              Card payment will be processed securely through Stripe. Your payment details are encrypted and never stored on our servers.
            </p>
            <div className="mt-4 p-4 rounded-lg bg-muted/50">
              <p className="font-body text-xs text-muted-foreground text-center">
                Stripe payment integration ready — connect your Stripe secret key to enable live payments.
              </p>
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isProcessing}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-body font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
            whileHover={{ scale: isProcessing ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                Donate {donationAmount ? `$${donationAmount}` : ""} Now
              </>
            )}
          </motion.button>

          <p className="text-center font-body text-xs text-muted-foreground mt-4">
            By donating, you agree to our terms. All donations are tax-deductible.
          </p>
        </motion.form>
      </div>
    </section>
  );
};

export default DonationForm;
