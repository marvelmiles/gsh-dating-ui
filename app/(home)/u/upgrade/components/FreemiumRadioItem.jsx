import Typography from "@/components/Typography";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon } from "lucide-react";
import React from "react";

const FreemiumRadioItem = ({ value }) => {
  return (
    <RadioGroupItem
      value="freemium"
      className="border-primary text-primary"
      containerClassName="gap-8"
      label={
        <div
          className={`
        flex flex-col gap-4 border
        rounded-[10px] p-8 w-[400px] bg-white
        ${value === "freemium" ? "border-black-mild" : "border-border"}
              `}
        >
          <Typography className="font-bold">Basic Account</Typography>

          <ul>
            <Typography
              as="li"
              variant="caption"
              className="flex items-center gap-2"
            >
              <CheckIcon size={10} className="text-current" />
              <span>Easy Visibility</span>
            </Typography>

            <Typography
              as="li"
              variant="caption"
              className="flex items-center gap-2"
            >
              <CheckIcon size={10} className="text-current" />
              <span>Promotional Ads</span>
            </Typography>

            <Typography
              as="li"
              variant="caption"
              className="flex items-center gap-2"
            >
              <CheckIcon size={10} className="text-current" />
              <span>Promotional Ads</span>
            </Typography>

            <Typography
              as="li"
              variant="caption"
              className="flex items-center gap-2"
            >
              <CheckIcon size={10} className="text-current" />
              <span>Unlimited Pictures</span>
            </Typography>

            <Typography
              as="li"
              variant="caption"
              className="flex items-center gap-2"
            >
              <CheckIcon size={10} className="text-current" />
              <span>Unlimited Account</span>
            </Typography>

            <Typography
              as="li"
              variant="caption"
              className="flex items-center gap-2"
            >
              <CheckIcon size={10} className="text-current" />
              <span>Endorsement Badge</span>
            </Typography>
          </ul>

          <Typography className="ml-auto font-bold">Free</Typography>
        </div>
      }
    />
  );
};

export default FreemiumRadioItem;
