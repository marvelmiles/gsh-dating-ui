"use client";

import React, { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import useScreen from "@/app/hooks/useScreen";
import { isValidMedia, isVideo } from "@/app/utils/media";

const MatchCardGallery = ({
  dotIndicator = false,
  indexIndicator = true,
  carouselContent,
  medias = [],
  indexIndicatorHolder,
  mediaClassName = "",
  withVideoEvent = true,
  hideCarouselIndicators = false,
}) => {
  const [emblaApi, setEmblaApi] = useState(null);
  const [index, setIndex] = useState(1);
  const { isTouchDevice } = useScreen({ screen: 0 });

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

    if (video && withVideoEvent) {
      const togglePlayPause = () => {
        console.log("clicked...");

        if (video.paused) video.play();
        else video.pause();
      };

      video.addEventListener("click", togglePlayPause, false);

      return () => video.removeEventListener("click", togglePlayPause, false);
    }
  }, [withVideoEvent]);

  const hoverClass = `
    invisible opacity-0 transition-opacity duration-500
    group-hover:visible
    `;

  const indexIndicatorClass = `
    absolute top-[20px] right-[15px] ${
      indexIndicatorHolder ? "" : "hover:bg-white cursor-auto"
    }
    `;

  const isSingle = medias.length < 2;

  const actionClassName = `${
    isSingle || hideCarouselIndicators ? "hidden" : ""
  }`;

  const fillClassName = `
  absolute top-0 left-0 w-full h-full rounded-[inherit]
  `;

  medias = medias.length ? medias : ["blank"];

  return (
    <Carousel
      opts={
        isSingle
          ? {
              watchDrag: false,
            }
          : undefined
      }
      setApi={setEmblaApi}
      className="w-full relative group"
    >
      <CarouselContent>
        {medias.map((media = "/images/video.mp4", i) => (
          <CarouselItem key={i}>
            <div
              className={cn(
                "relative aspect-auto w-full h-[210px]",
                carouselContent
              )}
            >
              {media === "blank" || !isValidMedia(media) ? (
                <div className={`${fillClassName} bg-black/50`} />
              ) : isVideo(media) ? (
                <video
                  loop={false}
                  ref={videoRef}
                  className={cn(`${fillClassName} bg-black`, mediaClassName)}
                  src={media.url}
                />
              ) : (
                <Image
                  alt=""
                  fill
                  src={media.url}
                  className={cn("rounded-[inherit] ", mediaClassName)}
                />
              )}
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
        } ${isTouchDevice || isSingle ? "hidden" : ""}
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
        } ${isTouchDevice || isSingle ? "hidden" : ""}
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
      {dotIndicator && (
        <div
          className={cn(
            `
          absolute flex gap-2 left-[50%] -translate-x-[50%] 
          bottom-[20px] bg-contrast
          `,
            actionClassName
          )}
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
