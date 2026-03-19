import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import futuresLogo from "@/assets/5000-futures-logo.png";

const tiers = [
  { amount: 25, label: "$25", impact: "Learning materials for 1 refugee" },
  { amount: 50, label: "$50", impact: "A week of language classes" },
  { amount: 100, label: "$100", impact: "Job readiness training" },
  { amount: 250, label: "$250", impact: "Feed a family for a month" },
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

    try {
      const { data, error } = await supabase.functions.invoke("create-donation", {
        body: {
          amount: donationAmount,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
        setIsDone(true);
        toast.success("Redirecting to secure payment...");
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (err: any) {
      toast.error(err.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isDone) {
    return (
      <motion.div
        className="bg-background rounded-2xl shadow-sm border border-border p-10 text-center max-w-lg mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-6" />
        <h2 className="font-display text-3xl font-bold text-foreground mb-4">Thank You!</h2>
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={futuresLogo} alt="5000 Futures" className="w-14 h-14 rounded-xl object-contain" />
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Make a Difference</h1>
          <p className="font-body text-sm text-muted-foreground">Help us reach $20,000 for the Refugee Empowerment Centre</p>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-background rounded-2xl shadow-sm border border-border p-6 md:p-8 space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        {/* Amount Selection */}
        <div>
          <label className="flex items-center gap-2 font-display text-base font-semibold text-foreground mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            Choose Your Impact
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {tiers.map((tier) => (
              <button
                key={tier.amount}
                type="button"
                onClick={() => handleSelectTier(tier.amount)}
                className={`relative p-4 rounded-xl border-2 font-body font-semibold text-lg transition-all duration-300 ${
                  selectedAmount === tier.amount && !isCustom
                    ? "border-secondary bg-secondary/10 text-secondary shadow-md"
                    : "border-border text-foreground hover:border-secondary/50"
                }`}
              >
                {tier.label}
                <span className="block text-[10px] font-normal text-muted-foreground mt-1 leading-tight">
                  {tier.impact}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCustom}
              className={`px-5 py-2.5 rounded-xl border-2 font-body font-medium text-sm transition-all duration-300 ${
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
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border-2 border-border bg-surface font-body text-foreground focus:border-secondary focus:outline-none transition-colors"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-4">
          <label className="block font-display text-base font-semibold text-foreground">
            Your Details
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              maxLength={100}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-surface font-body text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              maxLength={255}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-surface font-body text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
              required
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a message of support (optional)"
            maxLength={500}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-surface font-body text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Payment Info with Stripe Logo */}
        <div className="p-4 rounded-xl border border-border bg-surface/50 flex items-start gap-3">
          <Shield className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
          <div className="flex-1">
            <span className="font-body font-semibold text-foreground text-sm">Secure Payment via Stripe</span>
            <p className="font-body text-xs text-muted-foreground mt-0.5">
              You'll be redirected to Stripe's secure checkout. Your card details are never stored on our servers.
            </p>
          </div>
        </div>

        {/* Stripe Logo */}
        <div className="flex items-center justify-center">
          <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
            <svg width="120" height="50" viewBox="0 0 468 222.5" xmlns="http://www.w3.org/2000/svg">
              <path d="M414 113.4c0-25.6-12.4-45.8-36.1-45.8-23.8 0-38.2 20.2-38.2 45.6 0 30.1 17 45.3 41.4 45.3 11.9 0 20.9-2.7 27.7-6.5v-20c-6.8 3.4-14.6 5.5-24.5 5.5-9.7 0-18.3-3.4-19.4-15.2h48.9c0-1.3.2-6.5.2-8.9zm-49.4-9.5c0-11.3 6.9-16 13.2-16 6.1 0 12.6 4.7 12.6 16h-25.8zm-63.5-36.3c-9.8 0-16.1 4.6-19.6 7.8l-1.3-6.2h-22v116.6l25-5.3.1-28.3c3.6 2.6 8.9 6.3 17.7 6.3 17.9 0 34.2-14.4 34.2-46.1-.1-29-16.6-44.8-34.1-44.8zm-6 68.9c-5.9 0-9.4-2.1-11.8-4.7l-.1-37.1c2.6-2.9 6.2-4.9 11.9-4.9 9.1 0 15.4 10.2 15.4 23.3 0 13.4-6.2 23.4-15.4 23.4zm-71.3-74.6l25.1-5.4V36l-25.1 5.3zm0 7.6h25.1v87.5h-25.1zm-26.4 7.3l-1.6-7.3h-21.6v87.5h25V97.5c5.9-7.7 15.9-6.3 19-5.2v-23c-3.2-1.2-14.9-3.4-20.8 7.4zm-50.6-7.3h25.1v87.5h-25.1zm-25.5 0c-3.1 0-5.8 2.5-6.5 6.3l-1.5-6.3H91.8v87.5h25V103c5.9-7.7 16-6.3 19.1-5.2v-23c-3.2-1.2-15-3.4-20.9 7.4v-12.7zm-56.9 39.5c0-6.3 5.2-8.7 13.8-8.7 12.3 0 27.9 3.7 40.2 10.4V72.5c-13.5-5.3-26.8-7.4-40.2-7.4C33.6 65.1 14 78.4 14 101.3c0 35.5 48.9 29.8 48.9 45.1 0 7.5-6.5 9.9-15.6 9.9-13.5 0-30.8-5.5-44.5-13v23.8c15.2 6.5 30.6 9.3 44.5 9.3C78.6 176.4 99 163.6 99 140.5c0-38.3-49.2-31.5-49.2-45.9z" fill="currentColor" className="text-foreground"/>
            </svg>
          </a>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-body font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
          whileHover={{ scale: isProcessing ? 1 : 1.01 }}
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

        <p className="text-center font-body text-xs text-muted-foreground">
          By donating, you agree to our terms. All donations are tax-deductible.
        </p>
      </motion.form>
    </div>
  );
};

export default DonationForm;
