"use client";

import React from "react";
import AuthPaperCard from "../../components/AuthPaperCard";
import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  authBtnProps,
  authFormFieldProps,
} from "../../components/SigninAndSignUpLayout";
import { useAuth } from "@/app/providers/AuthProvider";

const page = () => {
  const { handleLogin } = useAuth();
  const router = useRouter();

  const onSubmit = () => {
    handleLogin();
    router.push("/");
  };

  return (
    <AuthPaperCard
      title="Login"
      subTitle="Welcome back, we have been expecting you!"
    >
      <FormField {...authFormFieldProps} label="Email" />

      <FormField {...authFormFieldProps} type="password" label="Password" />

      <Button {...authBtnProps} onClick={onSubmit}>
        Login
      </Button>
    </AuthPaperCard>
  );
};

export default page;
