import { Heart, Mail, Phone, Globe } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-12 bg-primary">
      <div className="container max-w-5xl mx-auto px-4 text-center">
        <img src={logo} alt="Unashamed-M Charity Group" className="w-16 h-16 mx-auto mb-4 brightness-200" />
        <p className="font-display text-lg text-primary-foreground/90 mb-1">
          Unashamed-M Charity Group
        </p>
        <p className="font-body text-sm text-primary-foreground/60 italic mb-6">
          Your Kindness, Someone's Hope
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary-foreground/60" />
            <a href="mailto:info@unashamedcharity.org" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              info@unashamedcharity.org
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary-foreground/60" />
            <a href="tel:+15207361677" className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              +1 (520) 736-1677
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary-foreground/50" />
            <a href="https://unashamedcharity.org" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              unashamedcharity.org
            </a>
          </div>
          <span className="text-primary-foreground/20">·</span>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-primary-foreground/50" />
            <a href="https://5000futures.us" target="_blank" rel="noopener noreferrer" className="font-body text-xs text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              5000futures.us
            </a>
          </div>
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
