import { motion } from "framer-motion";
import { Heart, GraduationCap, Users, Lightbulb, HandHeart } from "lucide-react";
import donationPoster from "@/assets/donation-poster.jpeg";
import { Link } from "react-router-dom";

const reasons = [
  { icon: GraduationCap, title: "Education Support", desc: "Providing access to quality education for refugee children and adults." },
  { icon: Users, title: "Mentorship Programs", desc: "Connecting refugees with mentors who guide their integration journey." },
  { icon: Lightbulb, title: "Skill Development", desc: "Equipping individuals with marketable skills for economic independence." },
  { icon: HandHeart, title: "Community Empowerment", desc: "Building resilient communities through sustainable support systems." },
];

interface Props {
  showDonateButton?: boolean;
}

const DonationPosterSection = ({ showDonateButton = true }: Props) => {
  return (
    <motion.div
      className="bg-card rounded-xl overflow-hidden border border-border shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Poster */}
        <div className="lg:w-5/12 flex-shrink-0">
          <img
            src={donationPoster}
            alt="5,000 Futures — A Refugee Empowerment Initiative"
            className="w-full h-full object-cover min-h-[280px] lg:min-h-[400px]"
          />
        </div>

        {/* Reasons to Support */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center gap-5">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
              Be Part of the Change
            </h3>
            <p className="font-body text-sm text-muted-foreground mt-1">
              5,000 Futures is dedicated to empowering refugees through education, mentorship, and opportunity. Every contribution creates lasting impact.
            </p>
          </div>

          <div className="grid gap-4">
            {reasons.map((r) => (
              <div key={r.title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <r.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-foreground">{r.title}</p>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {showDonateButton && (
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 mt-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-body text-sm font-semibold hover:brightness-110 transition-all shadow-sm w-fit"
            >
              <Heart className="w-4 h-4" />
              Support the Initiative
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DonationPosterSection;
