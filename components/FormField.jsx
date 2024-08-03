import React from "react";
import Typography from "./Typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FormField = ({
  RightIcon = null,
  LeftIcon = null,
  onIconClick = undefined,
  error = "",
  label = "",
  layout = "block",
  containerClassName = "",
  id = "",
  name = "",
  withLabel = true,
  labelClassName = "",
  wrapperClassName = "",
  as = "input",
  type = "",
  ...props
}) => {
  const iconClass = `text-black-ink`;

  id = id || name || (typeof label === "string" ? label : "");

  const Input = {
    input: "input",
    textarea: "textarea",
  }[as];

  const inputClass = cn(
    "p-2 flex-1 h-full min-w-0 outline-0 rounded-[inherit] pow",
    props?.className
  );

  return (
    <div
      className={cn(
        `form-field-container layout-${layout}`,
        containerClassName
      )}
    >
      {label && (
        <Typography
          as={withLabel ? "label" : "div"}
          htmlFor={withLabel ? id : undefined}
          className={labelClassName}
        >
          {label}
        </Typography>
      )}
      <div
        className={cn(
          `
        form-field-wrapper-container
        ${LeftIcon ? "pl-2" : ""} ${RightIcon ? "pr-2" : ""}
        `,
          wrapperClassName
        )}
      >
        {LeftIcon && (
          <Button
            withHover
            onClick={onIconClick}
            size="icon"
            className={iconClass}
          >
            <LeftIcon />
          </Button>
        )}
        <Input {...props} type={type} id={id} className={inputClass} />
        {RightIcon && (
          <Button
            withHover
            onClick={onIconClick}
            size="icon"
            className={iconClass}
          >
            <RightIcon />
          </Button>
        )}
      </div>
      {error && <Typography>{error}</Typography>}
    </div>
  );
};

export default FormField;
