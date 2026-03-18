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

const ImpactGrid = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Where Your Donation Goes
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Every contribution directly impacts lives across four key program areas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              className="group relative overflow-hidden rounded-xl bg-card shadow-md hover:shadow-xl transition-shadow duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={impact.image}
                  alt={impact.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <impact.icon className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-primary-foreground">
                    {impact.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="font-body text-muted-foreground leading-relaxed">
                  {impact.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactGrid;
