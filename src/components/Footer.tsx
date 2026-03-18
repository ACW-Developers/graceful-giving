import { Heart, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-primary">
      <div className="container max-w-5xl mx-auto px-4 text-center">
        <img src={logo} alt="Unashamed-M Charity Group" className="w-16 h-16 mx-auto mb-4 brightness-200" />
        <p className="font-display text-lg text-primary-foreground/90 mb-2">
          Unashamed-M Charity Group
        </p>
        <p className="font-body text-sm text-primary-foreground/60 italic mb-6">
          Our Kindness, Someone's Hope
        </p>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Mail className="w-4 h-4 text-primary-foreground/60" />
          <a href="mailto:davidirihose94@gmail.com" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            davidirihose94@gmail.com
          </a>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6">
          <p className="font-body text-xs text-primary-foreground/40 flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-destructive" /> for a better world · © {new Date().getFullYear()} Unashamed Charity Organization
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
