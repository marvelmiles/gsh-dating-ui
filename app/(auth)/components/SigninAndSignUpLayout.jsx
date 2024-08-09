import React from "react";
import AuthPaperCard from "./AuthPaperCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Divider from "@/components/Divider";
import Typography from "@/components/Typography";
import FormField from "@/components/FormField";

export const authFormFieldProps = {
  variant: "outline",
  wrapperClassName: `w-full rounded-[30px] bg-transparent border-black-mild
        `,
  className: `
        h-14 pl-6 text-black-mild placeholder:text-black-mild
        `,
};

export const authBtnProps = {
  size: "lg",
  className: "rounded-[30px]",
};

const SigninAndSignUpLayout = ({ children, onContinue, ...props }) => {
  return (
    <AuthPaperCard {...props}>
      <Button
        variant="outline"
        size="lg"
        className="
              font-garamond rounded-[30px] gap-8 bg-transparent
              hover:bg-peach/90 border-black-mild
              "
      >
        <div className="relative aspect-square w-[25px] h-[25px]">
          <Image fill alt="" src="/images/google-icon.png" />
        </div>
        <span>Continue With Google</span>
      </Button>

      <div className="flex items-center gap-2">
        <Divider className="bg-black-mild" />
        <Typography className="font-garamond">Or</Typography>
        <Divider className="bg-black-mild" />
      </div>

      <FormField {...authFormFieldProps} placeholder="Your Email" />

      {children}

      <Button {...authBtnProps} onClick={onContinue}>
        Continue
      </Button>
    </AuthPaperCard>
  );
};

export default SigninAndSignUpLayout;
