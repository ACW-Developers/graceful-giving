import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, MapPin, Target, TrendingUp, ArrowRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useCampaignSettings } from "@/hooks/useCampaignSettings";
import futuresLogo from "@/assets/5000-futures-logo.png";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-charity.jpg";
import davidImage from "@/assets/david-irihose.jpg";
import impactEducation from "@/assets/impact-education.jpg";
import impactFood from "@/assets/impact-food.jpg";

const logos = [
  { src: futuresLogo, alt: "5000 Futures" },
  { src: logo, alt: "Unashamed Charity" },
];

const Dashboard = () => {
  const { campaign, loading, refetch } = useCampaignSettings();
  const [logoIndex, setLogoIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 600);
  };

  const percentage = campaign.goal_amount > 0
    ? Math.round((campaign.raised_amount / campaign.goal_amount) * 100)
    : 0;
  const avgDonation = campaign.donors_count > 0
    ? Math.round(campaign.raised_amount / campaign.donors_count)
    : 0;

  const quickStats = [
    { label: "Refugees to Empower", value: "5,000", icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Countries Reached", value: "3", icon: MapPin, color: "bg-secondary/10 text-secondary" },
    { label: "Fundraising Goal", value: `$${campaign.goal_amount.toLocaleString()}`, icon: Target, color: "bg-accent/20 text-accent-foreground" },
    { label: "Program Areas", value: "4", icon: TrendingUp, color: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Welcome Banner */}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground p-6 sm:p-8 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/70" />
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={logoIndex}
                src={logos[logoIndex].src}
                alt={logos[logoIndex].alt}
                className="w-full h-full object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              5,000 Futures Initiative
            </h1>
            <p className="font-body text-primary-foreground/80 text-sm sm:text-base md:text-lg max-w-2xl">
              Empowering refugees across Kenya, Uganda & DRC with skills, resources, and opportunities to rebuild their lives with dignity.
            </p>
          </div>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-secondary text-secondary-foreground font-body font-bold text-sm sm:text-base hover:brightness-110 transition-all shadow-lg shrink-0"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            Donate Now
          </Link>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-card rounded-xl p-4 sm:p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          >
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${stat.color} flex items-center justify-center mb-2 sm:mb-3`}>
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="font-display text-xl sm:text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="font-body text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Two Column: Campaign Progress + Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-foreground">Campaign Progress</h2>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              title="Refresh stats"
            >
              <RefreshCw className={`w-4 h-4 text-muted-foreground ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-body text-sm mb-2">
                <span className="text-muted-foreground">Raised so far</span>
                <span className="font-semibold text-foreground">
                  ${campaign.raised_amount.toLocaleString()} / ${campaign.goal_amount.toLocaleString()}
                </span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-secondary to-secondary/70"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                />
              </div>
              <p className="font-body text-xs text-muted-foreground mt-1.5">{percentage}% of goal reached</p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              <div className="text-center p-2 sm:p-3 rounded-lg bg-background">
                <div className="font-display text-base sm:text-lg font-bold text-foreground">{campaign.donors_count}</div>
                <p className="font-body text-[10px] text-muted-foreground">Donors</p>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-lg bg-background">
                <div className="font-display text-base sm:text-lg font-bold text-foreground">${avgDonation}</div>
                <p className="font-body text-[10px] text-muted-foreground">Avg Donation</p>
              </div>
              <div className="text-center p-2 sm:p-3 rounded-lg bg-background">
                <div className="font-display text-base sm:text-lg font-bold text-foreground">{campaign.days_left}</div>
                <p className="font-body text-[10px] text-muted-foreground">Days Left</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm"
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
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                  <span className="font-body text-[10px] sm:text-xs font-semibold text-white">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Founder Section */}
      <motion.div
        className="bg-card rounded-xl overflow-hidden border border-border shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-48 md:h-auto">
            <img src={davidImage} alt="David Irihose" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
            <p className="font-display text-lg md:text-xl italic text-foreground/80 leading-relaxed">
              "Refugees possess extraordinary resilience and potential. With the right opportunities and support, they can rebuild their lives and contribute meaningfully to society."
            </p>
            <p className="font-body text-sm text-muted-foreground mt-4">— David Irihose, Founder</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
