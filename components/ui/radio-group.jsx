"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import Typography from "../Typography";

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      defaultValue=""
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef(
  (
    {
      className,
      label,
      value,
      containerClassName = "",
      Icon = CircleIcon,
      ...props
    },
    ref
  ) => {
    value = value || props?.id || props?.name || label;

    return (
      <div className={cn("flex items-start gap-2", containerClassName)}>
        <RadioGroupPrimitive.Item
          ref={ref}
          value={value}
          id={value}
          className={cn(
            "aspect-square min-w-4 min-h-4 h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1",
            className
          )}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <Icon className="min-h-2.5 min-w-2.5 h-2.5 w-2.5 fill-current text-current" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        <Typography
          as="label"
          htmlFor={value}
          className="text-black cursor-pointer"
        >
          {label}
        </Typography>
      </div>
    );
  }
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
