import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-transparent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        "default-min": "h-10 px-4 py-2 min-w-[120px]",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "min-w-[32px] min-h-[32px] h-[32px] w-[32px] rounded-full [&>svg]:cursor-pointer [&>svg]:w-[60%]",
        "icon-sm":
          "min-w-[25px] min-h-[25px] h-[25px] w-[25px] rounded-full [&>svg]:cursor-pointer [&>svg]:w-[60%]",
        "icon-md":
          "rounded-full min-w-[28px] min-h-[28px] w-[28px] h-[28px] [&>svg]:w-[80%] [&>svg]:mx-auto",
        "icon-xl":
          "min-w-[40px] min-h-[40px] h-[40px] w-[40px] rounded-full [&>svg]:cursor-pointer [&>svg]:w-[60%]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      as: Component = "button",
      withHover = false,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        {...props}
        className={cn(
          buttonVariants({ variant, size, className }),
          withHover &&
            {
              icon: "bg-transparent text-black-ink hover:bg-accent",
            }[size]
        )}
        ref={ref}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
