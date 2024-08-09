"use client";

import React from "react";
import AuthPaperCard from "../../components/AuthPaperCard";
import FormField from "@/components/FormField";
import {
  authBtnProps,
  authFormFieldProps,
} from "../../components/SigninAndSignUpLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <AuthPaperCard
      title="Set Up Your Password"
      subTitle="Set up your prefered password for accessing your account"
    >
      <FormField
        {...authFormFieldProps}
        type="password"
        label="Your Password"
      />

      <FormField
        {...authFormFieldProps}
        type="password"
        label="Confirm Password"
      />

      <Button {...authBtnProps} onClick={() => router.push("/auth/login")}>
        Continue
      </Button>
    </AuthPaperCard>
  );
};

export default page;
