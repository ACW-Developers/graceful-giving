import { motion } from "framer-motion";
import impactEducation from "@/assets/impact-education.jpg";
import impactFood from "@/assets/impact-food.jpg";
import impactSkills from "@/assets/impact-skills.jpg";
import impactLanguage from "@/assets/impact-language.jpg";
import { BookOpen, Utensils, Briefcase, Languages } from "lucide-react";

const impacts = [
  {
    title: "Education & Soft Skills",
    description: "Providing practical life and professional skills including communication, teamwork, leadership, and personal development.",
    image: impactEducation,
    icon: BookOpen,
  },
  {
    title: "Basic Needs Support",
    description: "Providing essential support including food supplies, clothing, and shelter assistance for vulnerable refugee families.",
    image: impactFood,
    icon: Utensils,
  },
  {
    title: "Job Readiness",
    description: "Supporting refugees with CV writing, interview preparation, and access to income-generating opportunities.",
    image: impactSkills,
    icon: Briefcase,
  },
  {
    title: "Language Education",
    description: "Offering English and French learning opportunities to improve communication and employability.",
    image: impactLanguage,
    icon: Languages,
  },
];

const ImpactPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Our Impact</h1>
        <p className="font-body text-muted-foreground text-sm sm:text-base">
          Every contribution directly impacts lives across four key program areas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {impacts.map((impact, i) => (
          <motion.div
            key={impact.title}
            className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          >
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img
                src={impact.image}
                alt={impact.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-secondary flex items-center justify-center">
                  <impact.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary-foreground" />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold text-white">{impact.title}</h3>
              </div>
            </div>
            <div className="p-4 sm:p-5">
              <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{impact.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImpactPage;
