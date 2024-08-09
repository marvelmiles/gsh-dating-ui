import Typography from "@/components/Typography";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { CheckIcon } from "lucide-react";
import React from "react";

const PremiumRadioItem = ({ value }) => {
  return (
    <RadioGroupItem
      value="premium"
      className="border-primary text-primary"
      containerClassName="gap-8"
      label={
        <div
          className={`
  flex flex-col gap-4 border
  rounded-[10px] p-8 w-[400px] bg-white
  ${value === "premium" ? "border-black-mild" : "border-border"}
        `}
        >
          <Typography className="font-bold">Premium Account</Typography>

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

          <Typography className="ml-auto font-bold">$150/Annually</Typography>
        </div>
      }
    />
  );
};

export default PremiumRadioItem;
