"use client";

import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import useScreen from "@/app/hooks/useScreen";

const MatchCardGallery = ({
  dotIndicator = false,
  indexIndicator = true,
  carouselContent,
  medias = Array.from({ length: 5 }),
}) => {
  const [emblaApi, setEmblaApi] = useState(null);
  const [index, setIndex] = useState(1);
  const { isTouchDevice } = useScreen();

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setIndex(emblaApi.selectedScrollSnap() + 1);
    };

    emblaApi.on("select", handleSelect);
  }, [emblaApi]);

  const hoverClass = `
    invisible opacity-0 transition-opacity duration-500
    group-hover:visible
    `;

  return (
    <Carousel setApi={setEmblaApi} className="w-full relative group">
      <CarouselContent>
        {medias.map((_, i) => (
          <CarouselItem key={i} className="">
            <div
              className={cn(
                "relative aspect-auto w-full h-[206px]",
                carouselContent
              )}
            >
              <Image
                alt=""
                fill
                src="/images/woman.png"
                className="rounded-[inherit]"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <Button
        disabled={!emblaApi || !emblaApi.canScrollPrev}
        size="icon"
        variant="outline"
        onClick={() => emblaApi.scrollPrev()}
        className={`
              absolute top-[50%] -translate-y-[50%] left-[15px]
              ${hoverClass} ${
          index === 1 ? "group-hover:opacity-50" : "group-hover:opacity-100"
        }
            `}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        disabled={!emblaApi || !emblaApi.canScrollNext}
        size="icon"
        variant="outline"
        onClick={() => emblaApi.scrollNext()}
        className={`
              absolute top-[50%] -translate-y-[50%] right-[15px]
              ${hoverClass} ${
          index === medias.length
            ? "group-hover:opacity-50"
            : "group-hover:opacity-100"
        }
              `}
      >
        <ChevronRightIcon />
      </Button>

      {indexIndicator && (
        <Button
          size="icon"
          variant="outline"
          className="
              absolute top-[20px] right-[15px] hover:bg-white 
              cursor-auto
              "
        >
          {index}/{medias.length}
        </Button>
      )}
      {dotIndicator && (
        <div
          className="
            absolute flex gap-2 left-[50%] -translate-x-[50%] bottom-[20px]
            "
        >
          {medias.map((_, i) => (
            <div
              key={i}
              className={`
                w-[10px] h-[10px] rounded-full ${
                  index === i + 1 ? "bg-white" : "bg-white/25"
                }
                      `}
            />
          ))}
        </div>
      )}
    </Carousel>
  );
};

export default MatchCardGallery;
