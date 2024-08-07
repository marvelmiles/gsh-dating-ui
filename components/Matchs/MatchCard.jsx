import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Typography from "../Typography";
import GalleryImageIcon from "../icons/GalleryImageIcon";
import CirclePlayIcon from "../icons/CirclePlayIcon";
import BadgeMarkIcon from "../icons/BadgeMarkIcon";
import { cn } from "@/lib/utils";
import MatchCardGallery from "../MatchCardGallery";

const MatchCard = ({ contained = false, galleryProps, details = false }) => {
  const headerClass = `rounded-t-[10px] ${
    contained ? "h-[300px]" : "h-[206px]"
  }`;

  return (
    <div
      className={cn(
        `
      w-[305px] flex flex-col min-w-0 rounded-[10px] shadow-lg
      bg-background
      `,
        contained && "w-full h-screen"
      )}
    >
      <div
        className={cn(
          `
        relative w-full 
        rounded-t-[inherit]
        `,
          headerClass
        )}
      >
        <Button
          size="icon-lg"
          className="
        absolute left-[15px] top-[20px] z-[2]
        text-white bg-transparent hover:bg-transparent
        "
        >
          <BadgeMarkIcon />
        </Button>
        <MatchCardGallery {...galleryProps} carouselContent={headerClass} />
        <div
          className="
        absolute left-[15px] bottom-[20px] z-[2]
        text-white bg-transparent hover:bg-transparent
        flex items-center gap-2
        "
        >
          <div className=" flex items-center gap-2 text-white">
            <GalleryImageIcon />
            <Typography variant="text"> 4</Typography>
          </div>
          <div className=" flex items-center gap-2 text-white">
            <CirclePlayIcon />
            <Typography variant="text">4</Typography>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex-between">
          <Typography className="font-bold" variant="text">
            Tamara, 27
          </Typography>
          <div
            className="
          w-[10px] h-[10px] bg-success rounded-full
          "
          />
        </div>
        <Typography>
          Well I consider myself a hard-working and very independent woman,
          lover girl and ever loving partner. If you belive you’re a match with
          my personality and you can be mine, kindly inbox me.
        </Typography>

        {details && <div></div>}
      </div>
    </div>
  );
};

export default MatchCard;
