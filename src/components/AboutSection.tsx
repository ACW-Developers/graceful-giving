import { motion } from "framer-motion";
import { MapPin, Calendar, Target } from "lucide-react";

const stats = [
  { value: "5,000", label: "Refugees to Empower", icon: Target },
  { value: "3", label: "Countries Reached", icon: MapPin },
  { value: "June 20", label: "Launch on World Refugee Day", icon: Calendar },
];

const AboutSection = () => {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
            Founded by David Irihose — a refugee from the Democratic Republic of Congo and President of Unashamed Charity Organization — the <span className="font-semibold text-foreground">5,000 Futures Initiative</span> seeks to transform compassion into action, creating pathways toward self-reliance for thousands of refugees who simply need a chance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-background rounded-2xl p-8 text-center shadow-sm border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="font-display text-3xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <p className="font-body text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="font-display text-xl md:text-2xl italic text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            "Refugees possess extraordinary resilience and potential. With the right opportunities and support, they can rebuild their lives and contribute meaningfully to society."
          </p>
          <cite className="block mt-4 font-body text-sm text-muted-foreground not-italic">
            — David Irihose, Founder
          </cite>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default AboutSection;
