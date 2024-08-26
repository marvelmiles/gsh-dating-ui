"use client";

import React, { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import useScreen from "@/app/hooks/useScreen";
import { isVideo } from "@/app/utils/validators";

const MatchCardGallery = ({
  dotIndicator = false,
  indexIndicator = true,
  carouselContent,
  medias = [],
  indexIndicatorHolder,
  mediaClassName = "",
  hideCarouselBtns = false,
}) => {
  const [emblaApi, setEmblaApi] = useState(null);
  const [index, setIndex] = useState(1);
  const { isTouchDevice } = useScreen();

  const videoRef = useRef();

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setIndex(emblaApi.selectedScrollSnap() + 1);
    };

    emblaApi.on("select", handleSelect);
  }, [emblaApi]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const togglePlayPause = () => {
        console.log("clicked...");

        if (video.paused) video.play();
        else video.pause();
      };

      video.addEventListener("click", togglePlayPause, false);

      return () => video.removeEventListener("click", togglePlayPause, false);
    }
  }, []);

  const hoverClass = `
    invisible opacity-0 transition-opacity duration-500
    group-hover:visible
    `;

  const indexIndicatorClass = `
    absolute top-[20px] right-[15px] hover:bg-white 
    cursor-auto
    `;

  medias = medias.length ? medias : ["blank"];

  hideCarouselBtns = medias.length < 2 || hideCarouselBtns;

  const actionClassName = `${hideCarouselBtns ? "hidden" : ""}`;

  return (
    <Carousel
      opts={
        hideCarouselBtns
          ? {
              watchCard: false,
            }
          : undefined
      }
      setApi={setEmblaApi}
      className="w-full relative group"
    >
      <CarouselContent>
        {medias.map(
          (
            media = {
              src: "/images/video.mp4",
            },
            i
          ) => (
            <CarouselItem key={i} className="">
              <div
                className={cn(
                  "relative aspect-auto w-full h-[210px]",
                  carouselContent
                )}
              >
                {media === "blank" ? (
                  <div
                    className={cn(
                      `
                    absolute top-0 left-0 w-full h-full rounded-[inherit]
                    bg-black/50 
                    `,
                      mediaClassName
                    )}
                  />
                ) : isVideo(media) ? (
                  <video
                    loop={false}
                    ref={videoRef}
                    className={cn(
                      `
                    absolute top-0 left-0 w-full h-full rounded-[inherit]
                    
                    `,
                      mediaClassName
                    )}
                    src={media}
                  />
                ) : (
                  <Image
                    alt=""
                    fill
                    src={media}
                    className={cn("rounded-[inherit] ", mediaClassName)}
                  />
                )}
              </div>
            </CarouselItem>
          )
        )}
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
        } ${actionClassName}
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
        } ${actionClassName}
              `}
      >
        <ChevronRightIcon />
      </Button>

      {indexIndicator ? (
        <Button
          size="icon"
          variant="outline"
          className={cn(actionClassName, indexIndicatorClass)}
        >
          {index}/{medias.length}
        </Button>
      ) : (
        indexIndicatorHolder && (
          <div className={indexIndicatorClass}>{indexIndicatorHolder}</div>
        )
      )}
      {dotIndicator && !hideCarouselBtns && (
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
