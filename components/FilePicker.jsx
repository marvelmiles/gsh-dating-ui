import React, { useEffect, useState } from "react";
import GalleryImageIcon from "./icons/GalleryImageIcon";
import Typography from "./Typography";
import { Button } from "./ui/button";
import VideoListIcon from "./ui/VideoListIcon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { TrashIcon, UploadIcon } from "lucide-react";

const FilePicker = ({
  isVideo = false,
  size = 60,
  color = "text-black-mild",
  containerClassName = "",
  id = "profileCover",
  disabled,
  onFileChange,
  onDelete,
  src: srcSet = "",
}) => {
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(srcSet);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);

      setSrc(url);

      return () => URL.revokeObjectURL(url);
    }

    if (srcSet) setSrc(srcSet);
  }, [file, srcSet]);

  const handleFileChange = (e) => {
    if (disabled) return;

    const file = e.target.files[0];
    setFile(file);
    onFileChange && onFileChange(file, id);
  };

  return (
    <div
      className={cn(
        `   
border flex-center flex-col rounded-[5px]
w-[225px] h-[225px] aspect-square relative
          `,
        containerClassName
      )}
    >
      {src ? (
        <>
          {isVideo ? (
            <video
              controls
              src={src}
              className="
            absolute w-full h-full top-0 left-0 object-cover
            rounded-[inherit]
            "
            />
          ) : (
            <Image fill className="rounded-[inherit]" alt="" src={src} />
          )}

          <Button
            disabled={disabled}
            as="label"
            htmlFor={disabled ? undefined : id}
            size="icon"
            variant="outline"
            className="absolute top-[5px] right-[5px] z-[2]"
          >
            <UploadIcon />
          </Button>
          {file ? (
            <Button
              size="icon"
              variant="outline"
              disabled={disabled}
              className="absolute top-12 right-[5px] z-[2]"
              onClick={() => {
                URL.revokeObjectURL(src);
                setFile(null);
                setSrc(srcSet);
                onDelete && onDelete(id);
              }}
            >
              <TrashIcon />
            </Button>
          ) : null}
        </>
      ) : (
        <>
          {isVideo ? (
            <VideoListIcon size={size} color={color} />
          ) : (
            <GalleryImageIcon size={size} color={color} />
          )}

          <div className="flex-center flex-col">
            {/* <Typography>Drag and drop your file here</Typography> */}
            <Button
              as="label"
              disabled={disabled}
              htmlFor={id}
              variant="outline"
            >
              Browse File
            </Button>
          </div>
        </>
      )}
      <input
        key={src}
        type="file"
        accept={isVideo ? "video/*" : "image/*"}
        multiple={false}
        id={id}
        className="hidden"
        onChange={handleFileChange}
        readOnly={disabled}
      />
    </div>
  );
};

export default FilePicker;
