import { motion } from "framer-motion";
import { Heart, Users, MapPin, Target, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import futuresLogo from "@/assets/5000-futures-logo.png";
import heroImage from "@/assets/hero-charity.jpg";
import impactEducation from "@/assets/impact-education.jpg";
import impactFood from "@/assets/impact-food.jpg";

const quickStats = [
  { label: "Refugees to Empower", value: "5,000", icon: Users, color: "bg-primary/10 text-primary" },
  { label: "Countries Reached", value: "3", icon: MapPin, color: "bg-secondary/10 text-secondary" },
  { label: "Fundraising Goal", value: "$20,000", icon: Target, color: "bg-accent/20 text-accent-foreground" },
  { label: "Program Areas", value: "4", icon: TrendingUp, color: "bg-primary/10 text-primary" },
];

const Dashboard = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-8 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <img src={futuresLogo} alt="5000 Futures" className="w-20 h-20 rounded-xl object-contain bg-background/10 p-2" />
          <div className="flex-1">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
              5,000 Futures Initiative
            </h1>
            <p className="font-body text-primary-foreground/80 text-base md:text-lg max-w-2xl">
              Empowering refugees across Kenya, Uganda & DRC with skills, resources, and opportunities to rebuild their lives with dignity.
            </p>
          </div>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-body font-bold text-base hover:brightness-110 transition-all shadow-lg shrink-0"
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </Link>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-background rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          >
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Two Column: Campaign Progress + Quick Donate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Progress */}
        <motion.div
          className="bg-background rounded-xl p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="font-display text-lg font-bold text-foreground mb-4">Campaign Progress</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-body text-sm mb-2">
                <span className="text-muted-foreground">Raised so far</span>
                <span className="font-semibold text-foreground">$4,250 / $20,000</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary/70"
                  initial={{ width: 0 }}
                  animate={{ width: "21.25%" }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="font-body text-xs text-muted-foreground mt-1.5">21% of goal reached</p>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="text-center p-3 rounded-lg bg-surface">
                <div className="font-display text-lg font-bold text-foreground">127</div>
                <p className="font-body text-[10px] text-muted-foreground">Donors</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-surface">
                <div className="font-display text-lg font-bold text-foreground">$33</div>
                <p className="font-body text-[10px] text-muted-foreground">Avg Donation</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-surface">
                <div className="font-display text-lg font-bold text-foreground">42</div>
                <p className="font-body text-[10px] text-muted-foreground">Days Left</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Impact Highlights */}
        <motion.div
          className="bg-background rounded-xl p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">Impact Areas</h2>
            <Link to="/impact" className="font-body text-xs text-secondary hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { img: impactEducation, title: "Education & Skills" },
              { img: impactFood, title: "Basic Needs" },
            ].map((item) => (
              <div key={item.title} className="group relative overflow-hidden rounded-lg aspect-[4/3]">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="font-body text-xs font-semibold text-primary-foreground">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Founder Quote */}
      <motion.div
        className="bg-background rounded-xl p-8 border border-border shadow-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <p className="font-display text-lg md:text-xl italic text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          "Refugees possess extraordinary resilience and potential. With the right opportunities and support, they can rebuild their lives and contribute meaningfully to society."
        </p>
        <p className="font-body text-sm text-muted-foreground mt-4">— David Irihose, Founder</p>
      </motion.div>
    </div>
  );
};

export default Dashboard;
