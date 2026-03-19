import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Heart, Printer, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import futuresLogo from "@/assets/5000-futures-logo.png";

const DonationSuccess = () => {
  const [params] = useSearchParams();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [donorName, setDonorName] = useState("Generous Donor");
  const [amount, setAmount] = useState("—");
  const [donorEmail, setDonorEmail] = useState("");

  const sessionId = params.get("session_id");
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const receiptNo = `UCO-${Date.now().toString(36).toUpperCase()}`;

  useEffect(() => {
    if (!sessionId) {
      // Fallback to URL params
      setDonorName(params.get("name") || "Generous Donor");
      setAmount(params.get("amount") || "—");
      setLoading(false);
      return;
    }

    supabase.functions
      .invoke("verify-donation", { body: { session_id: sessionId } })
      .then(({ data, error }) => {
        if (data && !error) {
          setDonorName(data.name || "Generous Donor");
          setAmount(String(data.amount || "—"));
          setDonorEmail(data.email || "");
        }
        setLoading(false);
      });
  }, [sessionId]);

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-secondary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <motion.div
        className="max-w-lg w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div ref={receiptRef} className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
          <div className="bg-primary text-primary-foreground p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white rounded-lg p-1">
                <img src={futuresLogo} alt="5000 Futures" className="w-full h-full object-contain" />
              </div>
              <div className="w-10 h-10 bg-white rounded-full p-1">
                <img src={logo} alt="Unashamed Charity" className="w-full h-full object-contain" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold">Donation Receipt</h1>
            <p className="font-body text-xs text-primary-foreground/70 mt-1">5,000 Futures Initiative</p>
          </div>

          <div className="flex justify-center -mt-6">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-md">
              <CheckCircle className="w-6 h-6 text-secondary-foreground" />
            </div>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-center font-display text-lg font-bold text-foreground">Thank You, {donorName}!</p>

            <div className="bg-background rounded-xl p-4 space-y-3">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Receipt No.</span>
                <span className="font-medium text-foreground">{receiptNo}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium text-foreground">{date}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Donor</span>
                <span className="font-medium text-foreground">{donorName}</span>
              </div>
              {donorEmail && (
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium text-foreground">{donorEmail}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 flex justify-between font-body">
                <span className="text-muted-foreground font-medium">Amount</span>
                <span className="font-display text-xl font-bold text-secondary">${amount}</span>
              </div>
            </div>

            <p className="font-body text-xs text-muted-foreground text-center leading-relaxed">
              Your donation will directly impact the lives of refugees across Kenya, Uganda, and the DR Congo. This receipt is for your tax records.
            </p>

            <div className="flex items-center justify-center gap-1 text-muted-foreground">
              <Heart className="w-3 h-3 text-destructive" />
              <span className="font-body text-xs italic">Our Kindness, Someone's Hope</span>
            </div>

            <div className="border-t border-border pt-3 text-center">
              <p className="font-body text-[10px] text-muted-foreground">
                Unashamed Charity Organization · Nairobi, Kenya · davidirihose94@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-6 no-print">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold hover:brightness-110 transition-all"
          >
            <Printer className="w-4 h-4" />
            Print Receipt
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-body font-semibold hover:brightness-110 transition-all"
          >
            Return Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default DonationSuccess;
