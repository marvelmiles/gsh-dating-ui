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
  orientation = "block",
  containerClassName = "",
  id = "",
  name = "",
  withLabel = true,
  labelClassName = "",
  wrapperClassName = "",
  as = "input",
  type = "",
  variant = "",
  containerStyle,
  onInputEmpty,
  ...props
}) => {
  const iconClass = `text-black-ink`;

  name = name || type;

  id = id || name || (typeof label === "string" ? label : "");

  const Input = {
    input: "input",
    textarea: "textarea",
  }[as];

  const inputClass = cn(
    "p-2 flex-1 h-full min-w-0 outline-0 rounded-[inherit]",
    props?.className
  );

  return (
    <div
      style={containerStyle}
      className={cn(
        `form-field-container orientation-${orientation} variant-${variant}`,
        containerClassName
      )}
    >
      {label && (
        <Typography
          as={withLabel ? "label" : "div"}
          htmlFor={withLabel ? id : undefined}
          className={cn("form-field-label", labelClassName)}
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
        <Input
          {...props}
          onChange={(e) => {
            props.onChange && props.onChange(e);

            if (!e.target.value && onInputEmpty) {
              const id = setTimeout(() => {
                clearTimeout(id);
                onInputEmpty(e);
              }, 0);
            }
          }}
          name={name}
          type={type}
          id={id}
          className={inputClass}
        />
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
      {error && <Typography className="text-red-700">{error}</Typography>}
    </div>
  );
};

export default FormField;
