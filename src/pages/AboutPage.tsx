import { motion } from "framer-motion";
import { Heart, Shield, Users, Globe } from "lucide-react";
import logo from "@/assets/logo.png";
import davidImage from "@/assets/david-irihose.jpg";

const AboutPage = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">About Us</h1>
        <p className="font-body text-muted-foreground text-sm sm:text-base">
          Learn more about the Unashamed Charity Organization.
        </p>
      </motion.div>

      {/* Org Card */}
      <motion.div
        className="bg-card rounded-xl p-6 sm:p-8 border border-border shadow-sm flex flex-col sm:flex-row items-start gap-4 sm:gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-white p-3 shrink-0 flex items-center justify-center">
          <img src={logo} alt="Unashamed Charity" className="w-full h-full object-contain" />
        </div>
        <div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">Unashamed Charity Organization</h2>
          <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
            A refugee-founded and refugee-led organization based in Nairobi, Kenya, dedicated to empowering displaced communities through education, skills training, and sustainable development programs across East and Central Africa.
          </p>
          <p className="font-body text-xs text-muted-foreground/80 italic">
            "Our Kindness, Someone's Hope"
          </p>
        </div>
      </motion.div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {[
          { icon: Heart, title: "Compassion First", desc: "Every program is rooted in genuine care for the dignity and wellbeing of every individual." },
          { icon: Shield, title: "Transparency", desc: "We maintain full accountability in how donations are used and report impact regularly." },
          { icon: Users, title: "Community-Led", desc: "Programs are designed and led by refugees who understand the needs firsthand." },
          { icon: Globe, title: "Cross-Border Impact", desc: "Operating across Kenya, Uganda, and DRC to reach the most vulnerable communities." },
        ].map((v, i) => (
          <motion.div
            key={v.title}
            className="bg-card rounded-xl p-5 sm:p-6 border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
              <v.icon className="w-5 h-5 text-secondary" />
            </div>
            <h3 className="font-body font-semibold text-foreground text-sm mb-1">{v.title}</h3>
            <p className="font-body text-xs text-muted-foreground">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Founder - Image Left, Content Right */}
      <motion.div
        className="bg-card rounded-xl overflow-hidden border border-border shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-56 md:h-auto">
            <img src={davidImage} alt="David Irihose" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
            <h2 className="font-display text-lg font-bold text-foreground mb-3">Meet the Founder</h2>
            <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">David Irihose</span> is a refugee from the Democratic Republic of Congo and the President of Unashamed Charity Organization. Having experienced displacement firsthand, David channeled his journey into building sustainable solutions for fellow refugees across East Africa. His vision drives the 5,000 Futures Initiative — a mission to transform lives through education, skills, and community support.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
