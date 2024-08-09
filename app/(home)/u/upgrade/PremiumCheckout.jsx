import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import PremiumRadioItem from "./components/PremiumRadioItem";
import Typography from "@/components/Typography";
import { Button } from "@/components/ui/button";

const PremiumCheckout = () => {
  return (
    <div className="flex items-center gap-40">
      <RadioGroup defaultValue="premium">
        <PremiumRadioItem value="premium" />
      </RadioGroup>
      <div className="flex flex-col gap-20 flex-1 max-w-[444px]">
        <div className="flex flex-col gap-8">
          <Typography className="font-medium text-black">
            Select Payment Method
          </Typography>

          <RadioGroup defaultValue="card" className="flex items-center gap-8">
            <RadioGroupItem label="Credit or Debit Card" />
            <RadioGroupItem label="Paypal" />
          </RadioGroup>
        </div>

        <Button>Proceed</Button>
      </div>
    </div>
  );
};

export default PremiumCheckout;
