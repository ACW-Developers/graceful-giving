import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-charity.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Charity outreach event distributing supplies to refugees"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <motion.img
          src={logo}
          alt="Unashamed-M Charity Group Logo"
          className="w-40 h-40 md:w-52 md:h-52 mb-8 drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <motion.h1
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          5,000 Futures
        </motion.h1>

        <motion.p
          className="font-display text-xl md:text-2xl text-primary-foreground/90 italic mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A Refugee Empowerment Initiative
        </motion.p>

        <motion.p
          className="font-body text-base md:text-lg text-primary-foreground/80 max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Empowering 5,000 refugees across Kenya, Uganda, and the Democratic Republic of Congo
          with skills, resources, and opportunities to rebuild their lives with dignity.
        </motion.p>

        <motion.a
          href="#donate"
          className="inline-flex items-center px-8 py-4 rounded-lg bg-secondary text-secondary-foreground font-body font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:brightness-110"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Donate Now
        </motion.a>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/70" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
