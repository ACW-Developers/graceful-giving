import { motion } from "framer-motion";
import { MapPin, Calendar, Target, Heart, Globe, Users } from "lucide-react";
import heroImage from "@/assets/hero-charity.jpg";

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
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Hero Banner */}
      <motion.div
        className="relative overflow-hidden rounded-2xl h-64 md:h-80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={heroImage} alt="Mission" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">Our Mission</h1>
          <p className="font-body text-primary-foreground/80 max-w-xl">
            Transforming compassion into action for 5,000 refugee futures.
          </p>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        className="bg-background rounded-xl p-8 border border-border shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="font-body text-muted-foreground text-base leading-relaxed">
          Founded by <span className="font-semibold text-foreground">David Irihose</span> — a refugee from the Democratic Republic of Congo and President of Unashamed Charity Organization — the <span className="font-semibold text-foreground">5,000 Futures Initiative</span> seeks to transform compassion into action, creating pathways toward self-reliance for thousands of refugees who simply need a chance.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-background rounded-xl p-6 text-center border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="font-body text-sm text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Pillars */}
      <motion.div
        className="bg-background rounded-xl p-8 border border-border shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="font-display text-xl font-bold text-foreground mb-6">Our Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        className="bg-primary/5 rounded-xl p-8 border border-primary/10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="font-display text-lg italic text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          "Refugees possess extraordinary resilience and potential. With the right opportunities and support, they can rebuild their lives and contribute meaningfully to society."
        </p>
        <cite className="block mt-4 font-body text-sm text-muted-foreground not-italic">
          — David Irihose, Founder
        </cite>
      </motion.blockquote>
    </div>
  );
};

export default MissionPage;
