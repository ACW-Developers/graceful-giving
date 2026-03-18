import { motion } from "framer-motion";
import { CheckCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const DonationSuccess = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={logo} alt="Unashamed-M Charity Group" className="w-24 h-24 mx-auto mb-8" />
        <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">
          Thank You for Your Generosity!
        </h1>
        <p className="font-body text-muted-foreground mb-8 leading-relaxed">
          Your donation will directly impact the lives of refugees across Kenya, Uganda, and the DR Congo. A confirmation receipt has been sent to your email.
        </p>
        <div className="flex items-center justify-center gap-1 text-muted-foreground mb-8">
          <Heart className="w-4 h-4 text-destructive" />
          <span className="font-body text-sm italic">Our Kindness, Someone's Hope</span>
        </div>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-3 rounded-lg bg-secondary text-secondary-foreground font-body font-semibold hover:brightness-110 transition-all"
        >
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default DonationSuccess;
