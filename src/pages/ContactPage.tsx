import { motion } from "framer-motion";
import { Mail, MapPin, Heart, Phone, Globe } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Contact Us</h1>
        <p className="font-body text-muted-foreground text-sm sm:text-base">
          Get in touch with the Unashamed Charity team.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <motion.div
          className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-body font-semibold text-foreground text-sm mb-1">Email</h3>
          <a href="mailto:info@unashamedcharity.org" className="font-body text-sm text-primary hover:underline">
            info@unashamedcharity.org
          </a>
        </motion.div>

        <motion.div
          className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
            <Phone className="w-5 h-5 text-accent-foreground" />
          </div>
          <h3 className="font-body font-semibold text-foreground text-sm mb-1">Phone</h3>
          <a href="tel:+15207361677" className="font-body text-sm text-primary hover:underline">
            +1 (520) 736-1677
          </a>
        </motion.div>

        <motion.div
          className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
            <Globe className="w-5 h-5 text-secondary" />
          </div>
          <h3 className="font-body font-semibold text-foreground text-sm mb-1">Websites</h3>
          <div className="space-y-1">
            <a href="https://unashamedcharity.org" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-primary hover:underline block">
              unashamedcharity.org
            </a>
            <a href="https://5000futures.us" target="_blank" rel="noopener noreferrer" className="font-body text-sm text-primary hover:underline block">
              5000futures.us
            </a>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-secondary" />
          </div>
          <h3 className="font-body font-semibold text-foreground text-sm mb-1">Location</h3>
          <p className="font-body text-sm text-muted-foreground">Nairobi, Kenya</p>
        </motion.div>
      </div>

      <motion.div
        className="bg-primary/5 rounded-xl p-6 sm:p-8 border border-primary/10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Heart className="w-8 h-8 text-secondary mx-auto mb-3" />
        <p className="font-display text-lg sm:text-xl text-foreground italic mb-2">
          "Your Kindness, Someone's Hope"
        </p>
        <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
          Interested in partnering, volunteering, or learning more about our work? We'd love to hear from you.
        </p>
      </motion.div>
    </div>
  );
};

export default ContactPage;
