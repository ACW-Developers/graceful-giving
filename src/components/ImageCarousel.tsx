import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
}

const ImageCarousel = ({ images, className = "" }: ImageCarouselProps) => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 4000, stopOnInteraction: true })]}
      className={`w-full ${className}`}
    >
      <CarouselContent>
        {images.map((img, i) => (
          <CarouselItem key={i}>
            <div className="relative overflow-hidden rounded-2xl h-64 md:h-80">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default ImageCarousel;
