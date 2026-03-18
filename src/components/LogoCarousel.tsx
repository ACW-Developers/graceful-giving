import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import futuresLogo from "@/assets/5000-futures-logo.png";
import logo from "@/assets/logo.png";
import Autoplay from "embla-carousel-autoplay";

const logos = [
  { src: futuresLogo, alt: "5,000 Futures Initiative", label: "5,000 Futures Initiative" },
  { src: logo, alt: "Unashamed Charity Organization", label: "Unashamed Charity" },
];

const LogoCarousel = () => {
  return (
    <Carousel
      opts={{ loop: true, align: "center" }}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
      className="w-full max-w-xs mx-auto"
    >
      <CarouselContent>
        {logos.map((l) => (
          <CarouselItem key={l.alt} className="flex flex-col items-center justify-center py-4">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-md flex items-center justify-center p-3">
              <img src={l.src} alt={l.alt} className="w-full h-full object-contain" />
            </div>
            <span className="font-body text-xs text-muted-foreground mt-3">{l.label}</span>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default LogoCarousel;
