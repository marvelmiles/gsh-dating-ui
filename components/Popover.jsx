"use client";

import {
  Popover as Popper,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

const Popover = ({
  content,
  children,
  contentClassName = "",
  className = "",
  containerClassName = "",
  withArrow = false,
  Component = "div",
  componentProps = undefined,
  asChild = true,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popper
      {...rest}
      onOpenChange={(open) => {
        setOpen(open);
        rest?.onOpenChange && rest.onOpenChange(open);
      }}
      className={className}
    >
      <PopoverTrigger className="trig" asChild={asChild}>
        <Component
          {...componentProps}
          className={cn(
            "flex gap-2 items-center max-w-fit",
            componentProps?.className
          )}
        >
          {children}
          {withArrow && (
            <ChevronDownIcon
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          )}
        </Component>
      </PopoverTrigger>
      <PopoverContent className={cn("min-w-fit max-w-fit", contentClassName)}>
        {content}
      </PopoverContent>
    </Popper>
  );
};

export default Popover;
