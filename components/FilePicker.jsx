import React from "react";
import GalleryImageIcon from "./icons/GalleryImageIcon";
import Typography from "./Typography";
import { Button } from "./ui/button";
import VideoListIcon from "./ui/VideoListIcon";
import { cn } from "@/lib/utils";

const FilePicker = ({
  isVideo = false,
  size = 60,
  color = "text-black-mild",
  containerClassName = "",
}) => {
  return (
    <div
      className={cn(
        `   
border flex-center flex-col rounded-[5px]
w-[225px] h-[225px]
          `,
        containerClassName
      )}
    >
      {isVideo ? (
        <VideoListIcon size={size} color={color} />
      ) : (
        <GalleryImageIcon size={size} color={color} />
      )}
      <div className="flex-center flex-col">
        <Typography>Drag and drop your file here</Typography>
        <Button variant="outline">Browse File</Button>
      </div>
    </div>
  );
};

export default FilePicker;
