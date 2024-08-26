"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Typography from "./Typography";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Dropdown = ({
  children,
  items = [],
  triggerClassName = "",
  contentClassName = "",
  placeholderClassName = "",
  onSelect,
  variant = "outline",
  disableResizing,
  itemClassName = "",
  label,
  labelClassName = "",
  containerClassName = "",
  orientation = "block",
  autoSelect = false,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const [placeholder, setPlaceholder] = useState(items[0]?.content || items[0]);

  const contentRef = useRef();

  const triggerRef = useRef();

  useEffect(() => {
    let id;

    const setWidth = () => {
      const c = contentRef.current;

      if (!c) return;

      c.style.width = triggerRef.current.clientWidth + "px";
      c.style.margin = "0 auto";
    };

    if (!disableResizing) {
      if (open) id = setTimeout(setWidth, 0);

      window.addEventListener("resize", setWidth);
    }

    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", setWidth);
    };
  }, [open, disableResizing]);

  useEffect(() => {
    if (autoSelect) onSelect(placeholder);
  }, [autoSelect]);

  const content = (
    <DropdownMenu
      modal={false}
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DropdownMenuTrigger
        {...rest}
        className={cn(
          `  
          form-field-wrapper-container flex-between !gap-2 ring-0 
          outline-0 border bg-white p-2 rounded-[4px] 
          ${{ outline: "border-border", ghost: "border-none" }[variant]}
       `,
          triggerClassName
        )}
        ref={triggerRef}
      >
        {children || (
          <>
            <Typography as="div" className={placeholderClassName}>
              {placeholder}
            </Typography>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        id="c"
        ref={contentRef}
        className={`p-0 ${contentClassName}`}
      >
        {Array.isArray(items)
          ? items.map((l, i) => {
              const c = l.content || l;

              return (
                <DropdownMenuItem
                  key={i}
                  className="p-0"
                  onClick={() => {
                    !children && setPlaceholder(c);
                    onSelect && onSelect(l);
                    l.onClick && l.onClick();
                  }}
                >
                  <Typography
                    className={cn(
                      `
                p-2 hover:bg-slate-100/60 w-full
                cursor-pointer flex items-center gap-3
                  `,
                      itemClassName
                    )}
                  >
                    {l.Icon && <l.Icon />}
                    {l.href ? <Link href={l.href}>{c}</Link> : <span>{c}</span>}
                  </Typography>
                </DropdownMenuItem>
              );
            })
          : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return label ? (
    <div
      className={cn(
        `form-field-container orientation-${orientation}`,
        containerClassName
      )}
    >
      <Typography className={cn("form-field-label", labelClassName)}>
        {label}
      </Typography>
      {content}
    </div>
  ) : (
    content
  );
};

export default Dropdown;
