import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Target, Heart, Globe, Users, ChevronLeft, ChevronRight } from "lucide-react";
import impactEducation from "@/assets/impact-education.jpg";
import impactFood from "@/assets/impact-food.jpg";
import impactSkills from "@/assets/impact-skills.jpg";
import impactLanguage from "@/assets/impact-language.jpg";
import davidImage from "@/assets/david-irihose.jpg";

const images = [
  { src: impactEducation, alt: "Education programs" },
  { src: impactFood, alt: "Food distribution" },
  { src: impactSkills, alt: "Skills training" },
  { src: impactLanguage, alt: "Language classes" },
];

const stats = [
  { value: "5,000", label: "Refugees to Empower", icon: Target },
  { value: "3", label: "Countries Reached", icon: MapPin },
  { value: "June 20", label: "Launch on World Refugee Day", icon: Calendar },
];

const pillars = [
  { title: "Compassion", desc: "Meeting immediate needs with dignity and respect.", icon: Heart },
  { title: "Empowerment", desc: "Building skills for self-reliance and independence.", icon: Users },
  { title: "Community", desc: "Creating networks of support across borders.", icon: Globe },
];

const MissionPage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((p) => (p + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setCurrentImage((p) => (p - 1 + images.length) % images.length);
  const next = () => setCurrentImage((p) => (p + 1) % images.length);

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8">
      {/* Image Carousel Banner */}
      <motion.div
        className="relative overflow-hidden rounded-2xl h-56 sm:h-64 md:h-80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            className="w-full h-full object-cover absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">Our Mission</h1>
          <p className="font-body text-white/80 text-sm sm:text-base max-w-xl">
            Transforming compassion into action for 5,000 refugee futures.
          </p>
        </div>
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === currentImage ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Mission Statement with David image */}
      <motion.div
        className="bg-card rounded-xl overflow-hidden border border-border shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-48 md:h-auto">
            <img src={davidImage} alt="David Irihose" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
            <p className="font-body text-muted-foreground text-sm sm:text-base leading-relaxed">
              Founded by <span className="font-semibold text-foreground">David Irihose</span> — a refugee from the Democratic Republic of Congo and President of Unashamed Charity Organization — the <span className="font-semibold text-foreground">5,000 Futures Initiative</span> seeks to transform compassion into action, creating pathways toward self-reliance for thousands of refugees who simply need a chance.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card rounded-xl p-5 sm:p-6 text-center border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="font-display text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pillars */}
      <motion.div
        className="bg-card rounded-xl p-6 sm:p-8 border border-border shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="font-display text-xl font-bold text-foreground mb-4 sm:mb-6">Our Pillars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                <p.icon className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-foreground text-sm">{p.title}</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quote */}
      <motion.blockquote
        className="bg-primary/5 rounded-xl p-6 sm:p-8 border border-primary/10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="font-display text-base sm:text-lg italic text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          "Refugees possess extraordinary resilience and potential. With the right opportunities and support, they can rebuild their lives and contribute meaningfully to society."
        </p>
        <cite className="block mt-3 sm:mt-4 font-body text-sm text-muted-foreground not-italic">
          — David Irihose, Founder
        </cite>
      </motion.blockquote>
    </div>
  );
};

export default MissionPage;
