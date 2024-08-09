import { cn } from "@/lib/utils";
import React from "react";

const Divider = ({ orientation = "horizontal", className = "" }) => {
  return (
    <div
      className={cn(
        "bg-border",
        {
          horizontal: "w-full h-[1px]",
          vertical: "mx-2 h-full w-[1px] min-h-[inherit]",
        }[orientation],
        className
      )}
    />
  );
};

export default Divider;
